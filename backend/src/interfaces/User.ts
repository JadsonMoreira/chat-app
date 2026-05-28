export interface User {
    name: string;
    email: string;
    status?: string;
    authentication: {
        password: string;
        login: string;
    };
    socketId?: string;
    createdAt?: Date;
    updatedAt?: Date;
    lastSeenAt?: Date;
    comparePassword?: (password: string) => Promise<boolean>;
 }