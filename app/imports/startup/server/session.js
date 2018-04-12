import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { TutorSessions } from '../../api/session/session.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.tutor} (${data.owner})`);
  TutorSessions.insert(data);
}

/** Initialize the collection if empty. */
if (TutorSessions.find().count() === 0) {
  if (Meteor.settings.defaultSession) {
    console.log('Creating default session.');
    Meteor.settings.defaultSession.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('TutorSessions', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return TutorSessions.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('TutorSessionsAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return TutorSessions.find();
  }
  return this.ready();
});
