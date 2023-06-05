export interface Post {
    id: string;
    userId: string;
    userEmail: string;
    content: string;
    fileUrl: string;
    likes: string[];
    comments: [];
    createdAt: string;
}