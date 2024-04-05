import  axios  from "axios";
import { fetchError, fetchSuccessful, startFetching } from "./Common";
import { SET_DATA_INFO } from "./ActionType";
// REACT_APP_API="http://localhost:8000/api"
// process.env.REACT_APP_API}/user/cart

export const getRealTimeInfoHydrator = () => (dispatch) => {  
  
    dispatch(startFetching());
    const url = 'https://analyticsdashboard-data.onrender.com/analyticData'
    axios
      .get(url)
      .then(({ data }) => {
        
        dispatch({
          type: SET_DATA_INFO,
          payload: data
        });
  
        dispatch(fetchSuccessful());
      })
      .catch((error) => {
        dispatch(fetchError());
        console.error("getRealTImeInfoHydrator", error);

      });
  };

