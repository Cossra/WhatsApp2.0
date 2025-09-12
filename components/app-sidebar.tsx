"use client"
import { useUser } from "@clerk/nextjs"
import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { UserButton } from "@clerk/nextjs"
import { ChannelList } from "stream-chat-react"
import { ChannelFilters, ChannelSort } from "stream-chat"
import { NewChatDialog } from "./NewChatDialog"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isLoaded } = useUser();

  const filters: ChannelFilters = {
    members: { $in: [user?.id as string] },
    type: { $in: ['messaging', 'team'] },
  };

  const options = { presence: true, state: true };
  const sort: ChannelSort = {
     last_message_at: -1,
    };

  // State for channel filters
  const [selectedType, setSelectedType] = React.useState<'messaging' | 'team' | ''>('');
  const [selectedMember, setSelectedMember] = React.useState<string>('');
  // Dummy members array for demonstration (replace with real members from your app)
  const members = user ? [user.id, ...(user.organizationMemberships?.map(m => m.id) || [])] : [];
  // Types for filtering
  const types = ['messaging', 'team'];
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between w-full px-2 py-4">
          <div className="flex flex-col items-start">
            <span className="text-xs text-muted-foreground mb-0.5">Welcome back</span>
            <span className="text-base font-semibold text-gray-900">
              {isLoaded && user ? (user.fullName || user.firstName || user.username || user.emailAddresses[0]?.emailAddress) : ""}
            </span>
          </div>
          <div className="ml-4 group">
            <div className="transition-transform duration-200 group-hover:scale-110 group-hover:shadow-lg rounded-full" style={{ width: 48, height: 48 }}>
              <UserButton signInUrl="/sign-in" appearance={{ elements: { avatarBox: { width: 48, height: 48 } } }} />
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            <NewChatDialog>
            <Button className="w-full" variant="outline">
              Start New Chat
            </Button>
            </NewChatDialog>

            {/* Channels Section */}
            <ChannelList sort={sort} filters={filters} options={options}
            EmptyStateIndicator={() => (
              <div className="flex flex-col items-center justify-center h-full py-12 px-4">
                <div className="text-6xl mb-6 opacity-20">💬</div>
                <h2 className="text-lg font-bold text-gray-900 mb-2">Ready to Chat?</h2>
                <p className="text-sm text-gray-500">Your conversations will appear here once you start chatting with others.</p>
              </div>
            )}
            />

          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
