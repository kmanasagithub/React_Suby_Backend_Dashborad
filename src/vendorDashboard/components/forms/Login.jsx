import React, { useState } from 'react'
import { API_URL } from '../../data/apiPath';

function Login({showWelcomeHandler}) {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const loginHandler = async(e) =>{
    e.preventDefault();
    try{
      const response = await fetch(`${API_URL}/vendor/login`,{
        method:'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({email,password})
      })

      const data = await response.json();
      if(response.ok){
        alert("Login Success");
        setEmail("");
        setPassword("");
        localStorage.setItem('loginToken',data.token);
        showWelcomeHandler()
      }
      
      const vendorId = data.vendorId
      console.log("Checking for VendorId:",vendorId);
      const vendorResponse = await fetch(`${API_URL}/vendor/${vendorId}`)
      const vendorData = await vendorResponse.json();
      if(vendorResponse.ok){
        const vendorFirmId = vendorData.vendorFirmId;
        console.log("Checking For FirmId:",vendorFirmId);
        const vendorFirmName = vendorData.vendor.firm[0].firmName;
        localStorage.setItem('firmId',vendorFirmId);
        localStorage.setItem('firmName',vendorFirmName);
        window.location.reload();

      }
    }
    catch(error){
      console.error(error);
    }
  }
  return (
    <div className='loginSection'>
      
      <form className='authForm' onSubmit={loginHandler}>
      <h3>Vendor Login</h3>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' /><br />

        <label htmlFor="pwd">Password</label>
        <input type="password" name="password" id="pwd"value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your email' />

        <div className="btnSubmit">
            <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login
