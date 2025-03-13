import VideoCallPage from '@/components/section/VideoCallPage';
import getCallID from '@/lib/actions/getCallID';
import { streamToken } from '@/lib/actions/stream';
import { currentUser } from '@clerk/nextjs/server'

const page = async ({params}) => {
    const user = await currentUser();
    const userID = user.id;

    const token = await streamToken(userID);
    const {id} = await params;

    // console.log(userID, token, callID)

  return (
    <>
    <VideoCallPage userID={userID} token={token} callID={id} />
    <div>hi</div>
    </>
  )
}

export default page