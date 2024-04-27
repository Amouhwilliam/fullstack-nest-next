import React, {useRef} from 'react';
import useClickOutSide from "@/utilities/useClickOutside";
import MenuItem from"./menuItem"
import {types} from '@document-app/api-sdk'

interface ContextMenuInterface {
    x: number
    y: number
    isVisible: boolean
    onClose: Function
    onMenuItemClick: Function
    documentType: string
}

export const ContextMenu = ({ x, y, isVisible, onClose, onMenuItemClick, documentType }: ContextMenuInterface) => {
    if (!isVisible) return null;

    const handleClick = (action: string) => {
        onMenuItemClick(action);
        onClose();
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const menuRef = useRef(null)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useClickOutSide(menuRef, () => { onClose() })

    return (
        <div ref={menuRef} className="drop-shadow-md bg-white absolute rounded-lg divide divide-y-2 " style={{ top: y, left: x }}>
            <div className="grid grid-cols-1 divide-y">
                {
                    documentType == types.Type_Enum.FOLDER ?
                        <MenuItem title={"Add document"} handleClick={() => handleClick("add")}/>
                    : null
                }
                <MenuItem title={`Edit ${documentType.toLowerCase()}`} handleClick={()=> handleClick("edit")}/>
                <MenuItem title={`Delete ${documentType.toLowerCase()}`} handleClick={()=> handleClick("delete")}/>
            </div>
        </div>
    );
};
