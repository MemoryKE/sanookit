<template>
    <div class="login-page">
        <div class="img">
            <img :src="require('../../assets/bg_signin.png')" />
        </div>
        <div class="login">
            <h1 class="header-app">{{title}}</h1>
            <v-form class="text-field m-0" ref="loginForm">
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="loginForm.username" :rules="[rules.required]" label="ชื่อผู้ใช้" outlined clearable required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field v-model="loginForm.password" :rules="[rules.required]" type="password" label="รหัสผ่าน" outlined clearable required></v-text-field>
                        </v-col>
                        <v-col cols="12" >
                            <v-text-field label="ยืนยันรหัสผ่าน" counter maxlength="20" :rules="[rules.required, rules.counter,  rules.confirmPassword]" type="password" v-model="confirmPassword" outlined clearable required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" >
                            <v-text-field label="อีเมลล์" :rules="[rules.required, rules.email]" v-model="loginForm.email" outlined clearable required></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
            <v-btn class="w-100 bg-red" @click="signup()">{{btn_text}}</v-btn>
            <hr />
            <v-btn class="w-100" text @click="$router.push('/signin')">ยกเลิก</v-btn>
        </div>
    </div>
    </template>
    
    <script>
    import {
        scrkey
    } from '@/datas/localvalue.json'
    import {
        mapGetters
    } from "vuex";
    
    const CryptoJS = require("crypto-js")
    
    export default {
        name: 'SignupView',
        data() {
            return {
                title: "ลงทะเบียนผู้ใช้",
                type: 'homepage',
                btn_text: "ลงทะเบียน",
                rules: {
                    required: value => !!value || 'Required.',
                    counter: value => value.length <= 20 || 'Max 20 characters',
                    confirmPassword: value => value == this.loginForm.password || 'รหัสผ่านไม่ถูกต้อง',
                    email: value => {
                        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        return pattern.test(value) || 'Invalid e-mail.'
                    }
                },
                loginForm: {
                    username: "",
                    password: "",
                    email: ""
                },
                confirmPassword: ""
            }
        },
        methods: {
            signup() {
                if (!this.$refs.loginForm.validate()) {
                    return
                }
                const user = {
                    username: this.loginForm.username,
                    password: this.encrypt(this.loginForm.password),
                    email: this.loginForm.email,
                    role: 'normalUser'
                }
                this.$store.dispatch("createUser", user).then(() => {
                    this.$router.push('/signin')
                })
            },
            encrypt(src) {
                return CryptoJS.AES.encrypt(src, scrkey).toString()
            },
            decrypt(src) {
                const bytes = CryptoJS.AES.decrypt(src, scrkey)
                const originalText = bytes.toString(CryptoJS.enc.Utf8)
                return originalText
            },
        },
        computed: {
            ...mapGetters({
                res_signin: "SIGNIN",
            }),
        }
    }
    </script>
    
    <style lang="scss">
    .bg-red {
        color: white !important;
        background-color: #FC877D !important;
    }
    
    .tittle {
        font-size: 40px;
    }
    
    .v-btn {
        color: #7039ea;
    }
    
    .header-app {
        color: #7039ea;
    }
    
    .text-field {
        margin-top: 5em;
    }
    
    ::v-deep .v-label {
        font-size: 1.5em
    }
    
    ::v-deep .v-label--active {
        font-size: 2em;
        font-weight: bold;
    }
    
    .login-page {
        height: 100vh;
        /* padding: 5%; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* background: linear-gradient(200.17deg, #030089 99.55%, #CFE5FF 140.19%); */
        background-color: #FBF8D2;
    }
    
    .login {
        background: #ffffff;
        padding: 6em;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    
    .logo {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 60%;
    }
    
    .img {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 50%;
        height: 100%;
    }
    
    @media screen and (orientation: portrait) {
    
        /* แนวตั้ง */
        /* Portrait styles */
        .img {
            width: 100%;
            height: 50%;
        }
    
        .login {
            padding: 2%;
        }
    }
    
    @media screen and (orientation: landscape) {
    
        /* แนวนอน */
        /* Landscape styles */
        .login {
            position: absolute;
            width: 50%;
            right: 0;
        }
    }
    </style>
    