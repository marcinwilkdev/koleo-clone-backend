export default interface WebTokenService {
    secret: string;

    sign: (payload: any, expiresInHours: number) => string;
    verify: (token: string) => any;
}