import Vue from "vue";
import Vuex from "vuex";
import codebird from "codebird";
import {
    twitterConfig
} from "../../config";
import router from "../router/router";

Vue.use(Vuex);
let cb = new codebird();
// cb.setConsumerKey("7xuUATGIXa3g343NQfL0xwfKO","RoWrw4NAgj1eTzM1wR4Ee9gwmG0kQKC7HgBAi6U9pxa5SSreGZ");
// cb.setToken("880716583450161152-tV3u67QIBSfxrRCESRuvwxU9GnVYsKq","PMpKpqBG6tsyfCnZnbWNKbq6ckWoxgPl2fdrLKpQkCCeW")
cb.setConsumerKey(
    twitterConfig.consumerAPIKey.apiKey,
    twitterConfig.consumerAPIKey.secreKey
);
cb.setToken(
    twitterConfig.AccessKey.accessToken,
    twitterConfig.AccessKey.accessTokenSecret
);
// cb.setUseProxy(false);

export default new Vuex.Store({
    state: {
        userData: "",
        userStatus: "",
        newTweet: "",
        loading: true,
        userNameLogin: "",
        isUserNameLoginLoaded: false,
        currentLoggedInUser: "",
        loggedInUserTimline : "",
        getHomeTimeline: "",
        getTwitterUserDetails : ''
    },
    mutations: {
        userData: (state, payload) => (state.userData = payload),
        userStatus: (state, payload) => (state.userStatus = payload),
        newTweet: (state, payload) => (state.newTweet = payload),
        loading: (state, payload) => (state.loading = payload),
        userNameLogin: (state, payload) => (state.userNameLogin = payload),
        isUserNameLoginLoaded: (state, payload) => (state.isUserNameLoginLoaded = payload),
        currentLoggedInUser: (state, payload) => (state.currentLoggedInUser = payload),
        loggedInUserTimline: (state, payload) => (state.loggedInUserTimline = payload),
        getHomeTimeline: (state, payload) => (state.getHomeTimeline = payload),
        getTwitterUserDetails: (state, payload) => (state.getTwitterUserDetails = payload)
    },
    getters: {
        userData: state => state.userData,
        userStatus: state => state.userStatus,
        newTweet: state => state.newTweet,
        loading: state => state.loading,
        userNameLogin: state => state.userNameLogin,
        isUserNameLoginLoaded: state => state.isUserNameLoginLoaded,
        currentLoggedInUser: state => state.currentLoggedInUser,
        loggedInUserTimline: state => state.loggedInUserTimline,
        getHomeTimeline: state => state.getHomeTimeline,
        getTwitterUserDetails: state => state.getTwitterUserDetails,
    },
    actions: {
        /**
         * account_verifyCredentials action returns the current user against the current login user with token.
         * @param {*} {context} we can access all commit and states and dispatch in context
         * saving the data back to vuex state.
         */
        getTwitterUserDetails(context) {
            context.commit("loading", true);
            return new Promise((resolve, reject) => {
                fetch(`${twitterConfig.BASE_URL}/verify_Usercredentials`)
                .then( res => res.json())
                .then(res => {
                    const parsedResponse =
                    res && typeof res === "string" ? JSON.parse(res) : res;
                    context.commit("loading", false);
                    context.commit("getTwitterUserDetails", res);
                    console.log("store else account_verifyCredentials>>>>>>>>>>>>>>>>>>>>", parsedResponse);                        context.commit("userData", parsedResponse);
                    resolve(parsedResponse);
                })
                .catch(err => {
                    console.log("store if account_verifyCredentials>>>>>>>>>>>>>>>>>>>>",parsedResponse)
                    context.commit("loading", true);
                    reject(parsedResponse);
                })
            });
        },

        getHomeTimeline(context,payload) {
            context.commit("loading", true);
            console.log('payload in gethomeTimeline action ><<<<<<>>>>>>>>>>', payload);
            return new Promise((resolve, reject) => {
                // fetch(`${twitterConfig.BASE_URL}/home_timeline/`)
                fetch('http://127.0.0.1:8010/home_timeline/'+payload)
                .then(res => res.json())    
                .then(res => {
                    const parsedResponse =
                    res && typeof res === "string" ? JSON.parse(res) : res;
                    context.commit("loading", false);
                    context.commit("getHomeTimeline", res);
                    console.log("store else account_verifyCredentials>>>>>>>>>>>>>>>>>>>>", parsedResponse);                        context.commit("userData", parsedResponse);
                    resolve(parsedResponse);
                })
                .catch(err => {
                    console.log("store if account_verifyCredentials>>>>>>>>>>>>>>>>>>>>",parsedResponse)
                    context.commit("loading", true);
                    reject(parsedResponse);
                })
            });
        },

        /**
         * statuses_homeTimeline action returns the current user against the current login user twitter status.
         * @param {*} {context} we can access all commit and states and dispatch in context
         * saving the data back to vuex state.
         */
        statuses_homeTimeline(context) {
            return new Promise((resolve, reject) => {
                context.commit("loading", true);
                cb.__call("statuses_homeTimeline", { screen_name  : "jaurasingh"},(res, rate, err) => {
                        console.log("rate status Timeline>>>>>>>>>>>>>>", rate);
                        const parsedResponse =
                            res && typeof res === "string" ? JSON.parse(res) : res;
                        if (err) {
                            context.commit("loading", true);
                            return reject(err);
                        } else {
                            context.commit("loading", false);
                            context.commit("userStatus", parsedResponse);
                            return resolve(parsedResponse);
                        }
                    }
                );
            });
        },

        /**
         * statuses_update action can tweet with the current account.
         * @param {*} {context} we can access all commit and states and dispatch in context
         * saving the data back to vuex state.
         */
        actionTwitter(context, payload) {
            context.commit("loading", true);
            console.log("actionTwitter >>>>>>>>>>>>", payload);
            const tweet_txt = {
                "status" : payload
            }
            return new Promise((resolve, reject) => {
                fetch('http://127.0.0.1:8010/statusUpdate', {
                    method: "post",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(tweet_txt)
                }).then(res => res.json())
                    .then(data => {
                        context.commit("loading", false);
                        console.log('response in handleReTweet fetch>>>>>>>>>>', data)
                    })
                    .catch(err => {
                        context.commit("loading", false);
                        console.log('err in handleReTweet >>>>>>>>>>>', err)
                    });
            });
        },

        /**
         * login with twitter username
         * @param {*} context we can access all commit and states and dispatch in context
         * @param {*} payload used as a request parameter while invoking dispatch action.
         * @returns
         */
        twitterUserScreen(context, payload) {
            context.commit("isUserNameLoginLoaded", true);
            console.log("paylod in tweetuser>>>>>>>>", payload);
            return new Promise((resolve, reject) => {
                cb.__call("users_show", payload, (res, rate, err) => {
                    const parsedResponse =
                        res && typeof res === "string" ? JSON.parse(res) : res;
                    if (res.errors) {
                        context.commit("isUserNameLoginLoaded", false);
                        return reject(res.errors);
                    } else {
                        context.commit("userStatus", null);
                        context.commit("isUserNameLoginLoaded", false);
                        context.commit("userNameLogin", parsedResponse);
                        localStorage.setItem("userLogin", JSON.stringify(res));
                        // router.go();
                        return resolve(parsedResponse);
                    }
                });
            });
        },

        /**
         * login with twitter username
         * @param {*} context we can access all commit and states and dispatch in context
         * @param {*} payload used as a request parameter while invoking dispatch action.
         * @returns
         */
        handleReTweet(context, payload) {
            context.commit("loading", true);
            const tweetId = {
                id : payload
            }
            console.log('tweetId >>>>>>>>>>>>>>', tweetId);
            return new Promise((resolve, reject) => {
                fetch(`${twitterConfig.BASE_URL}/reTweet`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: "1215721230831161345" })
                })
                .then(res => res.json())
                    .then(res => {
                        context.commit("loading", false);
                        console.log('response in handleReTweet fetch>>>>>>>>>>', res)
                    })
                    .catch(err => {
                        context.commit("loading", false);
                        console.log('err in handleReTweet >>>>>>>>>>>', err)
                    });
            });
        },


        twitSocialLogin(context) {
            return new Promise((resolve, reject) => {
                fetch(`${twitterConfig.BASE_URL}/auth/twitter`, {
                    method: "GET",
                })
                .then(res => res.json())
                .then(res => console.log('response in fetch>>>>>>>>>>', res))
                .catch(err => console.log('err in twitSocialLogin>>>>>>>>>>>', err));
            })
        },

        currentLoggedInUser(context) {
            context.commit("loading", true);
            return new Promise((resolve, reject) => {
                fetch(`${twitterConfig.BASE_URL}/LoggedInUser`)
                .then(res => res.json())
                .then(res => {
                    context.commit("loading", false);
                    console.log('currentLoggedInUser in fetch>>>>>>>>>>', res);
                    context.commit('currentLoggedInUser', res);
                    localStorage.setItem('LoggedInUser', JSON.stringify(res));
                    return resolve(res);
                })
                .catch(err => {
                    console.log('currentLoggedInUser errr  in currentLoggedInUser>>>>>>>>>>>', err);
                    context.commit("loading", false);
                    return reject(err);
                });
            })
        },

        logoutUser(context) {
            new Promise((resolve, reject) => {
                context.commit('userNameLogin', '');
                context.commit('currentLoggedInUser', '');
                localStorage.setItem('LoggedInUser', '');
                router.push('/');
                router.go();
            }) 
        },

        loggedInUserTimline(context, payload) {
            context.commit("loading", true);
            return new Promise((resolve, reject) => {
                fetch('http://127.0.0.1:8010/user_timeline'+payload, {
                    method: "GET",
                })
                .then(res => res.json())
                .then(res => {
                    context.commit("loading", false);
                    console.log('loggedInUserTimline in fetch>>>>>>>>>>', res);
                    context.commit('loggedInUserTimline', res);
                    // context.commit('currentLoggedInUser', res);
                    // localStorage.setItem('LoggedInUser', JSON.stringify(res));
                    return resolve(res);
                })
                .catch(err => {
                    console.log('loggedInUserTimline errr  in currentLoggedInUser>>>>>>>>>>>', err);
                    context.commit("loading", false);
                    return reject(err);
                }
                );
            })
        },


        /**
         * twitter directMessage API
         * @param {*} context we can access all commit and states and dispatch in context
         * @param {*} payload used as a request parameter while invoking dispatch action.
         * @returns
         */
        direct_messages(context) {
            return new Promise((resolve, reject) => {
                cb.__call("direct_messages", {}, (res, rate, err) => {
                    if (err) {
                        console.log("direct_messagesrseponse reply>>>>>>>>>>>>>>>>>>", err);
                        return reject(err);
                    } else {
                        console.log(
                            "direct_messages rseponse reply>>>>>>>>>>>>>>>>>>",
                            res
                        );
                        return resolve(res);
                    }
                });
            });
        },

        /**
         * twitter messages of the current user with the screen_name which is passed.
         * @param {*} context we can access all commit and states and dispatch in context
         * @param {*} payload used as a request parameter while invoking dispatch action.
         * @returns
         */
        direct_messagesNew(context) {
            return new Promise((resolve, reject) => {
                cb.__call(
                    "direct_messages_new", {
                    screen_name: "jaurasingh",
                    text: "hi maninder"
                },
                    (res, rate, err) => {
                        if (err) {
                            console.log("direct_messagesrseponse reply>>>>>>>>>>>>>>>>>>", err);
                            return reject(err);
                        } else {
                            console.log("direct_messages rseponse reply>>>>>>>>>>>>>>>>>>",res);
                            return resolve(res);
                        }
                    }
                );
            });
        },

        /**
         * twitter messages of the current user with the screen_name which is passed.
         * @param {*} context we can access all commit and states and dispatch in context
         * @param {*} payload used as a request parameter while invoking dispatch action.
         * @returns
         */
        direct_messagesShow(context) {
            return new Promise((resolve, reject) => {
                cb.__call("direct_messages_show", {}, (res, rate, err) => {
                    if (err) {
                        console.log("direct_messagesrseponse reply>>>>>>>>>>>>>>>>>>", err);
                        return reject(err);
                    } else {
                        console.log("direct_messages rseponse reply>>>>>>>>>>>>>>>>>>",res);
                        return resolve(res);
                    }
                });
            });
        }
    }
});
