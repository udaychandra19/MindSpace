import React, { Component } from 'react';
class Newsitem extends Component {
    state = {
        hover: false,
        comment: "",
        liked: false,
        disliked: false,
        feedback: "",
        feed: true,
        spam: false,
        user: "",
        lc: 0,
        s: 0,
        dlc: 0,
        saved: {},
        tick: false
    };

    async componentDidMount() {
        this.setState({ user: this.props.user });
    }

    handleMouseEnter = () => {
        this.setState({ hover: true });
    };

    handleMouseLeave = () => {
        this.setState({ hover: false });
    };

    like = () => {
        if (this.state.lc === 0) {
            this.setState({ lc: 1 });
            this.setState({ disliked: false, liked: true });
        }
        else {
            this.setState({ lc: 0 });
            this.setState({ disliked: false, liked: false });
        }
    }

    dislike = () => {
        if (this.state.dlc === 0) {
            this.setState({ dlc: 1 });
            this.setState({ disliked: true, liked: false });
        }
        else {
            this.setState({ dlc: 0 });
            this.setState({ disliked: false, liked: false });
        }
    }

    save = () => {
        if (this.state.s === 0) {
            this.setState({ s: 1, tick: true });
            const savedItem = {
                title: this.props.title,
                description: this.props.description,
                imgurl: this.props.imgurl,
                newsurl: this.props.newsurl,
                date: this.props.date,
                author: this.props.author,
                mode: this.props.mode
            };


            this.setState({ saved: savedItem }, () => {
                this.props.saveditem(this.state.saved);
            });
        }
    }

    commented = (e) => {
        this.setState({ comment: e.target.value });
    };

    render() {
        const { title, description, imgurl, newsUrl, date, author, mode } = this.props;
        const { hover, liked, disliked, feed, feedback } = this.state;

        return (
            <div
                className="card my-3"
                style={{
                    backgroundColor: mode === "light" ? '#fdf6e4' : '#666',
                    borderRadius: "10px",
                    transform: hover ? "scale(1.05)" : "scale(1)",
                    transition: "transform 0.3s ease-in-out"
                }}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <img
                    src={imgurl ? imgurl : "https://i1.sndcdn.com/avatars-Xh3ioDkcmZNdi0pG-TJHXqw-t500x500.jpg"}
                    alt=""
                    style={{
                        objectFit: "cover",
                        height: "200px",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px"
                    }}
                />
                <div className="card-body">
                    <h5 className="card-title" style={{ color: mode === "light" ? "black" : "#fdf6e4" }}>{title}</h5>
                    <p className="card-text" style={{ color: mode === "light" ? "black" : "#fdf6e4" }}>{description}</p>
                    <p className="card-text" style={{ color: mode === "light" ? "black" : "#fdf6e4" }}>
                        {author ? ("By " + author + " on " + new Date(date).toGMTString()) : ""}
                    </p>
                    <div className='d-flex justify-content-start align-items-center mt-3' style={{ overflow: "clip" }}>
                        <a href={newsUrl} className={mode === "light" ? "btn btn-dark" : "btn btn-light"} style={{ color: mode === "light" ? "#fdf6e4" : "black", backgroundColor: mode === "light" ? "black" : "#fdf6e4", marginRight: "87px" }} target="_blank" rel="noopener noreferrer">Explore</a>
                        <button className="btn btn" onClick={this.like} style={{ border: "0px", borderColor: mode === "light" ? "#fdf4e6" : "#666" }}>
                            {!this.props.profile ? <i className={liked ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"} style={{ color: mode === "light" ? "black" : "#fdf6e4" }}></i> : ""}
                        </button>
                        <button className="btn btn" onClick={this.dislike} style={{ border: "0px", borderColor: mode === "light" ? "#fdf4e6" : "#666" }}>
                            {!this.props.profile ? <i className={disliked ? "bi bi-hand-thumbs-down-fill" : "bi bi-hand-thumbs-down"} style={{ color: mode === "light" ? "black" : "#fdf6e4" }}></i> : ""}
                        </button>
                        <button className="btn btn" onClick={this.save} style={{ border: "0px", borderColor: mode === "light" ? "#fdf4e6" : "#666" }}>
                            {!this.props.profile ? !this.state.tick ? <i className="bi bi-bookmark" style={{ color: mode === "light" ? "black" : "#fdf6e4" }}></i> : <i className="bi bi-bookmark-fill" style={{ color: mode === "light" ? "black" : "#fdf6e4" }}></i> : ""}
                        </button>
                    </div>
                    <form className='d-flex' onSubmit={this.handlecomment}>
                        {!this.props.profile ? feed && <input className='form-control' type="text" placeholder="Add comment" style={{ marginTop: "15px", backgroundColor: mode === "light" ? "white" : "#fdf6e4" }} onChange={this.commented} /> : ""}
                    </form>
                    {!this.props.profile ? !feed && <div className="text-center" style={{ marginTop: "15px", color: mode === "dark" ? feedback === "Positive" ? "white" : "black" : feedback === "Positive" ? "#228B22" : feedback === "Neutral" ? "blue" : "red" }}>
                        {!this.state.spam && feedback === "Positive" && <i className="bi bi-check-circle-fill">{" "}Thank you for your valuable feedback! We&apos;re glad you had a great experience.</i>}
                        {!this.state.spam && feedback === "Neutral" && <i className="bi bi-info-circle-fill">{" "}We appreciate your feedback and will consider it for improvements.</i>}
                        {!this.state.spam && feedback === "Negative" && <i className="bi bi-x-circle-fill">{" "}We regret that your experience did not meet expectations but appreciate your feedback.</i>}
                        {this.state.spam && <i className="bi bi-exclamation-triangle-fill" style={{ color: "red" }}>{" "}Spam comment detected.</i>}
                    </div> : ""}
                </div>
            </div>
        );
    }
}

export default Newsitem;
