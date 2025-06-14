import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './UserLogin.module.css';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { darkModeContext } from '../../../context/DarkModeContext';
import loginImage from '../../../assets/images/educationLogin.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from '../../../context/AuthContext';

const UserLogin = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailOrUserName, setEmailOrUserName] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { darkMode } = useContext(darkModeContext);
  const {setUser} = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://turansalimli-001-site1.ntempurl.com/api/Auth/login", {
        emailOrUserName,
        password,
        rememberMe
      });
      console.log(response.data)

      const token = response.data.accessToken



      const decodeToken = jwtDecode(token);
      const userData = {
        userId: decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        name: decodeToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        role: decodeToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      };
      setUser(userData.name)
      if (rememberMe) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        sessionStorage.setItem("accessToken", token);
        sessionStorage.setItem("user", JSON.stringify(userData));
      }

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      const errorData = error.response?.data;
      console.log(errorData)

      if (errorData?.errors) {
        Object.values(errorData.errors).forEach((errArray) => {
          errArray.forEach((msg) => {
            toast.error(msg);
          });
        });
      } else {
        toast.error(
          errorData?.message ||
          "Xəta baş verdi. Zəhmət olmasa məlumatları yoxlayın."
        );
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.5 }}
      className={`${styles.wrapper} ${darkMode ? styles.darkWrapper : styles.lightWrapper}`}
    >
      <div className={`${styles.leftSide} ${darkMode ? styles.darkLeft : styles.lightLeft}`}>
        <motion.img
          src={loginImage}
          alt="Login"
          className={styles.image}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      <div className={`${styles.rightSide} ${darkMode ? styles.darkRight : styles.lightRight}`}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Welcome Back</h2>

          <input
            type="text"
            placeholder="Email or Username"
            // required
            className={styles.loginInput}
            value={emailOrUserName}
            onChange={(e) => setEmailOrUserName(e.target.value)}
          />

          <div className={styles.passwordWrapper}>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              // required
              className={styles.loginInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className={styles.eyeIcon}
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className={styles.rememberMeWrapper}>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          <button type="submit" className={styles.loginButton}>
            Login
          </button>

          <p className={styles.registerRedirect}>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default UserLogin;
