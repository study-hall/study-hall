import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(email, username, password, major, name, role) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: username,
    email: email,
    password: password,
    profile: {
      major: major,
      name: name,
    },
  });
  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
}

Accounts.onCreateUser(function (options, user) {
  console.log(`     Profile: ${options.profile}`);
  if (options.profile) {
    /* eslint-disable-next-line */
    user.profile = options.profile;
  }
  // console.log(`User's major: ${user.profile.major}`);
  return user;
});

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    /* eslint-disable-next-line max-len */
    Meteor.settings.defaultAccounts.map(({ email, username, password, major, name, role }) => createUser(email, username, password, major, name, role));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
