import { StreamChat } from "stream-chat";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const streamClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!);

export function useStreamAuth() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      // Upsert user to Stream before connecting
      fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          users: [{
            id: user.id,
            name: user.fullName || user.firstName || user.emailAddresses[0]?.emailAddress || "No Name",
            image: user.imageUrl || "",
            email: user.emailAddresses[0]?.emailAddress || "",
          }]
        })
      })
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json();
          console.error('Stream upsert failed:', error);
          throw new Error(error.error || 'Stream upsert failed');
        }
        return fetch(`/api/stream/token?userId=${user.id}`);
      })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            console.error('Token fetch failed:', error);
            throw new Error(error.error || 'Token fetch failed');
          });
        }
        return res.json();
      })
      .then(({ token }) => {
        streamClient.disconnectUser().then(() => {
          streamClient.connectUser(
            {
              id: user.id,
              name: user.fullName || undefined,
              image: user.imageUrl,
            },
            token
          );
        });
      })
      .catch((err) => {
        console.error('Stream auth error:', err);
      });
    }
  }, [user, isSignedIn]);
}
