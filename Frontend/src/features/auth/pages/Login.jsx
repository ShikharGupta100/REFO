import React from 'react'
import { useNavigate,Link } from 'react-router'
import "../auth.form.scss"

const Login = () => {
  const navigate = useNavigate()
  return (
    <main>
      <div className='form-container'>
        <h1>Login</h1>
        <form>
          <div className='input-group'>
            <label htmlFor='email'>Email :</label>
            <input type='email' id='email' name='email' placeholder='Enter your email' required />
          </div>
          <div className='input-group'>
            <label htmlFor="password">Password :</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required />
          </div>
          <button className='button primary-button' type='submit'>Login</button>

        </form>
        <p>Create an Account <Link to = "/register">Register here</Link></p>
      </div>
    </main>
  )
}

export default Login
