import { Post, Subforum, User, Vote, Comment, SavedPost } from "@prisma/client";

export type ExtendedPost = Post & {
    subForum: Subforum;
    votes: Vote[];
    author: User;
    comments: Comment[];
    SavedPost: SavedPost[];
}