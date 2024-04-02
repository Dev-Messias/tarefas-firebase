import { useState, useEffect } from 'react';
import './admin.css';

import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import { 
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc
 } from 'firebase/firestore';

function Admin(){
    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser] = useState({})

    //para armazenar tarefas 
    const [tarefas, setTarefas] = useState([])

    useEffect(() => {
        async function loadTarefas(){
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

            //buscando tarefas do usuario
            if(userDetail){
                const data = JSON.parse(userDetail);

                const tarefaRef = collection(db, "tarefas")
                const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))

                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = [];

                    //percorrendo a lista
                    snapshot.forEach((doc)=>{
                        lista.push({
                            id: doc.id,//id do item
                            tarefa: doc.data().tarefa,//propriedade do item
                            userUid: doc.data().userUid
                        })
                    })

                    
                    setTarefas(lista);
                } )

            }
        }

        loadTarefas();
    }, [])

    async function handleRegister(e){
        e.preventDefault();

        if(tarefaInput === ''){
            alert("Digite sua tarefa")
            return //parando o codigo
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefaInput,
            created: new Date,
            userUid: user?.uid
        })
        .then(()=>{
            console.log("Tarefa registrada")
            setTarefaInput('')
        })
        .catch((error)=>{
            console.log("Erro ao registrar "+ error)
        })
    }

    async function deleteTarefa(id){
        const docRef = doc(db, "tarefas", id);
        await deleteDoc(docRef);
    }

    async function handleLogout(){
        await signOut(auth);
    }

    return(
        <div className='admin-container' >
            <h1>Minhas tarefas</h1>

            <form className='form' onSubmit={handleRegister} >
                <textarea
                    placeholder='Digite sua tarefa...'
                    value={tarefaInput}
                    onChange={(e) => setTarefaInput(e.target.value)}
                />

                <button className='btn-register' type='submit' >Registrar tarefa</button>
            </form>

            {tarefas.map((item)=>(
                <article key={item.id} className='list' >
                    <p>{item.tarefa}</p>
                    <div>
                        <button>Editar</button>
                        <button onClick={() => deleteTarefa(item.id)} className='btn-delete' >Concluir</button>
                    </div>
                </article>
            ))}

            <button className='btn-logout' onClick={handleLogout} >Sair</button>
        </div>
    )
}

export default Admin;