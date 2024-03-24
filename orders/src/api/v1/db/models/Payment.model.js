import mongoose from "mongoose";
const { Schema } = mongoose;

const paymentSchema = new Schema({
  amount: { type: Number },
  currency: { type: String },
  paymentMethod: {
    type: String,
    enum: ["credit card", "debit card", "payPal"],
  },
});

export default mongoose.model("Payment", paymentSchema);
