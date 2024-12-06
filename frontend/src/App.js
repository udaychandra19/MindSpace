import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';
import About from './Components/About';
import Login from './Components/Login';
import Profile from './Components/Profile';

export default class App extends Component {
  k = 20;
  apikey = process.env.REACT_APP_NEWS_API;

  constructor() {
    super();
    this.state = {
      liked: [],
      username: "",
      progress: 0,
      isLoggedIn: false,
      query: "",
      country: "us",
      mode: "light",
      saved: [],
      token: ""
    };
  }

  setProgress = (progress) => {
    this.setState({ progress });
  };

  handleLike = (likes) => {
    this.setState({ liked: likes });
  }

  handleLogout = () => {
    this.setState({ mode: "light", isLoggedIn: false, username: "", token: "" });
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  handleLogin = (user, token) => {
    this.setState({ username: user, isLoggedIn: true, token: token });
    localStorage.setItem("token", token);
    localStorage.setItem("username", user);
  };

  toggled = () => {
    this.setState({ mode: this.state.mode === "light" && this.state.isLoggedIn ? "dark" : "light" });
  }

  handlecountrychange = (country) => {
    this.setState({ country });
  }

  onquery = (q) => {
    this.setState({ query: q });
  }

  saveditem = (save) => {
    this.setState((prevState) => ({
      saved: [...prevState.saved, save]
    }), () => {
      console.log(this.state.saved);
    });
  };

  componentDidMount() {
    const savedToken = localStorage.getItem("token");
    const savedUsername = localStorage.getItem("username");

    if (savedToken && savedUsername) {
      this.setState({ isLoggedIn: true, username: savedUsername, token: savedToken });
    }
  }


  render() {
    const { isLoggedIn, query, token } = this.state;

    const footerStyle = {
      backgroundColor: '#242424',
      color: '#f0f0f0',
      textAlign: 'center',
      padding: '10px 0',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      zIndex: 1000,
    };

    const containerStyle = {
      position: 'relative',
      minHeight: '100vh'
    };

    const contentStyle = {
      paddingBottom: '50px',
    };

    return (
      <div style={containerStyle}>
        <BrowserRouter>
          {isLoggedIn && (
            <div>
              <LoadingBar color='red' height={3} progress={this.state.progress} />
            </div>
          )}
          {isLoggedIn && (
            <NavBar
              mode={this.state.mode}
              toggled={this.toggled}
              onquery={this.onquery}
              logout={this.handleLogout}
              oncountry={this.handlecountrychange}
            />
          )}
          <div style={contentStyle}>
            <Routes>
              {isLoggedIn ? (
                <>
                  <Route exact path='/' element={<About mode={this.state.mode} />} />
                  <Route exact path='/general' element={<News setProgress={this.setProgress} mode={this.state.mode} query={query} handlelike={this.handleLike} user={this.state.username} apikey={this.apikey} key="general" pageSize={this.k} country={this.state.country} saveditem={this.saveditem} cat='general' />} />
                  <Route exact path='/business' element={<News setProgress={this.setProgress} mode={this.state.mode} query={query} handlelike={this.handleLike} user={this.state.username} apikey={this.apikey} key="business" pageSize={this.k} country={this.state.country} saveditem={this.saveditem} cat='business' />} />
                  <Route exact path='/entertainment' element={<News setProgress={this.setProgress} mode={this.state.mode} query={query} handlelike={this.handleLike} user={this.state.username} apikey={this.apikey} key="entertainment" pageSize={this.k} country={this.state.country} saveditem={this.saveditem} cat='entertainment' />} />
                  <Route exact path='/health' element={<News setProgress={this.setProgress} mode={this.state.mode} query={query} handlelike={this.handleLike} user={this.state.username} apikey={this.apikey} key="health" pageSize={this.k} country={this.state.country} saveditem={this.saveditem} cat='health' />} />
                  <Route exact path='/science' element={<News setProgress={this.setProgress} mode={this.state.mode} query={query} handlelike={this.handleLike} user={this.state.username} apikey={this.apikey} key="science" pageSize={this.k} country={this.state.country} saveditem={this.saveditem} cat='science' />} />
                  <Route exact path='/sports' element={<News setProgress={this.setProgress} mode={this.state.mode} query={query} handlelike={this.handleLike} user={this.state.username} apikey={this.apikey} key="sports" pageSize={this.k} country={this.state.country} saveditem={this.saveditem} cat='sports' />} />
                  <Route exact path='/technology' element={<News setProgress={this.setProgress} mode={this.state.mode} query={query} handlelike={this.handleLike} user={this.state.username} apikey={this.apikey} key="technology" pageSize={this.k} country={this.state.country} saveditem={this.saveditem} cat='technology' />} />
                  <Route exact path='/profile' element={<Profile liked={this.state.liked} savedList={this.state.saved} setProgress={this.setProgress} user={this.state.username} loggedout={this.handleLogout} mode={this.state.mode} />} />
                </>
              ) : (
                <Route exact path="*" element={<Login handleLogin={this.handleLogin} />} />
              )}
            </Routes>
          </div>
        </BrowserRouter>

        {this.state.isLoggedIn && (
          <footer style={footerStyle}>
            <p>&copy; {new Date().getFullYear()} Mindspace News. All rights reserved.</p>
          </footer>
        )}
      </div>
    );
  }
}
