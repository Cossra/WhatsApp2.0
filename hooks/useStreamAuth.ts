import { StreamChat } from "stream-chat";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const streamClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!);

export function useStreamAuth() {
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      // Fetch a Stream token for the user from your backend
      fetch(`/api/stream/token?userId=${user.id}`)
        .then(res => res.json())
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
        });
    }
  }, [user, isSignedIn]);
}
