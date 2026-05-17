import { useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage'
import './ChatMessages.css'

type chatMessagesProps = {
  message: string;
  sender: string;
  time: string;
  id: string;
};

function useAutoScroll(dependencies: chatMessagesProps[]) {
     const chatMessagesRef = useRef<HTMLDivElement>(null);
     // Let's you save an element into here

     useEffect(() => {
       const containerElem = chatMessagesRef.current;

       if (containerElem) {
         containerElem.scrollTop = containerElem.scrollHeight;
       }
     }, [dependencies]); 
     
     return chatMessagesRef;
    }

  
function ChatMessages({chatMessages}: {chatMessages: chatMessagesProps[]}) {

  console.log(chatMessages);
 
  const chatMessagesRef = useAutoScroll(chatMessages);
  // The ref attribute saves the element into the useRef hook

  const welcomeMessage = (
    <p
       className="welcome-message" >
       Welcome to the chatbot project! Send a message using the textbox below.
    </p>
  );

  return (
   <div 
   className="chat-messages-container"
   ref={chatMessagesRef}>
   {chatMessages.length === 0 
    ? welcomeMessage
    : chatMessages.map(({message, sender, time, id}: chatMessagesProps) => {
       return (
         <ChatMessage 
         message={message}
         sender={sender}
         currentTime={time}
         key={id}
         />
       );
       }) 
   } 
   </div>
 );

}

export default ChatMessages;