import mongoose from "mongoose";
const itemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        min:1,
    },
    price:{
        type:Number,
        required:true,
        min:0,
    },

});
const invoicesSchema=new mongoose.Schema({
    items:[itemSchema],
    total:{
        type:Number,
        required:true,
    },
    dueDate:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        enum:["paid","unpaid","partially_paid"],
        default: "unpaid"
    },
    description:{
        type:String,
       
    },
    client:{type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    supplier:{type:mongoose.Schema.Types.ObjectId,
        ref:"Supplier",
        required:true,
    },
},
{
    timestamps:true,
}
)
const Invoice=mongoose.model("Invoice",invoicesSchema);
export default Invoice;