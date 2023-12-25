import * as api from "../api/";

//Actions Creators
export const uploadCard = (image) => async (dispatch) => {
    try {
        dispatch({ type: "START_LOADING" });

        const send = {image: image};

        const received = await api.uploadCard(send);

        const data = received.data;

        console.log("received message: ", received.data);

        console.log("WORKING!!");

        dispatch({ type: "SEARCH_BY_ID", payload: data});
        dispatch({ type: "SET_ERROR", payload: "none"});
        dispatch({ type: "END_LOADING" });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: "SET_ERROR", payload: error.response.data.message});
        console.log(error);
        dispatch({ type: "END_LOADING" });
    }
}

export const clearAll = () => async (dispatch) => {
    try {
        dispatch({ type: "CLEAR_ALL" });
    } catch (error) {
        console.log(error.message);
    }
}