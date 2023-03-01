import React from 'react'
import '../../home/section4/section4.scss'
import section4LogoLight from '../../../images/section4LogoLight.png'
import section4LogoDark from '../../../images/section4LogoDark.png'
import section4LogoLight2 from '../../../images/section4LogoLight2.png'
import section4LogoDark2 from '../../../images/section4LogoDark2.png'
import section4LogoLight3 from '../../../images/section4LogoLight3.png'
import section4LogoDark3 from '../../../images/section4LogoDark3.png'
import section4LogoLight4 from '../../../images/section4LogoLight4.png'
import section4LogoDark4 from '../../../images/section4LogoDark4.png'

function Section5() {
    return (
        <div className='section4'>
            <div className='logos'>
                <div className='logo'>
                    <img src={section4LogoLight} />
                    <div className='ust'>
                        <img src={section4LogoDark} />
                    </div>
                </div>
                <div className='logo'>
                    <img src={section4LogoLight2} />
                    <div className='ust'>
                        <img src={section4LogoDark2} />
                    </div>
                </div> <div className='logo'>
                    <img src={section4LogoLight3} />
                    <div className='ust'>
                        <img src={section4LogoDark3} />
                    </div>
                </div> <div className='logo'>
                    <img src={section4LogoLight4} />
                    <div className='ust'>
                        <img src={section4LogoDark4} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section5