import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const notify = toast("Registration successfuly")

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ecommerce-backend-fawn-eight.vercel.app/api/register', formData);
      console.log('Registration successful:', response.data);
      message.success('Registration successfuly')
      navigate('/login')
      (<ToastContainer />)
    } catch (error) {
      message.error('Error registering user !!!')
    }
  };

  

  return (
    <div className='bg-gray-300 flex items-center w-screen h-screen justify-center'>
        <form onSubmit={notify}>
            <Card className='flex flex-col text-center ' title="Register" bordered={false} style={{ width: 400 }}>
                <div>
                    <Input className='mb-2' placeholder='Username' type="text" name="name" value={formData.name} onChange={handleChange} required />
                    
                </div>
                <div>
                    <Input className='mb-2' placeholder='Email' type="email" name="email" value={formData.email} onChange={handleChange} required />
                    
                </div>
                <div>
                    <Input.Password className='mb-2' placeholder='Password' type="password" name="password" value={formData.password} onChange={handleChange} required />
                    
                </div>
                <Button className='w-full mb-3' onClick={handleSubmit} type="primary" >Register</Button>
                <Link className='' to={'/login'}>I have an account</Link>
            </Card>
        </form>
    </div>
  );
};

export default Register;
