<template>
    <div class="login">
        <el-form label-position="right" 
        label-width="80px"
        :model="form" 
        :rules='rules'
        ref="form"
        >
            <el-form-item class="square" label="" size="normal" >
                <h2>系统登录</h2>
            </el-form-item>
            <el-form-item prop="username" label="用户名">
                <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password" label='密码' >
                <el-input type='password' v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>        
            <el-form-item  label="" size="normal">
                <el-button style="margin-top: 25px;" class="square" type="primary" size="default"  @click="submit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Cookie from 'js-cookie'
import {getMenu} from '../api'
export default {
    name: 'Login',
    data(){
        return {
            form:{
                username: '',
                password: '',
            },
            rules :{
                username: [
                            { required: true, message: '请输入姓名', trigger: 'blur' },
                            { min: 1,  message: '长度要大于一个字符', trigger: 'blur' }
                        ],
                password: [
                            { required: true, message: '请输入密码', trigger: 'blur' },
                            {  min: 1, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
                        ], 
            }
        }
    },
    methods:{

        submit(){
            this.$refs.form.validate((vail) => {
                if (vail) {
                    getMenu(this.form).then(({data}) => {
                        console.log(data.data.menu, '登录获取的menu')
                        if (data.code == 20000){
                            Cookie.set('token', data.data.token)
                            // 存入路由信息
                            this.$store.commit('addMenu', data.data.menu)
                            // 上方因为刷新就会重新加载vue，所以会清空store，则存在cookie中
                            Cookie.set('menuData', JSON.stringify(data.data.menu))
// 动态添加路由不能main.js里,只有Vue第一次挂载（每次刷新）才会用这个，需要在login里面刷新路由
                        //  而login里面刷新路由就可以借用Store, 但store每次刷新也是重新搞，所以
                        //  只存放刷新路由的方法，数据就是还在cookie中
                            // 刷新路由
                            this.$store.commit('refreshRouter', this.$router)

                            this.$message({
                                type:'success',
                                message: '登录成功'
                            })
                            this.$router.push('/home')
                        } else {
                            this.$message.error(data.data.message)
                        }
                    })
                    // Cookie.set('token', token)
                    // this.$router.push('/home')
                }
            })

        },
        enterSub(e){
            if (e.key == 'Enter') this.submit()
        }
    },
    mounted(){
        // 回调函数只需要写函数名
        window.addEventListener('keyup', this.enterSub)
    },
    destroyed(){
        window.removeEventListener('keyup', this.enterSub)
    }
}
</script>

<style scoped lang='less'>
    .login {
        display: flex;
        justify-content: center;
        padding: 30px 40px;
        width: 450px;
        height: 350px;
        margin: 100px auto;
        box-sizing: border-box;
        border-radius: 15px;
        box-shadow: 0 0 25px #cac6c6;
        .square {
            margin-left: 20px;
            
        }
    }
</style>