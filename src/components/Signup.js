import "./style.css";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from './Navbar'
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      re_password: "",
      email: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      re_password: Yup.string()
        .min(8, "Must be 8 characters or more")
        .required("Required")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      if (values.password === values.re_password) {
        axios
          .post("http://localhost:4000/api/user/add", values)
          .then((response) => {
              localStorage.setItem("token", response.data.token);
              alert(JSON.stringify("You hvae been registered! Please Login to continue!"));
              navigate("/",{replace:true});
          })
          .catch(function (error) {
            alert(JSON.stringify("Mail has been already taken", null, 2));
          });
      } else alert(JSON.stringify("Passwords do not match", null, 2));
    },
  });
  return (
    <>
      <NavBar/>
      <div className="container my-3">
        <div className="layer">
          <div className="center">
            <form onSubmit={formik.handleSubmit}>
              <h3 className="header">SignUp</h3>

              <div className="container my-3">
                {formik.touched.email && formik.errors.email ? (
                  <div className="warning">Required</div>
                ) : (
                  " "
                )}
                <label htmlFor="email" className="label">
                  Email Address
                </label>
                <input
                  className="input"
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="warning">Required</div>
              ) : null}
              <div className="container my-3">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  className="input"
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              <div className="container my-3">
                {formik.touched.re_password && formik.errors.re_password ? (
                  <div className="warning">Required</div>
                ) : (
                  " "
                )}
                <label htmlFor="re_password" className="label">
                  Re-Password
                </label>
                <input
                  className="input"
                  id="re_password"
                  name="re_password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.re_password}
                />
              </div>

              <br></br>
              <button className="button-proceed" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
