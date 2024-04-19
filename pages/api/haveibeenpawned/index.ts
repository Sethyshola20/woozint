import { NextApiRequest, NextApiResponse } from "next";

export default async function pawnedHandler(req:NextApiRequest,res:NextApiResponse){
    if(req.method === "POST"){
return res.status(200).json({text: "Votre email est utilisé sur des sites piratés: Facebook, LinkedIn, Twitter."});
    }
}