// 用户的管理类
import { store } from '/nf-state'

let _user = null

const userController = () => {

  const setWriteUse = (u) => {
    _user = u
  }

  const login = (code, psw) => {
    // 假装访问后端
    setTimeout(() => {
      // 获得用户信息
      const newUser = {
        name: '后端传的用户名：' + code
      }
      Object.assign(_user, newUser)
      _user.isLogin = true
    }, 100)
  }

  const logout = () => {
    _user.isLogin = false
    _user.name = '已经退出'
  }

  const getUser = () => {
    return store.user1
  }

  return {
    setWriteUse,
    getUser,
    login,
    logout
  }
}

export default userController