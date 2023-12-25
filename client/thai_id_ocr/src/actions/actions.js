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

        dispatch({ type: "SET_CARD", payload: data});
        dispatch({ type: "SET_ERROR", payload: "none"});
        dispatch({ type: "END_LOADING" });
        

    } catch (error) {
        // console.log(error.message);
        dispatch({ type: "SET_ERROR", payload: error.response.data.message});
        // console.log(error);
        dispatch({ type: "END_LOADING" });
    }
}

// const delay = ms => new Promise(res => setTimeout(res, ms));

export const search = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: "START_LOADING" });
        console.log(searchQuery);
        // await delay(5000);
        const received = await api.search(searchQuery);

        const { cards } = received.data;

        // console.log(received);
        console.log(cards);

        dispatch({ type: "SET_CARDS", payload: cards});
        dispatch({ type: "END_LOADING" });
        if(cards.length==0) {
            dispatch({ type: "SET_ERROR", payload: "No record found!"});
        }
        else
            dispatch({ type: "SET_ERROR", payload: "none"});
        
    } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.response.data.message});
        console.log(error);
        dispatch({ type: "END_LOADING" });
    }
}

export const editRecord = (data) => async (dispatch) => {
    try {
        dispatch({ type: "START_LOADING" });

        console.log(data);

        // await delay(5000);

        const received = await api.editRecord(data);

        console.log(received);

        // const data = received.data;

        // console.log("received message: ", received.data);

        // console.log("WORKING!!");

        // dispatch({ type: "SET_CARD", payload: data});
        // dispatch({ type: "SET_ERROR", payload: "none"});
        dispatch({ type: "END_LOADING" });
        

    } catch (error) {
        // console.log(error.message);
        dispatch({ type: "SET_ERROR", payload: error.response.data.message});
        // console.log(error);
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