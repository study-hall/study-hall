import React from 'react';
import { Grid, Card, Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';

class UserHome extends React.Component {
render() {
  const userName = { fontSize: '20px' };
  const textColor = { color: '#FFFF00' };
  const topPadding = { paddingTop: '50px' };
  return (
    <div>
      <Grid columns={1} style={topPadding} container stackable centered>
        <Card>
          <Image src="../../images/meteor-logo.png"/>
          <Card.Header style={userName}>
            {this.props.currentUser}
          </Card.Header>
          <Card.Content>
            placeholder text
          </Card.Content>
          <Card.Content extra>
            7 sessions
            <Icon name='pencil alternate'/>
          </Card.Content>
        </Card>
      </Grid>
      <Grid columns={2} style={textColor} container stackable centered>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <h1>My classes</h1>
          </Grid.Column>

          <Grid.Column textAlign='center'>
            <h1>My sessions</h1>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
    );
  }
}

/** Declare the types of all properties. */
UserHome.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const UserHomeContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(UserHome);

export default withRouter(UserHomeContainer);
