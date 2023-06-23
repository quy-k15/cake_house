import React,{useState} from "react";
import "../styles/SearchResultsList.css"
import SearchResult from "./SearchResult";

function SearchResultsList({results}) {
    return(
        <div className="results-list">
          {
            results.map((result,id)=>{
                return <SearchResult result={result} key={id}/>
            })
          }
        </div>
    );
}
export default SearchResultsList;