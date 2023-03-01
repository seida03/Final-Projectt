import React, { useEffect } from 'react'
import '../section6/section6.scss'
import img1 from '../../../images/m-h-icon-back-1.png'
import img11 from '../../../images/m-h-icon-front-1.png'
import img2 from '../../../images/m-h-icon-back-2.png'
import img22 from '../../../images/m-h-icon-front-2.png'
import img3 from '../../../images/m-h-icon-back-3.png'
import img33 from '../../../images/m-h-icon-front-3.png'
import img4 from '../../../images/m-h-icon-back-4.png'
import img44 from '../../../images/m-h-icon-front-4.png'
import img5 from '../../../images/m-h-icon-back-5.png'
import img55 from '../../../images/m-h-icon-front-5.png'
import Aos from "aos"
import 'aos/dist/aos.css'
function Section6() {
    useEffect(()=>{
        Aos.init({duration:2000})
      },[])
    return (
        <div className='section6'>
            <div className='icons'>
                <div className='icon'>
                    <div>
                        <img className='back' src={img1}/>
                        <img data-aos="zoom-in" className='front' src={img11}/>
                    </div>
                    <h3>FRAGRANCE</h3>
                    <p>At vero eos et accusamus et iusto odio dignissi mos ducimus qui blanditiis praesentium</p>
                </div>
                <div className='icon'>
                    <div>
                        <img className='back' src={img5}/>
                        <img data-aos="zoom-in" className='front' src={img55}/>
                    </div>
                    <h3>QUALITY</h3>
                    <p>At vero eos et accusamus et iusto odio dignissi mos ducimus qui blanditiis praesentium</p>
                </div>
                <div className='icon'>
                    <div>
                        <img className='back' src={img2}/>
                        <img data-aos="zoom-in" className='front' src={img22}/>
                    </div>
                    <h3>PETROLEUM</h3>
                    <p>At vero eos et accusamus et iusto odio dignissi mos ducimus qui blanditiis praesentium</p>
                </div>
                <div className='icon'>
                    <div>
                        <img className='back' src={img3}/>
                        <img data-aos="zoom-in" className='front' src={img33}/>
                    </div>
                    <h3>COLORS</h3>
                    <p>At vero eos et accusamus et iusto odio dignissi mos ducimus qui blanditiis praesentium</p>
                </div>
                <div className='icon'>
                    <div>
                        <img className='back' src={img4}/>
                        <img data-aos="zoom-in" className='front' src={img44}/>
                    </div>
                    <h3>NATURAL</h3>
                    <p>At vero eos et accusamus et iusto odio dignissi mos ducimus qui blanditiis praesentium</p>
                </div>
            </div>
        </div>
    )
}

export default Section6