'use client'

import { Doc } from "@/convex/_generated/dataModel";
import { useCreateNewChat } from "@/hooks/useCreateNewChat";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useChatContext } from "stream-chat-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User, XIcon } from "lucide-react";
import UserSearch from "./userSearch";
import Image from "next/image";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
// ...existing code...


import type { Channel } from "stream-chat";

export function NewChatDialog({ children, onChatCreated }: { children: React.ReactNode; onChatCreated?: (channel: Channel) => void }) {

    // Accept onChatCreated prop for sidebar refresh
    const [open, setOpen] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState<Doc<"users">[]>([]);
    const [groupName, setGroupName] = useState("");
    const createNewChat = useCreateNewChat();
    const { user } = useUser();
    const {setActiveChannel} = useChatContext();

    const handleSelectUser = (user: Doc<"users">) => {
        if (!selectedUsers.find((u) => u._id === user._id)) {
            setSelectedUsers((prev) => [...prev, user]);
        }
    };

    const removeUser = (userId: string) => {
        setSelectedUsers((prev) => prev.filter((u) => u._id !== userId));
    };

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            // Reset state when dialog is closed
            setSelectedUsers([]);
            setGroupName("");
        }
    };

    const handleCreateChat = async () => {
      const totalMambers = selectedUsers.length + 1; // +1 for the current user
      const isGroupChat = totalMambers > 2;

      // Use Stream user IDs (UserId) for chat creation
      const channel: Channel = await createNewChat({
        members: [
          user?.id as string,
          ...selectedUsers.map((user) => user.UserId),
        ],
        createdBy: user?.id as string,
        groupName: isGroupChat ? groupName.trim() || undefined : undefined,
      });
      setActiveChannel(channel);
      // Call sidebar refresh after chat creation
      if (typeof onChatCreated === 'function') {
        onChatCreated(channel);
      }
      // Close dialog and reset state
      setOpen(false);
      setSelectedUsers([]);
      setGroupName("");
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>{children}</DialogTrigger>

        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>Start a New Chat</DialogTitle>
      <DialogDescription>
        Search for users and start a conversation.
      </DialogDescription>
    </DialogHeader>

      <div className="space-y-4">
     {/* Search Component */}
      <UserSearch onSelectUser={handleSelectUser} 
      className="w-full" />

      {/* Selected Users */}
      {selectedUsers.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium test-foreground">
            Selected Users ({selectedUsers.length})
          </h4>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {selectedUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-2 border border-gray-200 rounded-md"
              >
                <div className="flex items-center space-x-2">
                  <Image
                    src={user.imageUrl}
                    alt={user.name || "User"}
                    width={28}
                    height={28}
                    className="w-6 h-auto rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeUser(user._id)}
                  className="text-muted-foreground hover:text-destructive transition-colors p-1"
                >
                  <XIcon className="h-4 w-4"/>
                </button>
              </div>
            ))}
            </div>

            {/* Group Name Input for group chats */}
            {selectedUsers.length > 1 && (
              <div className="space-y-1"> 
              <label
                htmlFor="groupName"
                className="block text-sm font-medium text-foreground"
              >
                Group Name (Optional)
              </label>
              <Input
                id="groupName"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="w-full"
                placeholder="Enter a name for your group chat..."
              />
              <p className="text-xs text-muted-foreground">
                Leave blank for a default name: &quot;GroupChat (
                  {selectedUsers.length + 1})&quot;
              </p>
              </div>
            )}
          </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={selectedUsers.length === 0}
              onClick={handleCreateChat}
            >
              {selectedUsers.length > 1
              ? `Create Group Chat (${selectedUsers.length + 1} members)`
              : selectedUsers.length === 1
              ? "Start Chat"
              : "Create Chat"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
}