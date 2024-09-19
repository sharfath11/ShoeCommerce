import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    // after this weak chirichaaal
        // review:{
        //     type:[String]
        // },
    
    availableSize: {
        type: [String], 
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    images: [String],
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true,
    },
    blocked: {
        type: Boolean,
        default: false
    },
    sales:{
        type:Number,
        default:0
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true
    }
}, { timestamps: true });

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
