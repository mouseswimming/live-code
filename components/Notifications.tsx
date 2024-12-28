"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useInboxNotifications,
  useUnreadInboxNotificationsCount,
} from "@liveblocks/react";
import {
  InboxNotification,
  InboxNotificationList,
  LiveblocksUIConfig,
} from "@liveblocks/react-ui";
import { Bell, User } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

const Notifications = () => {
  // how many notifications are there in the inbox
  const { inboxNotifications } = useInboxNotifications();
  // get number of unread notifications
  const { count } = useUnreadInboxNotificationsCount();

  const unreadNotifications = inboxNotifications?.filter(
    (notification) => !notification.readAt
  );

  return (
    <Popover>
      <PopoverTrigger className="relative flex size-10 items-center justify-center rounded-lg">
        <Bell size={24} aria-label="inbox notification" />
        {!!count && count > 0 && (
          <div className="absolute top-0 right-0 size-5 bg-blue-500 rounded-full flex items-center justify-center z-20">
            <span className="text-white text-xs font-semibold">{count}</span>
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent className="shad-popover">
        <LiveblocksUIConfig
          overrides={{
            INBOX_NOTIFICATION_TEXT_MENTION: (user: ReactNode) => (
              <>{user} mentioned you.</>
            ),
          }}
        />
        <InboxNotificationList>
          {unreadNotifications && unreadNotifications?.length > 0 ? (
            unreadNotifications.map((notification) => (
              <InboxNotification
                key={notification.id}
                inboxNotification={notification}
                className="bg-dark-300 rounded-md mb-2 text-white overflow-hidden"
                href={`/documents/${notification.roomId}`}
                showActions={false}
                kinds={{
                  thread: (props) => (
                    <InboxNotification.Thread
                      {...props}
                      showActions={false}
                      showRoomName={false}
                    />
                  ),
                  textMention: (props) => (
                    <InboxNotification.TextMention
                      {...props}
                      showRoomName={false}
                    />
                  ),
                  $documentAccess: (props) => (
                    <InboxNotification.Custom
                      {...props}
                      title={props.inboxNotification.activities[0].data.title}
                      aside={
                        <InboxNotification.Icon
                          style={{ backgroundColor: "transparent" }}
                        >
                          {props.inboxNotification.activities[0].data.avatar ? (
                            <Image
                              src={
                                (props.inboxNotification.activities[0].data
                                  .avatar as string) || ""
                              }
                              width={36}
                              height={36}
                              alt="avatar"
                              className="rounded-full"
                            />
                          ) : (
                            <User size={36} className="rounded-full" />
                          )}
                        </InboxNotification.Icon>
                      }
                    >
                      {props.children}
                    </InboxNotification.Custom>
                  ),
                }}
              />
            ))
          ) : (
            <p className="py-2 text-center text-gray-400">
              No new notifications
            </p>
          )}
        </InboxNotificationList>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
