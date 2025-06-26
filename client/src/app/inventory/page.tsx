"use client"

import React from 'react'
import { useGetProductsQuery } from '../state/api'
import Header from '../(components)/Header';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const Inventory = () => {
    const {data, isError, isLoading} = useGetProductsQuery();

    const columns: GridColDef[] = [
        { field: 'productId', headerName: 'ID', width: 90 },
        {
          field: 'name',
          headerName: 'Product Name',
          width: 150,
        },
        {
          field: 'price',
          headerName: 'Price',
          width: 110,
          type: "number",
          valueGetter: (value, row) => `$${row.price}`
        },
        {
          field: 'rating',
          headerName: 'Rating',
          type: 'number',
          width: 110,
          valueGetter: (value, row) => row.rating ? row.rating : "N/A"

        },
        {
            field: 'stockQuantity',
            headerName: 'Stock Quantity',
            type: 'number',
            width: 150,
  
          },
    ]

    if (isLoading) {
        return <div className="py-4">Loading...</div>
    }

    if (isError){
        const message = "An Error occured"
        console.error({message: {message}})
        return <div className="justify-center text-sm px-4 py-4">{message}</div>
    }
    if (!data){
        const message = "Failed to fetch products"
        console.log(message)
        return <div className="justify-center text-md px-4 py-4">{message}</div>
    }



  return (
    <div className="flex flex-col">
        <Header name="Inventory" />
        <DataGrid rows={data} columns={columns} getRowId={(row) => row.productId} checkboxSelection className="bg-white rounded-lg shadow-xl shadow-blue-400 !text-gray-500"></DataGrid>

    </div>
    
    
  )
}

export default Inventory