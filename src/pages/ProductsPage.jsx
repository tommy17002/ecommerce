import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductsApi from "../apis/ProductApi";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Pagination } from "@nextui-org/react";

const columns = [
    {
        id: "no", label: "No.", className: "py-3.5 pl-4 pr-3 sm:pl-6"
    },
    {
        id: "name", label: "Name", className: "py-3.5 px-3"
    },
    {
        id: "price", label: "Price", className: "py-3.5 px-3"
    },
    {
        id: "stock", label: "Stock", className: "py-3.5 px-3"
    },
    {
        id: "category", label: "Category", className: "py-3.5 px-3"
    },
    {
        id: "actions", 
        label: "Action", 
        className: "py-3.5 pl-3 pr-4 sm:pr-6 text-center",
    },
]

function ProductsPage()
{
    const isLoading = useSelector((state) => {
        return state.products.isLoading;
    });
    const productList = useSelector((state) => state.products.items);
    const total = useSelector((state) => state.products.total);
    const error = useSelector((state) => state.products.error);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const[searchQuery, setSearchQuery] = useState("");
    const[debounceSearchQuery] = useDebounce(searchQuery, 700);
    
    useEffect(() => {
        ProductsApi.getProducts(page, limit, searchQuery);
    }, [page, limit, searchQuery]);

    if (isLoading)
    {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"/>
            </div>
        );
    }

    if (error)
    {
        return <div className="text-red-600 text-center">{error}</div>;
    }

    const totalPages = Math.ceil(total/limit)

    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(Number(price));
    };
        
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold leading-6 text-gray-900">
                        Product List
                    </h1>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <div className="relative">
                        <input className="w-full pl-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary 
                        focus:border-transparent bg-white dark:bg-gray-800 text-gray-900" />
                        <SearchIcon className="absolute left-3 top-1/2 transform -translate"/>
                        {searchQuery && (
                            <button 
                            onClick={()=>{
                                setSearchQuery("")
                            }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400
                            hover:text-gray-600 focus:outline-none">
                            {<ClosedFilledIcon/>}
                            </button>
                        )}
                    </div>
                    <button
                        className="flex items-center justify-center rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-light
                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition duration-150 ease-in-out"
                        >
                            Add Product
                    </button>
                </div>
            </div>
            <div className="mt-5 flow-root">
                <div className="-mx-4 -my-2 overflow-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            {/* TABLE */}
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="min-w-full divide-y divide-gray-300">
                                    <tr>
                                        {columns.map((columnItem) => {
                                            return (
                                                <th 
                                                key={columnItem.id} 
                                                scope="col"
                                                className={`text-left text-sm font-semibold text-white ${columnItem.className}`}
                                                > 
                                                    {columnItem.label}
                                                </th>
                                            )
                                        })}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {
                                        productList.map((productItem, index) => {
                                            return (
                                                <tr
                                                 key={productItem.id}
                                                 className={index % 2 === 0? "bg-white" : "bg-gray-50"}
                                                 >
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {(page - 1) * limit + (index + 1)}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        {productItem.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        {formatPrice(productItem.price)}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        {productItem.stock}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        {productItem.categories[0].name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                                                        <div className="flex justify-center items-center space-x-2">
                                                            <button
                                                             onClick={() => {
                                                                alert("edit button clicked");
                                                             }}
                                                             className="text-primary hover:text-primary-darker transition duration-150 ease-in-out"
                                                            >
                                                                <PencilIcon className="h-5 w-5"/>
                                                            </button>
                                                            <button
                                                             className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                                                             onClick={() => {
                                                                alert("delete button clicked");
                                                             }}
                                                            >
                                                                <TrashIcon className="h-5 w-5"/>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <div>
                    <p className="text-md text-text-gray">
                        Showing{" "}
                        <span className="font-medium">{(page-1) * limit + 1}</span> to{" "}
                        <span className="font-medium">{Math.min(page*limit, total)}</span>{" "}
                        of <span className="font-medium"></span> results
                    </p>
                </div>
                <Pagination 
                 total={totalPages}
                 color="primary"
                 page={page}
                 //onChange{(page) => setPage(page)}
                 onChange={setPage}
                 showControls
                 showShadow
                 size="md"
                 />
            </div>
        </div>
    );
}

export default ProductsPage;