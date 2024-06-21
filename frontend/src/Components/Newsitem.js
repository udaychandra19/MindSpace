import React, { Component } from 'react';
class Newsitem extends Component {
    state = {
        hover: false,
        comment: "",
        liked: false,
        disliked: false,
        feedback: "",
        feed: true,
        spam: false
    };

    handleMouseEnter = () => {
        this.setState({ hover: true });
    };

    handleMouseLeave = () => {
        this.setState({ hover: false });
    };

    like = () => {
        this.setState({ disliked: false, liked: true });
    }

    dislike = () => {
        this.setState({ disliked: true, liked: false });
    }

    commented = (e) => {
        this.setState({ comment: e.target.value });
    };

    handlecomment = async (event) => {
        event.preventDefault();
        if (this.state.comment.trim() !== "") {
            try {
                const response = await fetch('http://localhost:5000/comment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ newsId: this.props.id, text: this.state.comment })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                this.setState({ feed: false });
                console.log(data.spammed);
                if (data.spammed) {
                    this.setState({ spam: true });
                }
                else {
                    this.setState({ feedback: data.sentiment });
                }
                setTimeout(() => {
                    this.setState({ feed: true, spam: false })
                }, 2500);
            }
            catch (error) {
                console.error('Error fetching comments:', error);
            }
        }
    }

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
                    <a href={newsUrl} className={mode === "light" ? "btn btn-dark" : "btn btn-light"} style={{ color: mode === "light" ? "#fdf6e4" : "black", backgroundColor: mode === "light" ? "black" : "#fdf6e4", marginRight: "87px" }} target="_blank" rel="noopener noreferrer">Read More</a>
                    <button className="btn btn" onClick={this.like} style={{ border: "0px", borderColor: mode === "light" ? "#fdf4e6" : "#666" }}>
                        <i className={liked ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"} style={{ color: mode === "light" ? "black" : "#fdf6e4" }}></i>
                    </button>
                    <button className="btn btn" onClick={this.dislike} style={{ margin: "0px", borderColor: mode === "light" ? "#fdf4e6" : "#666" }}>
                        <i className={disliked ? "bi bi-hand-thumbs-down-fill" : "bi bi-hand-thumbs-down"} style={{ color: mode === "light" ? "black" : "#fdf6e4" }}></i>
                    </button>
                    <form className='d-flex' onSubmit={this.handlecomment}>
                        {feed && <input className='form-control' type="text" placeholder="Add comment" style={{ marginTop: "15px", backgroundColor: mode === "light" ? "white" : "#fdf6e4" }} onChange={this.commented} />}
                    </form>
                    {!feed && <div className="text-center" style={{ marginTop: "15px", color: mode === "dark" ? feedback === "Positive" ? "white" : "black" : feedback === "Positive" ? "#228B22" : feedback === "Neutral" ? "blue" : "red" }}>
                        {!this.state.spam && feedback === "Positive" && <i className="bi bi-check-circle-fill">{" "}Thank you for your valuable feedback! We&apos;re glad you had a great experience.</i>}
                        {!this.state.spam && feedback === "Neutral" && <i className="bi bi-info-circle-fill">{" "}We appreciate your feedback and will consider it for improvements.</i>}
                        {!this.state.spam && feedback === "Negative" && <i className="bi bi-x-circle-fill">{" "}We regret that your experience did not meet expectations but appreciate your feedback.</i>}
                        {this.state.spam && <i className="bi bi-exclamation-triangle-fill" style={{ color: "red" }}>{" "}Spam comment detected.</i>}
                    </div>}
                </div>
            </div>
        );
    }
}

export default Newsitem;