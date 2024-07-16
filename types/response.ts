export interface HTTPResponseMeta<T> {
    no: number,
    msg: string,
    data: T
}

export enum HTTPCode {
    UNAUTHORIZED = 401,
    SUCCESS = 0,
    ERROR = -1,
}