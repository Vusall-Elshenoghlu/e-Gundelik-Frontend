import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserLogin.module.css';
const UserLogin = () => {
  return (
    <div className={`d-flex align-items-center justify-content-center ${styles.container}`}>
      <form className={`p-4 rounded shadow bg-white ${styles.form}`}>
        <h2 className="text-primary text-center mb-4">Giriş</h2>
        <input type="email" className="form-control mb-3" placeholder="Email" required />
        <input type="password" className="form-control mb-3" placeholder="Şifrə" required />
        <button type="submit" className="btn btn-primary w-100">Daxil ol</button>
        <p className="mt-3 text-center">
          Hesabın yoxdur? <Link to="/register">Qeydiyyat</Link>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;