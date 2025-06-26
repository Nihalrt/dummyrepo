"use client"

import React, { useState } from 'react'
import Header from '../(components)/Header';

type UserSetting = {
    label: string;
    value: string | boolean;
    type: "text" | "toggle";


}

const mockSettings: UserSetting[] = [
    {label: "Username", value: "sai_ni", type: "text"},
    {label: "Email", value: "sainihaldiddi2002@gmail.com", type: "text"},
    {label: "Notification", value: "true", type: "toggle"},
    {label: "Dark Mode", value: "false", type: "toggle"},
    {label: "Language", value: "Englist", type: "text"},


]

const Settings = () => {

    const [userSetting, setUserSettings] = useState<UserSetting[]>(mockSettings)

    const handleToggleChange = (index: number) => {
        const settingsCopy = [...userSetting]
        settingsCopy[index].value = !settingsCopy[index].value as boolean;
        setUserSettings(settingsCopy);
    }
  return (
    <div className="w-full">
        <Header name="Settings"></Header>
        <div className="overflow-x-auto mt-5 shadow-md shadow-blue-400">
            <table className="min-w-full bg-white rounded-lg">
                <thead className="bg-gray-900 text-white ">
                    <tr>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                            Setting
                        </th>
                        <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                            Value
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {userSetting.map((setting, index) => (
                        <tr className="hover:bg-blue-50" key={setting.label}>
                            <td className="py-2 px-4">{setting.label}</td>
                            <td className="py-2 px-4">{setting.type === "toggle" ? (
                                <label className="inline-flex relative items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={setting.value as boolean} onChange={() => handleToggleChange(index)} />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 
                                                    transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                                                    after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                                                    after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                                                    peer-checked:bg-blue-600">
                                        

                                    </div>
                                </label>

                            ): (
                                <input type="test" className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:" value={setting.value as string } onChange={(e) => {
                                    const settingsCopy = [...userSetting];
                                    settingsCopy[index].value = e.target.value;
                                    setUserSettings(settingsCopy);

                                }}>
                                </input>
                            )}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    </div>
  )
}

export default Settings