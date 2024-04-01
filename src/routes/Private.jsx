import {useState, useEffect} from 'react';

import {auth} from '../firebaseConnection';
import { onAuthStateChanged } from 'firebase/auth';

import { Navigate } from 'react-router-dom';

export default function Private({ children }){
    const[loading, setLoanding] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        async function checkLogin(){
            const unsub = onAuthStateChanged(auth, (user) => {
                //se tem user logado
                if(user){
                    const userData  = {
                        uid: user.uid,
                        email: user.email
                    }

                    //salvando no local storage
                    localStorage.setItem("@detailUser", JSON.stringify(userData))

                    setLoanding(false);
                    setSigned(true);
                }else{
                    //não possui user logado
                    setLoanding(false);
                    setSigned(false);
                }
            })
        }

        checkLogin();

    },[])
    

    if(loading){
        return(
            <div></div>
        )
    }

    //usuario não esta logado
    if(!signed){
        return <Navigate to="/" />
        
    }

   
    return children;
}