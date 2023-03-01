import React, { useEffect, useState } from 'react'
import styles from '../products/product.module.scss'
import { slice } from 'lodash'
import {Helmet} from "react-helmet";

import axios from 'axios'
import Loading from '../loading/loading'
import { useNavigate } from 'react-router-dom'
function Products() {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    const [sortdata, setSorttData] = useState([])
    const [isCompleted, setIsCompleted] = useState(false)
    const [index, setIndex] = useState(3)
    const initialPosts = slice(data, 0, index)

    const [all, setAll] = useState(true)
    const [body, setBody] = useState(false)
    const [cosmetics, setCosmetics] = useState(false)
    const [make, setMake] = useState(false)


    const getData = () => {
        axios.get("http://localhost:8000/cosmetics")
            .then(res => { setData(res.data); setSorttData(res.data) })
            .catch((e) => console.log(e))
    }

    const loadMore = () => {
        setIndex(index + 3)
        console.log(index)
        if (index >= data.length) {
            setIsCompleted(true)
        } else {
            setIsCompleted(false)
        }
    }


    const handleClick1 = () => {
        setAll(true)
        setBody(false)
        setCosmetics(false)
        setMake(false)
    }
    const handleClick2 = () => {
        setAll(false)
        setBody(true)
        setCosmetics(false)
        setMake(false)
    }
    const handleClick3 = () => {
        setAll(false)
        setBody(false)
        setCosmetics(true)
        setMake(false)
    }
    const handleClick4 = () => {
        setAll(false)
        setBody(false)
        setCosmetics(false)
        setMake(true)
    }


    useEffect(() => {
        getData()
    }, [])

    const [filterprice, setFilterprice] = useState("default")

    useEffect(() => {
        if (filterprice === "lowtohigh") {
            setData([...data].sort((a, b) => a.price - b.price))
            console.log("hh");
        } else if (filterprice === 'hightolow') {
            setData([...data].sort((a, b) => b.price - a.price))
        } else if (filterprice === 'default') {
            setData([...sortdata], sortdata)
        }
    }, [filterprice])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        window.scrollTo({ top: 0 })
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    const goToDetails = (id) => {
        navigate(`/productdetails/${id}`)
    }

    const [input, setInput] = useState("");
    const handleSearch = (e) => {
        setInput(e.target.value);
    };
    return (
        <>
            {
                loading ?
                    <Loading />
                    :
                    <div className={styles.products}>
                         <Helmet>
                <meta charSet="utf-8" />
                <title>Products</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
                        <input placeholder='Search..' value={input} onChange={handleSearch} />
                        <div className={styles.heading}><h2>PRODUCTS</h2></div>
                        <div>
                            <div className={styles.buttons}>
                                <select onChange={(e) => setFilterprice(e.target.value)} className={styles.select}>
                                    <option className={styles.option} value="lowtohigh">Sort by price:low to high</option>
                                    <option className={styles.option} value="hightolow">Sort by price:high to low</option>
                                    <option className={styles.option} value="default">Sort by price:default</option>
                                </select>
                                <button onClick={handleClick1} >SHOW ALL</button>
                                <button onClick={handleClick2}>BODY CARE</button>
                                <button onClick={handleClick3}>COSMETICS</button>
                                <button onClick={handleClick4}>MAKE UP</button>
                            </div>
                            <div className={styles.cards}>
                                {initialPosts
                                    .filter((item) =>
                                        input == ""
                                            ? data
                                            : item.name.toLowerCase().includes(input.toLowerCase())
                                    )
                                    .filter((item) =>
                                        all == true
                                            ? data
                                            : body == true
                                                ? item.category == "Body care"
                                                : cosmetics == true
                                                    ? item.category == "Cosmetics"
                                                    : make == true
                                                        ? item.category == "Makeup"
                                                        : null

                                    )

                                    .map((elem) => (
                                        <div className={styles.card} key={elem._id}>
                                            <img src={elem.img} />
                                            <div className={styles.ust} onClick={() => goToDetails(elem._id)}>
                                                <h3>{elem.name}</h3>
                                                <p>{elem.category}</p>
                                                <p>${elem.price}</p>
                                            </div>
                                        </div>
                                    ))

                                }
                            </div>
                            <div className={styles.btndiv}>
                                {isCompleted ? (
                                    <button
                                        onClick={loadMore}
                                        type="button"
                                        className={styles.loadMore}
                                    >
                                        THAT'S IT
                                    </button>
                                ) : (
                                    <button onClick={loadMore} type="button" className={styles.loadMore}>
                                        LOAD MORE
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>}

        </>
    )
}

export default Products