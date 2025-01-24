import { Request, Response, NextFunction } from "express";
import petshops from "../data/petshops";

export function verifyCNPJ_Petshop(request: Request, response: Response, next: NextFunction) {
    const cnpj = request.body.cnpj;
    const store = petshops.find(petshop => petshop.cnpj === cnpj);
    if (store) {
      response.status(400).json({error: "Petshop já existente"});
      return;
    }
  
    next();
}