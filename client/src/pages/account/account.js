import React, { useEffect, useState } from 'react'
import styles from '../account/account.module.scss'
import * as Yup from "yup";
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
    const validationSchema = Yup.object().shape({

        username: Yup.string().required("Please enter username"),
        password: Yup.string()
            .required("Please enter password")
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[a-z]).{8,}$/,
                "Password should min 8 letter password, with at least a symbol  uppercase letter and a number"
            ),
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
                                            username: "",
                                            password: "",
                                        }}
                                        validationSchema={validationSchema}
                                        onSubmit={(values) => {
                                            console.log(values);
                                            try {
                                                dispatch(loginUser({
                                                    username: values.username,
                                                    password: values.password
                                                }))
                                            } catch (error) {
                                                console.log(error);
                                            }
                                            navigate('/')
                                        }}
                                    >
                                        {({ errors, touched }) => (
                                            <>
                                                <Form className={styles.formi}>
                                                    <Field name="username" placeholder="Username*" type="text" /*value={loginusername} onChange={e => setLoginusername(e.target.value)}*/ className={styles.field} />
                                                    {errors.username && touched.username && (
                                                        <div style={
                                                            errors.username &&
                                                            {
                                                                fontSize: "17px",
                                                                color: "red",
                                                                marginTop: "0px",
                                                                fontFamily: "Cormorant",
                                                            }
                                                        }
                                                        >
                                                            {errors.username}
                                                        </div>
                                                    )}
                                                    <Field name="password" placeholder="Password*" className={styles.field} type="password" /*value={loginpassword} onChange={e => setLoginpassword(e.target.value)}*/ />
                                                    {errors.password && touched.password && <div style={
                                                        errors.password &&
                                                        {
                                                            fontSize: "17px",
                                                            color: "red",
                                                            marginTop: "0px",
                                                            fontFamily: "Cormorant",

                                                        }
                                                    }
                                                    >
                                                        {errors.password}
                                                    </div>}
                                                    <button type='submit'>LOG IN</button>
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