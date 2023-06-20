import React,{useState} from "react";
import "../styles/SearchBox.css";
import ic_search from "../assets/ic_search.png"

function SearchBox({setResults}) {
    const [input,setInput]=useState("")
    const fetchData=(value)=>{
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response)=>response.json())
        .then((json)=>{
            const results =json.filter((user)=>{
                return value &&
                user && 
                user.name 
                && user.name.toLowerCase().includes(value);
            });
            setResults(results);
        });
    }
    const handleChange =(value)=>{
        setInput(value)
        fetchData(value)
    }
    return(
        
        <div className="input-wrapper">
            {/* <div className="Search_btn">
                <i class="fa-solid fa-magnifying-glass"></i>
            </div> */}
            <div className="Search-input">
                <input type="text"className="Search-text" placeholder="Type to search..." 
                value={input}
                onChange={(e)=>handleChange(e.target.value)}></input>
            </div>
            <div className="search_icon_div">
                <img className="search_icon" src={ic_search}></img>
            </div>
        </div>
    );
}
export default SearchBox;
