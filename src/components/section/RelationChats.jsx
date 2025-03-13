import React from 'react'
import { Separator } from '../ui/separator'
import Link from 'next/link';
import timeAgo from '@/lib/actions/timeAgo';

const RelationChats = async ({active, data}) => {


  return (
    <div className='flex flex-col gap-2 py-4'>

      <h2 className='font-semibold text-sm text-gray-500 px-4 py-2  rounded-lg '>Your Relations</h2>

      {
        data.map((item, index)=>{
          return(
            <React.Fragment key={item.channel.id + index}>
            <Link href={`/relations/${item.channel.id}`} className='pr-2' >
            <div className={item.channel.id==active?"bg-purple-600 text-white rounded-lg w-full  py-2 px-4 flex gap-4 items-center":"hover:bg-gray-100 rounded-lg w-full  py-2 px-4 flex gap-4 items-center"}>

            <div className="rounded-full w-8 h-8 bg-blue-600 grid place-content-center">
              <p className="text-lg font-medium text-white">
                {index}
              </p>
            </div>
            
            <div>
              <h3 className="text-md font-medium">{item.relationName.substring(0,12)}</h3>
              <p className="text-xs text-gray-400"> {timeAgo(item.channel.createdAt) || ""} </p>
            </div>
            
            </div>
            </Link>
            
            <Separator />
            </React.Fragment>
          )
        })
      }


    </div>
  )
}

export default RelationChats