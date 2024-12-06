import React, { Component } from 'react';
import { TiUserOutline } from "react-icons/ti";
import { Link } from 'react-router-dom';

export class NavBar extends Component {
    handlequery = (event) => {
        this.setState({ query: event.target.value })
    }
    queried = (event) => {
        event.preventDefault();
        this.props.onquery(this.state.query);
    }
    handlecountry = (event) => {
        this.setState({ country: event.target });
        this.props.oncountry(event.target.value);
    }
    toggle = () => {
        this.props.toggled();
    }
    loggedout = () => {
        window.location.reload();
        setTimeout(() => {
            this.props.logout();
        }, 250);
    }
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            country: ""
        }
    }
    render() {
        return (
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" style={{ marginLeft: "3px", marginBottom: "2px" }}>MindSpace</Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link " aria-current="page" to="/general">General</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to="/business">Business</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to="/entertainment">Entertainment</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to="/health">Health</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to="/science">Science</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to="/sports">Sports</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " to="/technology">Technology</Link>
                            </li>
                        </ul>
                        <button onClick={this.toggle} style={{ border: 'none', backgroundColor: "white", color: 'black', cursor: 'pointer', borderRadius: "20px", marginRight: "9px" }}>{this.props.mode === "dark" ? <i className="fas fa-sun" style={{ backgorundColor: "pink" }}></i> : <i className="fas fa-moon" style={{ backgorundColor: "#242424" }}></i>}</button>
                        <form onSubmit={this.queried} className="d-flex">
                            <input className='form-control me-2' type="text" placeholder="Find News" onChange={this.handlequery} style={{ width: "220px", maxWidth: "220px" }} />
                            <button className='btn btn-light' type="submit" onClick={this.queried} style={{ backgroundColor: "white", color: "#242424", borderColor: "#242424" }}>Search</button>
                        </form>
                        <div style={{ marginLeft: "10px", marginTop: "0px", color: "white" }}>
                            <Link className="nav-link " to="/profile"><TiUserOutline style={{ color: "black", backgroundColor: "white", borderRadius: "10px", height: "30px", width: "30px" }} /></Link>
                        </div>
                    </div>
                </div>
            </nav >
        )
    }
}

export default NavBar;

