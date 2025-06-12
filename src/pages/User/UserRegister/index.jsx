import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserRegister.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserRegister = () => {
  return (
    <div className={`d-flex align-items-center justify-content-center ${styles.container}`}>
      <form className={`p-4 rounded shadow bg-white ${styles.form}`}>
        <h2 className="text-primary text-center mb-4">Qeydiyyat</h2>
        <input type="text" className="form-control mb-3" placeholder="Ad Soyad" required />
        <input type="email" className="form-control mb-3" placeholder="Email" required />
        <input type="password" className="form-control mb-3" placeholder="Şifrə" required />
        <input type="password" className="form-control mb-3" placeholder="Şifrəni təkrar yaz" required />
        <button type="submit" className="btn btn-primary w-100">Qeydiyyatdan keç</button>
        <p className="mt-3 text-center">
          Hesabın var? <Link to="/login">Giriş</Link>
        </p>
      </form>
    </div>
  );
};

export default UserRegister;