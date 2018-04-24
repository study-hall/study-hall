import React from 'react';
import { Grid, Card, Image, Icon, Table, Container } from 'semantic-ui-react';
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
            7 sessions
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
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Algorithms</Table.Cell>
                    <Table.Cell>311</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>Software Engineering</Table.Cell>
                    <Table.Cell>314</Table.Cell>
                  </Table.Row>
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
                    <Table.HeaderCell>Tutor</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>Tutty Frooty</Table.Cell>
                    <Table.Cell>Tomorrow</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>DA DOOD</Table.Cell>
                    <Table.Cell>Weneva</Table.Cell>
                  </Table.Row>
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
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const UserHomeContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().profile.name : '',
  usersMajor: Meteor.user() ? Meteor.user().profile.major : '',
}))(UserHome);

export default withRouter(UserHomeContainer);
