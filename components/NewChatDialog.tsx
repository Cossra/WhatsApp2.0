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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User } from "lucide-react";
import UserSearch from "./userSearch";

export function NewChatDialog( { children }: { children: React.ReactNode } ) {
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

    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>


        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>Start a New Chat</DialogTitle>
      <DialogDescription>
        Search for users and start a conversation.
      </DialogDescription>
    </DialogHeader>

      <div className="space-y-4">
     {/* Search Component */}
      <UserSearch onSelectUser={handleSelectUser} className="w-full" />
      </div>
  </DialogContent>
            </Dialog>
    );

}