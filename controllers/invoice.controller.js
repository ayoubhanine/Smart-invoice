import Invoice from "../models/Invoices.js"
import User from "../models/User.js"
import Supplier from "../models/Supplier.js"


export const createInvoice=async (req,res)=>{
    try{
        const{supplier,facture_proprites,dueDate,description}=req.body
        const supplierExit=await Supplier.findOne({
            _id:supplier,
            client:req.user._id,
        })
        if(!supplierExit){
            return res.status(404).json({message:"supplier not found"})
        }
        const total=facture_proprites.reduce((acc,item)=>{
            return acc+(item.price * item.quantity)
        },0)
        const invoice=await Invoice.create({
            supplier,
            facture_proprites,
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

export const updateinvoice=async(req,res)=>{
    try{
        const invoice=await Invoice.findOne({_id:req.params.id,
            client:req.user._id}
        );
        if(!invoice){
            return res.status(404).json({message:"invoice not found"})
        }
        
        if(invoice.status==="paid"){
            return res.status(400).json({message:"vous ne peuvez pas modifier une facture payée"})
        }
        //recalculer total si facture_prop ete changé
        let updateData={...req.body};
        if(req.body.facture_proprites){
            const total=req.body.facture_proprites.reduce((acc,item)=>{
                return acc+item.price * item.quantity;
            },0);
            updateData.total=total;
        }

        const updateinvoice=await Invoice.findOneAndUpdate({_id:req.params.id,
            client:req.user._id},
            updateData,
            {new:true});
            res.json(updateinvoice)
        }
        catch(err){
        res.status(500).json({message:err.message})
    }
}

export const deleteinvoice=async(req,res)=>{
    try{
        const invoice=await Invoice.findOne({_id:req.params.id,
            client:req.user._id,
        })
        if(!invoice){
            return res.status(404).json({message:"invoice not found"})
        }
        if(invoice.status==="partially_paid"){
            res.status(400).json({message:"vous ne peuvez pas supprimmer une facture associé a un paiment"})
        }
       await invoice.deleteOne();
       res.json({message:"invoice a éte supprimé"})
    }
    catch(err){

    }
}