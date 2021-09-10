import { User } from "./User.model";

export class Inbox {
    id: Number;
    user: User;
    connectedUser: User;
    msg:String;
    lastMessage:String;
    
}