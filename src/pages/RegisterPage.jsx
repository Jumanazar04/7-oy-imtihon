import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

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
      alert('Registration successful')
      navigate('/login')
    } catch (error) {
      console.error('Error registering user',);
    }
  };

  

  return (
    <div className='bg-gray-300 flex items-center w-screen h-screen justify-center'>
        <form>
            <Card className='flex flex-col ' title="Register" bordered={false} style={{ width: 400 }}>
                <div>
                    <label>Username</label>
                    <Input className='mb-2' type="text" name="name" value={formData.name} onChange={handleChange} required />
                   
                </div>
                <div>
                    <label>Email</label>
                    <Input className='mb-2' type="email" name="email" value={formData.email} onChange={handleChange} required />
                    
                </div>
                <div>
                    <label>Password</label>
                    <Input.Password className='mb-2' type="password" name="password" value={formData.password} onChange={handleChange} required />
                    
                </div>
                <Button className='w-full' onClick={handleSubmit} type="primary" >Register</Button>
            </Card>
        </form>
    </div>
  );
};

export default Register;
