"use client"

import React from 'react'
import {useGetUsersQuery } from '../state/api'
import Header from '../(components)/Header';
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const Users = () => {
    const {data, isError, isLoading} = useGetUsersQuery();

    const columns: GridColDef[] = [
        {
            field: 'userId', 
            headerName: 'ID', 
            width: 90,
        },
        {
          field: 'name',
          headerName: 'Name',
          width: 200,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 200,
        }
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
        const message = "Failed to fetch users"
        console.log(message)
        return <div className="justify-center text-md px-4 py-4">{message}</div>
    }



  return (
    <div className="flex flex-col">
        <Header name="Users" />
        <DataGrid rows={data} columns={columns} getRowId={(row) => row.userId} checkboxSelection className="bg-white rounded-lg shadow-xl shadow-blue-400 !text-gray-500"></DataGrid>

    </div>
    
    
  )
}

export default Users