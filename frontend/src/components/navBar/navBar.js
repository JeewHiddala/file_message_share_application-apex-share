import React, { Component } from 'react';       //import react and react components
import { Link, BrowserRouter as Router } from "react-router-dom";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

import logo from '../../images/logo.jpg';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.logOut = this.logOut.bind(this);

        this.state = {
            currentUser: undefined,
            isManager: false,
            isWorker: false,
            isAdmin: false
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
            });
        }

        UserService.getUserBoard()
            .then(
                response => {
                    console.log("fffffff", response.data.role.name);
                    if (!response.data.role.name.localeCompare("manager")) {
                        this.setState({
                            isManager: true,
                        });
                        console.log("mmmm", this.state.isManager);

                    } else if (!response.data.role.name.localeCompare("worker")) {
                        this.setState({
                            isWorker: true,
                        });
                    } else if (!response.data.role.name.localeCompare("admin")) {
                        this.setState({
                            isAdmin: true,
                        });
                    }

                }
            );
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const { currentUser } = this.state;
        const { isManager } = this.state;
        const { isWorker } = this.state;
        const { isAdmin } = this.state;

        return (
            <div>
                <Router>
                    <div className="navBar">
                        <nav className="navbar sticky-top navbar-expand navbar-dark bg-dark">
                            &ensp;<img src={logo} width="50px" height="50px" alt="Hotel Skylight" />
                            <Link to={"/"} className="navbar-brand">
                                &ensp;Hotel Skylight
                            </Link>
                            <div className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/home#rooms">Rooms</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/home#gallery">Dining</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/home#contact">About</a>
                                </li>

                                {isManager && (
                                    <li className="nav-item">
                                        <a className="nav-link" href="/managerproperties">User</a>
                                    </li>
                                )}
                                {isWorker && (
                                    <li className="nav-item">
                                        <a className="nav-link" href="/create-message">User</a>
                                    </li>
                                )}
                                {isAdmin && (
                                    <li className="nav-item">
                                        <a className="nav-link" href="/workingEmployee">User</a>
                                    </li>
                                )}

                            </div>

                            {currentUser ? (
                                <div className="navbar-nav ms-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href="/profile">{currentUser.userName}</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/login" className="nav-link" onClick={this.logOut}>
                                            LogOut&ensp;&ensp;
                                        </a>
                                    </li>
                                </div>
                            ) : (
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <a className="nav-link" href="/login">Login</a>
                                    </li>

                                </div>
                            )}
                        </nav>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Navbar;