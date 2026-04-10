import Invoices from "../models/Invoices.js";

export const getdashboared = async (req, res) => {
  try {
    const invoices = await Invoices.find({
      client: req.user._id,
    });
    let partially_paid = 0;
    let unpaid = 0;
    let paidinvoices=0;
    let totalInvoices = 0;
    let totalAmount = 0;
    let totalpaidAmount = 0;
    for (let i = 0; i < invoices.length; i++) { 
        totalInvoices += 1;
      totalAmount += invoices[i].total;
      totalpaidAmount += invoices[i].paidAmount;
     
      if (invoices[i].status === "partially_paid") {
        partially_paid++;
      }
      else if (invoices[i].status === "unpaid") {
        unpaid++;
      }
      else if (invoices[i].status==="paid"){
        paidinvoices++
      }
    }
    res.json({
        totalInvoices,
        totalAmount,
        totalpaidAmount,
        partially_paid,
        paidinvoices,
        unpaid,

    })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
