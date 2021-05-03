export class RefreshTokenRequestDto {
    userId!: number;
    refreshToken!: string;

    public constructor(init?:Partial<RefreshTokenRequestDto>) {
        Object.assign(this, init);
    }
}