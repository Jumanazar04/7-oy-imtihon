import { Button, Input, Modal, Table, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CategoriesPage = () => {
  const [data, setData] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', image: '' });

  const token = localStorage.getItem('auth-token');

  const headers = {
    Authorization: token,
}

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get('https://ecommerce-backend-fawn-eight.vercel.app/api/categories');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();
  }, []);

  const handleDelete = async (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this category?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await axios.delete(`https://ecommerce-backend-fawn-eight.vercel.app/api/categories/${id}`, {
            headers: {
              Authorization: token,
            },
          });
          setData(data.filter((category) => category._id !== id));
        } catch (error) {
          console.error('Error deleting category:', error);
        }
      },
    });
    
    };

  // edit category <-------------------------------------------------- ------------------------------------------->

  const [selectedCategory, setSelectedCategory] = useState();
  const [isEditModalOpen, setEditIsModalOpen] = useState(false);

  const handleEditOk = async () => {
    try {
        const response = await axios.put(`https://ecommerce-backend-fawn-eight.vercel.app/api/categories/${selectedCategory._id}`,
        {
          name: selectedCategory.name,
          image: selectedCategory.image,
        },

        {headers})
        setData(data.map((category) => (category._id === selectedCategory._id ? response.data : category)))
        setEditIsModalOpen(false)
        setSelectedCategory(null)
    } catch (error) {
        console.log('Eror editing category',error);
    }
  }

  const handleEditChange = (e) => {
    const {name, value} = e.target;
    setSelectedCategory((prev) => ({...prev, [name]: value}))
  }
  
  const openEditModal = (category) => {
    setSelectedCategory(category);
    setEditIsModalOpen(true);
  };

  // create category <-------------------------------------------------- -------------------------------------------->
  const [isCreateModalOpen, setCreateIsModalOpen] = useState(false);

  const handleCreateOk = async () => {
    try {
      const response = await axios.post('https://ecommerce-backend-fawn-eight.vercel.app/api/categories', newCategory, {
        headers
      });
      setData([...data, response.data]);
      setNewCategory({ name: '', image: '' });
      setCreateIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      width: '25%',
      render: (imgurl) => <img width={100} src={imgurl} alt={imgurl} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      render: (_, el) => 
      <Typography.Link type='primary' onClick={() => openEditModal(el)}>
        Edit
      </Typography.Link>,
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      render: (_, el) => (
        <Typography.Link type='primary' onClick={() => handleDelete(el._id)}>
          Delete
        </Typography.Link>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={() => setCreateIsModalOpen(true)} className='my-2'>
        Create Category
      </Button>
      <Table columns={columns} dataSource={data} rowKey="_id" size="middle" />
      <Modal
        title="Create Category"
        open={isCreateModalOpen}
        onOk={handleCreateOk}
        onCancel={() => setCreateIsModalOpen(false)}
      >
        <Input
          className='my-4'
          placeholder='Name'
          name='name'
          value={newCategory.name}
          onChange={handleNewCategoryChange}
        />
        <Input
          placeholder='Image'
          name='image'
          value={newCategory.image}
          onChange={handleNewCategoryChange}
        />
      </Modal>
      {/* {edit category} */}
      <Modal
        title="Edit Category"
        open={isEditModalOpen}
        onOk={handleEditOk}
        onCancel={() => setEditIsModalOpen(false)}
      >
        <Input
          className='my-4'
          placeholder='Name'
          name='name'
          value={selectedCategory?.name}
          onChange={handleEditChange}
        />
        <Input
          placeholder='Image'
          name='image'
          value={selectedCategory?.image}
          onChange={handleEditChange}
        />
      </Modal>
    </div>
  );
};

export default CategoriesPage;
