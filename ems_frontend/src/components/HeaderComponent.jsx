import React from 'react';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark px-4 shadow-sm">
                <Link className="navbar-brand font-weight-bold" to="/">
                    <i className="bi bi-people-fill me-2"></i>
                    Employee Management System
                </Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/employees">Employees</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};  

export default HeaderComponent;