import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Menu } from 'semantic-ui-react';
import SessionItem from '/imports/ui/components/SessionItem';
import { TutorSessions } from '/imports/api/session/session';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class SessionList extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }


  /** Render the page once subscriptions have been received. */
  renderPage() {
    const itemColor = { color: '#000' };
    const itemSize = { fontSize: '1.3em' };
    const menuStyle = { borderColor: 'white', fontSize: '12px'};
    return (
        <Container>
          <Header as="h2" textAlign="center">Sessions List</Header>
          <Table celled fixed>

            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  Department
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Course Number
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Location
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Date
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Time
                </Table.HeaderCell>
                <Table.HeaderCell>

                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>

                    {this.props.sessions.map((session) => <SessionItem key={session._id} session={session} />)}

            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
SessionList.propTypes = {
  sessions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('TutorSessions');
  return {
    sessions: TutorSessions.find({}).fetch(),
    ready: subscription.ready(),
  };
})(SessionList);