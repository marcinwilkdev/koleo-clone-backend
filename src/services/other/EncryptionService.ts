export default interface EncryptionService {
    hash: (value: string, key: number) => Promise<string>;
    compare: (value: string, hashedValue: string) => Promise<boolean>;
}