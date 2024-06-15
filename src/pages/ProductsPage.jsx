import { Button, Input, Modal, Table, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// const productData = {
//     title: '',
//     subtitle: '',
//     image: '',
//     price: '',
//     rate: '',
//     color: '',
//     description: '',
//     size: ''
// }

const ProductsPage = () => {
    const [data, setData] = useState();
    const [newProducts, setNewProducts] = useState(
        {
            title: '',
            subtitle: '',
            image: '',
            price: '',
            rate: '',
            color: '',
            description: '',
            size: ''
        }
    );

    const token = localStorage.getItem('auth-token');

    const headers = {
        Authorization: token,
    }


    useEffect(() => {
        const getCategories = async () => {
          try {
            const response = await axios.get('https://ecommerce-backend-fawn-eight.vercel.app/api/products');
            setData(response.data);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        };
    
        getCategories();
      }, []);

    // Craete products

    const [isCreateModalOpen, setCreateIsModalOpen] = useState(false);

    const handleProductCreateOk = async () => {
        try {
            const response = await axios.post('https://ecommerce-backend-fawn-eight.vercel.app/api/products', newProducts, {
                headers
            });
            setData([...data, response.data]);
            setNewProducts({ 
                title: '',
                subtitle: '',
                image: '',
                price: '',
                rate: '',
                color: '',
                description: '',
                size: ''
             });
            if (response.data) {
                alert("Create product seccesfuly")
            }
            setCreateIsModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleNewProductChange = (e) => {
        const { name, value } = e.target;
        setNewProducts((prev) => ({ ...prev, [name]: value }));
    };

    // Delete Products

    const handleProductDelete = async (id) => {
        Modal.confirm({
          title: 'Are you sure you want to delete this category?',
          content: 'This action cannot be undone.',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: async () => {
            try {
              await axios.delete(`https://ecommerce-backend-fawn-eight.vercel.app/api/products/${id}`, {
                headers: {
                  Authorization: token,
                },
              });
              setData(data.filter((product) => product._id !== id));
            } catch (error) {
              console.error('Error deleting product:', error);
            }
          },
        });
        
        };


    const columns = [
        {
          title: 'Image',
          dataIndex: 'image',
          width: '25%',
          render: (imgurl) => <img width={100} src={imgurl} alt={imgurl} />,
        },
        {
          title: 'Title',
          dataIndex: 'title',
          witdh: '25%'
        },
        {
            title: 'SubTitle',
            dataIndex: 'subtitle',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
          title: 'Edit',
          dataIndex: 'edit',
          render: (_, el) => 
          <Typography.Link type='primary'>
            Edit
          </Typography.Link>,
        },
        {
          title: 'Delete',
          dataIndex: 'delete',
          render: (_, el) => (
            <Typography.Link type='primary' onClick={() => (handleProductDelete(el._id))} >
              Delete
            </Typography.Link>
          ),
        },
      ];
    return (
        <div>
            <Button onClick={() => setCreateIsModalOpen(true)} className='my-2'>
                Create Product
            </Button>
            <Table columns={columns} dataSource={data} rowKey="_id" size="middle" />
            <Modal
                title="Create Product"
                open={isCreateModalOpen}
                onOk={handleProductCreateOk}
                onCancel={() => setCreateIsModalOpen(false)}
            >
                <Input
                    className='my-4'
                    placeholder='Title'
                    name='title'
                    value={newProducts.title}
                    onChange={handleNewProductChange}
                />
                <Input
                    placeholder='SubTitle'
                    name='subtitle'
                    value={newProducts.subtitle}
                    onChange={handleNewProductChange}
                />
                <Input
                    className='my-4'
                    placeholder='Size'
                    name='size'
                    value={newProducts.size}
                    onChange={handleNewProductChange}
                />
                <Input
                    placeholder='Image'
                    name='image'
                    value={newProducts.image}
                    onChange={handleNewProductChange}
                />
                <Input
                    className='my-4'
                    placeholder='Price'
                    name='price'
                    value={newProducts.price}
                    onChange={handleNewProductChange}
                    type='number'
                />
                <Input
                    placeholder='Color'
                    name='color'
                    value={newProducts.color}
                    onChange={handleNewProductChange}
                />
                <Input
                    className='my-4'
                    placeholder='Rate'
                    name='rate'
                    value={newProducts.rate}
                    onChange={handleNewProductChange}
                />
                <Input
                    placeholder='Descirption'
                    name='description'
                    value={newProducts.description}
                    onChange={handleNewProductChange}
                />
            </Modal>
        </div>
    );
}

export default ProductsPage;
