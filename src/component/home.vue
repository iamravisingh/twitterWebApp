<template>
  <div class = "home">
  <progress v-if = "loading" class="progress is-small is-danger" max="100"></progress>
  <!-- <twitterLogin></twitterLogin> -->
  <div class="container is-fullhd" id = "profile">
    <div class = "container content" >
      <figure class="image is-64x64">
      <img class="is-rounded" v-bind:src="storedUser ? storedUser.profile_image_url_https : userData.profile_image_url_https">
    </figure>
      <strong>{{storedUser ? storedUser.name : userData.name}}</strong><br><small>@{{storedUser ? storedUser.screen_name : userData.screen_name}}</small>
      <br>
      <button class = "button is-info" @click = openTweetModal>Tweet</button>
      <div class="modal" :class="{'is-active' : postTweet}">
        <div class="modal-background"></div>
        <div class="modal-content">
          <div class = "box">
            <div class="field">
              <p class="control">
                <textarea class="textarea" 
                  placeholder="Post a tweet..." 
                  v-model="post"
                >
                </textarea>
                <button class = "button is-info" @click = postTweetData>Tweet</button>
              </p>
              </div>
          </div>
          <!-- Any other Bulma elements you want -->
        </div>
        <button class="modal-close is-large" aria-label="close" @click = "postTweet = false"></button>
      </div>
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
import twitter from './twitter'
import twitterLogin from './twitterLogin'
import router from '../router/router'
import { mapGetters } from 'vuex'

export default {
    name : "home",
    data () {
        return {
            userData : null,
            postTweet : null,
            post : null,
            isloggedIn : localStorage.getItem('LoggedInUser') ? false : true,
            storedUser : localStorage.getItem('LoggedInUser') ? JSON.parse(localStorage.getItem('LoggedInUser'))._json : ''
            // storedUser : null
        }
     },
    created(){
      const cb = new codebird;
      console.log('yay! we got cb in vue>>>>>>>>>>>>>>>',cb,this.storedUser);
      // cb.setConsumerKey("7xuUATGIXa3g343NQfL0xwfKO","RoWrw4NAgj1eTzM1wR4Ee9gwmG0kQKC7HgBAi6U9pxa5SSreGZ");
      // cb.setToken("880716583450161152-tV3u67QIBSfxrRCESRuvwxU9GnVYsKq","PMpKpqBG6tsyfCnZnbWNKbq6ckWoxgPl2fdrLKpQkCCeW")
        this.getTwitterUserDetailss();
  },
  computed: {
    ...mapGetters(['loading','isUserNameLoginLoaded','getTwitterUserDetails']),
  },
  watch : {
    getTwitterUserDetails(value,newValue){
      if(value){
        // this.storedUser = value;
        console.log('getTwitterUserDetails getTwitterUserDetails>>>>>>>>>>>>>>>>>>',this.storedUser);
      }
    }
  },
  methods : {
    getTwitterUserDetailss(){
      this.$store.dispatch('getTwitterUserDetails')
      .then(result =>  {
        // this.userData = result;
        console.log('userData in api response>?>>>>>>>>>>>>>>>',result);

      })
      .catch(err => {
        console.log('error in getTwitterDetails>>>>>>>>>>>..',err);
      })
    },
    openTweetModal(){
      this.postTweet = true
    },
    allocatedDataArr(data){
      const tweetData = data;
      const newArr = tweetData.slice(0,data.length > 5 ? data.length + 5 : 5);
      console.log('allocatedDataArr>>>>>>>>>>>>>>>>',tweetData,newArr);
    },
    postTweetData(){
      console.log('post >>>>>>>>>>>>>>>',this.post);
      this.$store.dispatch('actionTwitter',this.post)
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