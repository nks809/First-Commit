import axios from "axios";

export const actionType = {
    GET_TABLE_DATA_SUCCESS:'GET_TABLE_DATA_SUCCESS',
    GET_TABLE_DATA_FAILURE:'GET_TABLE_DATA_FAILURE',
};

export function getTableData() {
    let url = `https://reqres.in/api/users?pge=1`;
    return function (dispatch) { 
      axios.get(url)
        .then((response) => dispatch({
          type: actionType.GET_TABLE_DATA_SUCCESS,
          data: response.data
        })).catch((response) => dispatch({
          type: actionType.GET_TABLE_DATA_FAILURE,
          error: response.error
        }))
    }
  }
