<template>
<v-app>
    <div class="fullPageLoading" v-if="isLoadingFullPage">
        <div class="loadingText" data-loading-text="SanookKit"></div>
    </div>
    <nav-bar v-if="$route.path != '/signin' && $route.path != '/admin' && $route.path != '/signup'" />

    <v-main>
        <router-view />
    </v-main>
</v-app>
</template>

<script>
import {
    scrkey
} from './datas/localvalue.json'
import NavBar from './components/NavBar.vue'
import {
    mapGetters
} from 'vuex'

const CryptoJS = require("crypto-js")

export default {
    name: 'App',

    data() {
        return {
            nav_type: '',
            access_token: ""
        }
    },
    components: {
        NavBar
    },
    computed: {
        ...mapGetters({
            isLoadingFullPage: "LOADING_FULL_PAGE"
        }),
    },
    asyncComputed: {
        accessToken() {
            this.access_token = localStorage.getItem('accessToken')
            return this.access_token
        },
        navType() {
            return this.nav_type
        }
    },
    // beforeCreate() {
    //     this.access_token = localStorage.getItem('accessToken') || null
    //     console.log(this.access_token)
    //     if (!this.access_token) {
    //         switch (this.$route.path) {
    //             case '/dashboard':
    //             case '/manage-student':
    //             case '/manage-learning-resource':
    //             case '/manage-admin':
    //                 this.nav_type = 'dashboard'
    //                 this.$router.push('/admin')
    //                 break;
    //             case '/tracking':
    //                 this.nav_type = 'normal'
    //                 this.$router.push('/')
    //             default:
    //                 this.nav_type = 'normal'
    //                 break;
    //         }
    //     } else {
    //       const bytes = CryptoJS.AES.decrypt(this.access_token, scrkey)
    //       const originalText = bytes.toString(CryptoJS.enc.Utf8)
    //       const parseToken = JSON.parse(originalText)
    //       console.log(parseToken)
    //       switch (this.$route.path) {
    //         case '/dashboard':
    //         case '/manage-student':
    //         case '/manage-learning-resource':
    //         case '/manage-admin':
    //             if(parseToken.role == 'normalUser') {
    //               this.nav_type = 'normal'
    //               this.$router.push('/')
    //             }
    //             break
    //       }
    //     }
    // }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');

body {
    font-family: 'Itim', cursive;

}

#app {
    font-family: 'Itim', cursive;

}

.fullPageLoading {
    height: 100vh;
    width: 100vw;
    background-color: white;
    position: fixed;
    z-index: 1200;
}

.loadingText {
    font-family: 'Itim', cursive;
    left: 50%;
    top: 50%;
    font-size: 36px;
    font-family: serif;
    font-weight: bold;
    letter-spacing: 4.4px;
    text-transform: capitalize;
    position: absolute;
    overflow: hidden;
    transform: translate(-50%, -60%);

    &:before {
        color: #aaa;
        content: attr(data-loading-text);
        font-family: 'Itim', cursive;
    }

    &:after {
        top: 0;
        left: 0;
        width: 0;
        opacity: 1;
        font-family: 'Itim', cursive;

        background-image: linear-gradient(to right, #D0E6A5 0%, #86E3CE 20%, #FA897B 30%, #FFDD94 40%, #FFDD94 50%, #CCABDB 65%, #CCABDB 75%, #86E3CE 87%, #D0E6A5 95%);
        -webkit-background-clip: text;
        -moz-background-clip: text;
        background-clip: text;
        color: transparent;
        overflow: hidden;
        position: absolute;
        content: attr(data-loading-text);
        animation: loading 3s infinite;
    }

    @keyframes loading {
        0% {
            width: 0%;
        }

        100% {
            width: 100%;
        }

    }
}
</style>
