<template>
    <div class = "twitterLogin">
        <div id = "loginButton"  class = "is-hidden-mobile">
            <!-- <button class="button is-info" v-if = isLoggedIn @click = "isModalOpen = true">login</button> -->
            <button class="button is-info" v-if = !isLoggedIn @click = logout>logout</button>
        </div>
        <!-- <div class="modal" :class="{'is-active' : isModalOpen}"> -->
            <!-- <div class="modal-background"></div> -->
            <!-- <div class="modal-content"> -->
                <div v-if = isLoggedIn class = "box columns">
                    <div class = "login column">
                        <legend>Login</legend>
                        <hr/>
                        <!-- <article class="message is-danger" v-if = errorMsg >
                            <div class="message-header">
                                <p>{{errorMsg}}</p>
                                <button class="delete" @click ="errorMsg = '' " aria-label="delete"></button>
                            </div>
                        </article>
                        <label :class = "{error_message: $v.twitterUserName.$error}">Twitter Id:*</label>
                        <input class="input"
                        type="text" 
                        placeholder="Twitter User Name..."
                        v-model="twitterUserName"
                        @blur="$v.twitterUserName.$touch()"
                        >
                        <template v-if="$v.twitterUserName.$error">
                            <span class="error_message" v-if="!$v.twitterUserName.required">User Name is required</span>
                        </template>
                        <hr/> -->
                        <!-- <a href = "http://127.0.0.1:8010/auth/twitter"><button class="button is-info" :disabled="$v.twitterUserName.$invalid" @click = socialLogin :class="{'is-loading' : isUserNameLoginLoaded}">Click for twitter login</button></a> -->
                        <a href = "http://127.0.0.1:8010/auth/twitter"><button class="button is-info" :class="{'is-loading' : isUserNameLoginLoaded}">Click for twitter login</button></a>
                    </div>
                </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
import router from '../router/router'

export default {
    props :['islogged'],
    data(){
        return {
            twitterUserName : '',
            isModalOpen : localStorage.getItem('LoggedInUser') ? false : true,
            isLoggedIn : localStorage.getItem('LoggedInUser') ? false : true,
            isUserLogin : false,
            registerName : '',
            registerPhoneNum : '',
            errorMsg : ''
        }
    },
    created(){
       console.log('this data in created >>>>>>>>>>>>',this.islogged);
    },
    validations : {
        twitterUserName : {
            required
        }
    },
    computed: {
        ...mapGetters(['loading','isUserNameLoginLoaded'])
    },
    methods : {
        closeModal(){
            console.log('fdfdfdfdfdfd>>>>>>>>>>>>>>>>>')
            return this.isModalOpen = false;
        },
        handleTwitterLogin(){
            this.$store.dispatch('currentLoggedInUser')
            .then(result => {
                console.log('result after current user login>>>>>>>>>>>>>>>',result);
            })
            .catch(err => {
                console.log('result in error block for twitterlogin>>>>>>>>>',err);
            })
        },
        socialLogin(){
            return this.$store.dispatch('twitSocialLogin');
        },
        logout(){
            console.log('logoutUser onclick >>>>>>>>>>>>');
            this.$store.dispatch('logoutUser')
        }
    },
}
</script>

<style lang="css" scoped>
  @import '../css/twitterLogin.css'
</style>