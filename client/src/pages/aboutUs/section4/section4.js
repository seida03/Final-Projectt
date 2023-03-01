import React, { useEffect, useState } from 'react'
import styles from '../section4/section4.module.scss'
import '../../../../src/index.scss'
import img1 from '../../../images/m-h-blog-img-1.jpg'
import Aos from "aos"
import 'aos/dist/aos.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Section4() {
    const navigate = useNavigate()
    useEffect(() => {
        Aos.init({ duration: 1500 })
    }, [])
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/about')
            .then(res => setData(res.data))
    })

    const handleDetail = (id) => {
        navigate(`/aboutdetail/${id}`)
    }
    return (
        <div className={styles.section4}>
            <div data-aos="fade-up" className='head'>
                <span>perfect shades</span>
                <h3>
                    FIND YOUR BEAUTY MATCH
                </h3>
                <p>At vero eos et accusamus et iusto</p>
            </div>
            <div className={styles.cards}>
                {data && data.map((elem) => (

                    <div className={styles.card} key={elem._id}>
                        <img src={elem.img} />
                        <span>Apr 08</span>
                        <h4>{elem.name}-By Janny Joe</h4>
                        <h3>{elem.heading}</h3>
                        <p>{elem.minidescription} </p>
                        <div>
                            <hr />
                            <button onClick={() => handleDetail(elem._id)}>READ MORE</button>
                        </div>
                    </div>
                ))
                }
            </div>

        </div>
    )
}

export default Section4