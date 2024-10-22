import React from 'react'
import { useState} from 'react';
import "./searchBar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {faFileImage} from '@fortawesome/free-solid-svg-icons';


function SearchBar({onSubmit}){

   const [term,setTerm]=useState('');
   


  const handelFormSubmit=(event)=>{
    event.preventDefault();
    onSubmit(term);
  };

  const handleChange=(event)=>{
      setTerm(event.target.value);
  }
  return (
    <>
    <center>
        <h1>Pixel Grid</h1>
      </center>
    <div className='search-bar'>
    <form onSubmit={handelFormSubmit}>
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <input  className='input' value={term} onChange={handleChange}/>
      <FontAwesomeIcon icon={faFileImage} />
    </form>
    </div>
    </>
  )
}

export default SearchBar