import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { MdStarRate } from 'react-icons/md';
import { CiHeart } from 'react-icons/ci';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import styles from '../details/details.module.scss'
import Loading from '../loading/loading';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { addToWish } from '../../redux/features/wishSlice';
function Details() {
    const dispatch = useDispatch()
    const { id } = useParams();
    const [detail, setDetail] = useState({});
    const [data, setData] = useState([])
    axios
        .get(`http://localhost:8000/cosmetics/${id}`)
        .then((res) => setDetail(res.data));

    useEffect(() => {
        axios.get("http://localhost:8000/cosmetics")
            .then((res) => setData(res.data))

    }, [])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        window.scrollTo({ top: 0 })
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])
    const { user } = useSelector(state => state.auth)

    const handleWish = (id) => {
        dispatch(addToWish(id))
    }
    return (
        <>{loading ?
            <Loading />
            :
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Details</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
                <div className={styles.head}>
                    <h2>DETAILS</h2>
                </div>
                <div className={styles.details}>
                    <div className={styles.div1}>
                        <img src={detail.img} />
                        <span>{detail.position}</span>
                    </div>
                    <div className={styles.div2} key={detail._id}>
                        <h3>{detail.name}</h3>
                        <h4><p className={styles.prevprice}>{detail.prevprice}</p>${detail.price}</h4>
                        <div className={styles.stars}>
                            <MdStarRate />
                            <MdStarRate />
                            <MdStarRate />
                            <MdStarRate />
                            <MdStarRate />
                        </div>
                        <p className={styles.description}>{detail.description}</p>

                        <div className={styles.wish}><CiHeart className={styles.heart} onClick={() => handleWish(detail._id)} /> <p>Add to Wishlist</p></div>
                    </div>


                </div>
                <div className={styles.buttons}>
                    <div>
                        <button>ADDITIONAL INFORMATION</button>
                        <button>REVIEW</button>
                    </div>
                </div>
                <div className={styles.products}>
                    <h2>RELATED PRODUCTS</h2>
                    <Swiper
                        breakpoints={{
                            // when window width is >= 640px
                            0: {
                                width: 0,
                                slidesPerView: 1,
                            },
                            // when window width is >= 768px
                            600: {
                                width: 600,
                                slidesPerView: 2,
                            },
                        }}
                        modules={[Navigation, A11y]}
                        loop={true}
                        spaceBetween={80}
                        slidesPerView={4}
                        navigation
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        className={styles.swiper}
                    >
                        {
                            data

                                .filter((elem) => elem.category == detail.category ? data : null)
                                .map((elem) =>

                                    <SwiperSlide >
                                        <div className={styles.product} key={elem._id}>
                                            <img src={elem.img} />
                                            <span>{elem.position}</span>
                                            <h3>{elem.name}</h3>
                                            <p>{elem.category}</p>
                                            <h4><p className={styles.prevprice}>{elem.prevprice}</p>${elem.price}</h4>
                                            <div>
                                                <MdStarRate />
                                                <MdStarRate />
                                                <MdStarRate />
                                                <MdStarRate />
                                                <MdStarRate />
                                            </div>
                                            <div className={styles.ortuk}>
                                                <AiOutlinePlus className={styles.icon} />
                                                <AiFillEye className={styles.icon} />
                                                <AiOutlineHeart className={styles.icon} />
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )

                        }

                    </Swiper>
                </div>
            </div>

        }
        </>

    )
}

export default Details