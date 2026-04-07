import Invoice from "../models/Invoices.js"
import User from "../models/User.js"
import Supplier from "../models/Supplier.js"


export const createInvoice=async (req,res)=>{
    try{
        const{supplier,items,dueDate,description}=req.body
        const supplierExit=await Supplier.findOne({
            _id:supplier,
            client:req.user._id,
        })
        if(!supplierExit){
            return res.status(404).json({message:"supplier not found"})
        }
        const total=items.reduce((acc,item)=>{
            return acc+(item.price * item.quantity)
        },0)
        const invoice=await Invoice.create({
            supplier,
            items,
            dueDate,
            description,
            total,
            client:req.user._id
        })
        res.status(201).json(invoice)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
};

export const getinvoices=async(req,res)=>{
    try{
        const invoices=await Invoice.find({client:req.user._id}).
        populate("supplier","name email").
        sort({createdAt:-1});
        res.json(invoices)

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
};

export const getinvoiceById=async(req,res)=>{
    try{
        const invoice=await Invoice.findOne({
            _id:req.params.id,
            client :req.user._id,}).populate("supplier");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json(invoice);
        }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
