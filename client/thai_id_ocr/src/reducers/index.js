export default (state = {card: null, cards: [], isLoading: false, error: "none"}, action ) => {
    switch (action.type) {
        case "START_LOADING":
            return { ...state, isLoading: true };
        case "END_LOADING":
            return { ...state, isLoading: false };
        case "SEARCH_BY_ID":
            return { ...state, card: action.payload };
        case "SEARCH_CARDS":
            return { ...state, cards: action.payload };
        case "CLEAR_ALL":
            return { card: null, cards: [], isLoading: false, error: "none" };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};