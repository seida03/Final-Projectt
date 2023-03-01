import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteProduct, getUserCart, getUserCartt } from '../../redux/features/cartSlice'
import styles from '../cart/cart.module.scss'
import Loading from '../loading/loading'
import Emptycart from './emptyCart'
function Cart() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cart } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(getUserCartt())
    }, [dispatch])

    const { userCart } = useSelector(state => state.cart)
    console.log(userCart, cart);

    const handleDelete = async (id) => {
        dispatch(deleteProduct(id))
        console.log(user._id)
        dispatch(getUserCartt())
    }

    const cartLength = useSelector(state => state.cart.cart)
    let totalPrice = 0;
    if (cartLength != 0 && cartLength != null) {
        cartLength.forEach(item => totalPrice += item.price * item.count)
    }
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        window.scrollTo({ top: 0 })
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])
    const gotoCheckout = () => {
        navigate("/checkout")
    }


    return (
        <>
            {
                loading ? <Loading />
                    :
                    <div className={styles.cart}>
                        <Helmet>
                            <meta charSet="utf-8" />
                            <title>Cart</title>
                            <link rel="canonical" href="http://mysite.com/example" />
                        </Helmet>
                        <div className={styles.heading}>
                            <h3>CART</h3>
                        </div>
                        {
                            cartLength != null && cartLength != 0 ?
                                <>
                                    <div className={styles.table}>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>PRODUCT</th>
                                                    <th>PRICE</th>
                                                    <th>QUANTITY</th>
                                                    <th>SUBTOTAL</th>
                                                </tr>
                                            </thead>

                                            {cart && cart.map((item) => (
                                                <tbody key={item._id}>
                                                    <tr>
                                                        <td className={styles.x} onClick={() => handleDelete(item?._id)}>x</td>
                                                        <td className={styles.img}>
                                                            <img src={item.img} />
                                                            <h5>{item.name}</h5>
                                                        </td>
                                                        <td>${item.price}</td>
                                                        <td><button>{item.count}</button></td>
                                                        <td>${item.price}</td>
                                                    </tr>
                                                </tbody>
                                            ))
                                                // {userCart.filter(x=>x.productId===item._id)[0]?.count}
                                            }
                                        </table>
                                    </div>
                                    <div className={styles.coupon}>
                                        <div>
                                            <input placeholder='Coupon code' />
                                            <button>APPLY COUPON</button>
                                        </div>
                                        <button>UPDATE CART</button>
                                    </div>
                                    <div className={styles.checkout}>
                                        <h3>CART TOTALS</h3>
                                        <div>
                                            <h4>SUBTOTAL</h4>
                                            <p className={styles.p1}>${totalPrice}</p>
                                        </div>
                                        <hr />
                                        <div>
                                            <h4>TOTAL</h4>
                                            <p className={styles.p2}>${totalPrice}</p>
                                        </div>
                                        <hr />
                                        <div className={styles.check}>
                                            <button onClick={gotoCheckout}>PROCEED TO CHECKOUT</button>
                                        </div>
                                    </div>
                                </>
                                : <Emptycart />
                        }
                    </div>
            }


        </>
    )
}

export default Cart