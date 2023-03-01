import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from '../editProduct/editProduct.module.scss'
function EditProduct() {
    const { id } = useParams()

   

    const handleName = (e) => {
        setNameofproduct(e.target.value)
    }
    const handlePrice = (e) => {
        setPrice(e.target.value)
    }
    const handlePrevprice = (e) => {
        setPrevprice(e.target.value)
    }
    const handleCategory = (e) => {
        setCategory(e.target.value)
    }
    const handlePosition = (e) => {
        setPosition(e.target.value)
    }
    const handleImg = (e) => {
        setImg(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }
    useEffect(() => {
        axios.get(`http://localhost:8000/cosmetics/${id}`)
            .then(res => {
                setNameofproduct(res.data.name)
                setPrice(res.data.price)
                setImg(res.data.img)
                setDescription(res.data.description)
                setCategory(res.data.category)
                setPosition(res.data.position)
                setPrevprice(res.data.prevprice)

            })
    }, [])
    const [nameofproduct, setNameofproduct] = useState('');
    const [price, setPrice] = useState('');
    const [img, setImg] = useState('');
    const [prevprice, setPrevprice] = useState('');
    const [category, setCategory] = useState('');
    const [position, setPosition] = useState('');
    const [description, setDescription] = useState('');
    const handlesubmit = (e) => {
        e.preventDefault()
        if (nameofproduct == "" || price == "" || category == "" || img == "" || position == "" || description == "" || prevprice == "") {
            alert("please check inputs")
        } else {
            axios.put(`http://localhost:8000/cosmetics/${id}`, {
                name: nameofproduct,
                price: price,
                category: category,
                position: position,
                prevprice: prevprice,
                description: description,
                img: img,
            })
                .then()
                .then((res) => console.log(res.data))
        }
        alert("Product edited")
    }
    return (
        <div className={styles.editproduct}>
            <form>
                <input placeholder='name' value={nameofproduct} onChange={handleName} />
                <input placeholder='price' value={price} onChange={handlePrice} />
                <input placeholder='img' value={img} onChange={handleImg} />
                <input placeholder='previous price' value={prevprice} onChange={handlePrevprice} />
                <input placeholder='category' value={category} onChange={handleCategory} />
                <input placeholder='position' value={position} onChange={handlePosition} />
                <input placeholder='description' value={description} onChange={handleDescription} />
                <button onClick={handlesubmit} className={styles.editbtn}>Save</button>

            </form>
        </div>
    )
}

export default EditProduct