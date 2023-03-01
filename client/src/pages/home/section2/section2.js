import React, { useEffect, useState } from 'react'
import styles from '../section2/section2.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { MdStarRate } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import '../../../../src/index.scss';
import axios from 'axios';
import Aos from "aos"
import 'aos/dist/aos.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, getUserCart } from '../../../redux/features/cartSlice';
import { addToWish } from '../../../redux/features/wishSlice';
function Section2() {
    const dispatch = useDispatch()
    const nav = useNavigate();
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8000/cosmetics")
            .then(res => setData(res.data))
    }, [])


    useEffect(() => {
        Aos.init({ duration: 500 })
    }, [])

    const handleDetail = (id) => {
        nav(`/details/${id}`);
    };

    const { user } = useSelector(state => state.auth)

    const handleCart = async (id) => {
        try {
            // await dispatch(addToCart(id))
            // dispatch(getUserCart(user._id))
            dispatch(addToCart( {id , userId: user._id}))
            dispatch(getUserCart(user?._id))
        } catch (error) {
            console.log(error);
        }
    }
    const handleWish = (id) => {
        dispatch(addToWish(id))
    }

    return (
        <div className={styles.section2}>
            <div data-aos="fade-up" className='head'>
                <span>perfect shades</span>
                <h3>
                    FIND YOUR BEAUTY MATCH
                </h3>
                <p>At vero eos et accusamus et iusto</p>
            </div>
            <div className={styles.products}>

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
                        data.map((elem) =>

                            <SwiperSlide key={elem._id}>
                                <div className={styles.product} >
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
                                        <AiOutlinePlus className={styles.icon} onClick={() => handleCart(elem._id)} />
                                        <AiFillEye className={styles.icon} onClick={() => handleDetail(elem._id)} />
                                        <AiOutlineHeart className={styles.icon} onClick={() => handleWish(elem._id)} />
                                    </div>
                                </div>
                            </SwiperSlide>
                        )

                    }

                </Swiper>


            </div>
        </div>
    )
}

export default Section2