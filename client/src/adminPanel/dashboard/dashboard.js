import React from 'react'
import styles from '../dashboard/dashboard.module.scss'
import logo from '../../images/logoQara.png'
import { Link } from 'react-router-dom'
import { FiUsers } from 'react-icons/fi';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { GiSpellBook } from 'react-icons/gi';
import { Outlet } from 'react-router-dom'

function Dashboard() {

    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <>
          {
           user && user.user.role=="admin" ?
          <div>
              <div className={styles.dashboard}>
            <div className={styles.logo}>
                <img src={logo} />
                <h4>ADMIN PANEL</h4>
            </div>
            <div className={styles.ul}>
                <ul>
                    <li><FiUsers className={styles.icon} /><Link to="/admin/" className={styles.link}>Users</Link></li>
                    <li><MdProductionQuantityLimits className={styles.icon} /><Link to="/admin/products" className={styles.link}>Products</Link></li>
                    <li><GiSpellBook className={styles.icon} /><Link to="/admin/blogs" className={styles.link}>Blogs</Link></li>

                </ul>
            </div>
        </div>
        <Outlet />
          </div>

        : <h3>Only For Admin.</h3>
          }
        </>
    )
}

export default Dashboard