const upsertStreamUser = require('../convex/functions/upsertStreamUser');

// Replace these values with test user info
const userId = 'test-user-id';
const userName = 'Test User';
const imageUrl = 'https://placehold.co/100x100';

upsertStreamUser(userId, userName, imageUrl)
  .then(() => {
    console.log('User upserted successfully.');
  })
  .catch((err) => {
    console.error('Upsert failed:', err);
  });
