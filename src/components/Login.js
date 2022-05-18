import "./style.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Dashboard from "./Dashboard";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("Invalid Email Address").required("Required"),
      password: yup
        .string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:4000/api/user/login", values)
        .then((response) => {
          console.log(response);
              localStorage.setItem("token", response.data.data.token);
          navigate('/dashboard',{replace:true});
        })
        .catch((error) => {
          alert(error);
        });
    },
  });
  return (
    <>
      <NavBar />
      <div className="container my-3">
        <div className="layer">
          <div className="center">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <p className="header">Login</p>
                <label htmlFor="Email" className="label">
                  Email
                </label>
                <input
                  className="input"
                  type="text"
                  id="email"
                  placeholder="Enter your email address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="warning">Required</div>
                ) : null}
              </div>
              <div>
                <label htmlFor="Password" className="label">
                  Password
                </label>
                <input
                  className="input"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="warning">
                    Must be greater than 8 characters
                  </div>
                ) : null}
              </div>
              <br></br>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
