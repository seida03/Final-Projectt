import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../blogs/blogs.module.scss'
function Blogs() {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/about/${id}`)
            .then(res => setData([...data].filter(x => x._id != res.data._id)))
 
    }

    useEffect(() => {
        axios.get("http://localhost:8000/about")
            .then(res => setData(res.data))
    }, [])
    const handleAdd = () => {
        navigate("/admin/blogsadd")
    }
    const handleEdit=(id)=>{
        navigate(`/admin/editblog/${id}`)
    }
    return (
        <div className={styles.blogs}>
            <div className={styles.addbtn}>
                <button onClick={handleAdd}>ADD BLOG</button>
            </div>
            <div className={styles.table}>
                <table>
                   <thead>
                   <tr>
                        <th>PRODUCT</th>
                        <th>DESCRIPTION</th>
                        <th>EDIT</th>
                        <th>DELETE</th>

                    </tr>
                   </thead>

                    {data && data.map((item) => (
                       <tbody key={item._id}>
                         <tr>
                            <td className={styles.img} >
                                <img src={item.img} />
                                <h5>{item.heading}</h5>
                            </td>
                            <td>${item.minidescription}</td>
                            <td><button className={styles.editbtn} onClick={() => handleEdit(item._id)}>EDIT</button></td>
                            <td className={styles.x} onClick={() => handleDelete(item._id)}>x</td>

                        </tr>
                       </tbody>
                    ))

                    }
                </table>
            </div>
        </div>
    )
}

export default Blogs