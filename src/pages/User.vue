<template>
    <div class="user">
        <div class="userTop">
            <el-button type="primary" @click="handleAdd">增加 +</el-button>
            <div>
                <el-button type='primary' size="mini" style="margin-right:10px" @click="refreshSub()">显示全部</el-button>
                <el-input  v-model="searchKey" placeholder="请输入姓名"></el-input>
                <el-button type="primary" @click="Search"  icon="el-icon-search">搜索</el-button>
            </div>
        </div>

        <el-dialog
        title="提示"
        :before-close="handleClose"
        :visible.sync="dialogVisible"
        width="50%"
        >
        
        <el-form inline :rules="rules" ref="form" :model="form" >
            <el-form-item label="姓名" prop="name">
                <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input placeholder="请输入年龄" v-model.number="form.age"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex"> 
                <el-select  v-model="form.sex" placeholder="请选择性别">
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="0"></el-option>
                </el-select>
            </el-form-item>     
            <el-form-item label="出生日期" prop="birth">
                <el-date-picker
                    v-model="form.birth"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item  label="地址" prop="addr">
                <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="subCancel">取 消</el-button>
            <el-button type="primary" @click="submitOK">确 定</el-button>
        </span>
        </el-dialog>

        <template>
        <el-table :data="tableData" stripe  style="width: 175%" height="70vh">
            <el-table-column  prop="name" label="姓名" >
            </el-table-column>
            <el-table-column  prop="sex" label="性别" >
                <template slot-scope="scope">
                    <span>{{ scope.row.sex == 1 ? '男' : '女' }}</span>
                </template>
            </el-table-column>
            <el-table-column  prop="age" label="年龄" >
            </el-table-column>                        
            <el-table-column  prop="birth" label="出生日期" >
            </el-table-column>
            <el-table-column min-width="200" prop="addr" label="地址"> 
            </el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="scope">
                    <el-button @click="tableEdit(scope.row)"  size="mini">编辑</el-button>
                    <el-button  @click="tableDel(scope.row)" type="danger" size="mini">删除</el-button>
                </template>
                
            </el-table-column>
        </el-table>
        <el-pagination
            background
            @current-change="handleCurrentChange"
            @size-change = 'handleSizeChange'
            :page-sizes="[10, 50, 300, 400]"
            :page-size="PageSize"
            layout="prev, pager, next,->,jumper, sizes"
            :total="sumPage">
        </el-pagination>
        </template>
    </div>
</template>

<script>
import {getUser, addUser, delUser, editUser} from '../api/index'
export default {
    data(){
        return {
            dialogVisible : false,
            tableData: [],
            form :{
                name: '',
                age:'',
                sex: '',
                birth: '',
                addr: '',
            },
            rules: {
                name: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                age : [
                {required: true, message: '请输入年龄', trigger: 'blur'},
                {type: 'number', message: '年龄必须为数字', trigger: 'blur'},
                ],
                sex: [
                {required: true, message: '请选择性别', trigger: 'blur'}
                ],
                birth: [
                {required: true, message: '请选择出生日期', trigger: 'blur'}
                ],
                addr: [
                    {message: '请填写地址', trigger: 'blur'}
                ]                        
            }
            ,addOrEdit: 0, // add为0，edit为1
            currPage: 1, // 当前page
            sumPage: 0,
            PageSize: 10,
            searchKey:''

            }
            
    },
    methods: {
        refreshSub(page=1,name){
            getUser({page, limit:this.PageSize,name}).then((res) => {
            this.sumPage = res.data.count
            this.tableData = res.data.list
        })   
        } ,    
        submitOK(){
            // 这里需判断逻辑，一个是1改，一个是0增
            
            // this.$refs.form 不存放数据，是el-ui的一个form对象，里面有很多原型对象
            this.$refs.form.validate((vaild) => {
                if (vaild) {
                    // 1改0增
                    if (!this.addOrEdit) {
                        // 提交数据
                        addUser(this.form)
                        // 刷新
                        this.refreshSub()
                        }  else{
                        editUser(this.form)
                        this.refreshSub()
                    }
                    this.subCancel()
                }
            })
            }    
        ,
        subCancel(){
            this.$refs.form.resetFields()
            this.dialogVisible = false
        },
        handleClose(){
            this.subCancel()
        },
        tableEdit(row){
            this.addOrEdit = 1
            this.dialogVisible = true
            this.$nextTick(()=>{
            // 深拷贝
                this.form = JSON.parse(JSON.stringify(row))
            })


        },
        tableDel(row){
            delUser(row)
            this.refreshSub()

        },
        handleAdd(){
            this.addOrEdit = 0
            this.dialogVisible = true  
            
        },
        handleCurrentChange(currentPage){
            this.refreshSub(currentPage)
            this.currPage = currentPage
        },
        handleSizeChange(pages){
            this.PageSize = pages
            this.refreshSub(this.currPage)
        },
        Search(){
            this.refreshSub(1, this.searchKey)
        }
    },
    mounted() {
        this.refreshSub()
    },
    updated(){
    }
};
</script>

<style lang='less' scoped>
.user {
    margin-top: 20px;
    .userTop {
        display: flex;
        justify-content: space-between;
        div{
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>