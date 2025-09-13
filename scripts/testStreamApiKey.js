"use node";
require('dotenv').config({ path: '.env.local' });
const { StreamChat } = require('stream-chat');

const serverClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET_KEY
);

async function testApiKey() {
  try {
    // Try to upsert a test user
    const response = await serverClient.upsertUsers([
      {
        id: 'stream-test-user',
        name: 'Stream Test User',
        image: 'https://placehold.co/100x100',
        role: 'user'
      }
    ]);
    console.log('API Key Test Success:', response);
  } catch (error) {
    console.error('API Key Test Failed:', error);
  }
}

testApiKey();
