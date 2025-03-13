import { StreamVideo } from '@stream-io/video-react-sdk'
import {v4 as uuidv4} from 'uuid';


export default async function getCallID() {

    // const serverClient = await StreamVideo.getInstance(
    //   process.env.STREAM_API_KEY,
    //   process.env.STREAM_API_SECRET
    // )

    // const call = await serverClient.call('default-type')
    // const callID = call.id


let callID = uuidv4();

    return  callID
}

