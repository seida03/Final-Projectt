import React from "react";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import styles from "../blogsAdd/blogsAdd.module.scss";
function BlogsAdd() {
    const validationSchema = yup.object({
        name: yup.string().required(true),
        img: yup.string().required(true),
        description: yup.string().required(true),
        byWho: yup.string().required(true),
        heading: yup.string().required(true),
        minidescription: yup.string().required(true),
    });
    return (
        <div className={styles.add}>
            <Formik
                initialValues={{
                    name: "",
                    img: "",
                    heading: "",
                    description: "",
                    byWho: "",
                    minidescription: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log(values);

                    const obj = {
                        name: values.name,
                        img: values.img,
                        heading: values.heading,
                        description: values.description,
                        byWho: values.byWho,
                        minidescription: values.minidescription,
                    };

                    axios.post("http://localhost:8000/about", obj);
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="name" placeholder="name" />
                        {errors.name && touched.name ? <div>enter correct namee</div> : null}
                        <Field name="heading" type="text" placeholder="heading" />
                        {errors.heading && touched.heading ? <div>enter correct heading</div> : null}
                        <Field name="img" placeholder="img" />
                        {errors.img && touched.img ? <div>enter correct img</div> : null}
                        <Field name="description" placeholder="description" />
                        {errors.description && touched.description ? <div>enter correct  description</div> : null}
                        <Field name="minidescription" type="string" placeholder="mini description" />
                        {errors.minidescription && touched.minidescription ? <div>enter correct minidescription</div> : null}
                        <Field name="byWho" placeholder="by Who" />
                        {errors.byWho && touched.byWho ? <div>enter correct byWho</div> : null}
                        <button type="submit">SUBMIT</button>

                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default BlogsAdd;