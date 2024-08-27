import { setError, setLoading, setProduct } from "../products/productsSlice";
import store from "../redux/store";
import axiosInstance from "./axiosInstance";

class ProductsApi {
    static async getProducts(page=1, limit=10)
    {
        store.dispatch(setLoading(true));
        try 
        {
            // const resp = await axiosInstance.get(`/product?page=${page}&limit=${limit}`, {})
            const resp = await axiosInstance.get("/products", {
                params:{
                    page,
                    limit,
                },
            });
            const { data } =resp;
            store.dispatch(
                setProduct({
                    items: data.items,
                    total: data.total,
                })
            )
        }catch (error) 
        {
            store.dispatch(setError(error));
            throw new Error(`ProductsApi getProducts: ${error.message}`);
        }
        finally
        {
            store.dispatch(setLoading(false));
        }
    }
    
}

export default ProductsApi;