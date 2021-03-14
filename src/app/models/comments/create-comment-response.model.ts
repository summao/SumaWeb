export class CreateCommentResponse {
    commentId!: string;
    text!: string;
    created!: Date;
    replyToPostId!: string;
    commentorId!: number;
}
