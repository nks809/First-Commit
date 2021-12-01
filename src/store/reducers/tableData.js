export const tableDataReducer = (state = {}, action) => {
    switch (action.type) {
      case "GET_TABLE_DATA":
        return state;
      case "GET_TABLE_DATA_SUCCESS": 
        return {...state, tableData: action.data};
      default:
        return state;
    }
} 