import mongoose from "mongoose";

const payementSchema=new mongoose.Schema({
    amount:{type:Number,
        required:true,
    },
    payementDate:{
        type:Date,
        required:true,
    },
    invoiceId:{type:mongoose.Schema.Types.ObjectId,
        ref:"Invoice",
       
    }
},
{
    timestamps:true
}

)
const Payement=mongoose.model("Payement",payementSchema);
export default Payement;