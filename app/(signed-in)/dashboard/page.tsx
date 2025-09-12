'use client';

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { LogOut, VideoIcon } from "lucide-react";
import { useRouter } from "next/dist/client/components/navigation";
import { Channel, ChannelHeader, Message, MessageInput, MessageList, Thread, Window, useChatContext } from "stream-chat-react";

function Dashboard() {
  const { user } = useUser();
  const router = useRouter();
  const { channel, setActiveChannel } = useChatContext();
  const { setOpen } = useSidebar();

  const handleCall = () => {
    console.log("Calling...");
  };

  const handleLeaveChat = async () => {
    console.log("Leaving chat...");
  };

  return <div className="flex flex-col w-full flex-1">
    {channel ? (
      <Channel>
        <Window>
          <div className="flex items-center justify-between">
            {channel.data?.member_count === 1 ? (
              <ChannelHeader title="You are the only one left in the Chat" />
            ) : (
              <ChannelHeader/>
            )}

            <div className="flex items-center gap-2"></div>
            <Button variant="outline" onClick={handleCall}>
              <VideoIcon className="w-4 h-4"/>
              Start a new chat
              </Button>

              <Button
                variant="outline"
                onClick={handleLeaveChat}
                className="text-red-500 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4"/>
                Leave chat
              </Button>
          </div>

            <MessageList />

            <div className="sticky bottom-0 w-full">
              <MessageInput/>
            </div>
        </Window>
        <Thread/>
        </Channel>
    ): (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-semibold text-muted-forground mb-4">
          No chat selected
        </h2>
        <p className="text-muted-foreground">
          Select a chat from the sidebar or start a new one.
        </p>

      </div>
    )}
  </div>;
}

export default Dashboard;