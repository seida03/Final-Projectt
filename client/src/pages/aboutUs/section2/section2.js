import React, { useEffect } from 'react'
import styles from '../section2/section2.module.scss'
import Aos from "aos"
import 'aos/dist/aos.css'
function Section2() {
    useEffect(()=>{
        Aos.init({duration:1500})
      },[])
    return (
        <div data-aos="fade-up" className={styles.section2}>
            <h4>perfect shades</h4>
            <h3>ABOUT THIS COSMETIC BRAND</h3>
            <p>At vero eos et accusamus et iusto odi odgnissimos ducimus qui blanditiis praesentium volup tatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi. At vero eos et accusamus et iusto odi. No brute nominati elaboraret ius, eu sint omnesque deserunt mei. Audiam vidisse debitis ea pro, nec in natum indoctum. Et cum alia comprehensam. Sumo ornatus ad per, pri ei epicuri consulatu, quod justo pro an. Et sed nihil pericula. In wisi rationibus pri.</p>
        </div>
    )
}

export default Section2