'use client'

import { useEffect, useRef, useState } from 'react'
import { Send, MoreVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import mitraChat from '@/lib/actions/mitraChat'



export default function MitraChat({loadedMessages}) {
    const [messages, setMessages] = useState(loadedMessages);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    //   console.log("scroll")
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);

    function getFormattedDate() {
        const date = new Date();
    
        // Extract components
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    
        // Combine to match the format
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    
    

    const handleSendMessage = async () => {
        if (inputMessage.trim() === '') return;

        // Add user message to the chat
        const userMessage = {
            created_at: getFormattedDate(),
            message: inputMessage,
            userID: 'user',
        };
        // console.log(userMessage)
        setMessages(prevMessages => [...prevMessages, userMessage]);
        
        setIsLoading(true);
        try {
            const response = await mitraChat(inputMessage);
            console.log(response);
            
            const aiMessage = {
                created_at: getFormattedDate(),
                message: response.chat,
                userID: 'AI',
            };
            // console.log("ai message is", aiMessage)

            setMessages(prevMessages => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error('Error fetching AI response:', error);
        } finally {
            setInputMessage('');
            setIsLoading(false);
        }
    };

    return (
        <div className="w-2/3 px-4 h-[600px] relative overflow-y-scroll">
           

            {/* Chat messages */}
            <div className="">
                {messages.map((message, index) => {
                    return (
                            message.userID == "AI" ?
                                <div key={index} className="flex items-start gap-2.5 mt-2">
                                    <div className="w-8 h-8 bg-blue-600 rounded-full" ></div>
                                    <div className="flex flex-col w-full max-w-[400px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
                                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                            <span className="text-sm font-semibold text-gray-900">Mitra</span>
                                            <span className="text-sm font-normal text-gray-500 ">{message.created_at.substring(11,16)}</span>
                                        </div>
                                        <p className="text-sm font-normal py-2.5 text-gray-900 ">
                                            {message.message}
                                        </p>
                                        <span className="text-sm font-normal text-gray-500 ">Delivered</span>
                                    </div>

                                </div>
                                :
                                <div key={index} className="flex items- justify-end gap-2.5 mt-2">
                                    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-ee-xl rounded-s-xl">
                                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                            <span className="text-sm font-semibold text-gray-900">You</span>
                                            <span className="text-sm font-normal text-gray-500 ">{message.created_at.substring(11,16)}</span>
                                        </div>
                                        <p className="text-sm font-normal py-2.5 text-gray-900 ">{message.message}</p>
                                        <span className="text-sm font-normal text-gray-500 ">Delivered</span>
                                    </div>
                                    <div className="w-8 h-8 bg-blue-600 rounded-full" ></div>


                                </div>


                      )
                }
                )}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-300 text-gray-600 rounded-lg p-3 animate-pulse">
                            typing...
                        </div>
                    </div>
                )}
            </div>

            <div ref={messagesEndRef} className='h-14' />

            {/* Message input */}
            <div className=" fixed bottom-0 w-[840px] flex  py-2 bg-white items-center">
                <Input
                    type="text"
                    placeholder="Type a message"
                    value={inputMessage}
                    autoFocus
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') handleSendMessage();
                    }}
                    className="flex-grow mr-2"
                />
                <Button className="bg-main hover:bg-purple-600" onClick={handleSendMessage} disabled={isLoading}>
                    <Send className="h-5 w-5" />
                </Button>
            </div>
        </div>
    )
}

