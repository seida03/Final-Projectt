import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from '../users/users.module.scss'
function Users() {
    const [data, setData] = useState([])
    

    useEffect(() => {
        axios.get("http://localhost:8000/users")
            .then(res => setData(res.data))
    }, [])

    return (
        <div className={styles.users}>
            <div className={styles.table}>
                <table>
                    <thead>
                    <tr>
                        <th>USERNAME</th>
                        <th>EMAIL</th>
                        <th>ROLE</th>

                    </tr>
                    </thead>
                    {data && data.map((item) => (
                        <tbody key={item._id}>
                            <tr>
                            <td className={styles.img} >
                                <h5>{item.username}</h5>
                            </td>
                            <td>{item.email}</td>
                            <td className={styles.x} >{item.role}</td>

                        </tr>
                        </tbody>
                    ))

                    }
                </table>
            </div>
        </div>
    )
}

export default Users