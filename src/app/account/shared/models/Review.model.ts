import { User } from "./User.model";

export class Review {

    ID: Number;
    user_sender: User;
    rating: Number;
    body: String;
    createAt:Date;


}