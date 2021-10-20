import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
    return <div className="topbar d-flex align-items-center">
        <nav className="navbar navbar-expand">
            <div className="mobile-toggle-menu"><i class='bx bx-menu'></i>
            </div>
            <div className="top-menu ms-auto">
                <ul className="navbar-nav align-items-center">
                    <li className="nav-item mobile-search-icon">
                        <a className="nav-link" href="#"> <i class='bx bx-search'></i>
                        </a>
                    </li>
                    <li className="nav-item dropdown dropdown-large">
                        <a className="nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false"> <i class='bx bx-category'></i>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                            <div className="row row-cols-3 g-3 p-3">
                                <div className="col text-center">
                                    <Link to="/students">
                                        <div className="app-box mx-auto bg-gradient-cosmic text-white"><i
                                            class='bx bx-group'></i>
                                        </div>
                                        <div className="app-title text-dark">Students</div>
                                    </Link>
                                </div>
                                <div className="col text-center">
                                    <Link to="/classroom">
                                        <div className="app-box mx-auto bg-gradient-burning text-white"><i
                                            class='bx bx-buildings'></i>
                                        </div>
                                        <div className="app-title text-dark">Class Rooms</div>
                                    </Link>
                                </div>
                                <div className="col text-center">
                                    <Link to="/collectfee">
                                        <div className="app-box mx-auto bg-gradient-lush text-white"><i
                                            class='bx bx-money'></i>
                                        </div>
                                        <div className="app-title text-dark">Fees</div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item dropdown dropdown-large">
                        {/* <a className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative" href="#"
                            role="button" data-bs-toggle="dropdown" aria-expanded="false"> <span
                                className="alert-count">7</span>
                            <i class='bx bx-bell'></i>
                        </a> */}
                        <div className="dropdown-menu dropdown-menu-end">
                            <a href="javascript:;">
                                <div className="msg-header">
                                    <p className="msg-header-title">Notifications</p>
                                    <p className="msg-header-clear ms-auto">Marks all as read</p>
                                </div>
                            </a>
                            <div className="header-notifications-list">
                                <a className="dropdown-item" href="javascript:;">
                                    <div className="d-flex align-items-center">
                                        <div className="notify bg-light-primary text-primary"><i className="bx bx-group"></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="msg-name">New Customers<span className="msg-time float-end">14 Sec
                                                ago</span></h6>
                                            <p className="msg-info">5 new user registered</p>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="javascript:;">
                                    <div className="d-flex align-items-center">
                                        <div className="notify bg-light-danger text-danger"><i className="bx bx-cart-alt"></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="msg-name">New Orders <span className="msg-time float-end">2 min
                                                ago</span></h6>
                                            <p className="msg-info">You have recived new orders</p>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="javascript:;">
                                    <div className="d-flex align-items-center">
                                        <div className="notify bg-light-success text-success"><i className="bx bx-file"></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="msg-name">24 PDF File<span className="msg-time float-end">19 min
                                                ago</span></h6>
                                            <p className="msg-info">The pdf files generated</p>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="javascript:;">
                                    <div className="d-flex align-items-center">
                                        <div className="notify bg-light-warning text-warning"><i className="bx bx-send"></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="msg-name">Time Response <span className="msg-time float-end">28 min
                                                ago</span></h6>
                                            <p className="msg-info">5.1 min avarage time response</p>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="javascript:;">
                                    <div className="d-flex align-items-center">
                                        <div className="notify bg-light-info text-info"><i className="bx bx-home-circle"></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="msg-name">New Product Approved <span className="msg-time float-end">2
                                                hrs ago</span></h6>
                                            <p className="msg-info">Your new product has approved</p>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="javascript:;">
                                    <div className="d-flex align-items-center">
                                        <div className="notify bg-light-danger text-danger"><i
                                            className="bx bx-message-detail"></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="msg-name">New Comments <span className="msg-time float-end">4 hrs
                                                ago</span></h6>
                                            <p className="msg-info">New customer comments recived</p>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="javascript:;">
                                    <div className="d-flex align-items-center">
                                        <div className="notify bg-light-success text-success"><i
                                            class='bx bx-check-square'></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="msg-name">Your item is shipped <span className="msg-time float-end">5
                                                hrs
                                                ago</span></h6>
                                            <p className="msg-info">Successfully shipped your item</p>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="javascript:;">
                                    <div className="d-flex align-items-center">
                                        <div className="notify bg-light-primary text-primary"><i class='bx bx-user-pin'></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="msg-name">New 24 authors<span className="msg-time float-end">1 day
                                                ago</span></h6>
                                            <p className="msg-info">24 new authors joined last week</p>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="javascript:;">
                                    <div className="d-flex align-items-center">
                                        <div className="notify bg-light-warning text-warning"><i
                                            class='bx bx-door-open'></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="msg-name">Defense Alerts <span className="msg-time float-end">2 weeks
                                                ago</span></h6>
                                            <p className="msg-info">45% less alerts last 4 weeks</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <a href="javascript:;">
                                <div className="text-center msg-footer">View All Notifications</div>
                            </a>
                        </div>
                    </li>
                    <li className="nav-item dropdown dropdown-large">
                        {/* <a className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative" href="#"
                            role="button" data-bs-toggle="dropdown" aria-expanded="false"> <span
                                className="alert-count">8</span>
                            <i class='bx bx-comment'></i>
                        </a> */}
                        <div className="dropdown-menu dropdown-menu-end">
                            <a href="javascript:;">
                                <div className="msg-header">
                                    <p className="msg-header-title">Messages</p>
                                    <p className="msg-header-clear ms-auto">Marks all as read</p>
                                </div>
                            </a>
                            <div className="header-message-list">
                                <a className="dropdown-item" href="javascript:;">
                                    <div className="d-flex align-items-center">
                                        <div className="user-online">
                                            <img src="/assets/images/avatars/avatar-1.png" className="msg-avatar"
                                                alt="user avatar" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="msg-name">Daisy Anderson <span className="msg-time float-end">5 sec
                                                ago</span></h6>
                                            <p className="msg-info">The standard chunk of lorem</p>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="javascript:;">
                                    <div className="d-flex align-items-center">
                                        <div className="user-online">
                                            <img src="/assets/images/avatars/avatar-2.png" className="msg-avatar"
                                                alt="user avatar" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="msg-name">Althea Cabardo <span className="msg-time float-end">14
                                                sec ago</span></h6>
                                            <p className="msg-info">Many desktop publishing packages</p>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="javascript:;">
                                    <div className="d-flex align-items-center">
                                        <div className="user-online">
                                            <img src="/assets/images/avatars/avatar-3.png" className="msg-avatar"
                                                alt="user avatar" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="msg-name">Oscar Garner <span className="msg-time float-end">8 min
                                                ago</span></h6>
                                            <p className="msg-info">Various versions have evolved over</p>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="javascript:;">
                                    <div className="d-flex align-items-center">
                                        <div className="user-online">
                                            <img src="/assets/images/avatars/avatar-4.png" className="msg-avatar"
                                                alt="user avatar" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="msg-name">Katherine Pechon <span className="msg-time float-end">15
                                                min ago</span></h6>
                                            <p className="msg-info">Making this the first true generator</p>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="javascript:;">
                                    <div className="d-flex align-items-center">
                                        <div className="user-online">
                                            <img src="/assets/images/avatars/avatar-5.png" className="msg-avatar"
                                                alt="user avatar" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="msg-name">Amelia Doe <span className="msg-time float-end">22 min
                                                ago</span></h6>
                                            <p className="msg-info">Duis aute irure dolor in reprehenderit</p>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="javascript:;">
                                    <div className="d-flex align-items-center">
                                        <div className="user-online">
                                            <img src="/assets/images/avatars/avatar-6.png" className="msg-avatar"
                                                alt="user avatar" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="msg-name">Cristina Jhons <span className="msg-time float-end">2 hrs
                                                ago</span></h6>
                                            <p className="msg-info">The passage is attributed to an unknown</p>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="javascript:;">
                                    <div className="d-flex align-items-center">
                                        <div className="user-online">
                                            <img src="/assets/images/avatars/avatar-7.png" className="msg-avatar"
                                                alt="user avatar" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="msg-name">James Caviness <span className="msg-time float-end">4 hrs
                                                ago</span></h6>
                                            <p className="msg-info">The point of using Lorem</p>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="javascript:;">
                                    <div className="d-flex align-items-center">
                                        <div className="user-online">
                                            <img src="/assets/images/avatars/avatar-8.png" className="msg-avatar"
                                                alt="user avatar" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="msg-name">Peter Costanzo <span className="msg-time float-end">6 hrs
                                                ago</span></h6>
                                            <p className="msg-info">It was popularised in the 1960s</p>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="javascript:;">
                                    <div className="d-flex align-items-center">
                                        <div className="user-online">
                                            <img src="/assets/images/avatars/avatar-9.png" className="msg-avatar"
                                                alt="user avatar" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="msg-name">David Buckley <span className="msg-time float-end">2 hrs
                                                ago</span></h6>
                                            <p className="msg-info">Various versions have evolved over</p>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="javascript:;">
                                    <div className="d-flex align-items-center">
                                        <div className="user-online">
                                            <img src="/assets/images/avatars/avatar-10.png" className="msg-avatar"
                                                alt="user avatar" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="msg-name">Thomas Wheeler <span className="msg-time float-end">2 days
                                                ago</span></h6>
                                            <p className="msg-info">If you are going to use a passage</p>
                                        </div>
                                    </div>
                                </a>
                                <a className="dropdown-item" href="javascript:;">
                                    <div className="d-flex align-items-center">
                                        <div className="user-online">
                                            <img src="/assets/images/avatars/avatar-11.png" className="msg-avatar"
                                                alt="user avatar" />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="msg-name">Johnny Seitz <span className="msg-time float-end">5 days
                                                ago</span></h6>
                                            <p className="msg-info">All the Lorem Ipsum generators</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <a href="javascript:;">
                                <div className="text-center msg-footer">View All Messages</div>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="user-box dropdown">
                <a className="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#"
                    role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://i.pravatar.cc/150?u=a04s1f4dd04d" className="user-img" alt="user avatar" />
                    <div className="user-info ps-3">
                        <p className="user-name mb-0">Aji Bayu Nugroho</p>
                        <p className="designattion mb-0">Web Developer</p>
                    </div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item" href="javascript:;"><i className="bx bx-user"></i><span>Profile</span></a>
                    </li>
                    <li><a className="dropdown-item" href="javascript:;"><i className="bx bx-cog"></i><span>Settings</span></a>
                    </li>
                    <li><a className="dropdown-item" href="javascript:;"><i
                        class='bx bx-home-circle'></i><span>Dashboard</span></a>
                    </li>
                    <li><a className="dropdown-item" href="javascript:;"><i
                        class='bx bx-dollar-circle'></i><span>Earnings</span></a>
                    </li>
                    <li><a className="dropdown-item" href="javascript:;"><i
                        class='bx bx-download'></i><span>Downloads</span></a>
                    </li>
                    <li>
                        <div className="dropdown-divider mb-0"></div>
                    </li>
                    <li><a className="dropdown-item" href="javascript:;"><i
                        class='bx bx-log-out-circle'></i><span>Logout</span></a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>;
};

export default Header;