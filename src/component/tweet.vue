<template>
  <div>
    <template  v-for="(item, index) in tweetStatus">
    <article class="media" :key = "index">
        <figure class="media-left">
            <p class="image is-64x64">
            <img v-bind:src="item.user.profile_image_url_https">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
            <p>
                <strong>{{item.user.name}}</strong><router-link :to = "{name : item.user.url}"><small>@{{item.user.screen_name}}</small></router-link> <small>{{new Date(item.created_at).getHours()}}m ago</small>
                <br>
                {{item.text}}
            </p>
            </div>
            <nav class="level is-mobile">
            <div class="level-left">
                <a class="level-item">
                <span class="icon is-small"><i class="fas fa-reply"></i></span>
                </a>
                <a class="level-item">
                <span class="icon is-small"><i class="fas fa-retweet"><span class="tag is-success">{{item.retweet_count}}</span></i></span>
                </a>
                <a class="level-item">
                <span class="icon is-small"><i class="fas fa-heart"></i></span>
                </a>
            </div>
            </nav>
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
import moment from 'moment'

export default {
    data(){
        return {
            tweetStatus : null
        }
    },
    created(){
        this.statUsesHomeTimeline();
    },
    computed: {
    ...mapGetters(['userStatus','loading']),
    },
    watch : {
        userStatus(value,newValue){
            if(value){
                this.tweetStatus = value;
                console.log('value inside the userStatus watcher function >>>>>>>>>>>>>>>>>>>>',this.userStatus);
            }
        }
    },
    methods : {
        statUsesHomeTimeline(){
            this.$store.dispatch('statuses_homeTimeline')
            .then(result => {
                return result;
            })
            .catch(err => {
                console.log('error  inside the status online >>>>>>>>>>>>>>',err)
                return err;
            })
        },
        removeTweetStatus(index){
            return this.tweetStatus.splice(index,1);
        }
    }
}
</script>

<style>

</style>