export interface PostType {
    id: number,
    groupId: number,
    userId: number
    title: string,
    content: string,
    likedUser: UserType[],
    dislikedUser: UserType[],
    comments: CommentType[],
    createdDate: Date,
}

export interface UserType {
    confirmationToken: String,
    createdDate: Date,
    isEnabled: Boolean,
    userEmail: String,
    id: String,
}

export interface CommentType {
    id: number,
    userId : number
    postId: number,
    content: String,
    likedUser: UserType[],
    dislikedUser: UserType[],
    createdDate: Date,
}

export interface MessageType {
    id: number;
    senderId: number;
    recipientId: number;
    content: string;
    createdDate: string;
  };
