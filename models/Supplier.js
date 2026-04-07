import mongoose from "mongoose";


const supplierSchema=new mongoose.Schema({
    client:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"},
    name:{type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{type:String},
    address:{
        type:String,
       
    },
},
{
    timestamps:true,
},)
const Supplier=mongoose.model("Supplier",supplierSchema);
export default Supplier;
