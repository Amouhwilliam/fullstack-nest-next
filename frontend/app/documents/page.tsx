'use client'
import SearchInputSearch from "../../components/InputSearch";
import {useState} from "react";
import {useQuery} from '@tanstack/react-query'
import ApiSDK, {types} from '@/sdk'
import Document from "../../components/Document";
import AddDocument from "@/components/AddDocument";
import dynamic from 'next/dynamic'
import {useParams} from "next/navigation";

const LazyModal = dynamic(() => import('@/components/UpsertModal'))

let timer: any = null

const defaultDocument: types.DocumentInterface = {
    id: undefined,
    name: "",
    content: "",
    type: types.Type_Enum.FILE,
}

interface DocumentInterface {
    id?: number
    name: string
    content?: string
    type: types.Type_Enum
    parentId?: number
    parent?: DocumentInterface
    children?: [DocumentInterface]
}

export default function DocumentPage() {
    const params = useParams()
    const baseUrl: string = `${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}`
    const client = new ApiSDK({baseUrl})
    const [searchInput, setSearchInput] = useState("")
    const [search, setSearch] = useState("")
    const [documentToUpsert, setDocumentToUpsert] = useState<types.DocumentInterface>(defaultDocument)
    const [selectedParent, setSelectedParent] = useState<types.DocumentInterface>(defaultDocument)
    //const {isOpen, onOpen, onClose} = useDisclosure()
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    const {data, isLoading, error} = useQuery({
        queryKey: ['documents', search, +params?.id],
        queryFn: async () => await getDocument(search, +params?.id),
    })

    const {data: folder} = useQuery({
        queryKey: ['documents', +params?.id],
        queryFn: async () => {
            const res = await client.getDocumentById(+params?.id)
            return res.data
        },
    })

    const getDocument = async (search: string, parentId?: number) => {
        const res = await client.getDocument({search, parentId})
        return res.data
    }

    function handleSearch(e: any) {
        setSearchInput(e?.target.value)

        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            setSearch(e.target.value)
        }, 1000)
    }

    const renderDocument = (document: types.DocumentInterface,
                            key: number,
                            openModal: Function,
                            setSelectedParent: Function
    ) => {
        return (
            <Document document={document} key={key}
                      setDocumentToUpsert={setDocumentToUpsert}
                      openModal={openModal}
                      setSelectedParent={setSelectedParent}
            />
        )
    }

    return (
        <div className={"w-full h-screen flex items-center justify-center pt-10"}>
            <div className={"w-[1024px] h-full bg-gray-100 rounded-xl"}>
                <div className={"flex flex-col md:flex-row md:justify-between text-4xl font-bold m-6"}>
                    <span className={"capitalize"}>{folder ? folder.name: "My Documents"}</span>
                    <div className={"mt-3 md:mt-0"}>
                        <SearchInputSearch
                            handleSearch={handleSearch}
                            searchInput={searchInput}
                            placeholder="Search"
                        />
                    </div>
                </div>
                <div className={"w-full h-full flex justify-center items-center mt-12"}>
                    {isLoading ?
                        <div>loading........</div>
                        :
                        (data && data.length <= 0 ?
                                (search.length <= 0 ? <AddDocument onOpen={onOpen}/> : <div>No data found!</div>)
                                :
                                <div className={"w-full h-full p-6"}>
                                    {
                                        data && data.map((item: types.DocumentInterface, key: number) => renderDocument(item, key, onOpen, setSelectedParent))
                                    }
                                    <div className="fixed bottom-6 " style={{right: "calc(50% - 75px)"}}>
                                        <div onClick={onOpen} className="px-3 cursor-pointer py-2 font-bold rounded bg-gray-200 hover:bg-gray-300">
                                            Add a -document-
                                        </div>
                                    </div>
                                </div>
                        )
                    }
                </div>

            </div>
            {isOpen &&
                <LazyModal isOpen={isOpen}
                           onClose={() => {
                               onClose()
                               setSelectedParent(defaultDocument)
                               setDocumentToUpsert(defaultDocument)
                           }}
                           document={documentToUpsert}
                           setDocument={setDocumentToUpsert}
                           selectedParent={selectedParent}
                />
            }
        </div>
    );
}
