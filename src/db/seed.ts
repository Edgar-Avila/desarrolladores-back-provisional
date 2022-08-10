import db from './index';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const main = async () => {
    // Constants
    const languages = ['C++', 'C', 'Python', 'Rust', 'Go', 'Javascript', 'Typescript', 'PHP', 'Lua', 'Java', 'Kotlin'];
    let addedUsers: number[] = [];
    let addedLanguages: number[] = [];
    let addedPosts: number[] = [];

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
        const user = await db.user.create({
            data: {
                Username: faker.internet.userName(),
                Password: hashedPassword,
            }
        });
        addedUsers.push(user.UserID);
    }

    // Posts
    for(let i=0;i<100;i++){
        const post = await db.post.create({
            data: {
                UserID: faker.helpers.arrayElement(addedUsers),
                Title: faker.helpers.fake('{{hacker.ingverb}} the {{hacker.noun}}'),
                Content: faker.lorem.sentences(10),
                LanguageID: faker.helpers.arrayElement(addedLanguages),
            }
        });
        addedPosts.push(post.PostID);
    }

    // Likes
    for(let i=0;i<100;i++){
        await db.like.create({
            data: {
                UserID: faker.helpers.arrayElement(addedUsers),
                PostID: faker.helpers.arrayElement(addedLanguages),
            }
        });
    }

    // Comments
    for(let i=0;i<100;i++){
        await db.comment.create({
            data: {
                UserID: faker.helpers.arrayElement(addedUsers),
                PostID: faker.helpers.arrayElement(addedLanguages),
                Content: faker.hacker.phrase()
            }
        });
    }
}

main().catch((err) => {
    console.log(err);
    process.exit(1);
}).finally(async () => {
    await db.$disconnect();
    console.log("Seeded");
});
