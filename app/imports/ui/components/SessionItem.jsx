import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class SessionItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.session.course}</Table.Cell>
          <Table.Cell>{this.props.session.coursenumber}</Table.Cell>
          <Table.Cell>{this.props.session.location}</Table.Cell>
          <Table.Cell>{this.props.session.date}</Table.Cell>
          <Table.Cell>{this.props.session.time}</Table.Cell>
          <Table.Cell>
            <Link to={`/edit-session/${this.props.session._id}`}>Edit</Link>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
SessionItem.propTypes = {
  session: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(SessionItem);
