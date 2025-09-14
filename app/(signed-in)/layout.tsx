'use client'

import { Chat } from "stream-chat-react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import UserSyncWrapper from "@/components/UserSyncWrapper";
import streamClient from "@/lib/stream";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import "stream-chat-react/dist/css/v2/index.css";

function layout({ children }: { children: 
  React.ReactNode }) {
  return ( <UserSyncWrapper>
    <Chat client={streamClient} theme="messaging light">
      <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Link 
            href="/dashboard"
            className="font-geist-sans text-2xl font-bold tracking-tight transition-colors duration-200"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 bg-clip-text text-transparent">
              TeleConnect
            </span>
          </Link>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
    </Chat>
    </UserSyncWrapper>
  )
}

export default layout;