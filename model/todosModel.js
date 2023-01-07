const mongoose=require('mongoose');

const todoScema= mongoose.Schema({


    username:{
        type:String,
        required:[true,'please add username'],
        
    },
    todoName:{
        type:String
    },
    todoDes:{
        type:String
    },
    todoStatus:{
        type:String,
        
    },
    createDate:{
        type:Date,
        
    },
    updateDate:{
        type:Date
    }


},{
    versionKey:false
});

const todoModel=mongoose.model('todos',todoScema)

module.exports=todoModel