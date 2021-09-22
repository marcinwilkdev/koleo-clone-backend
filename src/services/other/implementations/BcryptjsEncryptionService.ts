import { IEncryptionService } from "../EncryptionService";

import bcryptjs from "bcryptjs";

export default class BcryptjsEncryptionService implements IEncryptionService {
    hash(value: string, key: number) {
        return bcryptjs.hash(value, key);
    }

    compare(value: string, hashedValue: string) {
        return bcryptjs.compare(value, hashedValue);
    }
}
