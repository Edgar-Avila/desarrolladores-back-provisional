import db from './index';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const main = async () => {
    // Constants
    const languages = ['C++', 'C', 'Python', 'Rust', 'Go', 'Javascript', 'Typescript', 'PHP', 'Lua', 'Java', 'Kotlin'];
    let addedUsers: number[] = [];
    let addedLanguages: number[] = [];
    let addedPosts: number[] = [];
    let addedComments = new Map<number, number[]>();

    // Delete from db
    await db.comment.deleteMany();
    await db.like.deleteMany();
    await db.post.deleteMany();
    await db.user.deleteMany();
    await db.programmingLanguage.deleteMany();

    // -----------------
    //      Create
    // -----------------

    // Languages
    for(let language of languages) {
        const addedLanguage = await db.programmingLanguage.create({
            data: {
                Name: language
            }
        });
        addedLanguages.push(addedLanguage.LanguageID);
    }
    
    // Users
    for(let i=0;i<100;i++){
        const hashedPassword = await bcrypt.hash(faker.internet.password(), 10);
        const username = faker.internet.userName();
        const user = await db.user.create({
            data: {
                Username: username,
                Password: hashedPassword,
                ProfilePictureUrl: `https://ui-avatars.com/api/?background=random&name=${username}`
            }
        });
        addedUsers.push(user.UserID);
    }
    
    // Default test user
    {
        const futureHashedPassword = await bcrypt.hash("future", 10);
        const futureUsername = "future";
        const futureUser = await db.user.create({
            data: {
                Username: futureUsername,
                Password: futureHashedPassword,
                ProfilePictureUrl: `https://ui-avatars.com/api/?background=random&name=${futureUsername}`
            }
        });
        addedUsers.push(futureUser.UserID);
    }


    // Posts
    for(let i=0;i<100;i++){
        const post = await db.post.create({
            data: {
                UserID: faker.helpers.arrayElement(addedUsers),
                Title: faker.helpers.fake('{{hacker.ingverb}} the {{hacker.noun}}'),
                Content: faker.lorem.paragraphs(Math.floor(Math.random()*7)+5),
                LanguageID: faker.helpers.arrayElement(addedLanguages),
                PublicationDate: faker.date.recent(30),
                ImageUrl: `https://picsum.photos/seed/${i}/1280/720`
            }
        });
        addedPosts.push(post.PostID);
    }

    // Likes
    for(let i=0;i<100;i++){
        try{
            await db.like.create({
                data: {
                    UserID: faker.helpers.arrayElement(addedUsers),
                    PostID: faker.helpers.arrayElement(addedPosts),
                }
            });
        }
        catch(err){
            i--;
        }
    }

    // Comments
    for(let i=0;i<100;i++){
        let postId = faker.helpers.arrayElement(addedPosts);
        let comments = addedComments.get(postId) || [];
        let root = Math.floor(Math.random()*2);
        let parentId = null;
        if(comments.length > 0 && root == 0){
            parentId = faker.helpers.arrayElement(comments);
        }
        const comment = await db.comment.create({
            data: {
                UserID: faker.helpers.arrayElement(addedUsers),
                PostID: postId,
                Content: faker.hacker.phrase(),
                AnsweredID: parentId
            }
        });
        addedComments.set(postId, [...comments, comment.CommentID]);
    }
}

main().catch((err) => {
    console.log(err);
    process.exit(1);
}).finally(async () => {
    await db.$disconnect();
    console.log("Seeded");
});