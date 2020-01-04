import Vue from 'vue';
import Vuex from 'vuex';
import codebird from 'codebird';
import {twitterConfig} from "../../config"

Vue.use(Vuex);
let cb = new codebird;
// cb.setConsumerKey("7xuUATGIXa3g343NQfL0xwfKO","RoWrw4NAgj1eTzM1wR4Ee9gwmG0kQKC7HgBAi6U9pxa5SSreGZ");
// cb.setToken("880716583450161152-tV3u67QIBSfxrRCESRuvwxU9GnVYsKq","PMpKpqBG6tsyfCnZnbWNKbq6ckWoxgPl2fdrLKpQkCCeW")
cb.setConsumerKey(twitterConfig.consumerAPIKey.apiKey,twitterConfig.consumerAPIKey.secreKey);
cb.setToken(twitterConfig.AccessKey.accessToken,twitterConfig.AccessKey.accessTokenSecret)

export default new Vuex.Store({
    state : {
        userData : '',
        userStatus : '',
        newTweet : '',
        loading : true
    },
    mutations : {
        userData : (state,payload) => state.userData = payload,
        userStatus : (state,payload) => state.userStatus = payload,
        newTweet : (state,payload) => state.newTweet = payload,
        loading : (state,payload) => state.loading = payload
    },
    getters : {
        userData : state => state.userData,
        userStatus : state => state.userStatus,
        newTweet : state => state.newTweet,
        loading : state => state.loading
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
                context.commit('loading',true);
                cb.__call("statuses_homeTimeline",{}, (res, rate, err) => {
                    console.log('rate status Timeline>>>>>>>>>>>>>>',rate);
                    const parsedResponse = res && typeof res === "string"? JSON.parse(res) : res;
                    if(err){
                        context.commit('loading',false);
                        return reject(err);
                    }else{
                        context.commit('loading',false);
                        context.commit('userStatus',parsedResponse);
                        return resolve(parsedResponse);
                    }
                }); 
            })
        },

        /**
         * statuses_update action can tweet with the current account.
         * @param {*} {context} we can access all commit and states and dispatch in context 
         * saving the data back to vuex state.
         */
        tweet : (context,payload) => {
            return new Promise((resolve,reject) => {
                cb.__call("statuses_update", { status: payload }, (reply,rate,err) => {
                      if(err){
                        return reject(err);
                      }else{
                        console.log('response while tweeting !>>>>>>>>>>>>',res);
                        context.commit('newTweet',res);
                        return resolve(res);
                      }
                  });
            })
        }
    }
})