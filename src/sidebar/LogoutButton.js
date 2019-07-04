import React from "react";

class Login extends React.Component {
    render() {
        return (
            <div
                className="logout"
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
