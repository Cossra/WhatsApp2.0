require('dotenv').config({ path: '.env.local' });
// Standalone Node.js script to upsert a user to Stream Chat
// Run with: node convex/functions/testUpsertUser.js

const { StreamChat } = require('stream-chat');

// Load API keys from environment variables or hardcode for testing
const apiKey = process.env.STREAM_API_KEY || 'YOUR_STREAM_API_KEY';
const apiSecret = process.env.STREAM_API_SECRET_KEY || 'YOUR_STREAM_API_SECRET_KEY';

const serverClient = StreamChat.getInstance(apiKey, apiSecret);

// Example user data (replace with real values as needed)
const user = {
  id: 'j578n7j2qsd1waba52eednj45h7qhj8t', // The actual user ID you want to upsert
  name: 'Robert Coss',                    // The user's real name
  image: 'https://placehold.co/100x100', // or your real image URL
  email: 'cossrca@gmail.com',             // The user's email address
};

async function upsertUser() {
	try {
		const response = await serverClient.upsertUser(user);
		console.log('Upsert response:', response);
	} catch (err) {
		console.error('Upsert failed:', err);
	}
}

upsertUser();
