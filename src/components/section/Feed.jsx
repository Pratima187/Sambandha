import React from 'react';
import getAllIssues from '@/lib/actions/getAllIssues';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PostItem from '../parts/PostItem';


const Feed = async () => {
    const issues = await getAllIssues();
    // console.log(issues)


  return (
    <section className='my-6'>
      {
        issues.success
        ?

        <>
        <Tabs defaultValue="public">
        <TabsList className="mb-4">
          <TabsTrigger value="public" className="px-4 lg:px-20">Public</TabsTrigger>
          <TabsTrigger value="private" className="px-4 lg:px-20">Relation</TabsTrigger>
        </TabsList>
        <TabsContent value="public" className="space-y-6">
        {
          issues.data.public_issues.length==0?
          <div className='text-xl font-semibold text-gray-600'>
            No issues to show
          </div>

          :
          issues.data.public_issues.map((item)=>{
            return(
              <PostItem key={item.id} data={item} />
            )
          })
        }
        </TabsContent>
        <TabsContent value="private" className="space-y-6">
        {
          issues.data.private_issues.length==0?
          <div className='text-xl font-semibold text-gray-600'>
            No issues to show
          </div>

          :
          issues.data.private_issues.map((item)=>{
            return(
              <PostItem key={item.id} data={item} />
            )
          })
        }
        </TabsContent>
      </Tabs>
       
       
        
        </>

        
        :
        "you dont have issues"
      }
    </section>
  );
};

export default Feed;