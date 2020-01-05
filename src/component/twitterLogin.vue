<template>
    <div class="modal " :class="{ 'is-active' : isModalOpen}">
        <div class="modal-background"></div>
        <div class="modal-content">
            <div class = "box columns">
                <div class = "login column">
                    <legend>Login</legend>
                    <hr/>
                    <input class="input"
                    type="text" 
                    placeholder="Twitter User Name..."
                    v-modal= "this.twitterUserName"
                    >
                    <hr/>
                    <span>{{this.twitterUserName}}</span>
                    <button class="button is-info" @click = handleTwitterLogin :class="{'is-loading' : isUserNameLoginLoaded}">Submit</button>
                </div>
                <div class = "register column">
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
                </div>
            </div>
        </div> 
        <button class="modal-close is-large" @click = closeModal aria-label="close"></button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props :['onClickLogin'],
    data(){
        return {
            twitterUserName : '',
            isModalOpen : localStorage.getItem('userLogin') ? false : true,
            isUserLogin : false,
            registerName : '',
            registerPhoneNum : ''
        }
    },
    created(){
        
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
            this.$store.dispatch('twitterUserScreen',{screen_name : this.twitterUserName || "ledgerChain"})
            .then(result => {
                console.log('result in userScreen>>>>>>>>>',result);
                // this.$store.getters.userStatus = null
                this.isModalOpen = false;
            })
            .catch(err => {
                console.log('err >>>>>>>>>>>>>>>',err);
            })
        }
    },
}
</script>

<style lang="css" scoped>
  .disabled{
    pointer-events: none;
    background: #9e9e9e !important;
    color: #c4c4c4 !important;
  }
</style>