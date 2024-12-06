import React, { Component } from 'react'
import Newsitem from './Newsitem'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {

    constructor(props) {
        console.log("hello this is constructor from news component");
        super(props);
        this.state =
        {
            articles: [],
            loading: true,
            page: 1,
            text: "",
            internet: true,
            mode: this.props.mode,
            country: this.props.country
        }
        document.title = this.caps(this.props.cat) + " - MindSpace";
    }

    componentDidUpdate(prev) {
        if (prev.mode !== this.props.mode) {
            this.setState({ mode: this.props.mode });
            document.body.style.backgroundColor = this.props.mode === "light" ? "#fff" : "#444";
        }
        if (prev.country !== this.props.country) {
            this.setState({ country: this.props.country }, () => { this.componentDidMount(); });
        }
    }

    caps = (text) => {
        return text.substring(0, 1).toUpperCase() + text.substring(1);
    }

    fetchMoreData = async () => {
        try {
            let url = `https://newsapi.org/v2/top-headlines?sortBy=popularity&category=${this.props.cat}&apiKey=${this.props.apikey}&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parseddata = await (data.json());
            console.log(parseddata);
            this.setState({ internet: true })
            this.setState({ articles: this.state.articles.concat(parseddata.articles), page: this.state.page + 1, loading: false });
        }
        catch (error) {
            this.setState({ internet: false })
            console.log("Failed to Fetch");
        }
    }
    // nextpage = async () => {
    //   console.log("next page");
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cat}&apiKey=${this.props.apikey}&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parseddata = await (data.json());
    //   console.log(parseddata);
    //   this.setState({ articles: parseddata.articles, page: this.state.page + 1, loading: false });
    // }
    // prevpage = async () => {
    //   console.log("previous page");
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.cat}&apiKey=${this.props.apikey}&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parseddata = await (data.json());
    //   console.log(parseddata);
    //   this.setState({ articles: parseddata.articles, page: this.state.page - 1, loading: false });
    // }

    async componentDidMount() {
        try {
            this.props.setProgress(10);
            console.log("cdm")
            let url = `https://newsapi.org/v2/top-headlines?sortBy=popularity&category=${this.props.cat}&apiKey=${this.props.apikey}&page=1&pagesize=${this.props.pageSize}`;
            this.props.setProgress(30);
            let data = await fetch(url);
            this.props.setProgress(60);
            let parseddata = await (data.json());
            console.log(parseddata);
            this.props.setProgress(100);
            this.setState({ internet: true })
            this.setState({ articles: parseddata.articles, loading: false });
        }
        catch (error) {
            this.setState({ internet: false })
            console.log("Failed to Fetch");
        }
    }
    render() {
        const queryFound = this.props.query.length > 0 ? this.state.articles.some(e => e.title.includes(this.props.query)) : ".";
        console.log("render");
        const footerStyle = {
            backgroundColor: '#242424',
            color: '#f0f0f0',
            textAlign: 'center',
            padding: '10px 0',
            position: 'fixed',
            width: '100%',
            zIndex: 1000,
        }
        console.log(this.state.internet);
        return (
            <>
                <div>
                    <h1 className="text-center" style={{ fontSize: '40px', color: this.state.mode === "light" ? 'black' : '#fdf6e4', textAlign: 'center', marginTop: "90px" }}>MindSpace - Top {this.props.cat === "general" ? "" : this.caps(this.props.cat)} Headines</h1>
                    {(this.state.loading && this.state.internet) && <div className="text-center" style={{ marginTop: "247px", marginBottom: "247px" }}><div className={this.props.mode === "light" ? "spinner-border text-dark my-3" : "spinner-border text-light my-3"} role="status"></div></div>}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length > 0}
                        loader={this.state.loading ? <div className="text-center" style={{ marginBottom: "10px" }} ><div className={this.props.mode === "light" ? "spinner-border text-dark my-3" : "spinner-border text-light my-3"} role="status"></div></div> : null}
                    >
                        <div className="container my-3">
                            <div className="row" style={{ marginTop: "20px", marginBottom: "60px" }}>
                                {this.state.internet && this.state.articles.map((e, index) => {
                                    return e.title.includes(this.props.query) && e.url !== "https://removed.com" && <div className="col-md-3" key={index}>
                                        <Newsitem handleLike={this.props.handlelike} saveditem={this.props.saveditem} user={this.props.user} mode={this.props.mode} title={e.title ? e.title.slice(0, 45).concat("...") : ""} id={index} description={e.description ? e.description.slice(0, 88).concat("...") : ""} imgurl={e.urlToImage} newsUrl={e.url} date={e.publishedAt} author={e.author} />
                                    </div>
                                })}
                            </div>
                        </div>
                        {(!queryFound || !this.state.internet) && <div className="col-md-12" style={{ height: '426px', marginTop: "150px" }}><div className="card" style={{ maxWidth: '500px', margin: 'auto', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}>
                            <div className="card-body text-center" style={{ backgroundColor: this.state.mode === "light" ? '#fdf6e4' : '#666' }}>
                                {<h4 className="card-title" style={{ color: this.state.mode === "light" ? 'black' : '#fdf6e4', fontWeight: 'bold' }}>{!this.state.internet ? 'No Internet Connection!' : 'No search results found!'}</h4>}
                                <p className="card-text" style={{ color: this.state.mode === "light" ? 'black' : '#fdf6e4' }}>{!this.state.internet ? 'Please check your internet connection and try again.' : 'Try refining your search criteria or explore other topics.'}</p>
                                <hr />
                                <p className="card-text" style={{ color: this.state.mode === "light" ? 'black' : '#fdf6e4' }}>{!this.state.internet ? 'Ensure your device is connected to WiFi or cellular data.' : 'You may also enjoy browsing through our featured articles.'}</p>
                            </div>
                        </div></div>}
                    </InfiniteScroll>
                    {/*<div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-outline-dark" style={{ marginBottom: "30px" }} onClick={this.prevpage}>&larr; Previous</button>
          <button disabled={this.state.articles.length < this.props.pageSize} type="button" className="btn btn-outline-dark" style={{ marginBottom: "30px" }} onClick={this.nextpage}>Next &rarr;</button>
          </div> */}
                </div >
                {this.state.isLoggedIn && (
                    <footer style={footerStyle}>
                        <p>&copy; {new Date().getFullYear()} Mindspace News. All rights reserved.</p>
                    </footer>
                )}
            </>
        )
    }
}

export default News
