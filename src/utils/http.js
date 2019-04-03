import axios from 'axios'
import router from '@/router'

// 是使用 axios 创建一个可以发送请求的对象
// 这个对象就是一个 axios 的子体
// 你使用这个子体发送请求的时候，会自动拼接这个 baseURL
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1'
})

// 增加一个请求拦截器，就是针对每一次请求设一个卡
//   - 你能通过我这个卡，那么你的请求可以到达后台
//   - 你不能通过我这个卡，那么你的请求就断在这里了
http.interceptors.request.use(function (config) {
  // 这个函数就是我们的卡
  // 你的每一个请求都会经过我，我放行，你才能到达服务器
  // config 就是本次请求
  // console.log(config)
  // 在中间部位，我能拿到本次请求，还能把请求放行，那么我就可以在这里加工
  if (config.url === '/login') return config

  // 不是 login
  config.headers.Authorization = window.localStorage.getItem('token')
  // 只有放行，才能过去
  return config
}, function (error) {
  return Promise.reject(error)
})

// 增加一个响应拦截器，针对每一次响应设一个卡
//   - 通过我的卡，你才能获取到响应
//   - 通不过我的卡，你获取不到响应
http.interceptors.response.use(function (response) {
  // response 就是本次请求的响应
  // console.log(response)

  // 我不放行，你是拿不到
  if (response.data.meta.status === 401) {
    return router.push('/login')
  }
  // 我放行，你才能拿到
  return response
}, function (error) {
  return Promise.reject(error)
})

export default http

/*
  概念：
    1. 路由
      - 干嘛的？ 通过 hash 值得不同显示不同的组件，就是用来显示页面的
    2. 请求
      - 在组件打开以后，我通过发送请求得到数据，然后在把数据渲染到页面中
    3. 拦截器
      - 路由拦截器 -》 是在每一次路由跳转的时候来拦截跳转的功能，看看你是不是符合我的要求
        + 不符合要求，我不让你跳转路由（页面打不开，组件打不开）
        + 符合要求，我就让你通过，你就能打开页面
      - 请求拦截器 -》 实在每一次发送请求的时候拦截本次 ajax 请求，看看你是不是符合要求
        + 符合要求，我让你通过，你和这个请求才能发送出去
        + 不符合要求，我不让你通过，你这个请求就发不出去
        + 在这里能够做一些验证，也能错一些操作
      - 响应拦截器 -》 是在每一次请求发送以后，后台给回响应的时候拦截响应信息，对你进行一些操作
        + 操作或者验证失败，不让你收到响应，你本次请求就拿不到响应
        + 操作或者验证成功，我让你收到响应，那么你本次才是拿到了响应结果

  思路：
    1. 登录成功
      - 只有你登录成功以后你才能得到一个 token
        + token 是一个后台在你登录成功后生成的一个 加密字符串
        + 只要你登录成功了就能得到一个这个 token
        + 你登录失败了，就没有 token
      - 把这个 token 存储在本地了，localStorage 里面了
        + 将来你发送的所有请求，都必须把这个 token 携带回去（手动携带）
        + 这个携带是在请求头里面携带，你必须带过去，因为后台要进行验证
        + 你如果请求不带这个 token，那么后台就判定你没有登陆过，返回‘无效 token’
        + 你如果请求带了一个错误的 token，那么后台判定你没有登陆过，返回‘无效 token’
        + 你只有携带了，并且带了一个对的，那么才能给你正常的数据
    2. 跳转路由
      - 前台做的事情，如果你没有登陆过，我不会让你看到登陆后才应该看到的页面
      - 在你每一次跳转路由的时候都做一个验证（使用路由拦截器）
        + 如果你是跳转的 /login 路由，那么我不进行验证
        + 如果你跳转的是非 /login 路由，我要验证你的 localStorage 中是否有 token 属性
        + 你又 token 属性，不管对不对，我都让你看到页面
        + 你没有 token 属性，我就直接跳转回 /login，不让你看到页面
    3. 发送请求
      - 每一次请求发送出去的时候，都要携带 token（请求拦截器）
        + 先要判断是不是 /login 请求
        + 如果是 /login 那我就直接让请求通过，什么也不做
        + 如果不是 /login 请求，那么我就要在请求头中给你拿到 token 让你带过去
        + 带着 token 到后台，就看后台能不能给我数据了
    4. 接受响应
      - 每一次接受响应都应该进行一次判断（响应拦截器）
        + 判断给我的响应是不是‘无效 token’，在这里判断 status 是不是 401
        + 如果是，证明我没有登陆过或者登陆过期或者我的 token 被伪造了，直接回到 login
        + 如果不是，证明我的 token 是对的，我拿到数据了，那么我就直接让他通过就好了，我的请求就能得到数据了
*/
