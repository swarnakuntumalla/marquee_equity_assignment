import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {Link} from 'react-router-dom';
import './index.css';

function Home() {
    const [companies, setCompanies] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const fetchData = () => {
        fetch("http://localhost:5000/companies")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setCompanies(data)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const columns = [
        { dataField: "cin", text: "CIN", sort: true },
        { dataField: "name", text: "Name", sort: true },
    ];

    const onChangeSearch = event =>{
        setSearchInput(event.target.value);
    }

    const searchResults = companies.filter(eachCompany =>
        eachCompany.name
          .toLowerCase()
          .startsWith(searchInput.toLowerCase()),
    );

    return (
        <div>
            <hr />
            <div className='home-container'>
                <Link to="/add-company" ><button className='add-btn' type="button" >COMPANY +</button></Link>
                <div className='para-container'>
                    <p>Show entries</p>
                    <p>Search:</p>
                </div>
                <div className='home-input-container'>
                    <input onChange={onChangeSearch} className='home-input' type="text" />
                </div>
                <div className='home-table'>
                    <BootstrapTable
                        data={searchResults}
                        keyField='cin'
                        columns={columns}
                        pagination={paginationFactory({
                            showTotal: true,
                            alwaysShowAllBtns: true})}
                    />
                </div>
            </div>
        </div>
    )

}

export default Home;