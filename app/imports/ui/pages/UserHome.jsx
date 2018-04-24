import React from 'react';
import { Grid, Card, Image, Icon, Table, Container } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/stuff';
import { TutorSessions } from '/imports/api/session/session';
import StuffItem from '/imports/ui/components/StuffItem';
import SessionItem from '/imports/ui/components/SessionItem';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';

class UserHome extends React.Component {
render() {
  const userName = { fontSize: '20px', paddingTop: '5px', paddingBottom: '5px' };
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
            {this.props.usersMajor}
          </Card.Content>
          <Card.Content extra>
            {this.props.sessions.length} Sessions
            <Icon name='pencil alternate'/>
          </Card.Content>
        </Card>
      </Grid>
      <Grid columns={2} style={textColor} container stackable centered>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <Container>
              <h1>My classes</h1>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Subject</Table.HeaderCell>
                    <Table.HeaderCell>Course Number</Table.HeaderCell>
                    <Table.HeaderCell>Course Number</Table.HeaderCell>
                    <Table.HeaderCell>Contact Tutor</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.classes.map((stuff) => <StuffItem key={stuff._id} stuff={stuff} />)}
                </Table.Body>
              </Table>
            </Container>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Container>
              <h1>My sessions</h1>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Course</Table.HeaderCell>
                    <Table.HeaderCell>Course Number</Table.HeaderCell>
                    <Table.HeaderCell>Location</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Time</Table.HeaderCell>
                    <Table.HeaderCell>Manage</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.sessions.map((session) => <SessionItem key={session._id} session={session} />)}
                </Table.Body>
              </Table>
            </Container>
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
  usersMajor: PropTypes.string,
  classes: PropTypes.array,
  sessions: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const UserHomeContainer = withTracker(() => {
  const classList = Meteor.subscribe('Stuff');
  /* eslint-disable-next-line no-unused-vars */
  const sessionList = Meteor.subscribe('TutorSessions');
  return {
    currentUser: Meteor.user() ? Meteor.user().profile.name : '',
    usersMajor: Meteor.user() ? Meteor.user().profile.major : '',
    classes: Stuffs.find({}).fetch(),
    sessions: TutorSessions.find({}).fetch(),
    ready: classList.ready(),
  };
})(UserHome);

export default withRouter(UserHomeContainer);
