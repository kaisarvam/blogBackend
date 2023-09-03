const e = require('express');
const {Model, Schema} = require('mongoose');

const userSchema = new Schema({ 
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']  
    },
    status:{
        type: String,
        default: 'pending',
        enum:['pending', 'approved','declined','blocked ']
    }
},{
    timestamps: true
})