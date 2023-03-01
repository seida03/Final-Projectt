import React from 'react'
import { BsCartFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import styles from '../cart/cart.module.scss'
function Emptycart() {
const navigate=useNavigate()
const continueShop=()=>{
    navigate("/")
}
    return (
        <div className={styles.emptycart}>
            <BsCartFill className={styles.icon} />
            <p>Your Cart is Currently Empty</p>
            <button onClick={continueShop}>CONTINUE SHOPPING</button>
        </div>
    )
}

export default Emptycart