export class CreateCommentResponse {
    CommentId!: string;
    text!: string;
    created!: Date;
    replyToFeedId!: string;
    commentorId!: number;
}