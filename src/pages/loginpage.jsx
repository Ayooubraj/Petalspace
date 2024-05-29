import React, { useState } from "react";
import { toast } from 'react-toastify';
import { loginUserApi } from "../../api/api";

const Loginpage = () => {
    // Make a usestate for each endpoint
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Make email and password error
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Validation
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

    // Make a function to handle the form submission
    const handleLogin = (e) => {
        e.preventDefault();
        if (!validation()) {
            return;
        }

        // Make a json object
        const data = {
            "email": email,
            "password": password
        }

        // Make an API request 
        loginUserApi(data).then((res) => {
            if (res.data.success === false) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);

                // Success (in boolean format), message (text), token (text), user data

                // Setting token and user data in local storage
                localStorage.setItem('token', res.data.token);

                // Setting user data
                const convertedData = JSON.stringify(res.data.userData);
                localStorage.setItem('user', convertedData);


            }

        });
    }

    return (
        <div className="container">
            <form className='w-50'>
                <h1>Login to your account</h1>
                <label>Email Address: {email}</label>
                <input onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Enter your Email" />

                {
                    emailError && <p className="text-danger">{emailError}</p>
                }

                <label>Password: {password}</label>
                <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter Your Password" />

                {
                    passwordError && <p className="text-danger">{passwordError}</p>
                }
                <p>

                </p>
                <button onClick={handleLogin} className="btn btn-danger">Login</button>
            </form>
        </div>
    );
}

export default Loginpage;
