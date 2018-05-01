import React from 'react';
import { Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return <Redirect to='/'/>;
            /* (
        <Header as="h2" textAlign="center">
        <p>You are signed out.</p>
      </Header>
    ); */
  }
}
