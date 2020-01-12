<template>
  <div>
    <div class= "columns overallScroll">
        <div class = "column is-half tweetStatus">
            <twitterMessaging :tweetData = tweetStatus @showChatWindow = "handleChat"></twitterMessaging>
        </div>
        <article v-if = isReTweet class="media">
            <nav class="level">
                <div class="level-left">
                    <div class="level-item">
                    <a class="submitComment button is-info">ReTweet ?</a> <br>
                    <button class = "button is-info" @click = goToTweet()>Back to tweet</button>
                    </div>
                </div>
            </nav>
        </article>
        <div class = "column is-half">
            <chatWindow :item = tweetStatus @showChatWindow = "handleChat" ></chatWindow>
        <!-- <legend v-if = isReply>Reply with Comment</legend><hr/>
        <article v-if = isReply class="media">
            <figure class="media-left">
                <p class="image is-64x64">
                    <img v-if = !isReply src="https://bulma.io/images/placeholders/128x128.png">
                    <img v-if = isReply v-bind:src="userStatus[reTweetCommentImg].user.profile_image_url_https">
                </p>
            </figure>
            <div class="media-content">
                <div class="field">
                <p class="control">
                    <textarea class="textarea"
                     placeholder="Add a comment..." 
  
                     >
                     </textarea>
                </p>
                </div>
                <nav class="level">
                <div class="level-left">
                    <div class="level-item">
                    <a class="submitComment button is-info">Submit</a> <br>
                    <button class = "button is-info" @click = goToTweet()>Back to tweet</button>
                    </div>
                </div>
                </nav>
            </div>
        </article>

        <label v-if = isTweet >Post a Tweet</label><hr/>
        <article v-if = isTweet class="media">
            <div class="media-content">
                <div class="field">
                <p class="control">
                    <textarea class="textarea" 
                    placeholder="Post a Tweet..." 
                    v-model="tweetMsg"
                    @blur="$v.tweetMsg.$touch()"
                    >
                    </textarea>
                </p>
                </div>
                <nav class="level">
                <div class="level-left">
                    <div class="level-item" @click = onClickPostTweetMsg>
                    <a class="button is-info">Tweet</a>
                    </div>
                </div>
                </nav>
            </div>
        </article> -->
        </div>
    </div>
  <div v-if = "tweetStatus && tweetStatus.length < 1" class = "container">
      <span>There is no tweet available!</span>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import twitterMessaging from "../component/twitterMessaging";
import chatWindow from "../component/twitterChatWindow";
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
import moment from 'moment'

export default {
    data(){
        return {
            tweetStatus : null,
            isReTweet : false,
            loginWithUserName : null,
            reTweetCommentImg : '',
            tweetMsg : null,
            isReply : false,
            isTweet : true
        }
    },
    created(){
            console.log('localStorage.getItem>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
            // this.statUsesHomeTimeline();
            // this.$store.dispatch('currentLoggedInUser')
            this.handleTwitterLogin()
            // this.$store.dispatch('loggedInUserTimline',"jaurasingh")
    },
    validations : {
        tweetMsg : {
            required
        },

    },
    computed: {
    ...mapGetters(['userStatus','loading','currentLoggedInUser','loggedInUserTimline','getHomeTimeline','userNameLogin']),
    },
    watch : {
        getHomeTimeline(value,newValue){
            console.log('getHomeTimeline watcher value in userStatus >>>>>>>>>>>>',value)
            if(value){
                this.tweetStatus = value;
                console.log('value inside the userStatus watcher function >>>>>>>>>>>>>>>>>>>>',this.tweetStatus);
            }else{  
                console.log('else condition of userStatus watcher>>>>>>>>>>>>>>>>')
            }
        },
        userNameLogin(value,newValue){
            console.log('isUserNameLogin watcher function for populating the array>>>>>>>>>>>>>',value)
            if(value){
                this.userStatus.push(value);
                this.loginWithUserName = value;
            }else{
                console.log('else condition of userNameLogin watcher>>>>>>>>>>>>>>>>')
            }
        }
    },
    methods : {
        statUsesHomeTimeline(){
            this.$store.dispatch('statuses_homeTimeline')
            .then(res => {
                if(window.innerWidth < 786){
                    console.log('mobile mai agaeee>>>>>>>>>>>>>>>');
                    this.allocatedDataArr(res);
                }
            }).catch(err => console.log(err));
        },
        handleTwitterLogin(){
            this.$store.dispatch('currentLoggedInUser')
            .then(result => {
                console.log('inside the twitter component result after current user login>>>>>>>>>>>>>>>',result);
                this.$store.dispatch('getHomeTimeline',result.username)
            })
            .catch(err => {
                console.log('inside the twitter component  in error block for twitterlogin>>>>>>>>>',err);
            })
        },
        allocatedDataArr(data){
            const tweetData = data;
            const newArr = tweetData.slice(0,data.length > 5 ? data.length + 5 : 5);
            console.log('allocatedDataArr>>>>>>>>>>>>>>>>',newArr);
        },
        removeTweetStatus(index){
            return this.tweetStatus.splice(index ,1);
        },
        handleReTweet(index){
            console.log('event and inde >>>>>>>>>>>>>>>>>x',index,event,);
            this.isReTweet = true;
            this.isReply = false;
            this.isTweet = false;
            this.reTweetCommentImg = index;
        },
        onClickPostTweetMsg(){
            console.log('tweet dispatch action invoked onClickTweetMsg>>>>>>>>>>>>>>>>>>>>>>>');
            this.$store.dispatch('actionTwitter',this.tweetMsg);
            this.tweetMsg = '';
        },
        handleComment(index){
            this.isReply = true;
            this.isReTweet = false;
            this.isTweet = false;
            this.reTweetCommentImg = index;
        },
        goToTweet(index){
            console.log('inside twitte component gototweet>>>>>>>>>>>>>>',index,event)
            this.isReply = false;
            this.isReTweet = false;
            this.isTweet = true ;
            this.$store.dispatch('handleReTweet',tweetStatus[index].id_str);
        },
        handleChat(value){
            console.log('handlechat invoked >>>>>>>>>>>>>>>>',value)
        }

    },
    components : {
        twitterMessaging,
        chatWindow
    }
}
</script>

<style lang="css" scoped> 
    @import '../css/twitter.css';
</style>