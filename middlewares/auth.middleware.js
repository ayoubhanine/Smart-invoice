import jwt from "jsonwebtoken";
import User from "../models/User";

export const protect=async(req,res,next)=>{
    let token;
    
    if(
        req.headers.authorization && 
        req.headers.startsWith("Bearer")
    ){
        try{
            token=req.headers.authorization.split(" ")[1];

            //verif token
            const decoded =jwt.verify(token,process.env.JWT_SECRET);
            //recupere lutilisateur sans psswd
            req.user=await User.findById(decoded.id).select("-password");
            next();

        }
        catch(err){
            return res.status(500).json({message:"Not authorized, token failed"})
        }
    }
    if(!token){
        return res.status(401).json({message:"Not authorized, no token"})
    }


}