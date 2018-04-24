import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import { TutorSessions, SessionSchema } from '/imports/api/session/session';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import NumField from 'uniforms-semantic/NumField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders the Page for editing a single document. */
class EditSession extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { tutor, course, coursenumber, location, date, time, _id } = data;
    TutorSessions.update(_id, { $set: { tutor, course, coursenumber, location, date, time } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Session</Header>
            <AutoForm schema={SessionSchema} onSubmit={this.submit} model={this.props.doc}>
              <Segment>
                <TextField name='tutor'/>
                <TextField name='course'/>
                <NumField name='coursenumber' decimal={false}/>
                <TextField name='location'/>
                <TextField name='time'/>
                Date
                <DatePicker name='date' required selected={this.state.startDate} onChange={this.handleChange} />
                <hr/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value='fakeuser@foo.com'/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditSession.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('TutorSessions');
  return {
    doc: TutorSessions.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditSession);
