<template>
  <div>
    <p>欢迎访问</p>
  </div>
</template>

<script>
import http from '@/utils/http.js'
export default {
  data () {
    return {}
  },

  created () {
    http
      .get('/users', {
        params: {
          pagenum: 1,
          pagesize: 2
        }
      })
      .then(res => {
        console.log(res)
      })
  }
}
</script>

<style>

</style>
