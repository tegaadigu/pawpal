'use client';
import { useStore } from '@/store/[storeSlug]/hooks/use-store';
import { useParams } from 'next/navigation';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import React from 'react';
import Link from 'next/link';

const Header = () => {
  const { slug = ''}  = useParams();
  const { data = {} } = useStore(slug as string);
  const { store } = data;
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="container flex justify-between">
        <div className="flex items-center gap-6">
          <Link className="text-3xl font-inter font-bold text-gray-900" href={`/store/${store?.slug}`}>{store?.name}</Link>
          {/* <nav className="hidden md:flex gap-6 text-gray-700">
            <a href="#" className="hover:text-black font-medium">Archives</a>
            <a href="#" className="hover:text-black font-medium">New</a>
            <a href="#" className="hover:text-black font-medium">Textile</a>
            <a href="#" className="hover:text-black font-medium">Sneakers</a>
            <a href="#" className="hover:text-black font-medium">Accessory</a>
          </nav> */}
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 bg-gray-100 rounded-md">
             <ShoppingCartIcon className="w-6 h-6"/>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;