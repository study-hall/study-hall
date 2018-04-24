import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Menu } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/stuff';
import StuffItem from '/imports/ui/components/StuffItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ClassList extends React.Component {

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

          <Table celled>
            <Table.Header>
              <Table.Row style={itemSize}>
                <Table.HeaderCell textAlign="center">Departments</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Menu style={menuStyle} attached="top" borderless>
                    <Menu.Item as={NavLink} activeClassName="" exact to="Accounting">
                      <Header>Accounting (ACC)</Header>
                    </Menu.Item>
                  </Menu>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Menu style={menuStyle} attached="top" borderless>
                    <Menu.Item as={NavLink} activeClassName="" exact to="Biology">
                      <Header>Biology (BIOL)</Header>
                    </Menu.Item>
                  </Menu>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Menu style={menuStyle} attached="top" borderless>
                    <Menu.Item as={NavLink} activeClassName="" exact to="ICS">
                      <Header>Information& Computer Sciences (ICS)</Header>
                    </Menu.Item>
                  </Menu>
                </Table.Cell>
              </Table.Row>

              <Table.Row>
                <Table.Cell>
                  <Menu style={menuStyle} attached="top" borderless>
                    <Menu.Item as={NavLink} activeClassName="" exact to="Physics">
                      <Header>Physics (PHYS)</Header>
                    </Menu.Item>
                  </Menu>
                </Table.Cell>
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