import React, { useEffect, useState } from 'react'
import styles from '../checkout/checkout.module.scss'
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';
import { Helmet } from 'react-helmet';
import Loading from '../loading/loading';



function Checkout() {
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    const handleInputChange = (evt) => {
        const { name, value } = evt.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }
    const handleInputFocus = (evt) => {
        setState((prev) => ({ ...prev, focus: evt.target.name }));
    }


    const handleSubmit = () => {
        alert("Your order is preparing.")
    }
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        window.scrollTo({ top: 0 })
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])
    return (
        <>
        loading ? <Loading/>:
        <div className={styles.checkout}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Checkout</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            {/* <div className={styles.heading}>
                <h3>CHECKOUT</h3>
            </div> */}
            <div id='PaymentForm'>
                <Cards
                    number={state.number}
                    expiry={state.expiry}
                    cvc={state.cvc}
                    name={state.name}
                    focused={state.focus}
                />
                <form className={styles.form}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={state.name}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    <input
                        type="number"
                        name="number"
                        placeholder="Card Number"
                        value={state.number}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    <input
                        type="number"
                        name="cvc"
                        placeholder="CVC"
                        value={state.cvc}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    <input
                        type="number"
                        name="expiry"
                        placeholder="Expiry"
                        value={state.expiry}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                </form>
            </div>
            <button onClick={handleSubmit}>BUY</button>
        </div>
        
        </>
    )
}

export default Checkout