import React,{useState} from "react";
import companiesData from '../../sampleCompanies.json';
import Select from "react-select";
import {Link} from 'react-router-dom';
import './index.css';

function AddCompany() {
    const [searchData, setSearchData] = useState([]);
    const searchCompany =  (event) => {
        setSearchData({"cin": event.value, "name": event.label})
    }

    const addCompanyToTable = async() =>{
        try{
            const requestOptions = {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(searchData)
            };
            await fetch('http://localhost:5000/add-company', requestOptions);
            console.log("Added Company to the companies list");
        }catch(err){
            console.log(err);
            return err;
        }
        
    }
    
    return(
        <div className="add-container">
            <hr />
            <Select
                options={companiesData}
                onChange={searchCompany}
                isSearchable={true}
                className="select-properties"
            />
            <Link to="/"><button className='add-btn' type="button" onClick={addCompanyToTable}>Submit</button></Link>
        </div>
    )
}

export default AddCompany;