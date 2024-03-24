import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: { type: String },
  items: [
    {
      _id: { type: String, require: true },
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "processing", "completed", "cancelled"],
    default: "pending",
  },
  paymentId: { type: Schema.Types.ObjectId, ref: "Payment", require: true },
});

export default mongoose.model("Order", orderSchema);
