import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath';


function Register({showLoginHandler}) {

  const [Username,setUserName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(true);


  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await fetch(`${API_URL}/vendor/register`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({Username,email,password})
      });

      const data = await response.json();

      if(response.ok){
        console.log(data);
        setUserName("");
        setEmail("");
        setPassword("");
        alert("Vendor registered Successfully")
        showLoginHandler()
      }
    }
    catch(error){
      console.error("Registration Failed",error);
      alert("Registered Failed")

    }
  }


  return (

    <div className="registerSection">
      <form className='authForm' onSubmit={handleSubmit}>
        <h3>Vendor Register</h3>
        <label htmlFor="name">Username</label>
        <input type="text" id="name" name="username" value={Username} onChange={(e) => setUserName(e.target.value)} placeholder='Enter your name' /><br />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' /><br />

        <label htmlFor="pwd">Password</label>
        <input type="password" name="password" id="pwd" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your email' />

        <div className="btnSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>

  )
}

export default Register
