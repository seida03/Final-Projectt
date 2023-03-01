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
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getUserCart } from '../../redux/features/cartSlice';
import { addToWish } from '../../redux/features/wishSlice';
function Productdetails() {
    const { id } = useParams();
    const dispatch = useDispatch()
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

    const addtocart = async (id) => {
        try {
            dispatch(addToCart({ id, userId: user._id }))
            dispatch(getUserCart(user?._id))
        } catch (error) {
            console.log(error);
        }
    }
    const handlewish = (id) => {
        dispatch(addToWish(id))
    }
    return (
        <>{loading ?
            <Loading />
            :
            <div>
                <div className={styles.head}>
                    <h2>DETAILS</h2>
                </div>
                <div className={styles.details}>
                    <div className={styles.div1}>
                        <img src={detail.img} />
                        <span>{detail.position}</span>
                    </div>
                    <div className={styles.div2}>
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
                        <div>
                            <button className={styles.purchase} onClick={() => addtocart(detail._id)}>ADD TO CART</button>
                        </div>
                        <div className={styles.wish} onClick={() => handlewish(detail._id)}><CiHeart className={styles.heart} /> <p>Add to Wishlist</p></div>
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
                            250: {
                                width: 200,
                                slidesPerView: 1,
                            },
                            // when window width is >= 768px
                            768: {
                                width: 768,
                                slidesPerView: 3,
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
                                        <div className={styles.product}>
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

export default Productdetails