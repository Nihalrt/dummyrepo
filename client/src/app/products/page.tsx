"use client"

import React, { useState } from 'react'
import { useCreateProductMutation, useGetProductsQuery } from '../state/api';
import Header from '../(components)/Header';
import { PlusCircleIcon, SearchIcon } from 'lucide-react';
import Rating from '../(components)/Rating';
import CreateProduct from './CreateProduct';
import Image from 'next/image';


type ProductFormData ={
    name: string;
    price: number;
    stockQuantity: number;
    rating: number;
}


const Products = () => {
    const[search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false)

    const {data, isLoading,isError} = useGetProductsQuery(search);
    const [createProduct] = useCreateProductMutation();


    if(isLoading){
        return <div className="text-md pt-4 py-4">Loading...</div>
    }

    if (isError || !data){
        const message = "Error in fetching data";
        console.error({message: {message}})
        return <div className={`text-md pt-4 py-4 ${message}`}></div>
    }


    const handleCreateProduct = async (productData: ProductFormData) => {
        await createProduct(productData);
    }


  return (
    <div className="mx-auto pb-5 w-full">
        {/* {SEARCH BAR} */}
        <div className="mb-6 pt-8 pb-2">
            <div className="flex items-center border-1 border-white rounded-lg shadow-sm shadow-blue-400">
                <SearchIcon className="ml-2 w-5 h-5 text-gray-500"></SearchIcon>
                <input className="w-full py-2 px-4 rounded bg-white" placeholder='Search Products' value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
        </div>

        {/* {HEADER BAR} */}
        <div className="flex justify-between items-center mb-6">
            <Header name="Products"/>
            <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded" onClick={() => setIsModalOpen(true)}>
                <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200">Create Product</PlusCircleIcon>
            </button>
        </div>

        {/* {BODY PRODUCTS} */}
        <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-col-3 gap-10 justify-between">
            {isLoading ? (<div>Loading...</div>) : (
                data?.map((product) => (
                    <div key={product.productId} className="border shadow-md rounded shadow-blue-400 p-4 max-w-full w-full mx-auto">
                        <div className='flex flex-col items-center'>
                            <Image src={`/assets/product${Math.floor(Math.random() * 3) + 1}.png`} alt={product.name} width={150} height={150} className="mb-3 rounded-2xl w-36 h-36"></Image>
                            <h3 className="text-lg text-gray-900 font-semibold">{product.name}</h3>
                            <p className="text-gray-800">${product.price.toFixed(2)}</p>
                            <div className='text-sm text-gray-600 mt-1'>
                                Stock: {product.stockQuantity}
                            </div>
                            {product.rating && (
                                <div className="flex items-center mt-2">
                                    <Rating rating={product.rating}></Rating>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>

        {/* {MODAL} */}

        <CreateProduct isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateProduct}></CreateProduct>


    </div>
  )
}

export default Products