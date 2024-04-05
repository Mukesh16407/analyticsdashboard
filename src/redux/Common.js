import { FETCH_END, FETCH_ERROR, FETCH_START } from "./ActionType";


export const startFetching = () => ({
    type: FETCH_START
  });

  export const fetchSuccessful = () => ({
    type: FETCH_END
  });

  export const fetchError = (payload) => ({
    type: FETCH_ERROR,
    payload
  });