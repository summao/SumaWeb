export class CreateCommentResponse {
    commentId!: string;
    text!: string;
    created!: Date;
    replyToFeedId!: string;
    commentorId!: number;
}
