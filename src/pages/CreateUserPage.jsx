import { Button, Card, Input, Select, message } from 'antd';
import { Option } from 'antd/es/mentions';
import axios from 'axios';
import React, { useState } from 'react';

const CreateUserPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user'
    });
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.formData.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (!formData.name) {
            newErrors.name = 'Name is required';
        } 
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const token = localStorage.getItem('auth-token');

    const headers = {
        Authorization: token, 
    }
    console.log(errors);

    const getData = async () =>{
        if (!validateForm) {
            return;
        }
        try {
            const response = await axios.post(
                'https://ecommerce-backend-fawn-eight.vercel.app/api/users',
                formData,
                { headers } 
            );
            console.log(response.data);
            message.success('User created successfully');
            setFormData({ name: '', email: '', password: '' }); 
        } catch (error) {
            message.error('Error creating user');
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRoleChange = (value) => {
        setFormData({
            ...formData,
            role: value
        });
    };

    return (
        <div className='flex justify-center items-center h-screen' >
            <form>
                <Card
                    className='text-center text-2xl'
                    title="Create user"
                    bordered={false}
                    style={{ width: 500 }}
                >
                    <Input
                        name='name' 
                        type='text'
                        placeholder='Username'
                        onChange={handleChange}
                        value={formData.name}
                        required
                    />
                    <Input
                        name='email'
                        type='email'
                        placeholder='Email'
                        onChange={handleChange}
                        value={formData.email}
                        required
                        style={{ marginTop: '1rem' }}
                    />
                    <Input.Password
                        name='password'
                        placeholder='Password'
                        onChange={handleChange}
                        value={formData.password}
                        required
                        style={{ marginTop: '1rem' }}
                    />
                     <Select
                        defaultValue="user"
                        onChange={handleRoleChange}
                        value={formData.role}
                        style={{ width: '100%', marginTop: '1rem' }}
                    >
                        <Option value="admin">Admin</Option>
                        <Option value="user">User</Option>
                    </Select>
                    <Button onClick={getData} type='primary' style={{ marginTop: '1rem' }}>Add</Button>
                </Card>
            </form>
        </div>
    );
}

export default CreateUserPage;
