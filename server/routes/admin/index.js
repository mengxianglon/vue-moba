module.exports =app=>{                      //等价于function(app){ 
    const express =require('express')     //导出一个函数app,这个app接受一个对象
    const router =express.Router({
      mergeParams:true                   //保留req.params父路由器的值。如果父级和子级具有冲突的参数名称，则子级的值优先。
    })        
    
   //新增
    router.post('/',async (req,res)=>{
      const model= await req.Model.create(req.body)
      res.send(model)
    })
    //编辑
    router.put('/:id',async (req,res)=>{
      const model= await req.Model.findByIdAndUpdate(req.params.id,req.body)  //根据id找然后更新
      res.send(model)
    })
    //删除
    router.delete('/:id',async (req,res)=>{
      const model=await req.Model.findByIdAndDelete(req.params.id)
      res.send({
        status:"success"
      })
    })
    //获得全部列表
    router.get('/',async (req,res)=>{
      //return res.send(modelName)
        const queryOptions={}
        if(req.Model.modelName==="Category"){
          queryOptions.populate='parent'
        }                                                             // req.Model.find().populate('parent').limit(10)
       const items =await req.Model.find().setOptions(queryOptions).limit(10)  //populate('parent')查询父级全部字段，不加就是父级id
       res.send(items)     
    })
    //获得单个详情列表
    router.get('/:id',async (req,res)=>{
      const model = await req.Model.findById(req.params.id)
      res.send(model)
    })

    //上传图片
    const multer =require('multer')
    const upload =multer({dest:__dirname+'/../../uploads'})  //接受上传文件，并且放在下文的中间件上。upload.single('file')接受单个文件，并且上传键为file
    app.post('/admin/api/upload',upload.single('file'),async (req,res)=>{
        //这个file会挂在req上面，方便后边调用,upload.single上传中间键自动挂上去的。要加upload.single才有
        const file= req.file
        //${file.filename}等于req.file.filename。就是上传图片的文件名
        file.url =`http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })                //express不能处理上传，要npm i multer上传中间件
//此处的:resource,例如删除，前端发来的地址是this.$http.delete(`rest/categories/${row._id}`)
    app.use('/admin/api/rest/:resource',async (req,res,next)=>{    
      const modelName =await require('inflection').classify(req.params.resource)
      req.Model =require(`../../models/${modelName}`)    //挂载到req上，供后面router里的req使用req.Model
      next()
    },router)                  //第二个参数是中间件，可以加任意多个
}
