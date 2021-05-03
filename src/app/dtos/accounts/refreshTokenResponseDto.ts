export class RefreshTokenResponseDto {
    accessToken!: string;
    refreshToken!: string;

    public constructor(init?:Partial<RefreshTokenResponseDto>) {
        Object.assign(this, init);
    }
}