<!--  -->
<template>
    <div>
        <t-space direction="vertical" size="large">
            <t-row>
                <t-col :span="1">
                    <t-button theme="primary">新建</t-button>
                </t-col>
                <t-col :span="1">
                    <t-button theme="warning">备注</t-button>
                </t-col>
            </t-row>

            <t-table bordered hover stripe row-key="index" :data="data" :columns="columns" >
            </t-table>
        </t-space>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            columns: [
                { colKey: 'name', align: 'center', title: '项目' },
                { colKey: '1', align: 'center', title: '描述' },
                { colKey: '2', align: 'center', title: '数量' },
                { colKey: '3', align: 'center', title: '计价单位' },
                { colKey: '4', align: 'center', title: '材料单价' },
                { colKey: '5', align: 'center', title: '工费' },
                { colKey: '6', align: 'center', title: '合计' },
                { colKey: '7', align: 'center', title: '操作' }
            ],
            data: []
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

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