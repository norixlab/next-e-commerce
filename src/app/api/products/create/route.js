

import ProductModel from '@/backend/models/Product';
import { NextResponse } from 'next/server';
import { connect } from '@/backend/config/db';

export async function POST(req) {
	await connect()
	try {
		const { title, description, price, seller, stock, category } = await req.json();

		const product = await ProductModel.findOne({title});
		if(product){
			return NextResponse.json({ error: 'This product already exists' },{status: 400});
		}
		const doc = new ProductModel({ title, description, price, seller, stock, category });
		const newProduct = await doc.save()
        return NextResponse.json({ newProduct }, { status: 201 });
	} catch (error) {
		return NextResponse.json({error: error.message}, {status: 500})
	}
    
}