module.exports =app=>{                      //等价于function(app){ 
    const express =require('express')     //导出一个函数app,这个app接受一个对象
    const router =express.Router()         //express子路由
    const Category =require('../../models/Category')
   //新增
    router.post('/categories',async (req,res)=>{
      const model= await Category.create(req.body)
      res.send(model)
    })
    //编辑
    router.put('/categories/:id',async (req,res)=>{
      const model= await Category.findByIdAndUpdate(req.params.id,req.body)  //根据id找然后更新
      res.send(model)
    })
    //删除
    router.delete('/categories/:id',async (req,res)=>{
      const model=await Category.findByIdAndDelete(req.params.id)
      res.send({
        status:"success"
      })
    })
    //获得全部列表
    router.get('/categories',async (req,res)=>{
       const items =await Category.find().populate('parent').limit(10)  //populate('parent')查询父级全部字段，不加就是父级id
       res.send(items)     
    })
    //获得单个详情列表
    router.get('/categories/:id',async (req,res)=>{
      const model = await Category.findById(req.params.id)
      res.send(model)
    })

    app.use('/admin/api',router)
}
