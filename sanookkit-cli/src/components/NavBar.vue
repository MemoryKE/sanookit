<template>
<b-navbar toggleable="lg" type="light" class="cli-nav">
    <b-navbar-brand href="#">
        <v-img src="@/assets/sanookit-logo.png" max-width="80px"></v-img>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="left-navbar">
            <b-nav-item v-for="(tab, index) of current_tabs" :key="index" @click="$router.push(tab.link)" :class="tabIsActive(tab.link) ? 'active' : 'normal'">
                <span>{{tab.title}}</span>
            </b-nav-item>
            <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
        </b-navbar-nav>
        
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto right-navbar">
            <b-dropdown-divider></b-dropdown-divider>
            
            <v-btn disabled text >{{username}}</v-btn>
            <b-button v-if="isLogin" size="sm" class="my-2 my-sm-0 login-btn" @click="signout()" >ออกจากระบบ</b-button>
            <b-button v-if="!isLogin" size="sm" class="my-2 my-sm-0 login-btn" @click="$router.push('/signin')" >เข้าสู่ระบบ</b-button>
        </b-navbar-nav>
    </b-collapse>
</b-navbar>
</template>

<script>
import { scrkey } from '@/datas/localvalue.json'

const CryptoJS = require("crypto-js")

export default {
    name: "NavBar",
    data() {
        return {
            isLogin: false,
            current_tabs: [],
            tabs: [{
                    title: 'หน้าหลัก',
                    link: '/',
                    isActive: true
                },
                {
                    title: 'เกี่ยวกับ',
                    link: '/about',
                    isActive: false
                },
                {
                    title: 'ถุงสนุกคิด',
                    link: '/about-bag',
                    isActive: false
                },
                {
                    title: 'แหล่งเรียนรู้',
                    link: '/learning-resource',
                    isActive: false
                },
                {
                    title: 'ติดตามกระเป๋า',
                    link: '/tracking',
                    isActive: false
                },
            ],
            dashboard_tabs: [
                // {
                //     title: 'หน้าหลัก',
                //     link: '/dashboard',
                //     isActive: true
                // },
                {
                    title: 'ข้อมูลนักเรียน',
                    link: '/manage-student',
                    isActive: false
                },
                {
                    title: 'แหล่งเรียนรู้',
                    link: '/manage-learning-resource',
                    isActive: false
                },
                {
                    title: 'จัดการแอดมิน',
                    link: '/manage-admin',
                    isActive: false
                },
            ],
            appTitle: 'Awesome App',
            sidebar: false,
            username: "",
            type: 'normal'
        }
    },
    mounted() {
        this.routePath()
      this.setup()
    },
    methods: {
        routePath() {
            switch (this.$route.path) {
                case '/dashboard': 
                case '/manage-student': 
                case '/manage-learning-resource': 
                case'/manage-admin':
                    this.type = 'dashboard'
                    console.log(this.type)
                    break;
                default:
                    this.type = 'normal'
                    break;
            }
        },
        setup() {
            this.current_tabs = this.type != "dashboard" ? this.tabs : this.dashboard_tabs
            const mainDiv = document.querySelector('.cli-nav')
            mainDiv.style.position = this.type != "dashboard" ? 'fixed' : 'relative'
            this.isLogin = localStorage.getItem('accessToken')
            if (localStorage.getItem('accessToken')) {
                this.username = JSON.parse(this.decrypt(localStorage.getItem('accessToken')))?.username || ""
            }
            
        },
        tabIsActive(link) {
            return this.$route.path == link
        },
        signout() {
            localStorage.removeItem('accessToken')
            this.$router.go()
        },
        decrypt(src) {
            const bytes = CryptoJS.AES.decrypt(src, scrkey)
            const originalText = bytes.toString(CryptoJS.enc.Utf8)
            return originalText
        },
    },
    watch: {
        type() {
            this.setup()
            console.log(this.type)
        }
    }
};
</script>

<style lang="scss" scoped>
.active span {
    color: #FC877D !important;
    font-size: 22px;
    font-weight: 900;

}

.normal span {
    color: gray;
    font-size: 18px;
}

.cli-nav {
    position: fixed;
    z-index: 10;
    width: 100vw;
    height: 12vh;
}

.right-navbar {
    padding-left: 0px !important
}

.login-btn {
    color: white !important;
    font-size: 18px;
    background-color: #CFABDB !important;
    border-width: 0;
    box-shadow: 0px 0px 8px #cfabdbcc;
    /* filter: drop-shadow() */
}

.left-navbar {
    background-color: #ffffff;
    border-radius: 20px;
    padding-left: 2% !important;
    padding-right: 2% !important;
}

@media only screen and (max-width: $media-size-ipad) {
    .navbar-collapse {
        background-color: white;
    }
}

/* .right-navbar {
    background-color: #ffffff;
    border-radius: 10px;
    padding-left: 5% !important;
    padding-right: 5% !important;
} */
</style>
