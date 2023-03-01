import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Loading from '../../loading/loading';
import styles from '../section4/section4.module.scss'
function AboutDetail() {
    const { id } = useParams();
    const [detail, setDetail] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/about/${id}`)
            .then(res => setDetail(res.data))
    }, [])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
      setLoading(true)
      window.scrollTo({ top: 0 })
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }, [])
    return (
      <>
      {
        loading ?
        <Loading/>
        :  <div className={styles.aboutdetail}>
        <div className={styles.heading}>
            <div className={styles.headdiv}>
                <span>biagiotti blog</span>
                <h3>BIAGIOTTI</h3>
            </div>
            <div className={styles.detail} key={detail._id}>
                <div className={styles.img}>
                    <img src={detail.img} style={{aspectRatio: "auto 1300:621", width:"1100px"}}/>
                </div>
                <div className={styles.info}>
                    <div className={styles.head}>
                        <span>Apr 08 {detail.name} By Janny Joe</span>
                        <h3>
                            {detail.heading}
                        </h3>
                    </div>
                    <div>
                        <p>{detail.description}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
      }
      
      </>
    )
}

export default AboutDetail