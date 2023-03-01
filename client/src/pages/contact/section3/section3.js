import React from 'react'
import styles from '../section3/section3.module.scss'
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
function Section3() {

    const validationSchema = yup.object({
        email: yup.string().required(true),
        comment: yup.string().required(true),
    });
    return (
        <div className={styles.section3}>
            <div className={styles.form}>
                <div className={styles.heading}>
                    <span>perfect shades</span>
                    <h3>ASK US ANYTHING</h3>
                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque</p>
                </div>
                <div className={styles.form}>
                    <Formik
                        initialValues={{
                            email: "",
                            comment: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className={styles.formi}>
                                <Field name="email" placeholder="Email*" className={styles.field1} />
                                {errors.email && touched.email ? <div className={styles.error}>The field is required.</div> : null}
                                <Field name="comment" placeholder="Your comment" className={styles.field2} />
                                <button type='submit' className='btn'>SUBMIT</button>

                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <div className={styles.map}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194473.43000708893!2d49.714871829375284!3d40.39450797562368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d6bd6211cf9%3A0x343f6b5e7ae56c6b!2sBaku%2C%20Azerbaijan!5e0!3m2!1sen!2s!4v1676146125404!5m2!1sen!2s" className={styles.mapp}  loading="lazy" title='video' ></iframe>
            </div>
        </div>
    )
}

export default Section3