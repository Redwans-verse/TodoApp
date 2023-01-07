const mongoose=require('mongoose');

const profileScema= mongoose.Schema({

    name:{
        type:String,
        required:[true,'please add name']
    },
    username:{
        type:String,
        required:[true,'please add username'],
        unique:[true,'username must be unique']
    },
    password:{
        type:String,
        min:6
    },
    phone:{String,
    },
    email:{
        type:String,
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        trim:true,
        required:true
    }

},{
    versionKey:false
});

const profileModel=mongoose.model('profile',profileScema)

module.exports=profileModel