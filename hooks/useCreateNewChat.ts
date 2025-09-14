import streamClient from "../lib/stream";
import type { Channel } from "stream-chat";

export const useCreateNewChat = () => {
  return async ({
    members: rawMembers,
    createdBy,
    groupName,
  }: {
    members: string[];
    createdBy: string;
    groupName?: string;
  }): Promise<Channel> => {
  // Securely verify users are active in Stream
    const verifyUsers = async (ids: string[]) => {
      const response = await streamClient.queryUsers({ id: { $in: ids } });
      return response.users
        .filter(user => !user.deleted_at)
        .map(user => user.id);
    };

    const members = await verifyUsers(rawMembers);
  // ...existing code...
    if (members.length < 2) {
      throw new Error("Cannot create channel. Need at least 2 active members.");
    }

    // Ensure current user is included in members
    if (!members.includes(createdBy)) {
      throw new Error("Current user ID (createdBy) must be included in members array.");
    }

    const isGroupChat = members.length > 2;

    // For 1:1 chats, check for existing channel
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
          return channel;
        }
      }
    }

    try {
      // Just create the channel; do not upsert users automatically
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

      // ...existing code...

      const channel = streamClient.channel(
        'messaging',
        channelId,
        channelData
      );

      await channel.watch({ presence: true });

      return channel;
    } catch (error) {
      console.error('[CreateChat] Channel creation error:', error);
      throw error;
    }
  };
};