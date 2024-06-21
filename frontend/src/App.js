import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';
import About from './Components/About';
import Login from './Components/login';

export default class App extends Component {
  k = 20;
  apikey = process.env.REACT_APP_NEWS_API;
  constructor() {
    super();
    this.state = {
      progress: 0,
      isLoggedIn: false,
      query: "",
      country: "in",
      mode: "light"
    };
  }

  setProgress = (progress) => {
    this.setState({ progress });
  };

  handleLogout = () => {
    this.setState({ isLoggedIn: false });
  };

  handleLogin = () => {
    this.setState({ isLoggedIn: true });
  };

  toggled = () => {
    this.setState({ mode: this.state.mode === "light" && this.state.isLoggedIn ? "dark" : "light" });
  }

  handlecountrychange = (country) => {
    this.setState({ country })
  }

  onquery = (q) => {
    this.setState({ query: q });
  }

  render() {
    const { isLoggedIn, query } = this.state;

    return (
      <div fluid="true">
        <BrowserRouter>
          {isLoggedIn && <div>
            <LoadingBar
              color='red'
              height={3}
              progress={this.state.progress}
            />
          </div>}
          {isLoggedIn && <NavBar mode={this.state.mode} toggled={this.toggled} onquery={this.onquery} logout={this.handleLogout} oncountry={this.handlecountrychange} />}
          <Routes>
            {isLoggedIn ? (
              <>
                <Route exact path='/' element={<About mode={this.state.mode} />}></Route>
                <Route exact path='/general' element={<News setProgress={this.setProgress} mode={this.state.mode} query={query} apikey={this.apikey} key="general" pageSize={this.k} country={this.state.country} cat='general' />}></Route>
                <Route exact path='/business' element={<News setProgress={this.setProgress} mode={this.state.mode} query={query} apikey={this.apikey} key="business" pageSize={this.k} country={this.state.country} cat='business' />}></Route>
                <Route exact path='/entertainment' element={<News setProgress={this.setProgress} mode={this.state.mode} query={query} apikey={this.apikey} key="entertainment" pageSize={this.k} country={this.state.country} cat='entertainment' />}></Route>
                <Route exact path='/health' element={<News setProgress={this.setProgress} mode={this.state.mode} query={query} apikey={this.apikey} key="health" pageSize={this.k} country={this.state.country} cat='health' />}></Route>
                <Route exact path='/science' element={<News setProgress={this.setProgress} mode={this.state.mode} query={query} apikey={this.apikey} key="science" pageSize={this.k} country={this.state.country} cat='science' />}></Route>
                <Route exact path='/sports' element={<News setProgress={this.setProgress} mode={this.state.mode} query={query} apikey={this.apikey} key="sports" pageSize={this.k} country={this.state.country} cat='sports' />}></Route>
                <Route exact path='/technology' element={<News setProgress={this.setProgress} mode={this.state.mode} query={query} apikey={this.apikey} key="technology" pageSize={this.k} country={this.state.country} cat='technology' />}></Route>
              </>
            ) : (
              <Route exact path="*" element={<Login handleLogin={this.handleLogin} />} />
            )}
          </Routes>
        </BrowserRouter>
        {this.state.isLoggedIn && <footer className="bg-dark text-light py-2">
          <container fluid className="text-center">
            <p className="mb-1">
              &copy; {new Date().getFullYear()} Mindspace News. All rights reserved.
            </p>
          </container>
        </footer>}
      </div>
    )
  }
}
