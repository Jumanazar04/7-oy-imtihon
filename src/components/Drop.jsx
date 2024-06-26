import React, { useState } from 'react';
const FileUpload = () => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]); 
    };

    // const handleDrop = (e)=> {
    //     e.preventDefault();
    //     const myArr = Array.from(e.dataTransfer.files);
    //     console.log(myArr);
    //     if (e.dataTransfer.file) {
    //         setFiles(myArr);
    //     }
    // }

    return (
        <div>
                <label htmlFor="file">Upload files</label>
                <input 
                    type="file" 
                    name="file" 
                    hidden 
                    id="file" 
                    onChange={handleFileChange} 
                    multiple 
                />
            <div className="file-preview">
                {files.length > 0 && files.map((file, index) => (
                    <div className='' key={index}>
                        <p>{file.name}</p>
                        <img width={100} src={URL.createObjectURL(file)} alt={file.name} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileUpload;
