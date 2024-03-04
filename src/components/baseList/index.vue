<!--  -->
<template>
    <div>
        <t-space direction="vertical" size="large">
            <t-row>
                <t-col :span="1">
                    <t-button theme="primary" @click="add">新建</t-button>
                </t-col>
                <!-- <t-col :span="1">
                    <t-button theme="warning">备注</t-button>
                </t-col> -->
                <t-col :span="1" :offset="9">
                    <t-statistic title="总计" :value="totalMoneny" prefix="￥" :animationStart="true" :decimalPlaces="3" trend="increase" />
                </t-col>
            </t-row>

            <t-table bordered hover stripe row-key="index" :data="data" :columns="columns">
                <template #actions="{ row }">
                    <t-space>
                        <t-button size="small" @click="edit(row)">编辑</t-button>
                        <t-popconfirm showArrow theme="danger" :visible="row.delShow" content="确认删除吗"
                            @cancel="row.delShow = false" @confirm="delConfirm(row)">
                            <t-button size="small" theme="danger" @click="row.delShow = true">删除</t-button>
                        </t-popconfirm>
                    </t-space>
                </template>
                <template #time="{ row }">
                    {{ row.createTime | timeChang }}
                </template>
            </t-table>
        </t-space>

        <t-dialog destroyOnClose :header="headerTitle" :closeBtn="false" :footer="false" :visible.sync="templateShow"
            :width="1200" @close="templateShow = false">
            <t-form :data="formData" :rules="rules" ref="form" @submit="onSubmit">
                <t-form-item label="项目" name="name">
                    <t-input v-model="formData.name"></t-input>
                </t-form-item>
                <t-form-item label="描述" name="describes">
                    <t-input v-model="formData.describes" />
                </t-form-item>
                <t-form-item label="数量" name="number">
                    <t-input-number :decimal-places="2" :min="0" v-model="formData.number" />
                </t-form-item>
                <t-form-item label="计价单位" name="chargeUnit">
                    <t-input v-model="formData.chargeUnit" />
                </t-form-item>
                <t-form-item label="材料单价(元)" name="unitPrice">
                    <t-input-number :decimal-places="2" :min="0" v-model="formData.unitPrice" />
                </t-form-item>
                <t-form-item label="工费(元)" name="wage">
                    <t-input-number :decimal-places="2" :min="0" v-model="formData.wage" />
                </t-form-item>
                <t-form-item label="合计(元)" name="total">
                    <t-input-number :decimal-places="2" :min="0" v-model="formData.total" />
                </t-form-item>
                <t-form-item label="备注" name="remark">
                    <!-- <t-input v-model="formData.remark"></t-input> -->
                    <div style="border: 1px solid #ccc;">
                        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig"
                            mode="default" />
                        <Editor style="height: 500px; overflow-y: hidden;" v-model="formData.remark"
                            :defaultConfig="editorConfig" mode="default" @onCreated="onCreated" />
                    </div>
                </t-form-item>

                <t-form-item style="margin-left: 100px">
                    <t-space size="10px">
                        <t-button theme="primary" type="submit">保存</t-button>
                    </t-space>
                </t-form-item>
            </t-form>
        </t-dialog>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { uploadFilesToServer } from '@/utils/uploadFilesToServer'
export default {
    //import引入的组件需要注入到对象中才能使用
    components: { Editor, Toolbar },
    data() {
        //这里存放数据
        return {
            columns: [
                { colKey: 'name', align: 'center', title: '项目' },
                { colKey: 'describes', align: 'center', title: '描述' },
                { colKey: 'number', align: 'center', title: '数量' },
                { colKey: 'chargeUnit', align: 'center', title: '计价单位' },
                { colKey: 'unitPrice', align: 'center', title: '材料单价(元)' },
                { colKey: 'wage', align: 'center', title: '工费(元)' },
                { colKey: 'total', align: 'center', title: '合计(元)' },
                { cell: 'time', align: 'center', title: '创建时间' },
                { cell: 'actions', align: 'center', title: '操作' }
            ],
            templateShow: false,
            formData: {
                name: '',
                describes: '',
                number: '',
                chargeUnit: '',
                unitPrice: '',
                wage: '',
                total: '',
                remark: ''
            },
            rules: {
                name: [
                    { required: true, message: '项目必填', type: 'error' }
                ],
                describes: [
                    { required: true, message: '描述必填', type: 'error' }
                ],
                number: [
                    { required: true, message: '数量必填', type: 'error' }
                ],
                chargeUnit: [
                    { required: true, message: '计价单位必填', type: 'error' }
                ],
                unitPrice: [
                    { required: true, message: '材料单价必填', type: 'error' }
                ],
                wage: [
                    { required: true, message: '工费必填', type: 'error' }
                ],
                total: [
                    { required: true, message: '合计必填', type: 'error' }
                ]
            },
            headerTitle: '',
            editor: null,
            html: '',
            toolbarConfig: {
                excludeKeys: [
                    'fullScreen',
                    'codeBlock',
                    'todo',
                    'emotion'
                ]
            },
            editorConfig: {
                placeholder: '请输入内容...',
                MENU_CONF: {
                    uploadImage: {
                        customUpload: this.uploadImg
                    },
                    uploadVideo: {
                        customUpload: this.uploadVideos
                    }
                }
            },
            totalMoneny: 0
        };
    },
    props: {
        data: { type: Array, default: [] }
    },
    filters: {
        timeChang(dateArray) {
            const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5]);

            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
        }
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {
        'templateShow'(val) {
            if (!val) {
                for (let key in this.formData) {
                    this.formData[key] = '';
                }
            }
        },

        'data' (val) {
            val.forEach((item) => {
                this.totalMoneny += item.total
            })
        }
    },
    //方法集合
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },

        onSubmit({ validateResult, firstError }) {
            if (validateResult === true) {
                if (this.formData.id) {
                    this.$emit('updateSubmit', JSON.stringify(this.formData))
                } else {
                    /* console.log(this.formData)
                    return */
                    this.$emit('addSubmit', JSON.stringify(this.formData))
                }
            } else {
                this.$message.warning(firstError);
            }
        },

        add() {
            this.templateShow = true
            this.headerTitle = '新增'
        },

        edit(row) {
            this.templateShow = true
            this.headerTitle = '修改'
            this.formData = JSON.parse(JSON.stringify(row))
        },

        delConfirm(row) {
            this.$emit('delSubmit', row.id)
            row.delShow = false
        },

        async uploadImg(file, insertFn) {
            const res = await uploadFilesToServer('file', file)
            insertFn(res.response.data.url, res.response.data.fileName)
        },

        async uploadVideos(file, insertFn) {
            const res = await uploadFilesToServer('file', file)
            insertFn(res.response.data.url, res.response.data.fileName)
        },
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
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>

</style>