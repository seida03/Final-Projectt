import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from '..//editBlog/editBlog.module.scss'
function EditBlog() {
    const { id } = useParams()

    useEffect(() => {
        axios.get(`http://localhost:8000/about/${id}`)
            .then(res => {
                setNameofBlog(res.data.name)
                setMiniDescription(res.data.minidescription)
                setImg(res.data.img)
                setDescription(res.data.description)
                setByWho(res.data.byWho)
                setHeading(res.data.heading)

            })
    }, [])
    const [nameofBlog, setNameofBlog] = useState('');
    const [minidescription, setMiniDescription] = useState('');
    const [img, setImg] = useState('');
    const [byWho, setByWho] = useState('');
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');

    const handleName = (e) => {
        setNameofBlog(e.target.value)
    }
    const handleHeading = (e) => {
        setHeading(e.target.value)
    }
    const handleMiniDescription = (e) => {
        setMiniDescription(e.target.value)
    }
    const handleByWho = (e) => {
        setByWho(e.target.value)
    }
    const handleImg = (e) => {
        setImg(e.target.value)
    }
    const handleDescription = (e) => {
        setDescription(e.target.value)
    }
    const handlesubmit = (e) => {
        e.preventDefault()
        if (nameofBlog == "" || heading == "" || byWho == "" || img == "" || minidescription == "" || description == "") {
            alert("please check inputs")
        } else {
            axios.put(`http://localhost:8000/about/${id}`, {
                name: nameofBlog,
                heading: heading,
                byWho: byWho,
                description: description,
                minidescription: minidescription,
                img: img,
            })
                .then()
                .then((res) => console.log(res.data))
        }
        alert("Blog edited")
    }
    return (
        <div className={styles.editBlog}>
            <form>
                <input placeholder='name' value={nameofBlog} onChange={handleName} />
                <input placeholder='heading' value={heading} onChange={handleHeading} />
                <input placeholder='img' value={img} onChange={handleImg} />
                <input placeholder='byWho' value={byWho} onChange={handleByWho} />
                <input placeholder='minidescription' value={minidescription} onChange={handleMiniDescription} />
                <input placeholder='description' value={description} onChange={handleDescription} />
                <button onClick={handlesubmit} className={styles.editbtn}>Save</button>

            </form>
        </div>
    )
}

export default EditBlog