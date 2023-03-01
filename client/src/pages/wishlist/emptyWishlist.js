import React from 'react'
import { FaHeartBroken } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from '../wishlist/wishlist.module.scss'
function EmptyWishlist() {
    const navigate=useNavigate()
    const continueShop=()=>{
        navigate("/")
    }
    return (
        <div className={styles.emptyWishlist}>
            <FaHeartBroken className={styles.icon} />
            <p>Your Wishlist is Currently Empty</p>
            <button onClick={continueShop}>START SHOPPING</button>
        </div>
    )
}

export default EmptyWishlist