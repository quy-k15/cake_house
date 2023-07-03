import React,{useState,useEffect} from "react";
import "../styles/SearchResult.css"
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs,doc,docs, query, where, } from 'firebase/firestore/lite';

function SearchResult({result}) {
    const [cakes, setCakes] = useState([]);

    const fetchCakesWithQuery = async () => {
      const q = query(collection(db, "cakes"), where("name", "==", result.name));
      const querySnapshot = await getDocs(q);
      const cakesArray = querySnapshot.docs.map((doc) => ({
        idcake: doc.id,
        ...doc.data()
      }));
      setCakes(cakesArray);
      console.log("cakes",cakes);
      console.log("result_search_Result",result);
    };
  
    useEffect(() => {
      fetchCakesWithQuery();
    }, [result]);

    return( 
        // <Link to={`/detail/${cakes.idcake}`} style={{ textDecoration: "none" }}>
        //      <div className="search-result" > {result.name}</div>
        // </Link>
        <>
        {cakes.length > 0 ? (
          cakes.map((cake) => (
            <Link
              to={`/detail/${cake.idcake}`}
              style={{ textDecoration: "none" }}
              key={cake.idcake}
            >
              <div className="search-result">{cake.name}</div>
            </Link>
          ))
        ) : (
          <div>No results found.</div>
        )}
      </>
    );

}
export default SearchResult;