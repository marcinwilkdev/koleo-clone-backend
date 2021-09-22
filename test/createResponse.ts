import { Response } from "express";

export const createResponse = () => {
    const response = {
        statusCode: 500,
        body: {} as any,
        status: function (code: number) {
            this.statusCode = code;
            return this;
        },
        json: function (payload: any) {
            this.body = payload;
            return this;
        },
    };

    return response as unknown as Response & { body: any };
};