import React from "react";

import './Body.css';
import 'bootstrap/dist/css/bootstrap.css';
import TestApi from './components/Tests/TestApi'

function Body(){
    return(
        <div className="test">{TestApi()} </div>
    );
}

export default Body;