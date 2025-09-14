import streamClient from "../lib/stream";
import type { Channel } from "stream-chat";

export const useCreateNewChat = () => {
  return async ({
    members,
    createdBy,
    groupName,
  }: {
    members: string[];
    createdBy: string;
    groupName?: string;
  }): Promise<Channel> => {
    // Ensure current user is included in members
    if (!members.includes(createdBy)) {
      throw new Error("Current user ID (createdBy) must be included in members array.");
    }
    const isGroupChat = members.length > 2;

    if (!isGroupChat) {
      const existingChannel = await streamClient.queryChannels(
        {
          type: 'messaging',
          members: { $eq: members },
        },
        { created_at: -1 },
        { limit: 1 }
      );
      if (existingChannel.length > 0) {
        const channel = existingChannel[0];
        const channelMembers = Object.keys(channel.state.members);

        if (
          channelMembers.length === 2 &&
          members.every((member) => channelMembers.includes(member))
        ) {
          console.log("Existing chat found");
          return channel;
        }
      }
    }

    try {
      // Ensure all users exist in Stream Chat before creating the channel (via backend API)
      const usersToUpsert = members.map((id) => ({ id }));
      const upsertRes = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ users: usersToUpsert }),
      });
      if (!upsertRes.ok) {
        const err = await upsertRes.json();
        throw new Error("User upsert failed: " + (err.error || upsertRes.status));
      }

      const channelId = isGroupChat
        ? `group-${Date.now()}`
        : `chat-${members.slice().sort().join('-').slice(0, 50)}`;

      const channelData: {
        members: string[];
        created_by_id: string;
        name?: string;
      } = {
        members,
        created_by_id: createdBy,
      };

      if (isGroupChat) {
        channelData.name =
          groupName || `New Group Chat (${members.length} members)`;
      }

      const channel = streamClient.channel(
        isGroupChat ? 'team' : 'messaging',
        channelId,
        channelData
      );

      await channel.watch({
        presence: true,
      });

      console.log("Channel type:", typeof channel);
      console.log("Channel constructor:", channel.constructor.name);
      console.log("Channel object:", channel);

      return channel;
    } catch (error) {
      throw error;
    }
  };
};