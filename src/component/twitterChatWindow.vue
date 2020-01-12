<template>
    <div id="appContainer">
        <header>
            <div>
                <h1>Quick Chat</h1>
                <hr/>
                <p class="light-text">The easiest way to get your message across.</p>
            </div>
        </header>
        <div id="mainContent">

            <ol id="messages"></ol>
            <form action="" id="message-form">
            <input type="text" name="message" id="message" placeholder="enter message">
            <button>Send</button>
            </form>

        </div>
    </div>
</template>

<script>
export default {
    props : ['item'],
    data (){
        return{

        }
    },
    created(){
    },
    methods : {

    }
}
</script>

<style>

</style>