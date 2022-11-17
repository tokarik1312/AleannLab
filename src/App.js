import './App.css';
import React, { useState } from "react";
import JobList from './components/Job-list/Job-list';
import Details from './components/Details/Details'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  const [data, setData] = useState()

  function mySetData(data) {  
    setData(data) 
  }


  return (

    <div className="app">

      <Router>
        <div className="app-container">
          <Routes>
            <Route path="" element={<JobList mySetData={mySetData} />} />
            <Route path="details" element={<Details data={data}/>} />
          </Routes>
        </div>
      </Router>

    </div>
    
  );
}

export default App;
