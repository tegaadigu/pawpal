import { Product } from '@/@types/product';
import React from 'react';
import Image from 'next/image';

export const ProductCard = ({ product }: { product: Product }) => {
  const imageUrl = product?.images?.[0]?.path || `https://picsum.photos/id/${168}/200/300`;
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:bg-blue">
      {/* // eslint-disable-next-line @next/next/no-img-element */}
      <Image src={imageUrl} width={401} height={401} alt={product.name} className="w-full h-64 object-cover"/>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        {/* <p className="text-gray-500">{product.colors} Colors</p> */}
        <p className="text-gray-800 font-bold">{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;