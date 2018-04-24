import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const UserProfile = new Mongo.Collection('UserProfile');

/** Create a schema to constrain the structure of documents associated with this collection. */
const SessionSchema = new SimpleSchema({
  Subject: String,
  TutorSessions: String,
  <Image floated='right' size='mini' src={this.props.contact.image} />
}, { tracker: Tracker });

/** Attach this schema to the collection. */
UserProfile.attachSchema(SessionSchema);

/** Make the collection and schema available to other code. */
export { UserProfile, SessionSchema };
