import React from "react";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.name = "";
        this.password = "";
    }

    handleKeyPress = event => {
        if (event.key === "Enter") {
            this.props.onclick(this.name, this.password);
        }
    };

    render() {
        return (
            <div className="login">
                <div className="loginDetailsWrapper">
                    <div className={this.props.error ? "error label" : "label"}>
                        Username:
                    </div>
                    <div className="loginInputWrapper">
                        <input
                            className={
                                this.props.error
                                    ? "error username loginInput"
                                    : "username loginInput"
                            }
                            onChange={event => (this.name = event.target.value)}
                            onKeyPress={this.handleKeyPress}
                        />
                    </div>
                </div>
                <div className="loginDetailsWrapper">
                    <div className={this.props.error ? "error label" : "label"}>
                        Password:
                    </div>
                    <div className="loginInputWrapper">
                        <input
                            className={
                                this.props.error
                                    ? "error password loginInput"
                                    : "username loginInput"
                            }
                            type="password"
                            onChange={event =>
                                (this.password = event.target.value)
                            }
                            onKeyPress={this.handleKeyPress}
                        />
                    </div>
                </div>
                <div
                    className="loginButton"
                    onClick={() => {
                        this.props.onclick(this.name, this.password);
                    }}
                >
                    Login
                </div>
            </div>
        );
    }
}

export default Login;
