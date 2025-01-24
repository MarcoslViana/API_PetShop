import { Router } from "express";
import { verifyExistingAccount } from "../middlewares/verifyExistingAccount";
import { v4 as CreateID } from "uuid";

const routesPet = Router();

let petshops: PetShop[] = [];

routesPet.get('/pets', verifyExistingAccount, (req, res) => {
    res.status(200).json(req.petshop.pets);
    return;
});

routesPet.post('/pets', verifyExistingAccount, (req, res) => {
    const infos = req.body as Pets;
    const newPet: Pets | null = {
        id: CreateID(),
        name: infos.name,
        type: infos.type,
        description: infos.description,
        vaccinated: false,
        deadline_vaccination: new Date(infos.deadline_vaccination),
        created_at: new Date()
    }
    if (!newPet) {
        res.status(400).json({error: "Pet não cadastrado"});
        return;
    }

    req.petshop.pets.push(newPet);
    res.status(201).json({message: "O Pet foi cadastrado", newPet});
    return;
});

routesPet.put('/pets/:id', verifyExistingAccount, (req, res) => {
    const petID = req.params.id;
    const { name, type, description, deadline_vaccination } = req.body; 
    const pet = req.petshop.pets.find(shop => shop.id === petID);

    if (!pet) {
        res.status(404).json({error: "Pet não encontrado"});
        return;
    }

    pet.name = name || pet.name;
    pet.type = type || pet.type;
    pet.description = description || pet.description;
    pet.deadline_vaccination = deadline_vaccination
        ? new Date(deadline_vaccination)
        : pet.deadline_vaccination;

    petshops = petshops.map(petshop =>
        petshop.id === req.petshop.id ? req.petshop : petshop
    );

    res.status(200).json({message: "Informações do pet atualizadas", pet});
    return ;
});

routesPet.patch('/pets/:id/vaccinated', verifyExistingAccount, (req, res) => {
    const petID = req.params.id;
    let verify = false;
    req.petshop.pets.forEach(element => {
        if(element.id == petID) {
            element.vaccinated = true;
            verify = true;
        } 
    });

    if(!verify) {
        res.status(400).json({error: "Pet não encontrado"});
        return;
    }

    petshops = petshops.map(petshop =>
        petshop.id === req.petshop.id ? req.petshop : petshop
    );

    res.status(200).json({message: "Pet vacinado"});
    return;
    
});

routesPet.delete('/pets/:id', verifyExistingAccount, (req, res) => {
    const petID = req.params.id;
    const newList = req.petshop.pets.filter(pet => pet.id !== petID);

    if (req.petshop.pets.length === newList.length) {
        res.status(404).json({error: "Pet não encontrado"});
        return ;
    }
    
    req.petshop.pets = newList;
    petshops = petshops.map(petshop =>
        petshop.id === req.petshop.id ? req.petshop : petshop
    );

    res.status(200).json({message: "Pet deletado do sistema"});
    return;
});

export default routesPet;
