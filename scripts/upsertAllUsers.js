require('dotenv').config({ path: '.env.local' });
const axios = require('axios');
const { StreamChat } = require('stream-chat');

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET_KEY;
const serverClient = StreamChat.getInstance(apiKey, apiSecret);

async function fetchUsersFromConvex() {
  // Replace with your actual Convex API endpoint
  const response = await axios.get('http://localhost:3000/api/users');
  return response.data; // Should be an array of user objects
}

async function upsertAllUsers() {
  try {
    const users = await fetchUsersFromConvex();
    await serverClient.upsertUsers(users);
    console.log('All users upserted to Stream!');
  } catch (err) {
    console.error('Upsert failed:', err);
  }
}

upsertAllUsers();