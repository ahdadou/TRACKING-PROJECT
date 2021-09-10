import { User } from "./User.model";

export class ReviewRequest {
    
    email_sender: String;
    email_receiver: String;
    rating: Number;
    body: String;


}