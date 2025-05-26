export type BaseReply<T> = {
    msg: string | string[];
    success?: boolean;
    data?: T;
};
