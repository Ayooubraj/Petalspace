import React, { useState } from "react";
import { toast } from 'react-toastify';
import { loginUserApi } from "../../api/api";
import './LoginPage.css'; // Import CSS file
import logo from '../../assets/images/logo2.png'; // Import the image



const Loginpage = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validation = () => {
        let isValid = true;

        if (email.trim() === '' || !email.includes('@')) {
            setEmailError("Email is required");
            isValid = false;
        }

        if (password.trim() === '') {
            setPasswordError("Password is empty");
            isValid = false;
        }

        return isValid;
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (!validation()) {
            return;
        }

        const data = {
            "email": email,
            "password": password
        }

        loginUserApi(data).then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
                localStorage.setItem('token', res.data.token);
                const convertedData = JSON.stringify(res.data.userData);
                localStorage.setItem('user', convertedData);
            }
        });
    }

    return (
        <div className="login-container">
                        


            <form className='login-form'>
            <img src={logo} alt="Logo" className="login-logo" /> 
                <h1>Login</h1>
                <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Enter your Email" />
                {emailError && <p className="text-danger">{emailError}</p>}
                <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter Your Password" />
                {passwordError && <p className="text-danger">{passwordError}</p>}
                <button onClick={handleLogin} className="btn btn-success">Login</button>
            </form>
        </div>
    );
}


export default Loginpage;
