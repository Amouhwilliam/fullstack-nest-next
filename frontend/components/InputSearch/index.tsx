import React from "react";
import {MagnifyingGlassIcon} from "@heroicons/react/16/solid";

function SearchInputSearch({handleSearch, searchInput, placeholder = ''}: any) {

    return (
        <div className='flex px-3 py-1 search-input-container'>
            <div
                className='m-auto bg-white cursor-pointer'
            >
                <MagnifyingGlassIcon className={"w-8 h-8 mr-3"} color='#b0bec5'/>
            </div>
            <input
                type='text'
                placeholder={placeholder}
                value={searchInput}
                onChange={(event: any) => handleSearch(event)}
                className='w-full outline-none focus:ring-0'
                style={{color: "#8199A1", fontSize: 16}}
            />
        </div>
    )
}

export default SearchInputSearch;

