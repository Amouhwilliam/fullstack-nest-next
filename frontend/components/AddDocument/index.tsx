import React from "react";
import {FolderPlusIcon} from "@heroicons/react/24/outline";


interface  AddDocumentInterface {
    onOpen: Function
}
export default function AddDocument ({onOpen}: AddDocumentInterface){
    return (
        <div className={"flex text-xl hover:bg-gray-200 py-2 px-3 rounded-lg cursor-pointer"}
             onClick={()=> onOpen()}
        >
            <FolderPlusIcon className={"w-8 h-8 mr-3"}/>
            <span>Add a new document</span>
        </div>
    );
}