import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '../products/products.module.scss'
import { useNavigate } from "react-router-dom";

function Productss() {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/cosmetics/${id}`)
            // const deleteditem = data.filter(x => x.id !== id)
            // setData(deleteditem)
            .then(res => setData([...data].filter(x => x._id != res.data._id)))

    }

    useEffect(() => {
        axios.get("http://localhost:8000/cosmetics")
            .then(res => setData(res.data))
    }, [])

    const handleAdd = () => {
        navigate("/admin/productAdd")
    }

    const handleEdit = (id) => {
        navigate(`/admin/editproduct/${id}`)
    }
    return (
        <div className={styles.products}>
            <div className={styles.addbtn} >
                <button onClick={handleAdd}>ADD PRODUCT</button>
            </div>
            <div className={styles.table}>
                <table>
                    <thead>
                        <tr>
                            <th>PRODUCT</th>
                            <th>PRICE</th>
                            <th>EDIT</th>
                            <th>DELETE</th>

                        </tr>
                    </thead>
                    {data && data.map((item) => (
                        <tbody key={item._id}>
                            <tr>
                                <td className={styles.img} >
                                    <img src={item.img} />
                                    <h5>{item.name}</h5>
                                </td>
                                <td>${item.price}</td>
                                <td><button className={styles.edit} onClick={() => handleEdit(item._id)}>EDIT PRODUCT</button></td>
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

export default Productss