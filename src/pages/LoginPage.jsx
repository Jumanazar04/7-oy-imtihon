import { Button, Card, Input, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const getAuthToken = async () => {
        if (!validateForm()) {
            return;
        }
        try {
            const response = await axios.post(
                'https://ecommerce-backend-fawn-eight.vercel.app/api/auth',
                {
                    email: email,
                    password: password
                }
            );
            if (response.data) {
                navigate('/');
                localStorage.setItem("auth-token", response.data);
            }
            console.log(response.data);
        } catch (error) {
            message.error("Email yoki Password xato");
        }
    }

    return (
        <div className='bg-gray-300 w-screen h-screen flex justify-center items-center'>
            <Card   
                className='text-center text-2xl'
                title="Login"
                bordered={false}
                style={{ width: 300 }}
            >
                <Input 
                    className='mb-4' 
                    placeholder='Email' 
                    type='email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    status={errors.email && 'error'}
                />
                {errors.email && <p className='text-xs text-start' style={{ color: 'red', marginBottom: '10px' }}>{errors.email}</p>}
                <Input.Password 
                    className='mb-2' 
                    placeholder='Password' 
                    value={password}
                    type='password' 
                    onChange={(e) => setPassword(e.target.value)}
                    status={errors.password && 'error'}
                />
                {errors.password && <p className='text-xs text-start' style={{ color: 'red', marginBottom: '10px' }}>{errors.password}</p>}
                <Button onClick={getAuthToken} className='w-full' type='primary'>Submit</Button>
                <Link className='text-xs' to={'/register'}>Create a new account</Link>
            </Card>
        </div>
    );
}

export default LoginPage;
