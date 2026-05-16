import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/profile-1.jpg';
import './ChatMessage.css';

console.log(UserProfileImage);

type ChatMessageProps = {
  message: string;
  sender: string;
  currentTime: string;
};

export function ChatMessage({ message, sender, currentTime }: ChatMessageProps) {
  // const message = props.message;
  // const sender = props.sender;
  // const {message, sender} = props;
 
 /*
 if (sender === "robot") {
   return (
    <div>
     <img src="robot.png" width="50" />
     {message}
    </div>
  );
 }
*/

  return (
    <div className={
      sender === 'user'
       ? 'chat-message-user'
       : 'chat-message-robot'
    }>
     {sender === "robot" &&  (
      <img src={RobotProfileImage} 
      className="chat-message-profile" />
     )}
     <div className="chat-message-text">
      {message}
      <p className="time-sent">{currentTime}</p>
     </div>
     {sender === "user" && (
      <img src={UserProfileImage}
      className="chat-message-profile" />
    )}
    </div>
  )
}
