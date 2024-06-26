import { CloudUploadOutlined,   } from '@ant-design/icons';
import { Button, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
const DragAndDrop = () => {
    const [files, setFiles] = useState([]);

    const handleDrop = (e)=> {
        e.preventDefault();
        if (e.dataTransfer.files) {
            const myArr = Array.from(e.dataTransfer.files);
            setFiles((prevFiles) => [...prevFiles, ...myArr]);
        }
    }

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]); 
    };

    const handleSubmit = async () => {
        if (files.length > 1) {
            const formData = new FormData();
            files.map((file) => (formData.append(file.name, file)));
            try {
                const response = await axios.post(' https://httpbin.org/post', formData);
                console.log(response.data);
                message.success('Sending successfuly')
                setFiles([])
            } catch (error) {
                console.log(error);
                message.error("Error to sending")
            }
        }
        message.error('Image not found')
    }




    return (
        <div>
            <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} 
                className=' p-24 hover:border-blue-500  py-24 text-center border hover:border-dashed  '>
                <CloudUploadOutlined className='my-4' /> <br />
                <h1>Drag & Drop to Upload file</h1>
                <p className='mt-3'>or</p>
                <Button className='my-4'>    
                    <label htmlFor="file">Upload files</label>
                </Button>
                <input 
                    type="file" 
                    name="file" 
                    hidden 
                    id="file" 
                    onChange={handleFileChange} 
                    multiple 
                />
            </div>
            <div className="file-preview flex mt-2">
                {files.length > 0 && files.map((file, index) => (
                    <div className='' key={index}>
                        <img width={50} src={URL.createObjectURL(file)} alt={file.name} />
                        <p className=' text-xs'>{file.name}</p>
                    </div>
                ))}
            </div>
            <form className='text-center'>
                <Button  type='primary' onClick={handleSubmit}>Send files</Button>
            </form>
        </div>
    );
};

export default DragAndDrop;
