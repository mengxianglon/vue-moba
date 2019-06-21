<template>
    <div>
        <h1>{{id?'编辑':'新建'}}文章</h1>
       <el-form label-width="120px" @submit.native.prevent="save">
         <el-form-item label="所属分类">
           <el-select v-model="model.categories" multiple>
            <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
            >
             
            </el-option>
           </el-select>
           </el-form-item> 
           <el-form-item label="所属分类">
               <el-input v-model="model.title"></el-input>
           </el-form-item>
       </el-form>
    </div>
</template>

<script>
export default {
    props: {
    id: {}
  },
  data(){
      return {
          model: {},
      categories: []
      }
  }

}
</script>

<style scoped>

</style>