import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './UserRegister.module.css';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { darkModeContext } from '../../../context/DarkModeContext';
import educationJPG from "../../../assets/images/education.png"

const UserRegister = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [animateExit, setAnimateExit] = useState(false);

  const { darkMode } = useContext(darkModeContext)
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    setAnimateExit(true);

    setTimeout(() => {
      navigate("/login");
    }, 600);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      surname: Yup.string().required("Surname is required"),
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://turansalimli-001-site1.ntempurl.com/api/Auth/register", values)
        .then(() => {
          toast.success("User registered successfully!");
          navigate("/login");
        })
        .catch(() => toast.error("Registration failed"));
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className={`${styles.wrapper} ${darkMode ? styles.darkWrapper : styles.lightWrapper}`}
    >
      <motion.div
        className={`${styles.leftSide} ${darkMode ? styles.darkLeft : styles.lightLeft}`}
        animate={{ x: animateExit ? 500 : 0, opacity: animateExit ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <motion.img
          src={educationJPG}
          alt="Education"
          className={styles.image}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        <h1 className="text-center">
          {"Təhsil millətin gələcəyidir".split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.4, duration: 0.5 }}
              style={{ display: "inline-block", marginRight: "8px" }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
      </motion.div>


      <motion.div
        className={`${styles.rightSide} ${darkMode ? styles.darkRight : styles.lightRight}`}
        animate={{ x: animateExit ? 500 : 0, opacity: animateExit ? 0 : 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <form onSubmit={formik.handleSubmit} className={styles.registerForm}>
          <h2 className={styles.formTitle}>Create Your Account</h2>

          <input
            type="text"
            name="name"
            placeholder="First name"
            {...formik.getFieldProps("name")}
            className={styles.registerInput}
          />
          {formik.touched.name && formik.errors.name && (
            <div className={styles.textDanger}>{formik.errors.name}</div>
          )}

          <input
            type="text"
            name="surname"
            placeholder="Last name"
            {...formik.getFieldProps("surname")}
            className={styles.registerInput}
          />
          {formik.touched.surname && formik.errors.surname && (
            <div className={styles.textDanger}>{formik.errors.surname}</div>
          )}

          <input
            type="text"
            name="username"
            placeholder="Username"
            {...formik.getFieldProps("username")}
            className={styles.registerInput}
          />
          {formik.touched.username && formik.errors.username && (
            <div className={styles.textDanger}>{formik.errors.username}</div>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            {...formik.getFieldProps("email")}
            className={styles.registerInput}
          />
          {formik.touched.email && formik.errors.email && (
            <div className={styles.textDanger}>{formik.errors.email}</div>
          )}

          <div className={styles.passwordWrapper}>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
              className={styles.registerInput}
            />
            <div
              className={styles.eyeIcon}
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className={styles.textDanger}>{formik.errors.password}</div>
          )}

          <div className={styles.passwordWrapper}>
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              {...formik.getFieldProps("confirmPassword")}
              className={styles.registerInput}
            />
            <div
              className={styles.eyeIcon}
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className={styles.textDanger}>{formik.errors.confirmPassword}</div>
          )}

          <button type="submit" className={styles.registerButton}>
            Register
          </button>

          <p className={styles.loginRedirect}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default UserRegister;
