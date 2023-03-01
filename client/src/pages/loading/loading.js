import React from 'react'
import styles from '../loading/loading.module.scss'
import PulseLoader from 'react-spinners/PulseLoader'
function Loading() {
    return (
        <div className={styles.loading}>
            <PulseLoader color="rgb(254,235,231)" />
        </div>
    )
}

export default Loading