import React, { Component } from 'react';
import Newsitem from './Newsitem'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SavedArticles: [],
            name: '',
            email: '',
            internet: true
        };
    }

    async componentDidMount() {
        console.log("profile down");
        console.log(this.props.liked);
        console.log("profile up");
        this.setState({ SavedArticles: this.props.savedList });
        this.fetchUserData();
        document.body.style.backgroundColor = this.props.mode === "light" ? "#f7f7f7" : "#333";
    }

    componentDidUpdate(prevProps) {
        if (prevProps.savedList !== this.props.savedList) {
            this.setState({ SavedArticles: [...prevProps.SavedArticles, this.props.savedList] });
        }
        if (prevProps.user !== this.props.user || prevProps.mode !== this.props.mode) {
            this.fetchUserData();
            document.body.style.backgroundColor = this.props.mode === "light" ? "#f7f7f7" : "#333";
        }
        if (prevProps.liked !== this.props.liked) {
            this.setState({ likedArticles: [...prevProps.liked, this.props.liked] })
        }
    }

    fetchUserData = async () => {
        try {
            this.props.setProgress(100);
            console.log(this.props.user);
            const response = await fetch(`http://localhost:5000/info?username=${this.props.user}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            this.setState({ name: data.name, email: data.email });
            console.log(data.List);

        } catch (error) {
            console.error('Error fetching user data:', error);
            this.setState({ internet: false });
        }
    };

    handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/delete?username=${this.props.user}`, {
                method: "DELETE"
            });
            if (response.ok) {
                this.props.loggedout();
                console.log("Account Successfully Deleted");
            }
        } catch (error) {
            console.log("Error Deleting an Account", error);
        }
    };

    render() {
        const styles = {
            container: {
                width: '83vw',
                height: '100%',
                margin: '0 auto',
                padding: '50px',
                fontFamily: 'Roboto, sans-serif',
                backgroundColor: this.props.mode === 'light' ? '#f0f4f9' : '#333',
                color: this.props.mode === 'light' ? '#333' : '#fdf6e4',
                borderRadius: '15px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                animation: 'fadeIn 1s ease-in-out',
                marginTop: "50px"
            },
            card1: {
                backgroundColor: this.props.mode === 'light' ? '#ffffff' : '#444',
                color: this.props.mode === 'light' ? '#333' : '#f0f0f0',
                borderRadius: '10px',
                boxShadow: this.props.mode === 'light' ? '0 4px 8px rgba(0, 0, 0, 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.3)',
                padding: '6px',
                marginBottom: '20px',
                width: "107%"
            },
            card2: {
                backgroundColor: this.props.mode === 'light' ? '#ffffff' : '#444',
                color: this.props.mode === 'light' ? '#333' : '#f0f0f0',
                borderRadius: '10px',
                boxShadow: this.props.mode === 'light' ? '0 4px 8px rgba(0, 0, 0, 0.1)' : '0 4px 12px rgba(0, 0, 0, 0.3)',
                padding: '30px',
                marginBottom: '10px',
                width: "107%"
            },
            cardTitle: {
                margin: '0 0 15px',
                fontSize: '1.6rem',
                fontWeight: '600',
                color: this.props.mode === 'light' ? '#222' : '#eee',
                justifyContent: "center"
            },
            listGroupItem: {
                backgroundColor: this.props.mode === "light" ? "#ffffff" : "#333",
                color: this.props.mode === "light" ? "#000000" : "#f0f0f0",
                padding: "15px",
                border: `1px solid ${this.props.mode === "light" ? "#ddd" : "#444"}`,
                borderRadius: "8px",
                marginTop: "7px",
                marginBottom: "7px",
                transition: "background-color 0.3s ease, color 0.3s ease",
            },
            noSavedCollection: {
                backgroundColor: this.props.mode === 'light' ? '#f7f7f7' : '#444',
                color: this.props.mode === 'light' ? '#333' : '#f0f0f0',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                fontSize: '1.2rem',
                fontWeight: '500',
                lineHeight: '1.8',
                transition: 'background-color 0.3s ease, color 0.3s ease',
            },
            exploreLink: {
                fontWeight: 'bold',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'color 0.3s ease',
            },
            button: {
                backgroundColor: '#FF6F61',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                margin: '0 10px',
            },
            explore: {
                backgroundColor: this.props.mode === 'light' ? '#007bff' : '#66bfff',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '7px 14px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                margin: '0 10px',
            },
            '@keyframes fadeIn': {
                from: { opacity: 0 },
                to: { opacity: 1 },
            },
            '@media (max-width: 768px)': {
                container: {
                    padding: '20px',
                    marginTop: '40px',
                },
            },
        };
        return (
            <div style={styles.container}>
                <div className="row text-center justify-content-center" style={{ marginBottom: "20px" }}>
                    <div className="col-md-8">
                        <div className="card" style={styles.card1}>
                            <div className="card-body">
                                <h5 className="card-title" style={styles.cardTitle}>
                                    {this.state.name.toUpperCase()}
                                </h5>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button className='btn' onClick={this.props.loggedout} style={styles.button}>LogOut</button>
                                    <button className='btn' onClick={this.handleDelete} style={styles.button}>Delete Account</button>
                                </div>
                            </div>
                        </div>
                        <div className="card" style={styles.card1}>
                            <div className="card-body">
                                <h5 className="card-title" style={styles.cardTitle}>
                                    PROFILE
                                </h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item" style={styles.listGroupItem}>
                                        <strong>Name:</strong> {this.state.name}
                                    </li>
                                    <li className="list-group-item" style={styles.listGroupItem}>
                                        <strong>Email:</strong> {this.state.email}
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="container my-3" style={styles.card2}>
                            {this.state.SavedArticles.length === 0 ? "" : <h5 className="card-title" style={styles.cardTitle}>
                                SAVED COLLECTION
                            </h5>}
                            <div className="row">
                                {this.state.SavedArticles.length === 0 ? (
                                    <div style={styles.noSavedCollection}>
                                        <strong>No Saved Cards Yet!</strong>
                                        <p>It looks like you haven&apos;t saved any cards. Start exploring and save your favorite articles to see them here!</p>
                                        <button style={styles.explore}><Link className="nav-link" to="/general" style={styles.exploreLink}>
                                            Explore Now!
                                        </Link></button>
                                    </div>
                                ) : this.state.internet && this.state.SavedArticles.map((e, index) => {
                                    return <div className="col-md-4" key={index}>
                                        <Newsitem user={this.props.user} mode={this.props.mode} title={e.title ? e.title.slice(0, 45).concat("...") : ""} id={index} description={e.description ? e.description.slice(0, 88).concat("...") : ""} imgurl={e.imgurl} newsUrl={e.newsurl} date={e.publishedAt} author={e.author} profile={true} />
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
