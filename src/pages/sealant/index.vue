<!--  -->
<template>
  <t-card :bordered="false">
    <BaseList ref="BaseList" :data="data" @addSubmit="addSubmit" @updateSubmit="updateSubmit" @delSubmit="delSubmit" />
  </t-card>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import BaseList from '@/components/baseList/index.vue'
import sealantApi from '@/api/sealant'
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { BaseList },
  data() {
    //这里存放数据
    return {
      data: []
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    initList() {
      this.data = []
      this.$request.get(sealantApi.getListUrl)
      .then(res => {
        this.data = res.data.data.map((item => { return { ...item, delShow: false } }))
      })
    },

    addSubmit(e) {
      let obj = JSON.parse(e)
      this.$request.post(sealantApi.addUrl, obj)
      .then(res => {
        this.$refs.BaseList.templateShow = false
        this.$message.success('保存成功')
        this.initList()
      })
    },

    updateSubmit(e) {
      let obj = JSON.parse(e)
      this.$request.put(sealantApi.updateUrl, obj)
      .then(res => {
        this.$refs.BaseList.templateShow = false
        this.$message.success('保存成功')
        this.initList()
      })
    },

    delSubmit(id) {
      this.$request.delete(sealantApi.delUrl + id)
      .then(res => {
        this.$message.success('删除成功')
        this.initList()
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.initList()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style scoped></style>