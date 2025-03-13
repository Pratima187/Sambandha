'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Channel, StreamChat } from 'stream-chat';
import {
  Chat,
  Channel as StreamChannel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react';
// import 'stream-chat-react/dist/css/index.css';

//eslint-disable-next-line
import "stream-chat-react/dist/css/v2/index.css";

import { streamToken } from '@/lib/actions/stream';
import { Separator } from '@radix-ui/react-select';

export default function ChatPage({userID, channelID}) {

//   console.log(userID, id)
  const [channel, setChannel] = useState(null);

  const streamClient = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY);

  useEffect(() => {
    const setupChannel = async () => {
      try {

        await streamClient.connectUser(
          { id: userID, name: `User ${userID}` },
          await streamToken(userID)
        );

        const channel = streamClient.channel('messaging', channelID );
        await channel.watch();
        setChannel(channel);
      } catch (error) {
        console.error('Error setting up channel:', error);
      }
    };

    if (!streamClient.userID) {
      setupChannel();
    } else {
      const channel = streamClient.channel('messaging', channelID );
      channel.watch().then(() => setChannel(channel));

      console.log("all good")
    }
  }, [channelID, userID]);

  if (!channel) return <div>Loading...</div>;

  return (
        <div className=" h-[600px] pt-2 ">
    <Chat client={streamClient}>
      <StreamChannel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </StreamChannel>
    </Chat>
        </div>
  );
}

