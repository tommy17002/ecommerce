import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductsApi from "../apis/ProductApi";

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

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(0);
    
    useEffect(() => {
        ProductsApi.getProducts(page, limit);
    }, [page, limit]);

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
        
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold leading-6 text-gray-900">
                        Product List
                    </h1>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button
                        className="flex items-center justify-center rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-light
                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition duration-150 ease-in-out"
                        >
                            Add Product
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductsPage;