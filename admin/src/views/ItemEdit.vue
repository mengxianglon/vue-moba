<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name" style="width:50%"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'/upload'"          
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
         <el-button type="danger" @click="$router.push('/items/list')">返回列表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    handleAvatarSuccess(res) {
      //this.model.icon =res.url跟下面等价，但是上面的隐形赋值有bug，图片不显示，数据区有
      this.$set(this.model, 'icon', res.url)
    },
    beforeAvatarUpload(file) {
        const isLt5M = file.size / 1024 / 1024 < 5;
       if (!/^image\/(jpeg|png|jpg|bmp|gif)$/.test(file.type)) {
          this.$message.error('上传头像图片只能是 jpeg|png|jpg|bmp|gi任意之一 格式!');
          return false;
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
          return false;
        }
        return  isLt5M;
      },
      async save(){
        this.id ? await this.$http.put(`rest/items/${this.id}`,this.model): await this.$http.post('rest/items',this.model)
        this.$router.push('/items/list')
        this.$message({
          type:'success',
          message:'保存成功'
        })
      },
    async fetch(){
      const res = await this.$http.get(`rest/items/${this.id}`)
      this.model=res.data
    }
  },
  created() {
     this.id && this.fetch();
    //action="$http.defaults.baseURL+'/upload'"
  }
};
</script>

<!--这里加scoped就不显示头像框-->
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>



