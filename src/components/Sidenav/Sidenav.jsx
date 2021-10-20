import React from "react";
import "./Sidenav.css";
import { Link } from "react-router-dom";

const Sidenav = () => {
    return <div className="sidebar-wrapper" data-simplebar="true">
        <div className="sidebar-header">
            <div>
                <img src="/assets/images/logo-sekolah.png" width="40px" alt="logo icon" />
            </div>
            <div>
                <img src="/assets/images/logo-icon.png" className="mx-3 toggle-icon" width="120px" alt="logo icon" />
            </div>
            <div className="toggle-icon ms-auto">
                <i class='bx bx-arrow-to-left'></i>
            </div>
        </div>
        <ul className="metismenu" id="menu">
            <li>
                <Link to="/dashboard">
                    <div className="parent-icon">
                        <i class='bx bx-home'></i>
                    </div>
                    <div className="menu-title">
                        Dashboard
                    </div>
                </Link>
            </li>
            <li className="menu-label">Master</li>
            <li>
                <Link to="/students">
                    <div className="parent-icon">
                        <i class='bx bx-user'></i>
                    </div>
                    <div className="menu-title">
                        Students
                    </div>
                </Link>
            </li>
            <li>
                <a href="#" className="has-arrow">
                    <div className="parent-icon">
                        <i class='bx bx-buildings'></i>
                    </div>
                    <div className="menu-title">
                        Class Room
                    </div>
                </a>
                <ul>
                    <li> <Link to="/classmaster"><i className="bx bx-right-arrow-alt"></i>Class Master</Link>
                    </li>
                    <li> <Link to="/section"><i className="bx bx-right-arrow-alt"></i>Section</Link>
                    </li>
                    <li> <Link to="/classroom"><i className="bx bx-right-arrow-alt"></i>Class Room</Link>
                    </li>
                    <li> <Link to="/classgroup"><i className="bx bx-right-arrow-alt"></i>Class Group</Link>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#" className="has-arrow">
                    <div className="parent-icon">
                        <i class='bx bx-money'></i>
                    </div>
                    <div className="menu-title">
                        Fee
                    </div>
                </a>
                <ul>
                    <li> <Link to="/collectfee"><i className="bx bx-right-arrow-alt"></i>Collect Fee</Link>
                    </li>
                    <li> <Link to="/feegroup"><i className="bx bx-right-arrow-alt"></i>Fee Group</Link>
                    </li>
                    <li> <Link to="/feetype"><i className="bx bx-right-arrow-alt"></i>Fee Type</Link>
                    </li>
                    <li> <Link to="/feemaster"><i className="bx bx-right-arrow-alt"></i>Fee Master</Link>
                    </li>
                </ul>
            </li>
            <li className="menu-label">Other</li>
            <li>
                <Link to="/transaction">
                    <div className="parent-icon">
                        <i class='bx bx-transfer'></i>
                    </div>
                    <div className="menu-title">
                        Transaction
                    </div>
                </Link>
            </li>
        </ul>
    </div>
};

export default Sidenav;