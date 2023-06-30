import { createContext,useContext,useEffect,useState} from "react";
import{createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged}from "firebase/auth";

import { auth } from "../firebase";


const UserContext=createContext();

export const AuthContextProvider =({children})=>{
    // const [user,setUser]=useState({})
    const [user, setUser] = useState({ idUser: null, nameUser: "", phone: "",isClient:null,idAddress:null,phoneNum:"",sex:"" });
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
            console.log(currentUser);
            // setUser(currentUser);
            setUser(
                currentUser
                  ? {
                      idUser: currentUser.uid,
                      email: currentUser.email,
                      nameUser: currentUser.nameUser, // Replace with the actual field from currentUser
                      phone: currentUser.phone, // Replace with the actual field from currentUser
                      isClient:currentUser.isClient,
                      idAddress:currentUser.idAddress,
                      phoneNum:currentUser.phoneNum,
                      sex:currentUser.sex
                    }
                  : { idUser: null, name: "", phone: "",isClient:null, idAddress:null,phoneNum:"",sex:"" }
              );
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