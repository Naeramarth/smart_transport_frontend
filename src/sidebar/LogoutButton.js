import React from "react";

class Login extends React.Component {
    render() {
        return (
            <div
                class="logout"
                onClick={() => {
                    this.props.onclick();
                }}
            >
                Logout
            </div>
        );
    }
}

export default Login;
