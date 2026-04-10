import Supplier from "../models/Supplier.js"


export const createSupplier=async(req,res)=>{
    try{
        const {name,email,phone,address}=req.body;
        const supplier=await Supplier.create({
                name,
                email,
                phone,
                address,
                client:req.user._id,
        
        });
        res.status(201).json(supplier)
    }catch(err){
        res.status(500).json({message:err.message})
    }
};



export const getsuppliers=async(req,res)=>{
    try{
        const suppliers=await Supplier.find({client:req.user._id});
        res.json(suppliers)
    }catch(err){
        res.status(500).json({message:err.message})
    }
};


export const getsuppliersById=async(req,res)=>{
    try{
        const supplier=await Supplier.findById(req.params.id)
        if(!supplier){
            return res.status(404).json({message:"supplier not found"})
        }
        res.json(supplier)


    }catch(err){
        res.status(500).json({message:err.message})
    }
}



export const updatesupplier=async(req,res)=>{
    try{
        const suppliers=await Supplier.findById(req.params.id);
        if(!suppliers){
            return res.status(404).json({message:"supplier not found"})
        }
        const updatedsupplier=await Supplier.findByIdAndUpdate(req.params.id,
            req.body,
            {new:true});
            res.json(updatedsupplier)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}



export const deletesupplier=async(req,res)=>{
    try{
        const supplier=await Supplier.findById(req.params.id)
        if(!supplier){
            return res.status(404).json({message:"supplier not found "})
        }
        await supplier.deleteOne()
        res.json({message:"supplier deleted succesufly"})
    }
    catch(err){
            res.status(500).json({message:err.message})
    }
}

