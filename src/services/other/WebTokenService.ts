export interface IWebTokenService {
    secret: string;

    sign: (payload: any, expiresInHours: number) => string;
    verify: (token: string) => any;
}

export default abstract class WebTokenService {
    static instance: IWebTokenService;

    static init(instance: IWebTokenService) {
        this.instance = instance;
    }

    static getInstance() {
        return this.instance;
    }
}