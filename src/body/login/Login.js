import React from "react";

class Login extends React.Component {
    render() {
        return (
            <div class="login">
                <div class="loginDetailsWrapper">
                    <div class="label">Username:</div>
                    <div class="loginInputWrapper">
                        <input class="username loginInput" />
                    </div>
                </div>
                <div class="loginDetailsWrapper">
                    <div class="label">Password:</div>
                    <div class="loginInputWrapper">
                        <input class="password loginInput" />
                    </div>
                </div>
                <div class="loginButton" onClick={()=>{this.props.onclick()}}>Login</div>
            </div>
        );
    }
}

export default Login;
