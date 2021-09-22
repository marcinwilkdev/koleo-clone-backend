import { IWebTokenService } from "../WebTokenService";

import jwt from "jsonwebtoken";

export default class JsonWebTokenService implements IWebTokenService {
    secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }

    sign(payload: any, expiresInHours: number) {
        return jwt.sign(payload, this.secret, {
            expiresIn: expiresInHours + "h",
        });
    }

    verify(token: string) {
        return jwt.verify(token, this.secret);
    }
}
