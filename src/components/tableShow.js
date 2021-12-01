import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTableData } from '../store/actions/tableData'
import { cloneDeep, get, isEmpty, isEqual } from 'lodash'
import pencilImg from '../common/assects/icon-pencil-blue.svg'
import deleteImg from '../common/assects/trash.svg'

const Table=()=>{
    const [body, setBody] = useState([])
    const [editRowInd, setEditRowInd] = useState(null)
    const dispatch = useDispatch()
    const tableData = useSelector((state) => get(state, 'tableDataReducer.tableData', {}))

    useEffect(() => {
        dispatch(getTableData())
    }, [])

    useEffect(() => {
          if (!isEqual(body,get(tableData, 'data', [])) ) {
            setBody(get(tableData, 'data', []));
          }
    }, [tableData])

    const handleEditTable = (e,key,ind) => {
        console.log(key)
        const {target} =e
        const cloneBody = cloneDeep(body)
        cloneBody[ind]={
            ...cloneBody[ind],
            [key]:target.value
        }
        setBody(cloneBody)
        localStorage.setItem('table data ', JSON.stringify(cloneBody));
    }
    const fields = [
        {
            key: 'first_name',
            label: 'First Name',
            type: 'text',
        },
        {
            key: 'last_name',
            label: 'Last Name',
            type: 'text'
        },
        {
            key: 'email',
            label: 'Email',
            type: 'text'
        },
        {
            key: 'avatar',
            label: 'Avatar',
            type: 'image'
        },
    ]
    const renderEditTable = (colData, row, ind) => {
        return <input type='text' name={colData.key} value={row[colData.key]} onChange={(e) => handleEditTable(e,colData.key, ind)} />
    }

    const renderViewTable = (colData, row, ind) => {
        return <span>{colData.type === 'image' ? <img src={row[colData.key]} alt='rowImg' /> : row[colData.key]}</span>
    }
    const handleTableEdit = (index, task) => {
        if (task === 'edit') {
            setEditRowInd(index)
        }
        if (task === 'delete') {
        let temp= cloneDeep(body)
        temp.splice(index,1)
        setBody(temp)
        localStorage.setItem('table data ', JSON.stringify(temp));
        }
    }

    const renderTable = () => {
        return (
            <table className="table table-striped">
                <thead>
                    <tr key='tbleHeader'>
                        {fields.map((header) =>
                            <th key={header.key} scope="col">{header.label}</th>)}
                        <th key='editCol' scope="col">Edit</th>
                        <th key='deleteCol' scope="col">Delete</th>
                    </tr>

                </thead>
                <tbody>
                    {body.map((row, ind) => (
                        <tr key={row.id}>
                            {fields.map((colData) => (<td key={`${colData.key}${row.id}`}>
                                {editRowInd === ind ? renderEditTable(colData, row, ind) : renderViewTable(colData, row, ind)}
                            </td>))}
                            <td key={`editIcon${row.id}`}><img className="editImg" src={pencilImg} alt="editIcon" onClick={()=>handleTableEdit(ind, 'edit')} /></td>
                            <td key={`deleteIcon${row.id}`}><img className="editImg" src={deleteImg} alt="deleteIcon" onClick={()=>handleTableEdit(ind, 'delete')} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>)
    }

    return (
        <div className='container'>
        <div className="table-responsive">
            {!isEmpty(body) && renderTable()}
        </div>
        </div>
    );
}

export default Table;