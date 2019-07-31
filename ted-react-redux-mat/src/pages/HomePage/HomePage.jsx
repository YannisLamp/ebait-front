import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



class HomePage extends React.Component {
    //componentDidMount() {
    //    this.props.dispatch(userActions.getAll());
    //}

    render() {
        const { user } = this.props;
        console.log(user);
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}


function mapStateToProps(state) {
    const { auth } = state;
    const { user } = auth;
    return {
        user
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };