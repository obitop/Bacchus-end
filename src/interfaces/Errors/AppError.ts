
export interface AppError extends Error{
    statusCode: number;
    // message: string;
}

export class AppError implements AppError{
    constructor(statusCode: number, message: string){
        this.message = message;
        this.statusCode = statusCode;
        this.name = 'AppError';
    }
}

export class PageNotFoundError extends AppError {
    constructor(path: string){
        super(404, `${path} not found on this server`)
        this.name = "NotFoundError"
    }
}

// export class ResourceNotFoundError extends AppError {
//     constructor(id: number) {

//     }
// }

