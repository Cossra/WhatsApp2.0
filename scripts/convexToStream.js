require('dotenv').config({ path: '.env.local' });
const { StreamChat } = require('stream-chat');
const { ConvexHttpClient } = require('convex/browser');

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET_KEY;
const serverClient = StreamChat.getInstance(apiKey, apiSecret);

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || 'https://blessed-squirrel-286.convex.cloud';
const convex = new ConvexHttpClient(convexUrl);

async function fetchAllUsers() {
  // Replace 'users:searchUsers' with your actual function name and args
  return await convex.query('users:searchUsers', { searchTerm: "" });
}

async function upsertAllUsers() {
  const users = await fetchAllUsers();
  const streamUsers = users.map(user => ({
    id: user.UserId,
    name: user.name,
    image: user.imageUrl,
    email: user.email,
  }));
  await serverClient.upsertUsers(streamUsers);
  console.log('Upserted all users to Stream!');
}

upsertAllUsers();
