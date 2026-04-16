import React, { useState } from 'react'
import { auth } from './Fbconfig';
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ confPassword,setConfPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if( password === confPassword){
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                console.log("logged in")
                navigate("/login")
            } catch (error) {
                console.log(error)
            }
        }else{
            console.log("password not same")
        }

    }

    return (
        <div className='container mt-5'>
            <form onSubmit={handleSubmit} >
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="form-control" id="exampleInputPassword1" />
                </div>

                  <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label"> Confirm Password</label>
                    <input type="password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} class="form-control" id="exampleInputPassword1" />
                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>


        </div>
    )
}

export default Register