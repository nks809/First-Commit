import { combineReducers } from 'redux';
import {tableDataReducer} from './tableData'

const allReducers = combineReducers({
    tableDataReducer,
})

export default allReducers