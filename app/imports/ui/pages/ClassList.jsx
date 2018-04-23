import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/stuff';
import StuffItem from '/imports/ui/components/StuffItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ClassList extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }


  /** Render the page once subscriptions have been received. */
  renderPage() {
    const itemColor = { color: '#000' };
    return (
        <Container>
          <Header as="h2" textAlign="center" style={itemColor}>Class List</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Department</Table.HeaderCell>
                <Table.HeaderCell>Course Number</Table.HeaderCell>
                <Table.HeaderCell>Subject</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Biology</Table.Cell>
                <Table.Cell>421</Table.Cell>
                <Table.Cell>Immunology</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>ICS</Table.Cell>
                <Table.Cell>311</Table.Cell>
                <Table.Cell>Algorithms</Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>Physics</Table.Cell>
                <Table.Cell>101</Table.Cell>
                <Table.Cell>Intro to Physics</Table.Cell>
              </Table.Row>

            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ClassList.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ClassList);