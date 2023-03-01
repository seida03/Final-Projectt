import React, { useEffect } from 'react'
import styles from '../section5/section5.module.scss';
import section5Qiz from '../../../images/section5Qiz.jpg';
import section5Back2 from '../../../images/section5Back2.jpg'
import video from '../../../videos/video.mp4'
import { BiPlay } from 'react-icons/bi';
import Aos from "aos"
import 'aos/dist/aos.css'
function Section5() {
    useEffect(()=>{
        Aos.init({duration:2000})
      },[])
    return (
        <div className={styles.section5}>
            <div className={styles.birinci}>
                <div data-aos="zoom-in" className={styles.sekil}>
                    <img  src={section5Qiz} />
                </div>
                <div className={styles.yazi}>
                    <div>
                        <h4>timeline</h4>
                        <h3>HOW DID WE GET HERE</h3>
                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt</p>
                        <span>At vero eos et accusamus et iusto odi odgnissimos ducimus qui blanditiis praesentium volup tatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi</span>
                        <button>FIND BEAUTY</button>
                    </div>
                </div>
            </div>
            <div className={styles.ikinci}>
                <div className={styles.yazi}>
                    <div>
                        <h4>timeline</h4>
                        <h3>WHAT IT TAKES TO LEAD</h3>
                        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupt</p>
                        <span>At vero eos et accusamus et iusto odi odgnissimos ducimus qui blanditiis praesentium volup tatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi</span>
                        <button>FIND BEAUTY</button>
                    </div>
                </div>
                <div data-aos="zoom-in" className={styles.sekil}>
                    <video poster={section5Back2} controls>
                        <source src={video} type="video/mp4"/>
                     </video>
                    <div>
                        <BiPlay className={styles.playicon} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section5