import Payement from "../models/Payement.js";
import Invoice from "../models/Invoices.js"

export const createPayement=async(req,res)=>{
    try{
        const{amount,payementDate}=req.body;
        const facture=await Invoice.findOne({_id:req.params.id,
            client:req.user._id
        })
        if(!facture){
            return res.status(404).json({message:"facture non trouvé"})
        };
        if(amount<=0){
            return res.status(400).json({message:"invalid amount"})
        }
        if(facture.paidAmount+amount>facture.total){
                return res.status(400).json({message:"vous navez pas le droit de depaaser montant total du facture"})
        }
         const payement=await Payement.create({
            invoice:facture._id,
            amount,
            payementDate,
        })
        //update paidAmount
        facture.paidAmount=facture.paidAmount+amount
        //update status
        if(facture.paidAmount===facture.total){
         facture.status="paid"  
            
          }
        else if (facture.paidAmount>0){
            facture.status="partially_paid"
    
        }
        await facture.save();
        res.status(201).json(payement)

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
