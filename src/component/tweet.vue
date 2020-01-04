<template>
  <div>
    <!-- <ul> -->
        <template  v-for="(item, index) in tweetStatus">
        <!-- <li :key = "index">{{item.text}}</li> -->
        <article class="media" :key = "index">
            <figure class="media-left">
                <p class="image is-64x64">
                <img v-bind:src="item.user.profile_image_url_https">
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                <p>
                    <strong>{{item.user.name}}</strong> <router-link :to = "{name : 'item.user.url'}" target = "_blank"><small>@{{item.user.screen_name}}</small></router-link> <small>{{new Date(item.created_at).getHours()}}m ago</small>
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
                    <span class="icon is-small"><i class="fas fa-retweet"></i></span>
                    </a>
                    <a class="level-item">
                    <span class="icon is-small"><i class="fas fa-heart"></i></span>
                    </a>
                </div>
                </nav>
            </div>
            <div class="media-right">
                <button class="delete"></button>
            </div>
        </article>
        </template>
    <!-- </ul> -->
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
    ...mapGetters(['userStatus']),
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
        removeTweetStatus(){
            
        }
    }
}
</script>

<style lang="sass" src="bulma"></style>
<style>

</style>