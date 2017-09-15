import mongoose from 'mongoose';

export default {

    connect(url){
        return mongoose.connect(url);   
    }
}