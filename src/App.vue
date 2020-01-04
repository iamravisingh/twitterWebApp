<template>
  <div id="app">
  <router-view/>
  <div class="container is-fullhd">
      <figure class="image is-128x128">
      <img class="is-rounded" v-bind:src="userData.profile_image_url_https ? userData.profile_image_url_https : ''">
      <span>{{userData ? userData.name : ''}}</span>
    </figure>
  </div>
  <br>
  <div class="columns is-gapless is-multiline is-mobile">
    <br>
    <div class = "container is-fluid">
      <tweet></tweet>
    </div>
    </div>
  </div>
</template>

<script>
import codebird from 'codebird';
import tweet from './component/tweet'

export default {
  name: 'app',
  created(){
    const cb = new codebird;
    console.log('yay! we got cb in vue>>>>>>>>>>>>>>>',cb);
    // cb.setConsumerKey("7xuUATGIXa3g343NQfL0xwfKO","RoWrw4NAgj1eTzM1wR4Ee9gwmG0kQKC7HgBAi6U9pxa5SSreGZ");
    // cb.setToken("880716583450161152-tV3u67QIBSfxrRCESRuvwxU9GnVYsKq","PMpKpqBG6tsyfCnZnbWNKbq6ckWoxgPl2fdrLKpQkCCeW")
    this.$store.dispatch('getTwitterUserDetails')
    .then(result =>  {
      this.userData = result;
      console.log('userData in api response>?>>>>>>>>>>>>>>>',this.userData,this.userData.profile_image_url);
    })
    .catch(err => {
      console.log('error in getTwitterDetails>>>>>>>>>>>..',err);
    })


  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userData : null
    }
  },
  components : {
    tweet
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

  .is-fullhd {
    width : 8%;
  }

</style>
