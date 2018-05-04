import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Button } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/stuff';
import { Sessions } from '/imports/api/session/session';
import StuffItem from '/imports/ui/components/StuffItem';
import SessionItem from '/imports/ui/components/SessionItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import _ from 'lodash'
import { withRouter, Link } from 'react-router-dom';

const tableData = [
  { Subject: 'Intro to Financial Accounting', CourseNumber: 201},
  { Subject: 'Federal Individl Income Taxatn', CourseNumber: 401},
  { Subject: 'Law for the Accountant', CourseNumber: 413},
  { Subject: 'Auditing', CourseNumber: 418},
]

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Accounting extends React.Component {
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
          <Header as="h2" textAlign="center">Sessions List</Header>
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
              {_.map(data, ({Subject, CourseNumber, Add}) => (
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
Accounting.propTypes = {
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
})(Accounting);