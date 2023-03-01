import React, { useEffect } from 'react'
import styles from '../section7/section7.module.scss'
import bir from '../../../images/section7Bir.jpg'
import iki from '../../../images/section7Iki.jpg'
import uc from '../../../images/section7Uc.jpg'
import dord from '../../../images/section7Dord.jpg'
import bes from '../../../images/section7Bes.jpg'
import alti from '../../../images/section7Alti.jpg'
import yeddi from '../../../images/section7Yeddi.jpg'
import sekkiz from '../../../images/section7Sekkiz.jpg'
import doqquz from '../../../images/section7Doqquz.jpg'
import on from '../../../images/section7On.jpg'
import onbir from '../../../images/section7Onbir.jpg'
import oniki from '../../../images/section7Oniki.jpg'
import Aos from "aos"
import 'aos/dist/aos.css'


function Section7() {
    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])
    return (
        <div className={styles.section7}>
            <div className={styles.bir}>
                <div className={styles.sub}>
                    <h2 data-aos="fade-right"
                        data-aos-offset="200"
                        data-aos-easing="ease-in-sine">Subscribe</h2>

                </div>
                <div>
                    <input placeholder='E-mail address' type='email' />
                    <button>SEND</button>
                </div>
            </div>
            <div className={styles.iki}>
                <div className={styles.pic}>
                    <img src={bir} />
                    <img src={iki} />
                    <img src={uc} />
                    <img src={dord} />
                    <img src={bes} />
                    <img src={alti} />
                    <img src={yeddi} />
                    <img src={sekkiz} />
                    <img src={doqquz} />
                    <img src={on} />
                    <img src={onbir} />
                    <img src={oniki} />
                    <div className={styles.minicard}>
                        <h3>instagram</h3>
                        <h4>DAILY INSPIRATION</h4>
                        <p>#theme</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section7