import { Router } from "express";
import { verifyCNPJ } from "../middlewares/verifyCNPJ";
import { verifyCNPJ_Petshop } from "../middlewares/verifyCNPJ_Petshop";
import petshops from "../data/petshops";
import { v4 as CreateID } from "uuid";

const routesPetShop = Router();

routesPetShop.post('/', verifyCNPJ, verifyCNPJ_Petshop, (req, res) => {
    const infos = req.body as PetShop; 
    const newPetshop: PetShop | null = {
        id: CreateID(),
        name: infos.name,
        cnpj: infos.cnpj,
        pets: []
    }
    if (!newPetshop) {
        res.status(400).json({error: "Petshop não cadastrado"});
        return;
    }
    petshops.push(newPetshop);
    res.status(201).json({message: "Petshop cadastrado"});
    
    return;
});

export default routesPetShop;