const mongoose =require('mongoose')

const schema = new mongoose.Schema({
    name:{type:String},
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'},   //parent模型的关联id为特殊的类型:mongoose.SchemaTypes.ObjectId
                                                                //数据查询那里要用populate('parent')才能显出父级的全部字段，不然只有一个id
})

module.exports = mongoose.model('Category',schema)




