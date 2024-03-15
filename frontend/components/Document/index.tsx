import React, {useState} from "react";
import {ContextMenu} from"../ContextMenu"
import ApiSDK, {types} from '@document-app/api-sdk'
import {FolderIcon} from '@heroicons/react/24/outline'
import {DocumentChartBarIcon} from '@heroicons/react/24/outline'
import {useQueryClient} from "@tanstack/react-query";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useRouter} from "next/navigation";

interface FolderInterface {
    document: types.CompanyDataInterface
    setDocumentToUpsert: Function
    openModal: Function
    setSelectedParent: Function
}
export default function Document({document, setDocumentToUpsert, openModal, setSelectedParent}: FolderInterface) {

    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter()

    const client = new ApiSDK({baseUrl: process.env.NEXT_PUBLIC_API_URL})
    const queryClient = useQueryClient()

    const handleContextMenu = (e: any) => {
        e.preventDefault();
        setMenuPosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
    };

    const handleCloseMenu = () => {
        setIsVisible(false);
    };

    const deleteDocument = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        if(document?.id){
                            client.deleteCompanyData(document?.id).then(()=>{
                                queryClient.invalidateQueries({ queryKey: ['documents'] })
                            }).catch((e: any)=>{
                                console.log(e)
                            })
                        }
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    const handleMenuItemClick = (action: string) => {
        switch (action) {
            case "add":
                setSelectedParent(document)
                openModal()
                break;
            case "edit":
                setDocumentToUpsert(document)
                openModal()
                break;
            case "delete":
                deleteDocument()
                break;
            default:
                break
        }
    };
    return (
        <div onContextMenu={handleContextMenu} >
            <div className="flex items-center cursor-pointer pl-2 hover:bg-white hover:rounded-md">
                {
                    document.type === types.Type_Enum.FOLDER ?
                    <FolderIcon className="w-8 h-8 mr-4 my-2" color='' onClick={()=> {
                        router.push("/documents/"+document.id)
                    }}/>
                    :
                    <DocumentChartBarIcon className="w-8 h-8 mr-4 my-2" color='' />
                }

                 <span className={document.type === types.Type_Enum.FOLDER ?`hover:underline hover:font-bold cursor-pointer`: ""}
                       onClick={()=> {
                           document.type === types.Type_Enum.FOLDER &&
                           router.push("/documents/"+document.id)
                       }}
                 >
                     {document.name}
                 </span>
            </div>

            <ContextMenu
                x={menuPosition.x}
                y={menuPosition.y}
                isVisible={isVisible}
                onClose={handleCloseMenu}
                onMenuItemClick={handleMenuItemClick}
                documentType={document.type}
            />
        </div>
    );
}
