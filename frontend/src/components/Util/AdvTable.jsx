import { Input, Table } from 'antd'
import { useState } from 'react'

function AdvTable({ columns, dataSource,style }) {
    const [state, setState] = useState({
        filteredDataSource: null,
        searchText: "",
    });
    const onChange = (e) => {
        setState({
            ...state,
            searchText: e.target.value,
            filteredDataSource: dataSource.filter((o) =>
                Object.keys(o).some((k) =>
                    String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
                )
            ),
        });
    };
    return (
        <>
            <Input.Search
                placeholder="Search"
                onChange={onChange} />
            <Table columns={columns} style={style} dataSource={!state.filteredDataSource ? dataSource : state.filteredDataSource} pagination={false} />
        </>
    )
}

export default AdvTable
