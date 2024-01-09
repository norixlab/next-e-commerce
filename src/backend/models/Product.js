import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Enter product title'],
        },
        description: {
            type: String,
            required: [true, 'Enter product description'],
        },
        price: {
            type: Number,
            required: [true, 'Enter product price'],
        },
        images: [
            {
                public_id: {
                    type: String,
                },
                url: {
                    type: String,
                },
            },
        ],
        category: {
            type: String,
            required: [true, 'Enter product price'],
            enum: {
                values: [
                    'Electronics',
                    'Cameras',
                    'Laptops',
                    'Accessories',
                    'Headphones',
                    'Sports',
                ],
                message: 'Please select correct category',
            },
        },
        seller: {
            type: String,
            required: [true, 'Enter product seller'],
        },
        stock: {
            type: Number,
            required: [true, 'Enter product stock'],
        },
        ratings: {
            type: Number,
            default: 0,
        },
        reviews: [
            {
                rating: {
                    type: Number,
                    required: true,
                },
                comments: {
                    type: String,
                    required: true,
                },
                createAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        createAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
