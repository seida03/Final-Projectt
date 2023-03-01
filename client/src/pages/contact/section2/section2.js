import React from 'react'
import styles from '../section2/section2.module.scss'
function Section2() {
    return (
        <div className={styles.section2}>
            <div className={styles.cards}>
                <div className={styles.card}>
                    <h3>ZURICH</h3>
                    <p>Address: Seestrasse 21, Zurich

                        Email: biagiotti@qodeinteractive.com

                        Phone : + 99 411 725 39 12</p>
                </div>
                <div className={styles.card}>
                    <h3>PARIS
                    </h3>
                    <p>Address: Seestrasse 21, Zurich
                        Email: biagiotti@qodeinteractive.com
                        Phone : + 99 411 725 39 12</p>
                </div>
                <div className={styles.card}>
                    <h3>LONDON
                    </h3>
                    <p>Address: Seestrasse 21, Zurich

                        Email: biagiotti@qodeinteractive.com

                        Phone : + 99 411 725 39 12</p>
                </div>
                <div className={styles.card}>
                    <h3>MILANO</h3>
                    <p>Address: Seestrasse 21, Zurich

                        Email: biagiotti@qodeinteractive.com

                        Phone : + 99 411 725 39 12</p>
                </div>
            </div>
        </div>
    )
}

export default Section2