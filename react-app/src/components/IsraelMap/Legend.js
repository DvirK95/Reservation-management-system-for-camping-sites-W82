import React, { useState } from "react";

import './Legend.css';
import Zone from "./Zone";
import Search from "./Search";


function Legend(props){
    const { list } = props;
    const [searchTerm, setSearchTerm] = useState("");

    // const handleClickFlyTo = (value) => {
        
    // };

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const filteredList = list.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return(
        <div className="background">
            <h5 className="top-legend"> מצאו את חניון הלילה עבורכם </h5>
            <Search list={list} onSearch={handleSearch} />
            <Zone filteredList={filteredList} />
        </div>
    );
}

export default Legend;