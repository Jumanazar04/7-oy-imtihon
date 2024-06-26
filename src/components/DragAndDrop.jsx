import { FileAddOutlined  } from '@ant-design/icons';
import { Button } from 'antd';
import React, { useState } from 'react';
const DragAndDrop = () => {
    const [files, setFiles] = useState([]);

    const handleDrop = (e)=> {
        e.preventDefault();
        if (e.dataTransfer.files) {
            const myArr = Array.from(e.dataTransfer.files);
            setFiles(myArr);
        }
    }

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]); 
    };


    return (
        <div>
            <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} 
                className=' p-24 hover:border-blue-500  py-24 text-center border hover:border-dashed  '>
                <FileAddOutlined className='my-4' /> <br />
                Drag and Drop
                <br />
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
            <div className="file-preview flex">
                {files.length > 0 && files.map((file, index) => (
                    <div className='' key={index}>
                        <img width={50} src={URL.createObjectURL(file)} alt={file.name} />
                        <p className=' text-xs'>{file.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DragAndDrop;
