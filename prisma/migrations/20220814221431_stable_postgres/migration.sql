-- CreateTable
CREATE TABLE "Post" (
    "PostID" SERIAL NOT NULL,
    "ImageUrl" VARCHAR(2083),
    "PublicationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Title" VARCHAR(100),
    "Content" TEXT NOT NULL,
    "UserID" INTEGER NOT NULL,
    "LanguageID" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("PostID")
);

-- CreateTable
CREATE TABLE "ProgrammingLanguage" (
    "LanguageID" SERIAL NOT NULL,
    "Name" VARCHAR(50) NOT NULL,

    CONSTRAINT "ProgrammingLanguage_pkey" PRIMARY KEY ("LanguageID")
);

-- CreateTable
CREATE TABLE "User" (
    "UserID" SERIAL NOT NULL,
    "Username" VARCHAR(100) NOT NULL,
    "ProfilePictureUrl" VARCHAR(2083),
    "Password" CHAR(60) NOT NULL,
    "RefreshToken" CHAR(60),

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserID")
);

-- CreateTable
CREATE TABLE "Like" (
    "UserID" INTEGER NOT NULL,
    "PostID" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("UserID","PostID")
);

-- CreateTable
CREATE TABLE "Comment" (
    "CommentID" SERIAL NOT NULL,
    "Content" TEXT NOT NULL,
    "AnsweredID" INTEGER,
    "UserID" INTEGER NOT NULL,
    "PostID" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("CommentID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Username_key" ON "User"("Username");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_LanguageID_fkey" FOREIGN KEY ("LanguageID") REFERENCES "ProgrammingLanguage"("LanguageID") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_PostID_fkey" FOREIGN KEY ("PostID") REFERENCES "Post"("PostID") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_AnsweredID_fkey" FOREIGN KEY ("AnsweredID") REFERENCES "Comment"("CommentID") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_PostID_fkey" FOREIGN KEY ("PostID") REFERENCES "Post"("PostID") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "User"("UserID") ON DELETE RESTRICT ON UPDATE NO ACTION;
