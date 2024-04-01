import { useState } from 'react';
import './register.css';

import { Link } from 'react-router-dom'

function Register(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleRegister(e){
        e.preventDefault();

        if(email !== '' && password !== ''){
            alert("Teste")
        }else{
            alert("Preencha todos os campos!")
        }
        
    }

    return(
        <div className='home-container' >
                <h1>📝Cadastre-se</h1>
                <span>Vamos criar sua conta</span>

                <form className='form' onSubmit={handleRegister} >

                    <input 
                        type="text" 
                        placeholder='Digite seu email...'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    
                    />

                    <input 
                        autoComplete={false}
                        type="password" 
                        placeholder='******'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    
                    />

                    <button type='submit' >Cadastrar</button>
                </form>

                <Link className='button-link' to="/" >
                    já possui uma conta? Faça login!
                </Link>
        </div>
    )
}

export default Register;