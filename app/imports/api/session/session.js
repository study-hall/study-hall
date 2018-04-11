import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const TutorSessions = new Mongo.Collection('TutorSessions');

/** Create a schema to constrain the structure of documents associated with this collection. */
const SessionSchema = new SimpleSchema({
  tutor: String,
  course: String,
  coursenumber: Number,
  location: String,
  date: String,
  time: String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
TutorSessions.attachSchema(SessionSchema);

/** Make the collection and schema available to other code. */
export { TutorSessions, SessionSchema };
