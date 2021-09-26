export interface SigninRequestBody {
    email: string;
    password: string;
}

export interface SigninResponseBody {
    message: string;
    token: string;
    userData: string;
}

export interface SignupRequestBody {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface SignupResponseBody {
    message: string;
    token: string;
    userData: string;
}

export interface SetDataRequestBody {
    discount: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
}

export interface SetDataResponseBody {
    message: string;
    userData: string;
}

export interface GetDataResponseBody {
    email: string;
    message: string;
    firstName: string | null;
    lastName: string | null;
    dateOfBirth: Date | null;
}