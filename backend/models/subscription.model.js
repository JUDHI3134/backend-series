import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({

    subscriber: {
        type: mongoose.Schema.Types.ObjectId, //one who is sunscribe
        ref: "User"
    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,  //to whon the sunscriber scuscribe
        ref: "User"
    },

},{timestamps: true})


export const Subscription = mongoose.model("Subscription", subscriptionSchema)