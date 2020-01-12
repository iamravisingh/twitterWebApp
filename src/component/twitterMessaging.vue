<template>
    <div>
    <template v-for="(item, index) in tweetData">
        <article class="media" :key = "index">
            <figure class="media-left">
                <p class="image is-64x64">
                <img v-bind:src="item.user.profile_image_url_https">
                </p>
            </figure>
            <div class="media-content" @click = onclickShowMessage(index)>
                <div class="content">
                <p>
                    <strong>{{item.user.name}}</strong><router-link :to = "{name : item.user.url}"><small> @{{item.user.screen_name}}</small></router-link> <small>{{new Date(item.created_at).getHours()}}m ago</small>
                    <br>
                    {{item.text}}
                </p>
                </div>
                <!-- <nav class="level is-mobile"> -->
                <div class="level-left">
                    <a class="level-item" @click = handleComment(index)>
                    <span class="icon is-small"><i class="fas fa-reply"></i></span>
                    </a>
                    <a class="level-item" @click = onclickRetweet(index,item)>
                    <span class="icon is-small"><i class="fas fa-retweet"></i></span>
                    </a>
                    <span class="tag is-success">{{item.retweet_count}}</span>
                    <!-- <a class="level-item">
                    <span class="icon is-small"><i class="fas fa-heart"></i></span>
                    </a> -->
                </div>
                <!-- </nav> -->
                <article v-if = isReTweet class="media">
                    <nav class="level">
                        <div class="level-left">
                            <div class="level-item">
                            <a class="submitComment button is-info">ReTweet ?</a> <br>
                            <button class = "button is-info" @click = onclickRetweet(index)>Back to tweet</button>
                            </div>
                        </div>
                    </nav>
                </article>
                <legend v-if = isReply>Reply with Comment</legend><hr/>
                <article v-if = isReply class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img  src="https://bulma.io/images/placeholders/128x128.png">
                            <!-- <img v-if = isReply v-bind:src="userStatus[reTweetCommentImg].user.profile_image_url_https"> -->
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="field">
                        <p class="control">
                            <textarea class="textarea"  placeholder="Add a comment..." ></textarea>
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

                <!-- <label v-if = isTweet >Post a Tweet</label><hr/>
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
                            <div class="level-item" @click = onClickPostTweetMsg()>
                            <a class="button is-info">Tweet</a>
                            </div>
                        </div>
                        </nav>
                    </div>
                </article> -->
                    </div>
                    <div class="media-right">
                        <button class="delete" @click = removeTweetStatus(index)></button>
                    </div>
                </article>
    </template>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props : ['tweetData'],
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
        console.log('twitterMessaging component localStorage.getItem>>>>>>>>>>>>>>>>>>>>>>>>>>>>',this.$prop,this.$props)
        // this.$props = this.tweetStatus;  
    },
    methods : {
        statUsesHomeTimeline(){
            this.$store.dispatch('statuses_homeTimeline')
            .then(res => {
                if(window.innerWidth < 786){
                    console.log('mobile mai agaeee >>>>>>>>>>>>>>>');
                    this.allocatedDataArr(res);
                }
            }).catch(err => console.log(err));
        },
        removeTweetStatus(index){
            // console.log('index wihg props : >>>>>>>>>>>',index,this.$props)
            // return this.$props.tweetData.splice(index ,1);
        },
        goToTweet(index){
            console.log('goToTweet >>>>>>>>>>>>>>',index,event)
            this.isReply = false;
            this.isReTweet = false;
            this.isTweet = true ;
            this.$store.dispatch('handleReTweet',this.tweetStatus[index].id_str);
        },
        handleComment(index){
            console.log('handleComment >>>>>>>>>>>>>>',index,event)
            this.isReply = true;
            this.isReTweet = false;
            this.isTweet = false;
            this.reTweetCommentImg = index;
        },
        handleReTweet(index){
            console.log('event and inde >>>>>>>>>>>>>>>>>x',index,event);
            this.isReTweet = true;
            this.isReply = false;
            this.isTweet = false;
            this.reTweetCommentImg = index;
            
        },
        onclickRetweet(index,item){
            console.log('inside onclickRetweet index folder>>>>>>>>>>>>>>',index,item.id_str)
            this.$store.dispatch('handleReTweet',item.id_str);
        },
        onClickPostTweetMsg(){
            console.log('tweet dispatch action invoked onClickTweetMsg>>>>>>>>>>>>>>>>>>>>>>>');
            // this.$store.dispatch('actionTwitter',this.tweetMsg);
            this.tweetMsg = '';
        },
        onclickShowMessage(index){
           return this.$emit('showChatWindow',{index,isChat : true});
        },
        
    }
}
</script>

<style>

</style>