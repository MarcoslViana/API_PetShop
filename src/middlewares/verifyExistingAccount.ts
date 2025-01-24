import { Request, Response, NextFunction } from "express";
import petshops from "../data/petshops";

export function verifyExistingAccount(req: Request, res: Response, next: NextFunction) {
    const cnpj = req.headers.cnpj;
    const petShop = petshops.find(index => index.cnpj === cnpj);

    if (!petShop) {
        res.status(400).json({error: "Esse petshop não existe"});
        return;
    }
    
    req.petshop = petShop;
    next();
}
