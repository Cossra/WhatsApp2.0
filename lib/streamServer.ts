import { StreamChat } from "stream-chat";

if (!process.env.NEXT_PUBLIC_STREAM_API_KEY) {
    throw new Error("Missing NEXT_PUBLIC_STREAM_API_KEY env var");
}

if (!process.env.STREAM_API_SECRET_KEY) {
    throw new Error("Missing STREAM_API_SECRET_KEY env var");
}

//Initialize a Server Client for backend operations
export const streamServerClient = StreamChat.getInstance(
    process.env.NEXT_PUBLIC_STREAM_API_KEY,
    process.env.STREAM_API_SECRET_KEY
);