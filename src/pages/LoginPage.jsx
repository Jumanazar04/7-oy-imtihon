import { Button, Card, Flex, Input } from 'antd';
import axios from 'axios';
import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate()


    const getAuthToken = async () => {
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
                localStorage.setItem("auth-token", response.data)
            }
            console.log(response.data);
        } catch (error) {
            alert("Email yoki Password xato")
        }
    }

        
    return (
        <div className='bg-gray-300 w-screen h-screen flex justify-center items-center'>
            <Flex gap='middle'>
                <Card   
                    className='text-center text-2xl '
                    title="Login"
                    bordered={false}
                    style={{
                    width: 300,
                    }}
                >
                   <Input 
                        className='mb-4' 
                        placeholder='Username' 
                        type='email' 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                   <Input.Password 
                        className='mb-2' 
                        placeholder='Password' 
                        value={password}
                        type='password' 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                   <Button onClick={getAuthToken} className='w-full' type='primary'>Submit</Button>
                   <Link className=' text-xs' to={'/register'}>Create a new account</Link>
                </Card>
            </Flex>
        </div>
    );
}

export default LoginPage;
