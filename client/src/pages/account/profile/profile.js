import React, { useEffect, useState } from 'react'
import styles from '../profile/profile.module.scss'
import { GrFacebookOption } from 'react-icons/gr';
import { AiOutlineTwitter } from 'react-icons/ai';
import { GrInstagram } from 'react-icons/gr';
import { BsPinterest } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
function Profile() {
    const navigate = useNavigate()
    const [items, setItems] = useState([]);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setItems(user.user);
            console.log(items);
        }
    }, []);

    const gotoWish = () => {
        navigate("/wishlist")
    }
    const gotoCart = () => {
        navigate("/cart")
    }
    return (
        <div className={styles.profile}>
            <div className={styles.profiletable}>
                <div className={styles.img}>
                    <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp' />
                    <h3>{items.username}</h3>
                    <div>
                        <GrFacebookOption className={styles.icon} />
                        <AiOutlineTwitter className={styles.icon} />
                        <GrInstagram className={styles.icon} />
                    </div>
                </div>
                <div className={styles.info}>
                    <h4>Information</h4>
                    <hr />
                    <div className={styles.emailphone}>
                        <div>
                            <h5>Email</h5>
                            <p>{items.email}</p>
                        </div>
                        <div>
                            <h5>Phone</h5>
                            <p>0507081503</p>
                        </div>
                    </div>
                    <div className={styles.addressgender}>
                        <div>
                            <h5>Address</h5>
                            <p>Baku,Azerbaijan.</p>
                        </div>
                        <div>
                            <h5>Gender</h5>
                            <p>Female</p>
                        </div>
                    </div>
                    <div className={styles.account}>
                        <h4>About account</h4>
                        <hr />
                        <div>
                            <h4 onClick={gotoWish}>Wishlist</h4>
                            <h4 onClick={gotoCart}>Cart</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile