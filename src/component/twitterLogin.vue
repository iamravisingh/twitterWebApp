<template>
    <div class = "twitterLogin">
        <div id = "loginButton"  class = "is-hidden-mobile">
            <button class="button is-info" v-if = isLoggedIn @click = "isModalOpen = true">login</button>
            <button class="button is-info" v-if = !isLoggedIn @click = logout>logout</button>
        </div>
        <div class="modal" :class="{'is-active' : isModalOpen}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class = "box columns">
                    <div class = "login column">
                        <legend>Login</legend>
                        <hr/>
                        <article class="message is-danger" v-if = errorMsg >
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
                        <hr/>
                        <button class="button is-info" :disabled="$v.twitterUserName.$invalid" @click = handleTwitterLogin :class="{'is-loading' : isUserNameLoginLoaded}">Submit</button>
                    </div>
                    <!-- <div class = "register column">
                        <legend>Create Account</legend>
                        <hr/>
                        <input class="input"
                        type="text" 
                        placeholder="Twitter User Name..."
                        v-modal="registerName"
                        >
                        <br>
                        <input class="input"
                        type="text" 
                        placeholder="Twitter User Name..."
                        v-modal="registerPhoneNum"
                        >
                        <hr/>
                        <button class="button is-info">Register</button>
                    </div> -->
                </div>
            </div> 
            <button class="modal-close is-large" @click = closeModal aria-label="close"></button>
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
            isModalOpen : localStorage.getItem('userLogin') ? false : true,
            isLoggedIn : localStorage.getItem('userLogin') ? false : true,
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
            console.log('inside handleTwitterLogin>>>>>>>>>>>>>>>>>>>>',this.twitterUserName)
            this.$store.dispatch('twitterUserScreen',{screen_name : this.twitterUserName || "ledgerChain"})
            .then(result => {
                console.log('result in userScreen>>>>>>>>>',result);
                    this.isModalOpen = false;
            })
            .catch(err => {
                this.errorMsg = err[0].message
                console.log('err >>>>>>>>>>>>>>>',err);
            })
        },
        logout(){
            localStorage.setItem('userLogin','');
            router.go();
        }
    },
}
</script>

<style lang="css" scoped>
  @import '../css/twitterLogin.css'
</style>