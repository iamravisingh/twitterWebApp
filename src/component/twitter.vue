<template>
  <div>
    <template v-for="(item, index) in loginWithUserName">
        <article :key = index v-if = loginWithUserName class="media">
            <figure class="media-left">
                <p class="image is-64x64">
                <img v-bind:src="loginWithUserName.profile_image_url_https">
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                <p>
                    <strong>{{loginWithUserName.name}}</strong><router-link :to = "{name : loginWithUserName.url}"><small> @{{loginWithUserName.screen_name}}</small></router-link> <small>{{new Date(loginWithUserName.status.created_at).getHours()}}m ago</small>
                    <br>
                    {{loginWithUserName.status.text}}
                </p>
                </div>
                <nav class="level is-mobile">
                <div class="level-left">
                    <a class="level-item">
                    <span class="icon is-small"><i class="fas fa-reply"></i></span>
                    </a>
                    <a class="level-item" @click = handleReTweet()>
                    <span class="icon is-small"><i class="fas fa-retweet"><span class="tag is-success">{{loginWithUserName.status.retweet_count}}</span></i></span>
                    </a>
                    <a class="level-item">
                    <span class="icon is-small"><i class="fas fa-heart"></i></span>
                    </a>
                </div>
                </nav>
            </div>
            <div class="media-right">
                <button class="delete" @click = removeTweetStatus()></button>
            </div>
        </article>
    </template>
    
    <div class= "columns overallScroll">
        <div class = "column is-half tweetStatus">
            <template v-for="(item, index) in tweetStatus">
                <article class="media" :key = "index">
                    <figure class="media-left">
                        <p class="image is-64x64">
                        <img v-bind:src="item.user.profile_image_url_https">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                        <p>
                            <strong>{{item.user.name}}</strong><router-link :to = "{name : item.user.url}"><small> @{{item.user.screen_name}}</small></router-link> <small>{{new Date(item.created_at).getHours()}}m ago</small>
                            <br>
                            {{item.text}}
                        </p>
                        </div>
                        <nav class="level is-mobile">
                        <div class="level-left">
                            <a class="level-item" @click = handleComment(index)>
                            <span class="icon is-small"><i class="fas fa-reply"></i></span>
                            </a>
                            <a class="level-item" @click = handleReTweet(index)>
                            <span class="icon is-small"><i class="fas fa-retweet"></i></span>
                            </a>
                            <span class="tag is-success">{{item.retweet_count}}</span>
                            <!-- <a class="level-item">
                            <span class="icon is-small"><i class="fas fa-heart"></i></span>
                            </a> -->
                        </div>
                        </nav>
                    </div>
                    <div class="media-right">
                        <button class="delete" @click = removeTweetStatus(index)></button>
                    </div>
                </article>
            </template>
        </div>
        <div class = "column is-half">
        <article v-if = isReTweet class="media">
            <nav class="level">
                <div class="level-left">
                    <div class="level-item">
                    <a class="submitComment button is-info">ReTweet ?</a> <br>
                    <button class = "button is-info" @click = goToTweet>Back to tweet</button>
                    </div>
                </div>
            </nav>
        </article>
        <legend v-if = isReply>Reply with Comment</legend><hr/>
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
                    <textarea class="textarea" placeholder="Add a comment..." v-model="tweetMsg"></textarea>
                </p>
                </div>
                <nav class="level">
                <div class="level-left">
                    <div class="level-item">
                    <a class="submitComment button is-info">Submit</a> <br>
                    <button class = "button is-info" @click = goToTweet>Back to tweet</button>
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
                    <textarea class="textarea" placeholder="Post a Tweet..." v-model="tweetMsg"></textarea>
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
        </article>
        </div>
    </div>
  <div v-if = "tweetStatus && tweetStatus.length < 1" class = "container">
      <span>There is no tweet available!</span>
  </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
            this.statUsesHomeTimeline();
    },
    computed: {
    ...mapGetters(['userStatus','loading','userNameLogin']),
    },
    watch : {
        userStatus(value,newValue){
            console.log('watcher value in userStatus >>>>>>>>>>>>',value,newValue)
            if(value){
                this.tweetStatus = value;
                console.log('value inside the userStatus watcher function >>>>>>>>>>>>>>>>>>>>',this.userStatus,this.userNameLogin);
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
            // this.$store.dispatch('actionTwitter',this.tweetMsg);
        },
        handleComment(index){
            this.isReply = true;
            this.isReTweet = false;
            this.isTweet = false;
            this.reTweetCommentImg = index;
        },
        goToTweet(){
            this.isReply = false;
            this.isReTweet = false;
            this.isTweet = true ;
        }
    }
}
</script>

<style lang="css" scoped> 
    @import '../css/twitter.css';
</style>