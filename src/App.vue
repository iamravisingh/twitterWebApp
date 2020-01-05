<template>
  <div id="app">
  <progress v-if = "loading" class="progress is-small is-danger" max="100"></progress>
  <twitterLogin></twitterLogin>
  <router-view/>
  <div class="container is-fullhd" id = "profile">
    <div class = "container content" >
      <figure class="image is-64x64">
      <img class="is-rounded" v-bind:src="userData.profile_image_url_https ? userData.profile_image_url_https : null ">
    </figure>
      <strong>{{userData.name}}</strong><br><small>@{{userData.screen_name}}</small>
    </div>
    <div class = "loginButton is-hidden-mobile">
      <!-- <button class="button is-info" v-if = isloggedIn @click = "isloggedIn = true">login</button> -->
      <!-- <button class="button is-info" v-if = !isloggedIn @click = logout>logout</button> -->
    </div>
  </div>
  <hr/>
  <div class="columns is-gapless is-multiline is-mobile">
    <br>
    <div class = "container is-fluid">
      <twitter></twitter>
    </div>
    </div>
  </div>
</template>

<script>
import codebird from 'codebird';
import twitter from './component/twitter'
import twitterLogin from '../src/component/twitterLogin'
import router from './router/router'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  created(){
    const cb = new codebird;
    console.log('yay! we got cb in vue>>>>>>>>>>>>>>>',cb);
    // cb.setConsumerKey("7xuUATGIXa3g343NQfL0xwfKO","RoWrw4NAgj1eTzM1wR4Ee9gwmG0kQKC7HgBAi6U9pxa5SSreGZ");
    // cb.setToken("880716583450161152-tV3u67QIBSfxrRCESRuvwxU9GnVYsKq","PMpKpqBG6tsyfCnZnbWNKbq6ckWoxgPl2fdrLKpQkCCeW")
      this.getTwitterUserDetails();
      this.$store.dispatch('direct_messages')
      this.$store.dispatch('direct_messagesShow')
      this.$store.dispatch('direct_messagesNew')
      // this.$store.dispatch('oauth_accessToken');
      // this.$store.dispatch('oauth_requestToken');
      // this.$store.dispatch('oauth_authorize');
      // this.$store.dispatch('handleReTweet')
      // this.userData = null
      // this.$store.dispatch('twitterUserScreen',{screen_name : "ledgerChain"})
      // .then(result => {
      //   console.log('result in userScreen>>>>>>>>>',result);
      //   this.userData = result
      // })
      // .catch(err => {
      //   console.log('err >>>>>>>>>>>>>>>',err);
      // })
  },
  data () {
    return {
      userData : null,
      isloggedIn : localStorage.getItem('userLogin') ? false : true,
    }
  },
  computed: {
    ...mapGetters(['loading','isUserNameLoginLoaded']),
  },
  methods : {
    getTwitterUserDetails(){
      this.$store.dispatch('getTwitterUserDetails')
      .then(result =>  {
        this.userData = result;
        console.log('userData in api response>?>>>>>>>>>>>>>>>',this.userData,this.userData.profile_image_url);
      })
      .catch(err => {
        console.log('error in getTwitterDetails>>>>>>>>>>>..',err);
      })
    }
  },
  components : {
    twitter,
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
