declare namespace Express {
    interface Request {
        user:{
            id: string;
        };
        admin:{
            id: string;
            permissoes: string[];
        };
    }
}