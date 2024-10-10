import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  stock: { type: Number, required: true, min: 0 },
  
  createAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  });

  const Product = mongoose.model('Product', productSchema);
  export default Product;
  