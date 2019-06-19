const express = require("express")
const app =express()

app.use(express.json())
app.use(require('cors')())

require('./plugins/db')(app)   //（）执行app函数并且把const app =express()这个对象传入admin/index.js里面，供其调用
require('./routes/admin')(app)
app.use('/uploads',express.static(__dirname+'/uploads'))    //静态文件托管，注意要加/

app.listen(3000,()=>{
    console.log('app listening on port 3000')
})
