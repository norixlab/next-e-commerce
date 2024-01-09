import ProductModel from '@/backend/models/Product';
import {NextResponse} from 'next/server';
import { connect } from '@/backend/config/db';

export async function GET(){
	await connect();
	try {

		const products = await ProductModel.find();
		if (products.length === 0) {
            return NextResponse.json({ error: 'Produts not found' }, { status: 404 });
        }
		return NextResponse.json({
			success: true,
			products
		},{status: 200})
	} catch (error) {
		return NextResponse.json({error: error.message},{status:500})
	}
}
