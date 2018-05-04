import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Button } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/stuff';
import StuffItem from '/imports/ui/components/StuffItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import _ from 'lodash'
import { withRouter, Link } from 'react-router-dom';

const tableData = [
  { Subject: 'General Physics I', CourseNumber: 170},
  { Subject: 'Theoretical Mechanics', CourseNumber: 310},
  { Subject: 'Quantum Mechanics I', CourseNumber: 480},
  { Subject: 'Electronics for Physicists', CourseNumber: 475},
]

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Physics extends React.Component {
  state = {
    column: null,
    data: tableData,
    direction: null,
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  render() {
    const { column, data, direction } = this.state

    return (
        <Container>
          <Header as="h2" textAlign="center">Physics Department Class List</Header>
          <Table celled fixed>

            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  Subject
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Course Number
                </Table.HeaderCell>
                <Table.HeaderCell>
                  View Class Sessions
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.map(data, ({Subject, CourseNumber}) => (
                  <Table.Row key={Subject}>
                    <Table.Cell>{Subject}</Table.Cell>
                    <Table.Cell>{CourseNumber}</Table.Cell>
                    <Table.Cell><Link to={`/Sessions/${this.props.stuffs._id}`}>View</Link></Table.Cell>
                  </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <Button.Group>
            <Button color='black' sorted={column === 'Subject' ? direction : null} onClick={this.handleSort('Subject')}>Sort A-Z</Button>
            <Button.Or/>
            <Button color='black' sorted={column === 'CourseNumber' ? direction : null} onClick={this.handleSort('CourseNumber')}>Sort 1-100</Button>
          </Button.Group>

        </Container>
    )
  }
}

/** Require an array of Stuff documents in the props. */
Physics.propTypes = {
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
})(Physics);