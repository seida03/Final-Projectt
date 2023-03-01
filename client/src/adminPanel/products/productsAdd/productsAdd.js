import React from "react";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import styles from "../productsAdd/productsAdd.module.scss";
function ProductAdd() {
  const validationSchema = yup.object({
    name: yup.string().required(true),
    price: yup.number().required(true),
    img: yup.string().required(true),
    category: yup.string().required(true),
    description: yup.string().required(true),
    prevprice: yup.number().required(true),
    position: yup.string().required(true),
  });
  return (
    <div className={styles.add}>
      <Formik
        initialValues={{
          name: "",
          price: "",
          img: "",
          prevprice: "",
          category: "",
          description: "",
          position: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);

          const obj = {
            name: values.name,
            price: values.price,
            img: values.img,
            category: values.category,
            position: values.position,
            description: values.description,
            prevprice: values.prevprice,
          };

          axios.post("http://localhost:8000/cosmetics", obj);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="name" placeholder="name" /> 
            {errors.name && touched.name ? <div>enter correct name</div> : null}
            <Field name="price" type="number" placeholder="price" />
            {errors.price && touched.price ? <div>enter correct price</div> : null}
            <Field name="img" placeholder="img" />
            {errors.img && touched.img ? <div>enter correct img</div> : null}
            <Field name="prevprice" placeholder="previous price" />
            {errors.prevprice && touched.prevprice ? <div>enter correct previous price</div> : null}
            <Field name="category" type="string" placeholder="category" />
            {errors.category && touched.category ? <div>enter correct category</div> : null}
            <Field name="position" placeholder="position" />
            {errors.position && touched.position ? <div>enter correct position</div> : null}
            <Field name="description" placeholder="description" />
            {errors.description && touched.description ? <div>enter correct description</div> : null}
            <button type="submit">SUBMIT</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ProductAdd;