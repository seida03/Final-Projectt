import React from 'react'
import { GrFacebookOption } from 'react-icons/gr';
import { AiOutlineTwitter } from 'react-icons/ai';
import { GrInstagram } from 'react-icons/gr';
import { BsPinterest } from 'react-icons/bs';
import styles from '../footer/footer.module.scss'
import agLogo from '../../../images/agLogo.png'
import cards from '../../../images/cards.png'

    function Footer() {
        return (
            <div className={styles.footer}>
                <div className={styles.footer1}>
                    <div className={styles.bir}>
                        <h3>
                            CONTACT
                        </h3>
                        <p>Address: Seestrasse 21, Zurich

                            E-mail: biagiotti@qodeinteractive.com

                            Phone : + 99 411 725 39 12

                        </p>
                        <img src={cards} alt='cards' />
                    </div>
                    <div className={styles.iki}>
                        <img src={agLogo} alt='white-logo' />
                        <p>An oasis of online beauty built specifically so your new cosmetics site can take everyone’s breaths away.</p>
                        <div>
                            <GrFacebookOption className={styles.icon} />
                            <AiOutlineTwitter className={styles.icon} />
                            <GrInstagram className={styles.icon} />
                            <BsPinterest className={styles.icon} />
                        </div>
                    </div>

                    <div className={styles.uc}>
                        <h3>COLLECTIONS</h3>
                        <p>Glowing skin is a result

                            ABCDEH Beauty – Forever Young

                            Pure Skin Solutions</p>
                    </div>
                </div>

            </div>
        )
    }

export default Footer