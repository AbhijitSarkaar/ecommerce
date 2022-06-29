import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
} from "../constants/productConstants";
import axios from "axios";

export const listProducts = () => async (dispatch) => {
    console.log("listProducts");

    try {
        console.log("listProducts try");
        dispatch({
            type: PRODUCT_LIST_REQUEST,
        });

        const { data } = await axios.get("/api/products");

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log("listProducts catch");

        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload:
                (error?.response && error?.response?.data?.message) ||
                "Something went wrong",
        });
    }
};
