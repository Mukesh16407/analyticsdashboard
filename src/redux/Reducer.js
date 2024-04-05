/* eslint-disable no-case-declarations */
import { FETCH_END, FETCH_ERROR, FETCH_START, SET_DATA_INFO } from "./ActionType";


const initState = {
  isFetchingData: false,
  isLoading: false,
  error: false,
  data: null, 
  totalSales: 0,
  totalRevenue: 0,
  userActivity: {
    active: 0,
    pending: 0,
    inactive: 0
  },
  dateValueArray: []
};
const calculateAggregates = (data) => {
  let totalSales = 0;
  let totalRevenue = 0;
  let userActivity = {
    active: 0,
    pending: 0,
    inactive: 0
  };
  let dateValueArray = [];

  if (data && Array.isArray(data)) {
    data.forEach(item => {
      totalSales += item.sales || 0;
      totalRevenue += item.revenue || 0;

      const activityLabel = item.user_activity?.data?.label;
      const activityCount = item.user_activity?.data?.count;

      if (activityLabel === "Active") {
        userActivity.active += activityCount || 0;
      } else if (activityLabel === "Pending") {
        userActivity.pending += activityCount || 0;
      } else if (activityLabel === "Inactive") {
        userActivity.inactive += activityCount || 0;
      }

      dateValueArray.push({ date: item.date, value: item.sales || 0 });
    });
  }
  return {
    totalSales,
    totalRevenue,
    userActivity,
    dateValueArray
  };
}

 const DashboardReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_START:
      return {
        ...state,
        isFetchingData: true,
        isFetchedError: false,
      };
    case FETCH_END:
      return {
        ...state,
        isFetchingData: false,
        isFetchedError: false,
      };

      case SET_DATA_INFO:
        const { payload } = action;
        const { totalSales, totalRevenue, userActivity, dateValueArray } = calculateAggregates(payload);
  
        return {
          ...state,
          data: payload,
          totalSales,
          totalRevenue,
          userActivity,
          dateValueArray
        };
      case FETCH_ERROR:
        return {
          ...state,
          isFetchingData: false,
          isFetchedError: true,
         
        };
  
    default :
    return state
  }
};
export default DashboardReducer