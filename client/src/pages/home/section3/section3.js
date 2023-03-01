import React, { useEffect } from 'react'
import styles from '../section3/section3.module.scss'
import section3Bir from '../../../images/section3Bir.jpg'
import section3Iki from '../../../images/section3Iki.jpg'
import section3Uc from '../../../images/section3Uc.jpg'
import section3Dord from '../../../images/section3Dord.jpg'
import section3Bes from '../../../images/section3Bes.jpg'
import section3Alti from '../../../images/section3Alti.jpg'
import section3Yeddi from '../../../images/section3Yeddi.jpg'
import agQiz from '../../../images/agQiz.jpg'
import Aos from "aos"
import 'aos/dist/aos.css'
function Section3() {

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])

    return (
        <div className={styles.section3}>
            <div className={styles.cards}>
                <div data-aos="fade-up" className={styles.card}>
                    <img src={section3Bir} />
                    <div className={styles.ust}>
                        <h3>LIP LINER</h3>
                        <p>Beauty, Bodycare</p>
                    </div>
                </div>
                <div data-aos="fade-up" className={styles.card}>
                    <img src={section3Iki} />
                    <div className={styles.ust}>
                        <h3>LIP LINER</h3>
                        <p>Beauty, Bodycare</p>
                    </div>
                </div>
                <div data-aos="fade-up" className={styles.card}>
                    <img src={section3Uc} />
                    <div className={styles.ust}>
                        <h3>LIP LINER</h3>
                        <p>Beauty, Bodycare</p>
                    </div>
                </div>
                <div data-aos="fade-up" className={styles.card}>
                    <img src={section3Dord} />
                    <div className={styles.ust}>
                        <h3>LIP LINER</h3>
                        <p>Beauty, Bodycare</p>
                    </div>
                </div>

            </div>
            <div className={styles.cards}>
                <div data-aos="fade-up" className={styles.card}>
                    <img src={section3Bes} />
                    <div className={styles.ust}>
                        <h3>LIP LINER</h3>
                        <p>Beauty, Bodycare</p>
                    </div>
                </div>
                <div data-aos="fade-up" className={styles.card}>
                    <img src={section3Alti} />
                    <div className={styles.ust}>
                        <h3>LIP LINER</h3>
                        <p>Beauty, Bodycare</p>
                    </div>
                </div>
                <div data-aos="fade-up" className={styles.card}>
                    <img src={section3Yeddi} />
                    <div className={styles.ust}>
                        <h3>LIP LINER</h3>
                        <p>Beauty, Bodycare</p>
                    </div>
                </div>
                <div data-aos="fade-up" className={styles.card}>
                    <img src={agQiz} />
                    <div className={styles.ust}>
                        <h3>LIP LINER</h3>
                        <p>Beauty, Bodycare</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Section3