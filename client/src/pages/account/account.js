import React, { useEffect, useState } from 'react'
import styles from '../account/account.module.scss'
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import Loading from '../loading/loading';
import Profile from './profile/profile';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, loginUser } from '../../redux/features/authSlice';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
function Account() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [items, setItems] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setItems(user.user);
            console.log(items);
        }
    }, []);
    const validationSchema = yup.object({
        email: yup.string().required(true).email(),
        password: yup.string().required(true).min(5),
    });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        window.scrollTo({ top: 0 })
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    const isAuth = useSelector(checkIsAuth)
    const { user } = useSelector(state => state.auth)
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
    }
    return (
        <>

            {
                loading ?
                    <Loading />
                    :
                    <div className={styles.account}>
                        <Helmet>
                            <meta charSet="utf-8" />
                            <title>Account</title>
                            <link rel="canonical" href="http://mysite.com/example" />
                        </Helmet>
                        <div className={styles.heading}>
                            <h2>MY ACCOUNT</h2>
                        </div>
                        {
                            items != 0 ? <Profile /> :
                                <div className={styles.form}>
                                    <div className={styles.heading2}>
                                        <span>perfect shades</span>
                                        <h3>LOGIN</h3>
                                        <p>At vero eos et accusamus et</p>
                                    </div>
                                    <Formik
                                        initialValues={{
                                            email: "",
                                            password: "",
                                        }}
                                        validationSchema={validationSchema}
                                        onSubmit={(values) => {
                                            console.log(values);
                                        }}
                                    >
                                        {({ errors, touched }) => (
                                            <>
                                                <Form className={styles.formi}>
                                                    <Field name="email" placeholder="Username*" value={loginusername} onChange={e => setLoginusername(e.target.value)} className={styles.field} />
                                                    {errors.email && touched.email ? <div className={styles.error}>Error:Username is required.</div> : null}
                                                    <Field name="password" placeholder="Password*" className={styles.field} type="password" value={loginpassword} onChange={e => setLoginpassword(e.target.value)} />
                                                    {errors.password && touched.password ? <div className={styles.error}>Error:Password is required.</div> : null}
                                                    <button type='submit' onClick={handleLoginReal}>LOG IN</button>
                                                </Form>
                                            </>
                                        )}
                                    </Formik>
                                </div>
                        }


                    </div>}
        </>
    )
}

export default Account