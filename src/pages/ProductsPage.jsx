import { Button, Input, message, Modal, Table, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from '../redux-toolkit/features/product/productSlice';

const ProductsPage = () => {
    const [data, setData] = useState([]);
    const [newProducts, setNewProducts] = useState({
        title: '',
        subtitle: '',
        image: '',
        price: '',
        rate: '',
        color: '',
        description: '',
        size: ''
    });

    const token = localStorage.getItem('auth-token');

    const headers = {
        Authorization: token,
    };

    const product = useSelector(state => state.product.value);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductData());
    }, [dispatch]);

    useEffect(() => {
        setData(product);
    }, [product]);

    // Create products
    const [isCreateModalOpen, setCreateIsModalOpen] = useState(false);

    const handleProductCreateOk = async () => {
        try {
            const response = await axios.post(
                'https://ecommerce-backend-fawn-eight.vercel.app/api/products',
                newProducts,
                { headers }
            );
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
            message.success('Created Product successfully');
            dispatch(fetchProductData())
        } catch (error) {
            console.error(error);
            message.error('Error !!!');
        }
    };

    const handleNewProductChange = (e) => {
        const { name, value } = e.target;
        setNewProducts((prev) => ({ ...prev, [name]: value }));
    };

    // Delete Products
    const handleProductDelete = async (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this product?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await axios.delete(
                        `https://ecommerce-backend-fawn-eight.vercel.app/api/products/${id}`,
                        { headers }
                    );
                    setData(data.filter((product) => product._id !== id));
                    message.success('Deleted successfully');
                    dispatch(fetchProductData())
                } catch (error) {
                    console.error('Error deleting product:', error);
                    message.error('Error !!!');
                }
            }
        });
    };

    // Edit Products
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditModalOpen, setEditIsModalOpen] = useState(false);

    const handleProductEditOk = async () => {
        try {
            const { _id, __v, ...productToUpdate } = selectedProduct;
            const response = await axios.put(
                `https://ecommerce-backend-fawn-eight.vercel.app/api/products/${_id}`,
                productToUpdate,
                { headers }
            );
            setData((prevData) =>
                prevData.map((product) =>
                    product._id === _id ? response.data : product
                )
            );
            setEditIsModalOpen(false);
            setSelectedProduct(null);
            message.success("Editing successfuly !")
            dispatch(fetchProductData())
        } catch (error) {
            console.log('Error editing product', error);
            message.error('Editing error !!!')
        }
    };


    const handleProductEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedProduct((prev) => ({ ...prev, [name]: value }));
    };

    const openProductEditModal = (product) => {
        setSelectedProduct(product);
        setEditIsModalOpen(true);
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            width: '25%',
            render: (imgurl) => <img width={100} src={imgurl} alt={imgurl} />
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: '25%'
        },
        {
            title: 'SubTitle',
            dataIndex: 'subtitle'
        },
        {
            title: 'Price',
            dataIndex: 'price'
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            render: (_, el) => (
                <Typography.Link type="primary" onClick={() => openProductEditModal(el)}>
                    Edit
                </Typography.Link>
            )
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            render: (_, el) => (
                <Typography.Link type="primary" onClick={() => handleProductDelete(el._id)}>
                    Delete
                </Typography.Link>
            )
        }
    ];

    return (
        <div>
            <Button onClick={() => setCreateIsModalOpen(true)} className="my-2">
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
                    className="my-4"
                    placeholder="Title"
                    name="title"
                    value={newProducts.title}
                    onChange={handleNewProductChange}
                />
                <Input
                    placeholder="SubTitle"
                    name="subtitle"
                    value={newProducts.subtitle}
                    onChange={handleNewProductChange}
                />
                <Input
                    className="my-4"
                    placeholder="Size"
                    name="size"
                    value={newProducts.size}
                    onChange={handleNewProductChange}
                />
                <Input
                    placeholder="Image"
                    name="image"
                    value={newProducts.image}
                    onChange={handleNewProductChange}
                />
                <Input
                    className="my-4"
                    placeholder="Price"
                    name="price"
                    value={newProducts.price}
                    onChange={handleNewProductChange}
                    type="number"
                />
                <Input
                    placeholder="Color"
                    name="color"
                    value={newProducts.color}
                    onChange={handleNewProductChange}
                />
                <Input
                    className="my-4"
                    placeholder="Rate"
                    name="rate"
                    value={newProducts.rate}
                    onChange={handleNewProductChange}
                />
                <Input
                    placeholder="Description"
                    name="description"
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
                    className="my-4"
                    placeholder="Title"
                    name="title"
                    value={selectedProduct?.title}
                    onChange={handleProductEditChange}
                />
                <Input
                    placeholder="SubTitle"
                    name="subtitle"
                    value={selectedProduct?.subtitle}
                    onChange={handleProductEditChange}
                />
                <Input
                    className="my-4"
                    placeholder="Size"
                    name="size"
                    value={selectedProduct?.size}
                    onChange={handleProductEditChange}
                />
                <Input
                    placeholder="Image"
                    name="image"
                    value={selectedProduct?.image}
                    onChange={handleProductEditChange}
                />
                <Input
                    className="my-4"
                    placeholder="Price"
                    name="price"
                    value={selectedProduct?.price}
                    onChange={handleProductEditChange}
                    type="number"
                />
                <Input
                    placeholder="Color"
                    name="color"
                    value={selectedProduct?.color}
                    onChange={handleProductEditChange}
                />
                <Input
                    className="my-4"
                    placeholder="Rate"
                    name="rate"
                    value={selectedProduct?.rate}
                    onChange={handleProductEditChange}
                />
                <Input
                    placeholder="Description"
                    name="description"
                    value={selectedProduct?.description}
                    onChange={handleProductEditChange}
                />
            </Modal>
        </div>
    );
};

export default ProductsPage;
