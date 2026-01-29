import React from 'react'
import { TbNotes } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { BiCartAdd } from "react-icons/bi";
import { IoFastFood } from "react-icons/io5";

const Navbar = ({ onSelect, activePage }) => {

    const menuItems = [
        { id: "products", label: "Products", icon: <TbNotes /> },
        { id: "category", label: "Category", icon: <BiCategory /> },
        { id: "orders", label: "Orders", icon: <BiCartAdd /> },
    ];

    return (
        <div className='bg-gray-200 md:h-screen min-w-max flex flex-row md:flex-col'>
            <div className='flex flex-col items-center justify-center p-4'>
                
                <div className='flex flex-row items-center justify-center p-8 gap-2'>
                    <IoFastFood className='text-gray-700 text-xl' />
                    <h1 className='text-gray-600 font-bold text-xl'>DIGITAL MENU</h1>
                </div>

                <div className='flex flex-row md:flex-col items-center justify-center gap-3 w-full'>

                    {menuItems.map((item) => {
                        const isActive = activePage === item.id;

                        return (
                            <div
                                key={item.id}
                                onClick={() => onSelect(item.id)}
                                className={`
                                    flex flex-row items-center gap-4 w-full p-3 rounded-xl cursor-pointer transition
                                    ${isActive 
                                        ? "bg-gray-100 text-gray-900 font-semibold" 
                                        : "hover:bg-gray-100 text-gray-700"
                                    }
                                `}
                            >
                                <span className={isActive ? "text-black" : "text-gray-600"}>
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    );
};

export default Navbar;
