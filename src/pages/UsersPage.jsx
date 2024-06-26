import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DragAndDrop from '../components/DragAndDrop';

const UsersPage = () => {
    const [data, setData] = useState([]);

    useEffect(()=> {
        async function getData(){
            try {
                const response = await axios.get('https://ecommerce-backend-fawn-eight.vercel.app/api/users');
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                message.error(error)
            }
        }

        getData()
    }, [])




   

   console.log(data);
    return (
        <div className='h-screen flex items-center justify-center'>
            {/* {data.map((el) => (
                // <h1 key={el.id}>
                //     {el.name}
                // </h1>
            ))} */}
            {/* <div onDrop={}>

            </div> */}
            {/* <div>
            <label htmlFor="file">Upload file</label>
            <input 
                type="file" 
                name="file" 
                hidden 
                id="file" 
                onChange={(e) => setFile(e.target.files[0])} 
            />
            <button onClick={() => document.getElementById('file').click()}>Choose File</button>
            {file && <p>{file.name}</p>}
            {file && <img src={URL.createObjectURL(file)} alt={file.name} />}
        </div> */}
            <DragAndDrop />
        </div>
    );
}

export default UsersPage;
