export interface IEncryptionService {
    hash: (value: string, key: number) => Promise<string>;
    compare: (value: string, hashedValue: string) => Promise<boolean>;
}

export default abstract class EncryptionService {
    static instance: IEncryptionService;

    static init(instance: IEncryptionService) {
        this.instance = instance;
    }

    static getInstance() {
        return this.instance;
    }
}