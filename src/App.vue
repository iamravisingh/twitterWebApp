<template>
  <div id="app">
    <router-view/>                               
    <twitterLogin></twitterLogin>
  </div>
</template>

<script>
import router from './router/router'
import twitterLogin from './component/twitterLogin'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  data(){
    return {
      loggedInUserData : null
    }
  },
  mounted() {
    console.log('inside mounted function>>>>>>>>>>>>>>>>>>>>');
    this.$store.dispatch('currentLoggedInUser');
    // this.$store.dispatch('getHomeTimeline');
  },
  components : {
    twitterLogin
  }
}
</script>

<style lang="sass" src="bulma"></style>
<style lang="css" scoped>
  #app{
    /* background-color: #2f2f2f; */
    font-family: monospace;
    height : 100vh;
  }

  #profile{
    background: #794BC4;
    display: inline-flex;
    width: 100%;
  }

  #profile > .content{
    margin: 0 auto;
    text-align: center;
  }

  .is-64x64{
    margin: 0 auto;
    margin-bottom: 0 !important;
  }

  .loginButton{
    /* margin : 28px 0 0 0; */
  }

  .is-small{
    height: 4px;
    margin-bottom: 5px;
  }

  .is-info{
    background: #794BC4;
  }
</style>
