import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromWish, getUserWish } from '../../redux/features/wishSlice'
import styles from "../wishlist/wishlist.module.scss"
import EmptyWishlist from './emptyWishlist'
import Loading from '../loading/loading'
function Wishlist() {
    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(getUserWish(user?._id))
    }, [dispatch])
    console.log(cart);

    const { wish } = useSelector(state => state.wish)
    // console.log(userCart[0].count);  

    const handleRemove = async (id) => {
        await dispatch(deleteFromWish(id))
        dispatch(getUserWish(user?._id))
    }
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
                loading ? <Loading/> :
                    <div className={styles.wishlist}>
                        <Helmet>
                            <meta charSet="utf-8" />
                            <title>Wishlist</title>
                            <link rel="canonical" href="http://mysite.com/example" />
                        </Helmet>
                        <div className={styles.heading}>
                            <h3>WISHLIST</h3>
                        </div>
                        {wish != null && wish != 0 ?
                            <div className={styles.table}>
                                <table>
                                    <tr>
                                        <th></th>
                                        <th>PRODUCT</th>
                                        <th>UNIT PRICE</th>
                                        <th>STOCK STATUS</th>
                                        <th></th>
                                    </tr>
                                    {
                                        wish && wish.map((item) => (

                                            <tr className={styles.tr}>
                                                <td className={styles.x} onClick={() => handleRemove(item._id)}><p>x</p></td>
                                                <td className={styles.img}><img src={item.img} />
                                                    <h5>{item.name}</h5>
                                                </td>
                                                <td>${item.price}</td>
                                                <td className={styles.stock}><p>In stock</p></td>
                                            </tr>
                                        ))
                                    }
                                </table>
                            </div> : <EmptyWishlist />
                        }

                    </div>
            }

        </>
    )
}

export default Wishlist