import React, { Component } from 'react';
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
            <div className="d-flex align-items-center">
              <select className="form-select me-2" placeholder={this.state.country} onChange={this.handlecountry}>
                <option value="in">Select Country</option>
                <option value="ae">United Arab Emirates</option>
                <option value="ar">Argentina</option>
                <option value="at">Austria</option>
                <option value="au">Australia</option>
                <option value="be">Belgium</option>
                <option value="bg">Bulgaria</option>
                <option value="br">Brazil</option>
                <option value="ca">Canada</option>
                <option value="ch">Switzerland</option>
                <option value="cn">China</option>
                <option value="co">Colombia</option>
                <option value="cu">Cuba</option>
                <option value="cz">Czech Republic</option>
                <option value="de">Germany</option>
                <option value="eg">Egypt</option>
                <option value="fr">France</option>
                <option value="gb">United Kingdom</option>
                <option value="gr">Greece</option>
                <option value="hk">Hong Kong</option>
                <option value="hu">Hungary</option>
                <option value="id">Indonesia</option>
                <option value="ie">Ireland</option>
                <option value="il">Israel</option>
                <option value="in">India</option>
                <option value="it">Italy</option>
                <option value="jp">Japan</option>
                <option value="kr">South Korea</option>
                <option value="lt">Lithuania</option>
                <option value="lv">Latvia</option>
                <option value="ma">Morocco</option>
                <option value="mx">Mexico</option>
                <option value="my">Malaysia</option>
                <option value="ng">Nigeria</option>
                <option value="nl">Netherlands</option>
                <option value="no">Norway</option>
                <option value="nz">New Zealand</option>
                <option value="ph">Philippines</option>
                <option value="pl">Poland</option>
                <option value="pt">Portugal</option>
                <option value="ro">Romania</option>
                <option value="rs">Serbia</option>
                <option value="ru">Russia</option>
                <option value="sa">Saudi Arabia</option>
                <option value="se">Sweden</option>
                <option value="sg">Singapore</option>
                <option value="sk">Slovakia</option>
                <option value="th">Thailand</option>
                <option value="tr">Turkey</option>
                <option value="tw">Taiwan</option>
                <option value="ua">Ukraine</option>
                <option value="us">United States</option>
                <option value="ve">Venezuela</option>
                <option value="za">South Africa</option>
              </select>
            </div>
            <form onSubmit={this.queried} className="d-flex">
              <input className='form-control me-2' type="text" placeholder="Find News" onChange={this.handlequery} style={{ width: "220px", maxWidth: "220px" }} />
              <button className='btn btn-light' type="submit" onClick={this.queried} style={{ backgroundColor: "white", color: "#242424", borderColor: "#242424" }}>Search</button>
            </form>
            <button className='btn btn-dark' onClick={this.loggedout} style={{ backgroundColor: "#FFA07A", color: "#242424", borderColor: "#242424", marginLeft: "7px" }}>LogOut</button>
          </div>
        </div>
      </nav >
    )
  }
}

export default NavBar;

