'use client'
import UserSyncWrapper from "@/components/UserSyncWrapper";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <UserSyncWrapper>{children}</UserSyncWrapper>
  )
}

export default layout;