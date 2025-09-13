import { create } from "domain";
import streamClient from "../lib/stream";

export const useCreateNewChat = () => {
    return async ({
        members,
        createdBy,
        groupName,
    }: {
        members: string[];
        createdBy: string;
        groupName?: string;
    }) => {
        const isGroupChat = members.length > 2;

        //Checking for existing channels 1-1 conversions
            if (!isGroupChat) {
                // Query for an existing 1-1 channel between these two members
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

                    if (channelMembers.length === 2 && 
                        members.every((member) => channelMembers.includes(member))
                    ) {
                        console.log("Existing chat found");
                        return channel;
                    }
                }
            }

            try {
                // Ensure channelId is always unique
                const channelId = isGroupChat
                    ? `group-${Date.now()}`
                    : `chat-${members.slice().sort().join('-')}`;

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

                // Add logging here to verify channel type
                // console.log("Channel type:", typeof channel);
                // console.log("Channel constructor:", channel.constructor.name);
                // console.log("Channel object:", channel);

                return channel;

            } catch (error) {
                throw error;
            }
            return useCreateNewChat
    };

};