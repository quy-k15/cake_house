import React,{useState, useEffect} from "react";
import "../styles/SearchBox.css";
import ic_search from "../assets/ic_search.png"
import { db } from "../firebase";
import { collection, getDocs,doc,docs, query, where, } from 'firebase/firestore/lite';

function SearchBox({setResults}) {
    const [input,setInput]=useState("")
  //   const [cakes,setcakes]=useState("");
  //    const getCakes = async () => {
  //   try {
  //     const cakesSnapshot = await getDocs(collection(db, 'cakes'));
  //     const cakesArray = cakesSnapshot.docs.map((doc) => ({
  //       idcake: doc.id,
  //       ...doc.data()
  //     }));
  //     setcakes(cakesArray);
  //   } catch (error) {
  //     console.error('Error fetching cakes:', error);
  //   }
  // };
  // useEffect(()=>{
  //   getCakes();
  // },[]);


    // const fetchData=(value)=>{
    //     fetch("https://jsonplaceholder.typicode.com/users")
    //     .then((response)=>response.json())
    //     .then((json)=>{
    //         const results =json.filter((user)=>{
    //             return value &&
    //             user && 
    //             user.name 
    //             && user.name.toLowerCase().includes(value);
    //         });
    //         setResults(results);
    //     });
    // }
    // const handleChange =(value)=>{
    //     setInput(value)
    //     fetchData(value)
    // }
    const fetchData = async (value) => {

        try {
          const q = query(
            collection(db, "cakes"),

            where('name', '>=', value),
            where('name', '<=', value + '\uf8ff')

            // where('name', '>=', value.toUpperCase()),
            // where('name', '<=', value.toLowerCase() + '\uf8ff')
           
          );
            const querySnapshot = await getDocs(q);
            console.log("querySnapshot",querySnapshot);
            const results = querySnapshot.docs.map((doc) => doc.data());
            setResults(results);
            console.log("results ", results);


          // const results = Array.isArray(db) ? db.filter((cakes) => {
          //   return value &&
          //     cakes &&
          //     cakes.name &&
          //     typeof cakes.name === 'string' &&
          //     cakes.name.toLowerCase().includes(value);
          // }) : [];
          // console.log(results);
          // console.log(cakes);
          // if (results.length === 0) {
          //   console.log('No matching results found.');
          // } else {
          //   console.log('Matching results:', results);
          // }




        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      const handleChange = (value) => {
        setInput(value);
      };
    
      useEffect(() => {
        if (input) {
          fetchData(input);
        }
      }, [input]);
    return(
        
        <div className="input-wrapper">
            {/* <div className="Search_btn">
                <i class="fa-solid fa-magnifying-glass"></i>
            </div> */}
            <div className="Search-input">
                {/* <input type="text"className="Search-text" placeholder="Type to search..." 
                value={input}
                onChange={(e)=>handleChange(e.target.value)}></input> */}
                 <input
                    type="text"
                    className="Search-text"
                    placeholder="Nhập để tìm kiếm..."
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                    />
            </div>
            <div className="search_icon_div">
                <img className="search_icon" src={ic_search}></img>
            </div>
        </div>
    );
}
export default SearchBox;
