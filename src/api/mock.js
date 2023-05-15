import Mock from 'mockjs'
import homeApi from './mockServerData/home'
import user from './mockServerData/user'
import permission from './mockServerData/permission'
// 定于mock请求拦截
Mock.mock('/api/home/getData', homeApi.getStatisticalData)

// 定义用户列表名称
Mock.mock('/api/user/add', 'post', user.createUser)
Mock.mock('/api/user/edit','post', user.updateUser)
Mock.mock('/api/user/del','post', user.deleteUser)
Mock.mock(/\/api\/user\/getUser/, user.getUserList)

Mock.mock("/api/permission/getMenu", 'post',permission.getMenu)