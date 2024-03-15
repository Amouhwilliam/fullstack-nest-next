import React from "react";
import ApiSDK, {types} from '@document-app/api-sdk'
import { useQueryClient } from '@tanstack/react-query'
import {useParams} from "next/navigation";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

interface UpsertModalInterface {
    isOpen: boolean
    onClose: () => void
    document: types.CompanyDataInterface
    setDocument: Function
    selectedParent: types.CompanyDataInterface
}
export default function UpsertModal ({isOpen, onClose, document, setDocument, selectedParent}: UpsertModalInterface){

    const client = new ApiSDK({baseUrl: process.env.NEXT_PUBLIC_API_URL})
    const queryClient = useQueryClient()
    const params = useParams()

    const addDocument = () => {
        if(selectedParent?.id){
            client.createCompanyData({...document, parentId: selectedParent?.id}).then((res)=>{
                queryClient.invalidateQueries({ queryKey: ['documents'] })
                onClose()
            }).catch((e)=>{
                console.log(e)
            })
        } else {
            if(+params?.id){
                client.createCompanyData({...document, parentId: +params?.id}).then((res)=>{
                    queryClient.invalidateQueries({ queryKey: ['documents'] })
                    onClose()
                }).catch((e)=>{
                    console.log(e)
                })
            } else {
                client.createCompanyData(document).then((res)=>{
                    queryClient.invalidateQueries({ queryKey: ['documents'] })
                    onClose()
                }).catch((e)=>{
                    console.log(e)
                })
            }
        }
    }

    const editDocument = () => {
        if(document?.id){
            client.updateCompanyData(document?.id, document).then((res)=>{
                queryClient.invalidateQueries({ queryKey: ['documents'] })
                onClose()
            }).catch((e)=>{
                console.log(e)
            })
        }
    }

    const handleChange = (e: any) => {
        e.preventDefault()
        const {name, value} = e.target
        setDocument({...document, [name]: value})
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
    };

    return (

        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className={"mb-4"}>
                    <Typography id="modal-modal-title" variant="h4" component="h2">
                        {document?.id ? "Edit" : "Add"} a document {selectedParent?.id && `[to ${selectedParent?.name}]`}
                    </Typography>
                </div>

                <Stack spacing={3}>
                    <label htmlFor="owner_name">
                        Document type
                    </label>
                    <Select labelId="type"
                            name="type"
                            className="w-full"
                            value={document?.type}
                            disabled={!!document.id}
                            onChange={(e: SelectChangeEvent)=>handleChange(e)}>
                        <MenuItem value={types.Type_Enum.FOLDER}>Folder</MenuItem>
                        <MenuItem value={types.Type_Enum.FILE}>File</MenuItem>
                    </Select>
                    <TextField id="name" name="name"
                               value={document?.name}
                               placeholder='Name'
                               label="Name" variant="outlined"
                               onChange={handleChange}/>

                    <TextField id="content"
                               name="content"
                               value={document?.content}
                               placeholder='Content'
                               label="Content"
                               variant="outlined"
                               onChange={handleChange}/>
                </Stack>

                <div className={"mt-6"}>
                    <Button variant="contained" onClick={()=>{
                        if(document?.name && document?.name.length > 0 ) {
                            if(document?.id){
                                editDocument()
                            } else {
                                addDocument()
                            }
                        } else {
                            alert("Your document need to have a name!")
                        }
                    }}>
                        Submit
                    </Button>
                </div>

            </Box>
        </Modal>
    );
}
