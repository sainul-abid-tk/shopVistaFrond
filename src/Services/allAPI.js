import { commonAPI } from "./CommonAPI"
import { SERVER_URL } from "./serverURL"

// getAllProdcuts API
export const getAllProductsAPI =async()=>{
    return await commonAPI("GET",`${SERVER_URL}/products`,"","")
}
// get A product API
export const getProductAPI=async(id)=>{
    return await commonAPI("GET",`${SERVER_URL}/products/${id}`,"","")
}