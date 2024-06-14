import { Button, Input, Modal, Table, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


const CategoriesPage = () => {
    const [data, setData] = useState();

    useEffect(() =>{
        const getCategories = async () => {
            try {
                const response = await axios.get('https://ecommerce-backend-fawn-eight.vercel.app/api/categories');
                console.log(response.data);
                setData(response.data)
            } catch (error) {
                console.log(error);
            }
        }

        getCategories()
    },[])

    async function handleDelete(id){
        try {
            const response = await axios.delete(`https://ecommerce-backend-fawn-eight.vercel.app/api/categories${id}`)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const columns = [
        {
          title: 'Image',
          dataIndex: 'image',
          width: '25%',
          render: (imgurl) => {
            return <img width={100} src={imgurl} alt={imgurl} />
          }
        },
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Edit',
          dataIndex: 'edit',
          render: (_, el) => {
            return <Typography.Link type='primary'>Edit</Typography.Link>
          }
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            render: (_, el) => {
              return <Typography.Link onClick={handleDelete()} type='primary'>Delete</Typography.Link>
            }
          },
      ];

      // create category
      const [isCreateModalOpen, setCreateIsModalOpen] = useState(false);

      const showCreateModal = () => {
        setCreateIsModalOpen(true);
      };
    
      const handleCreateOk = () => {
        setCreateIsModalOpen(false);
      };
    
      const handleCreateCancel = () => {
        setCreateIsModalOpen(false);
      };
    
    

    return (
        <div>
            <Button onClick={showCreateModal} className='my-2'>Create Category</Button>
             <Table columns={columns} dataSource={data} size="middle" />
             <Modal title="Craete Category" open={isCreateModalOpen} onOk={handleCreateOk} onCancel={handleCreateCancel}>
                <Input 
                    className='my-4'
                    placeholder='name'

                />
                <Input
                    placeholder='image'
                />
            </Modal>
        </div>
    );
}

export default CategoriesPage;
