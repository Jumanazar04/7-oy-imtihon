import { Button, Input, message, Modal, Table, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from '../redux-toolkit/features/product/productSlice';

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
    const product = useSelector(state => state.product.value);
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchProductData());
      }, [dispatch]);

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
            setCreateIsModalOpen(false);
            message.success('Creted Product succesfuly')
        } catch (error) {
            console.error(error);
            message.error('Error !!!')
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
              message.success('Deleted succesfuly');
            } catch (error) {
              console.error('Error deleting product:', error);
              message.error('Error !!!')
            }
          },
        });
        
    };

    // Edit Products

    const [selectedProduct, setSelectedProduct] = useState();
    const [isEditModalOpen, setEditIsModalOpen] = useState(false);

    const handleProductEditOk = async () => {
        try {
            const response = await axios.put(`https://ecommerce-backend-fawn-eight.vercel.app/api/products/${selectedProduct._id}`,
            {
                title: selectedProduct.title,
                image: selectedProduct.image,
                subtitle: selectedProduct.subtitle,
                price: selectedProduct.price,
                rate: selectedProduct.rate,
                color: selectedProduct.color,
                description: selectedProduct.description,
                size: selectedProduct.size
            },
            {
                headers
            })
            setData((prevData) =>
                prevData.map((product) =>
                  product._id === selectedProduct._id ? response.data : product
            ));
            setEditIsModalOpen(false)
            setSelectedProduct(null)
        } catch (error) {
            console.log('Eror editing product',error);
        }
    }

    const handleProductEditChange = (e) => {
        const {name, value} = e.target;
        setSelectedProduct((prev) => ({...prev, [name]: value}))
    }
      
      const openProductEditModal = (product) => {
        setSelectedProduct(product);
        setEditIsModalOpen(true);
        console.log(product);
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
          <Typography.Link type='primary' onClick={() => (openProductEditModal(el))}>
            Edit
          </Typography.Link>,
        },
        {
          title: 'Delete',
          dataIndex: 'delete',
          render: (_, el) => (
            <Typography.Link type='primary' onClick={() => (handleProductDelete(el._id))}>
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
            <Table columns={columns} dataSource={product} rowKey="_id" size="middle" />
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
            <Modal
                title="Edit Product"
                open={isEditModalOpen}
                onOk={handleProductEditOk}
                onCancel={() => setEditIsModalOpen(false)}
            >
                <Input
                    className='my-4'
                    placeholder='Title'
                    name='title'
                    value={newProducts?.title}
                    onChange={handleProductEditChange}
                />
                <Input
                    placeholder='SubTitle'
                    name='subtitle'
                    value={newProducts?.subtitle}
                    onChange={handleProductEditChange}
                />
                <Input
                    className='my-4'
                    placeholder='Size'
                    name='size'
                    value={newProducts?.size}
                    onChange={handleProductEditChange}
                />
                <Input
                    placeholder='Image'
                    name='image'
                    value={newProducts?.image}
                    onChange={handleNewProductChange}
                />
                <Input
                    className='my-4'
                    placeholder='Price'
                    name='price'
                    value={newProducts?.price}
                    onChange={handleProductEditChange}
                    type='number'
                />
                <Input
                    placeholder='Color'
                    name='color'
                    value={newProducts?.color}
                    onChange={handleProductEditChange}
                />
                <Input
                    className='my-4'
                    placeholder='Rate'
                    name='rate'
                    value={newProducts?.rate}
                    onChange={handleProductEditChange}
                />
                <Input
                    placeholder='Descirption'
                    name='description'
                    value={newProducts?.description}
                    onChange={handleProductEditChange}
                />
            </Modal>
        </div>
    );
}

export default ProductsPage;
