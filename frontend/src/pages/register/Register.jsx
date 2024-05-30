import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { registerUserApi } from '../../api/api';
import './Register.css'; // Import the CSS file for styling
import logo from '../../assets/images/logo2.png'; // Import the image

const RegisterPage = () => {
    // State for form fields
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // State for error messages
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form fields
        const isValid = validateForm();
        if (!isValid) return;

        // Make API request to register user
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        registerUserApi(userData)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                }
            })
            .catch((error) => {
                console.error('Error registering user:', error);
                toast.error('An error occurred while registering. Please try again.');
            });
    };

    // Function to validate form fields
    const validateForm = () => {
        let isValid = true;

        if (!firstName.trim()) {
            setFirstNameError('First name is required');
            isValid = false;
        } else {
            setFirstNameError('');
        }

        if (!lastName.trim()) {
            setLastNameError('Last name is required');
            isValid = false;
        } else {
            setLastNameError('');
        }

        if (!email.trim()) {
            setEmailError('Email is required');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (!confirmPassword.trim()) {
            setConfirmPasswordError('Confirm password is required');
            isValid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        return isValid;
    };

    return (
        <div className="register-container">
           
            <form className="register-form">
            <h1>Register</h1>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                {firstNameError && <p className="error">{firstNameError}</p>}
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                {lastNameError && <p className="error">{lastNameError}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <p className="error">{emailError}</p>}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <p className="error">{passwordError}</p>}
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
                <button onClick={handleSubmit}>Create Account</button>
            </form>
            <p>Uff already have an account? <a href="/Login">Login</a></p>

        </div>
    );
};

export default RegisterPage;
