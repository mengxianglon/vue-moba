module.exports =app=>{           //等价于function(app){ 
    const mongoose =require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba',{
        useNewUrlParser:true
    })
}