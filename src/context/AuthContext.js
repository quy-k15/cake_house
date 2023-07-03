import { createContext,useContext,useEffect,useState} from "react";
import{createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged}from "firebase/auth";

import { auth } from "../firebase";


const UserContext=createContext();

export const AuthContextProvider =({children})=>{
    // const [user,setUser]=useState({})
    const [user, setUser] = useState({ 
        idUser: null, 
        nameUser: "", 
        phone: "",
        isClient:null,
        idAddress:null,
        phoneNum:"",
        sex:"" });


    const [isComponentMounted, setIsComponentMounted] = useState(true);


    const createUser=(email,password)=>{
        // return createUserWithEmailAndPassword(auth, email, password);
        return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          return user; // Return the user object
        });
    };

    const signIn=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password);
    }

    const logout=()=>{
        return signOut(auth);
    }

      useEffect(()=>{

        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            console.log("currentUser",currentUser);
            // setUser(currentUser);
            setUser(currentUser );
        })
        return ()=>{
            unsubscribe();
        }
    },[])

    return(
        <UserContext.Provider value={{createUser,user, logout,signIn}}>
            {children}

        </UserContext.Provider>
    );
};
export const UserAuth=()=>{
    return useContext(UserContext);

};