import React, { useEffect, useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import styles from '../header/header.module.scss'
import { AiOutlineSearch } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineShopping } from 'react-icons/ai';
import { RxHamburgerMenu } from 'react-icons/rx';
import { CiHeart } from 'react-icons/ci';
import logoQara from '../../../images/logoQara.png'
import logoAg from '../../../images/logoAg.png'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, loginUser, checkIsAuth, logout } from '../../../redux/features/authSlice';
import { FiLogOut } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';
import { deleteProduct, getUserCart } from '../../../redux/features/cartSlice';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Loading from '../../loading/loading';

const schema = yup.object({
    username: yup.string().required().min(5),
    password: yup.string().required().min(6),
    email: yup.string().required().email(),
    repeatpassword: yup.string().required().min(6),
}).required();

const schemaRegister = yup.object({
    username: yup.string().required().min(5),
    password: yup.string().required().min(6),
    email: yup.string().required().email(),
    repeatpassword: yup.string().required().min(6),

}).required();





function Header() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema, schemaRegister)
    });
    const onSubmit = data => console.log(data);


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [navbar, setNavbar] = useState(false)
    const [navbarLogo, setNavbarLogo] = useState(logoQara)
    const changeBackground = () => {
        if (window.scrollY >= 66) {
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }
    useEffect(() => {
        changeBackground()
        window.addEventListener("scroll", changeBackground)
    })

    const changeLogo = () => {
        if (window.scrollY >= 5) {
            setNavbarLogo(logoAg)
            changeBack(header1)
        } else {
            setNavbarLogo(logoQara)
            changeBack(header)
        }
    }

    useEffect(() => {
        changeLogo()
        window.addEventListener("scroll", changeLogo)
    })
    const header = styles.header
    const headerResponsive = styles.headerResponsive
    const header1 = styles.header1
    const [back, changeBack] = useState(header)

    const register1 = styles.registervisible
    const register2 = styles.registerhidden
    const [registeri, setRegisteri] = useState(register2)
    const createAccount = () => {
        setRegisteri(register1)
    }
    const login1 = styles.loginvisible
    const login2 = styles.loginhidden
    const [login, setLogin] = useState(login2)
    const [blur, setBlur] = useState()

    const handleLogin = () => {
        setLogin(login1)
        setBlur(styles.overlay)
    }
    const handleLogin2 = () => {
        setLogin(login2)
        setBlur(null)
        setRegisteri(register2)
    }

    const cart = styles.cart
    const cart1 = styles.cart1
    const [hovercart, setHovercart] = useState(cart1)


    const opencart = (e) => {
        setHovercart(cart)
    }
    const closecart = (e) => {
        setHovercart(cart1)
    }

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [repeatpassword, setRepeatpassword] = useState("")


    const handleRegister = () => {
        try {
            dispatch(registerUser({
                username,
                password,
                email,
            }))
            setUsername("")
            setPassword("")
            setEmail("")
            setRepeatpassword("")
        } catch (error) {
            console.log(error);
        }
        navigate("/my-account")
        // setBlur(null)
        // setRegisteri(register2)
        // setLogin(login2)

    }

    const [loginusername, setLoginusername] = useState("")
    const [loginpassword, setLoginpassword] = useState("")


    const handleLoginReal = () => {
        try {
            dispatch(loginUser({
                username: loginusername,
                password: loginpassword
            }))
        } catch (error) {
            console.log(error);
        }
        navigate('/')
        setLogin(login2)
        setBlur(null)
    }


    const isAuth = useSelector(checkIsAuth)
    const { user } = useSelector(state => state.auth)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        window.scrollTo({ top: 0 })
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])
    const handleLogout = () => {
        try {
            dispatch(logout())
            window.localStorage.removeItem("token")
            window.localStorage.removeItem("user")
            window.location.reload()
            loading && <Loading />
            cartLength = 0

        } catch (error) {
            console.log(error);
        }
    }

    const [ul, setUl] = useState(false)
    const openMenu = () => {
        setUl(!ul)
    }

    const cartLength = useSelector(state => state.cart.cart)
    let totalPrice = 0;
    if (cartLength != 0 && cartLength != null) {
        cartLength.forEach(item => totalPrice += item.price * item.count)
    }
    const handleRemove = async (id) => {
        await dispatch(deleteProduct(id))
        dispatch(getUserCart(user._id))
    }

    useEffect(() => {
        dispatch(getUserCart(user?._id))

    }, [])

    const gotoCart = () => {
        navigate('/cart')
    }
    const gotoCart2 = () => {
        navigate('/cart')
    }

    const gotoCheckout = () => {
        navigate("/checkout")
    }
    const goToCartFromHeader = () => {
        navigate('/my-account')
    }

    const goToSearch = () => {
        navigate('/products')
    }
    return (
        <>
            <div className={styles.birinci}>
                <p>biagiotti@qodeinteractive.com</p>
                <p>Free shipping on international orders of $150+</p>
                {isAuth ? (<div style={{ color: "white", display: "flex", alignItems: "center" }}><p onClick={goToCartFromHeader} style={{ cursor: "pointer" }}><BiUser />{user?.username} </p><button onClick={handleLogout} style={{ marginLeft: "100px" }}><FiLogOut /></button></div>) :
                    (
                        <button onClick={handleLogin}>Log in <AiOutlineUser /></button>
                    )
                }
            </div>
            <div className={back}>
                <div className={styles.wishdiv}>
                    <Link className={styles.wish} to="wishlist"> <CiHeart className={styles.heart} />
                        <h4>Wishlist</h4></Link>
                </div>
                <div className={styles.logo}>
                    <img src={navbarLogo} alt='black-logo' />
                </div>
                <div className={ul ? styles.ulstyle2 : styles.ulstyle1}>
                    <ul>
                        <li><Link to="/" className={styles.link}>HOME</Link></li>
                        <li><Link to="about-us" className={styles.link}>ABOUT US</Link></li>
                        <li><Link to="products" className={styles.link}>PRODUCTS</Link></li>
                        <li className={styles.imgli}><img src={navbarLogo} alt='black-logo' /></li>
                        <li><Link to="contact" className={styles.link}>CONTACT US</Link></li>
                        <li><Link to="my-account" className={styles.link}>MY ACCOUNT</Link></li>
                    </ul>
                </div>
                <div className={styles.icons}>
                    <AiOutlineSearch className={styles.icon} onClick={goToSearch} />
                    <AiOutlineShopping className={styles.icon} onMouseEnter={opencart} onMouseLeave={closecart} onClick={gotoCart} />
                    <span>{cartLength?.length}</span>
                </div>
                <div className={styles.responsive} >
                    <RxHamburgerMenu className={styles.responsiveburger} onClick={openMenu} />
                </div>
            </div>
            <div className={login}>
                <div className={styles.head}>
                    <p>Already have an account?</p>
                    <h3>LOG IN</h3>
                </div>
                <div className={styles.formi} >
                    <input placeholder="Username*" className={styles.field} value={loginusername} onChange={e => setLoginusername(e.target.value)} />
                    <input placeholder="Password*" type="password" className={styles.field} value={loginpassword} onChange={e => setLoginpassword(e.target.value)} />
                    <div className={styles.btnp}>
                        <button type='submit' onClick={handleLoginReal} >LOG IN</button>
                        <p>Lost your password?</p>
                    </div>
                </div>
                <div className={styles.asagi}>
                    <p>Don’t have an account?</p>
                    <button onClick={createAccount}>CREATE AN ACCOUNT</button>
                </div>
                {<form onSubmit={handleSubmit(onSubmit)} className={registeri} >
                    <h2>CREATE AN ACCOUNT</h2>
                    <div className={styles.formi}>
                        <input {...register("username")} placeholder="Username*" className={styles.field} value={username} onChange={e => setUsername(e.target.value)} />
                        <p>{errors.username?.message ? <div className={styles.errors}>username is required</div> : null}</p>
                        <input {...register("email")} placeholder="Email*" className={styles.field} value={email} onChange={e => setEmail(e.target.value)} />
                        <p>{errors.email?.message ? <div className={styles.errors}>email is incorrect</div> : null}</p>
                        <input {...register("password")} placeholder="Password*" type="password" className={styles.field} value={password} onChange={e => setPassword(e.target.value)} />
                        <p>{errors.password?.message ? <div className={styles.errors}>password is required</div> : null}</p>
                        <input {...register("repeatpassword")} placeholder="Repeat Password*" type="password" className={styles.field} value={repeatpassword} onChange={e => setRepeatpassword(e.target.value)} />
                        <p>{errors.repeatpassword?.message ? <div className={styles.errors}>password is incorrect</div> : null}</p>
                        <div className={styles.btnp}>
                            <button type='submit' onClick={handleRegister} >REGISTER</button>
                        </div>
                    </div>
                </form>}
            </div>
            <div className={blur} onClick={handleLogin2}>
            </div>
            <div className={hovercart} onMouseEnter={opencart} onMouseLeave={closecart}>
                <div>
                    {cartLength != 0 && cartLength != null ?
                        <>
                            <div className={styles.previewWrap}>
                                {cartLength && cartLength.map((item) => (
                                    <div className={styles.div1} key={item._id}>
                                        <img src={item.img} />
                                        <div className={styles.previewContent}>
                                            <h4>{item.name}</h4>
                                            <p>{item.count}x ${item.price}</p>
                                        </div>
                                        <div className={styles.delete} onClick={() => handleRemove(item._id)}>x</div>
                                    </div>
                                ))
                                }

                            </div>
                            <div className={styles.div2}>
                                <div>
                                    <h5>TOTAL:</h5>
                                    <p>${totalPrice}</p>
                                </div>
                                <div className={styles.btns}>
                                    <button onClick={gotoCart2}>VIEW CART</button>
                                    <button onClick={gotoCheckout}>CHECKOUT</button>
                                </div>
                            </div>
                        </>
                        : <div className={styles.np}><p>No products in the card</p></div>
                    }
                </div>
            </div>
        </>
    )
}

export default Header