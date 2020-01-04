import Vue from 'vue';
import Vuex from 'vuex';
import codebird from 'codebird';

Vue.use(Vuex);
let cb = new codebird;
cb.setConsumerKey("7xuUATGIXa3g343NQfL0xwfKO","RoWrw4NAgj1eTzM1wR4Ee9gwmG0kQKC7HgBAi6U9pxa5SSreGZ");
cb.setToken("880716583450161152-tV3u67QIBSfxrRCESRuvwxU9GnVYsKq","PMpKpqBG6tsyfCnZnbWNKbq6ckWoxgPl2fdrLKpQkCCeW")

export default new Vuex.Store({
    state : {
        userData : '',
        userStatus : ''
    },
    mutations : {
        userData : (state,payload) => state.userData = payload,
        userStatus : (state,payload) => state.userStatus = payload
    },
    getters : {
        userData : state => state.userData,
        userStatus : state => state.userStatus
    },
    actions : {
        
        /**
         * account_verifyCredentials action returns the current user against the current login user with token.
         * @param {*} {context} we can access all commit and states and dispatch in context 
         * saving the data back to vuex state.
         */
        getTwitterUserDetails : (context) => {
            return new Promise((resolve,reject) => {
                cb.__call("account_verifyCredentials",{},res => {
                    const parsedResponse = res && typeof res === "string"? JSON.parse(res) : res;
                    if(parsedResponse.hasOwnProperty('errors')){
                      console.log('store if account_verifyCredentials>>>>>>>>>>>>>>>>>>>>',parsedResponse);
                      reject(parsedResponse);
                    }else{
                      console.log('store else account_verifyCredentials>>>>>>>>>>>>>>>>>>>>',parsedResponse);
                      context.commit('userData',parsedResponse);
                      resolve(parsedResponse);
                    }
                })
            })
        },
        
        /**
         * statuses_homeTimeline action returns the current user against the current login user twitter status.
         * @param {*} {context} we can access all commit and states and dispatch in context 
         * saving the data back to vuex state.
         */
        statuses_homeTimeline : (context) => {
            return new Promise((resolve,reject) => {
                cb.__call("statuses_homeTimeline", {}, (res, rate, err) => {
                    // console.log('arguments in status Timeline >>>>>>>>>>>>',arguments);
                    console.log('statuses_homeTimeline in status Timeline>>>>>>>>>>>>>>',res);
                    // console.log('error in status time line >>>>>>>>>>>>>>>>',err);
                    const parsedResponse = res && typeof res === "string"? JSON.parse(res) : res;
                    if(err){
                        return reject(err);
                    }else{
                        context.commit('userStatus',parsedResponse);
                        return resolve(parsedResponse);
                    }
                }); 
            })
        }
    }
})