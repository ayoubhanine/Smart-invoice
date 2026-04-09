import Supplier from "../models/Supplier.js";
import Invoice from "../models/Invoices.js"


export const getstats=async(req,res)=>{
    try{
        const invoices=await Invoice.find({
            supplier:req.params.id,
            client:req.user._id
        });
        if(!invoices.length){
            return res.json({
                totalInvoices:0,
                totalAmount:0,
                totalPaid:0,
                totalrest:0,
                paidPercentage:0,
            })
        }
        let totalAmount=0;
        let totalPaid=0;
        for(let i=0;i<invoices.length;i++){
            totalAmount+=invoices[i].total;
            totalPaid+=invoices[i].paidAmount
        }
        const totalrest=totalAmount-totalPaid;
        const paidPercentage=(totalPaid/totalAmount)*100;
       res.json({
            totalInvoices:invoices.length,
                totalAmount:totalAmount,
                totalPaid:totalPaid,
                totalrest:totalrest,
                paidPercentage:paidPercentage,
       })


    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}