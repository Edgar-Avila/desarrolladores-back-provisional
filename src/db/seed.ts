import db from './index';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

function getRandomColor(): string {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function invertColor(hex: string, bw: boolean) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // https://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    const sr = (255 - r).toString(16);
    const sg = (255 - g).toString(16);
    const sb = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(sr) + padZero(sg) + padZero(sb);
}

function padZero(str: string, len: number = 2): string {
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

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
        let bg = getRandomColor();
        let fg = invertColor(bg, true);
        bg = bg.slice(1);
        fg = fg.slice(1);
        const user = await db.user.create({
            data: {
                Username: username,
                Password: hashedPassword,
                ProfilePictureUrl: `https://ui-avatars.com/api/?background=${bg}&color=${fg}&name=${username}`
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
        addedComments.set(postId, [...comments, comment.CommentId]);
    }
}

main().catch((err) => {
    console.log(err);
    process.exit(1);
}).finally(async () => {
    await db.$disconnect();
    console.log("Seeded");
});