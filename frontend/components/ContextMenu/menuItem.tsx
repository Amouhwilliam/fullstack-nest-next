import React from "react";


interface MenuItemInterface {
    title: string
    handleClick: Function
}
export default function MenuItem ({title, handleClick}: MenuItemInterface){
    return (
        <div className="cursor-pointer px-3 py-1" onClick={() => handleClick('edit')}>{title}</div>
    );
}