"use client"

import React, { useMemo, useState } from 'react'
import { ExpenseByCategorySummary, useGetExpensesByCategoryQuery } from '../state/api';
import Header from '../(components)/Header';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';


type AggregatedDataItem = {
    name: string
    color?: string
    amount: number
}

type AggregatedData = {
    [category: string] : AggregatedDataItem;
}

const Expenses = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const {data, isLoading, isError} = useGetExpensesByCategoryQuery();


    const parseDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    }

    const expenses = useMemo(() => data ?? [], [data])

    const aggregatedData : AggregatedDataItem[] = useMemo(() => {
        const filtered: AggregatedData = expenses.filter((data: ExpenseByCategorySummary) => {
            const matchesCategory = selectedCategory === "All" || data.category === selectedCategory;
            const dataDate = parseDate(data.date)
            const matchesDate = !startDate || !endDate || (dataDate >= startDate || dataDate <= endDate);
            return matchesCategory && matchesDate;
        }).reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
            const amount = parseInt(data.amount);
            if (!acc[data.category]){
                acc[data.category] = {name: data.category, amount: 0};
                acc[data.category].color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                acc[data.category].amount += amount
            }
            return acc;

        }, {})

        return Object.values(filtered);
    }, [expenses, selectedCategory, startDate, endDate]);

    if(isLoading){
        return <div className='mt-2 px-4 py-4 text-bold'>Loading...</div>
    }

    if (isError || !data){
        const message = "An Error Occured";
        console.error({message: {message}});
        return <div className='mt-2 px-4 py-4 text-bold'>{message}</div>
    };





    const ClassNames = {
        label: "block text-sm font-medium text-gray-700",
        selectInput: "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
    }

    


  return (
    <div>
        {/* {HEADER} */}
        <div className="mb-5">
            <Header name="Expenses"></Header>
            <p className="text-sm text-gray-500">
                Visual Representation of Expenses Overtime
            </p>
        </div>

        {/* {FILTERS} */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className='w-full md:w-1/3 bg-white shadow rounded-lg p-6'>
                <h3 className="text-lg font-semibold mg-4">
                    Filter by Category and Date
                </h3>
                <div className="space-y-4">
                    {/* {CATEGORY} */}
                    <div>
                        <label htmlFor="category" className={ClassNames.label}>Category</label>
                        <select id="category" name="category" className={ClassNames.selectInput} defaultValue="All" onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option>All</option>
                            <option>Office</option>
                            <option>Professional</option>
                            <option>Salaries</option>
                        </select>
                    </div>
                    {/* {START DATE} */}
                    <div>
                        <label htmlFor="start-date" className={ClassNames.label}>Start Date</label>
                        <input type="date" id="start-date" name="start-date" className={ClassNames.selectInput} onChange={(e) => setStartDate(e.target.value)}></input>
                    </div>
                    {/* {END DATE} */}
                    <div>
                        <label htmlFor="end-date" className={ClassNames.label}>End Date</label>
                        <input type="date" id="end-date" name="end-date" className={ClassNames.selectInput} onChange={(e) => setEndDate(e.target.value)}></input>
                    </div>


                </div>
            </div>

        </div>
        {/* {CHART} */}

        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie data={aggregatedData} cx="50%" cy="50%" label outerRadius={150} fill="#8884d8" dataKey="amount" onMouseEnter={(_ , index) => setActiveIndex(index)}>
                        {aggregatedData.map((entry: AggregatedDataItem, index: number) => (
                            <Cell key={`cell=${index}`} fill={index===activeIndex ? "rgb(29,78, 216)": entry.color}></Cell>
                        ))}

                    </Pie>
                    <Tooltip></Tooltip>
                    <Legend />

                </PieChart>
                
            </ResponsiveContainer>

        </div>

    </div>
    
  )
}

export default Expenses