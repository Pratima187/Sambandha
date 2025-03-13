"use server"

import { StreamChat } from "stream-chat";

// Initialize the Stream client
const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey) {
  throw new Error('NEXT_PUBLIC_STREAM_API_KEY is not set');
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export async function connectUser(userID, userName) {

  // In a real app, you would generate this token on the server
  const token = streamClient.createToken(userID);
  await streamClient.connectUser({ id: userID, name: userName }, token);
}

export async function disconnectUser() {

    await streamClient.disconnectUser();
  }

export async function streamToken(userID) {

    const token = streamClient.createToken(userID);
    return token;
  }
  
