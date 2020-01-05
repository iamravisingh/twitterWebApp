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
        isUserNameLoginLoaded: false
    },
    mutations: {
        userData: (state, payload) => (state.userData = payload),
        userStatus: (state, payload) => (state.userStatus = payload),
        newTweet: (state, payload) => (state.newTweet = payload),
        loading: (state, payload) => (state.loading = payload),
        userNameLogin: (state, payload) => (state.userNameLogin = payload),
        isUserNameLoginLoaded: (state, payload) =>
            (state.isUserNameLoginLoaded = payload)
    },
    getters: {
        userData: state => state.userData,
        userStatus: state => state.userStatus,
        newTweet: state => state.newTweet,
        loading: state => state.loading,
        userNameLogin: state => state.userNameLogin,
        isUserNameLoginLoaded: state => state.isUserNameLoginLoaded
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
                cb.__call("account_verifyCredentials", {}, res => {
                    const parsedResponse =
                        res && typeof res === "string" ? JSON.parse(res) : res;
                    if (parsedResponse.hasOwnProperty("errors")) {
                        console.log("store if account_verifyCredentials>>>>>>>>>>>>>>>>>>>>",parsedResponse)
                        context.commit("loading", true);
                        reject(parsedResponse);
                    } else {
                        context.commit("loading", false);
                        console.log("store else account_verifyCredentials>>>>>>>>>>>>>>>>>>>>", parsedResponse);                        context.commit("userData", parsedResponse);
                        resolve(parsedResponse);
                    }
                });
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
                cb.__call(
                    "statuses_homeTimeline", {
                    count: 25
                },
                    (res, rate, err) => {
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
            return new Promise((resolve, reject) => {
                cb.__call(
                    "statuses_update", {
                    status: payload
                },
                    (reply, rate, err) => {
                        if (err) {
                            context.commit("loading", true);
                            return reject(err);
                        } else {
                            context.commit("loading", false);
                            console.log("response while tweeting !>>>>>>>>>>>>", res);
                            context.commit("newTweet", res);
                            return resolve(res);
                        }
                    }
                );
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
                        router.go();
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
        handleReTweet(context) {
            return new Promise((resolve, reject) => {
                cb.__call(
                    "statuses_retweets_ID",
                    "{ id = 1213723282500915201 }",
                    (res, rate, err) => {
                        if (err) {
                            console.log("err oauth rseponse reply>>>>>>>>>>>>>>>>>>", err);
                            return reject(err);
                        } else {
                            console.log("res oauth rseponse reply>>>>>>>>>>>>>>>>>>", res);
                            return resolve(res);
                        }
                    }
                );
            });
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
        },

        /**
         * Store the requested token in localStorage to make user loggedIn even afte page load.
         * @param {*} oauth_token apiKey.
         * @param {*} oauth_token_secret apiSecretKey.
         */
        saveTokens(oauth_token, oauth_token_secret) {
            localStorage.setItem("oauth_token", oauth_token);
            localStorage.setItem("oauth_token_secret", oauth_token_secret);
        },

        /**
         * Twitter api for requestToken for specific user login.
         */
        oauth_requestToken() {
            new Promise((resolve, reject) => {
                cb.__call(
                    "oauth_requestToken", {
                    oauth_callback: "http://localhost:8080/"
                },
                    (res, rate, err) => {
                        if (err) {
                            console.log("err oauth rseponse reply>>>>>>>>>>>>>>>>>>", err);
                            cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                            saveTokens(reply.oauth_token, reply.oauth_token_secret);

                            cb.__call("oauth_authorize", {}, auth_url => {
                                window.codebird_auth = window.open(auth_url);
                                location.href = auth_url;
                                authorize(oauth_token, oauth_verifier);
                            });
                        } else {
                            console.log("res oauth rseponse reply>>>>>>>>>>>>>>>>>>", res);
                        }
                        // ...
                    }
                );
            });
        },

        /**
         * authorize Twitter API after token request to reset the token in codebird for further login procedure.
         */
        authorize(oauth_token, oauth_verifier) {
            cb.setToken(
                localStorage.getItem("oauth_token"),
                localStorage.getItem("oauth_token_secret")
            );
            cb.__call(
                "oauth_accessToken", {
                oauth_verifier
            },
                (reply, rate, err) => {
                    if (err) {
                        console.log("error response or timeout exceeded" + err.error);
                        store.loggedIn = false;
                        // showLoginScreen();
                    } else if (reply) {
                        console.log("inside the body autohrize function>>>>>>>>>>>>>>>",reply);
                        cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                        saveTokens(reply.oauth_token, reply.oauth_token_secret);
                        // location.reload();
                    }
                }
            );
        },

        /**
         * authorize Twitter API for assigning the role and rechecking with authorization.
         * @param {*} context can access the any vuex methods.
         */
        oauth_authorize(context) {
            new Promise((resolve, reject) => {
                cb.__call("oauth/authorize", {}, (reply, rate, err) => {
                    if (err) {
                        console.log("error oauth_authorize" + err.error);
                    }
                    if (reply) {
                        // store the authenticated token, which may be different from the request token (!)
                        console.log("replu in oauth_authorize>>>>>>>>>>>>", reply);
                        cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                    }
                    // if you need to persist the login after page reload,
                    // consider storing the token in a cookie or HTML5 local storage
                });
            });
        }
    }
});
