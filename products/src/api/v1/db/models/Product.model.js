import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String }, // String is shorthand for {type: String}
  description: { type: String },
  category: { type: String },
  quantity: { type: Number },
  price: { type: Number },
});

export default mongoose.model("Product", productSchema);
