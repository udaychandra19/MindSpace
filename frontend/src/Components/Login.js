import React, { Component } from 'react';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            isSignedIn: false,
            forgot: false,
            alert: false,
            message: "",
            loader: false
        };
    }

    forgotpass = () => {
        this.setState({ forgot: true });
    }

    alerting = () => {
        this.setState({ alert: true })
        setTimeout(() => {
            this.setState({ alert: false })
        }, 2000);
    }

    handleLogin = async (event) => {
        event.preventDefault();
        const { username, email, password } = this.state;
        try {
            this.setState({ loader: true });
            const response = await fetch((this.state.isSignedIn) ? this.state.forgot ? `http://localhost:5000/reset` : `http://localhost:5000/login` : `http://localhost:5000/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.isSignedIn ? this.state.forgot ? { username, password } : { username, password } : { username, email, password })
            });

            const data = await response.json();
            if (response.ok) {
                const token = data.token;
                this.props.handleLogin(username, token);
                this.setState({ forgot: false });
                this.props.handleLogin(username);
                this.setState({ message: data.message });
                console.log(data.message);
            } else {
                console.error(data.error);
                this.setState({ message: data.error });
                this.alerting();
            }
        } catch (error) {
            console.error('Error:', error);
            this.setState({ message: error });
            this.alerting();
        }
    };


    handleSignOut = () => {
        this.state.forgot === true ? this.setState({ forgot: false }) : this.setState({ isSignedIn: false });
    };

    handleSignin = () => {
        this.setState({ isSignedIn: true });
    };

    render() {
        const { username, password, email } = this.state;

        return (
            <div>
                <div className="container" style={{ width: '500px' }}>
                    <div className="row justify-content-center" style={{ width: "500px", marginTop: "120px", marginBottom: "0px" }}>
                        <div className="col-lg-8 col-md-6" style={{ width: "500px" }}>
                            <div className="card shadow">
                                <div className="card-body" style={{ width: "470px", height: !this.state.isSignedIn ? '530px' : '480px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <h2 className="card-title text-center mb-4" style={{ marginTop: "18px", textDecoration: "underline" }}>Welcome to MindSpace</h2>
                                    {this.state.alert && <div className="alert text-center alert-danger" role="alert" style={{ margin: "0px", marginBottom: "10px" }}>
                                        {this.state.message}
                                    </div>}
                                    <form onSubmit={this.handleLogin}>
                                        <div className="form-group">
                                            <label className="label-group my-1" htmlFor="username">Username :</label>
                                            <input
                                                type="text"
                                                className="form-control my-1"
                                                id="username"
                                                name="username"
                                                value={username}
                                                placeholder='Enter Name'
                                                onChange={(e) => { this.setState({ username: e.target.value }) }}
                                                required
                                            />
                                        </div>
                                        {!this.state.isSignedIn && (<div className="form-group my-3">
                                            <label className="label-group my-1" htmlFor="password">Email :</label>
                                            <input
                                                type="email"
                                                className="form-control my-1"
                                                id="email"
                                                name="email"
                                                value={email}
                                                placeholder='Email Address'
                                                onChange={(e) => { this.setState({ email: e.target.value }) }}
                                                required
                                            />
                                        </div>)}
                                        <div className="form-group my-3">
                                            <label className="label-group my-1" htmlFor="password">{!this.state.forgot ? 'Password :' : 'New Password :'}</label>
                                            <input
                                                type="password"
                                                className="form-control my-1"
                                                id="password"
                                                name="password"
                                                value={password}
                                                placeholder={!this.state.forgot ? 'Enter Password' : 'Enter New Password'}
                                                onChange={(e) => { this.setState({ password: e.target.value }) }}
                                                required
                                            />
                                        </div>
                                        {this.state.loader ? <div className="spinner-border text-dark my-3" role="status" style={{ marginLeft: "200px" }} ></div> : <div className="text-center"><button type="submit" className="btn btn-dark" style={{ width: "100%", marginTop: "13px" }} onClick={this.handleLogin}>{!this.state.isSignedIn ? "Sign Up" : "Login"}</button></div>}
                                    </form>
                                    {!this.state.isSignedIn && <div className='text-center' style={{ marginTop: "10px", marginBottom: "10px" }}>Already have an account?<button className='btn btn-link' style={{ padding: "0px", marginBottom: "5px", marginLeft: "5px", textDecoration: "none" }} onClick={this.handleSignin}>Login</button></div>}
                                    {!this.state.forgot && this.state.isSignedIn && <button className='btn btn-link' style={{ padding: "0px", marginBottom: this.state.loader ? "10px" : "7px", marginTop: "7px", textDecoration: "none" }} onClick={this.forgotpass}>Forgot Password?</button>}
                                    {this.state.isSignedIn && <div className="text-center"><button button className='btn btn-dark' style={{ width: "90px", marginBottom: "13px", marginTop: this.state.forgot ? "15px" : "0px" }} onClick={this.handleSignOut}>&larr; back</button></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
