<template>
<div id="manage-admin-view">
    <v-card class="main-search-table">
        <v-card-title class="search-bar">
            <div class="search-bar-title">
                <v-text-field v-if="search.title != 'ตำแหน่ง'" v-for="(search, index) of searchs" :key="index" v-model="search.keyword" append-icon="mdi-magnify" :label="search.title" single-line hide-details></v-text-field>
                <v-select :items="roles" item-text="title" item-value="keyword" v-model="searchs[1].keyword"></v-select>
            </div>
        </v-card-title>

        <v-simple-table class="admin-table">
            <template v-slot:default>
                <thead class="header-table">
                    <tr>
                        <th v-for="(head, index) of headers" :key="index">
                            <p v-if="head.key != 'remove_btn'">{{head.text}}</p>
                            <v-btn v-if="head.key == 'remove_btn'" class="mx-2" rounded dark small @click="dialog.isOpen = true">
                                <v-icon dark left>
                                    mdi-plus
                                </v-icon>
                                เพิ่มแอดมิน
                            </v-btn>
                        </th>
                    </tr>
                </thead>
                <tbody class="tbody-container">
                    <tr v-for="(item, index) of filteredItems" :key="index">
                        <td v-for="(head, index) of headers" :key="index" class="table-column">
                            <p v-if="head.key != 'edit_btn' && head.key != 'remove_btn' && head.key != 'role'">{{item[head.key]}}</p>
                            <p v-if="head.key == 'role'">{{thaiWord[item[head.key]]}}</p>
                            <v-btn v-if="head.key == 'edit_btn'" class="mx-2" rounded dark small color="cyan" @click="onClickEditBtnHandle(item)">
                                <v-icon dark>
                                    mdi-pencil
                                </v-icon>
                            </v-btn>

                            <v-btn v-if="head.key == 'remove_btn'" class="mx-2" rounded dark small color="primary" @click="deleteUser(item._id)">
                                <v-icon dark>
                                    mdi-minus
                                </v-icon>
                                ลบแอดมิน
                            </v-btn>

                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-card>
    <v-dialog v-model="dialog.isOpen" persistent max-width="1000px">
        <v-card>
            <v-card-title class="bg-title">
                <span class="text-h5">ข้อมูลแอดมิน</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" class="mx-2" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="8" md="8">
                                <v-text-field label="ชื่อผู้ใช้งาน" counter maxlength="20" :rules="[rules.required]" required v-model="add_admin_form.username">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4">
                                <v-select :items="roles" item-text="title" item-value="keyword" label="ตำแหน่ง" :rules="[rules.required]" v-model="add_admin_form.role"></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="รหัสผ่าน" counter maxlength="20" :rules="[rules.required, rules.counter]" type="password" v-model="add_admin_form.password">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="ยืนยันรหัสผ่าน" counter maxlength="20" :rules="[rules.required, rules.counter,  rules.confirmPassword]" type="password" v-model="confirmPassword">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" class="bg-title">
                                <h3>ที่อยู่</h3>
                            </v-col>
                            <v-col cols="12" sm="8" md="8">
                                <v-text-field label="อีเมลล์" :rules="[rules.required, rules.email]" v-model="add_admin_form.email"></v-text-field>
                            </v-col>
                        </v-row>

                    </v-container>
                </v-form>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog.isOpen = false">
                    ยกเลิก
                </v-btn>
                <v-btn color="blue darken-1" text @click="createUser()">
                    บันทึก
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";

import { scrkey } from '@/datas/localvalue.json'

const CryptoJS = require("crypto-js")
export default {
    name: 'ManageAdminView',
    data() {
        return {
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length >= 8 || 'Min 20 characters',
                confirmPassword: value => value == this.add_admin_form.password || 'รหัสผ่านไม่ถูกต้อง',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
                fileSize: value => !value || value.size < 2000000 || 'Avatar size should be les'
            },
            dialog: {
                isOpen: false
            },
            confirmPassword: '',
            headers: [{
                    text: 'ชื่อผู้ใช้งาน',
                    align: 'start',
                    sortable: true,
                    key: 'username',
                },
                {
                    text: 'อีเมลล์',
                    key: 'email'
                },
                {
                    text: 'ตำแหน่ง',
                    key: 'role'
                },
                {
                    text: 'รหัสผ่าน',
                    key: 'password'
                },
                {
                    text: '',
                    key: 'edit_btn'
                },
                {
                    text: '',
                    key: 'remove_btn'
                },

            ],
            thaiWord: {
                admin: 'แอดมินทั่วไป',
                mid_admin: 'แอดมินระดับกลาง',
                super_admin: 'แอดมินสูงสุด'
            },
            roles: [{
                    title: 'แอดมินทั่วไป',
                    des: '',
                    keyword: 'admin'
                },
                {
                    title: 'แอดมินระดับกลาง',
                    des: '',
                    keyword: 'mid_admin'
                },
                {
                    title: 'แอดมินสูงสุด',
                    des: '',
                    keyword: 'super_admin'
                },
            ],
            searchs: [{
                    title: 'ชื่อ',
                    keyword: '',
                    field: 'username'
                },
                {
                    title: 'ตำแหน่ง',
                    keyword: '',
                    field: 'role'
                },
            ],
            user_data: [],
            add_admin_form: {
                username: '',
                password: '',
                email: '',
                role: ''
            }
        }
    },
    mounted() {
        this.requestCoreData()
        const hashText = this.encrypt('{"role":"testtext"}')
        const testToken = {
            name: 'mem'
        }
        const tt = this.encrypt(JSON.stringify(testToken))
        console.log(hashText)
        console.log(tt)
        console.log(JSON.parse(this.decrypt(tt)))
        console.log(JSON.parse(this.decrypt(hashText)))
        // console.log(this.encrypt({test:'testtext'}))
    },
    methods: {
        encrypt(src) {
            return CryptoJS.AES.encrypt(src, scrkey).toString()
        },
        decrypt(src) {
            const bytes = CryptoJS.AES.decrypt(src, scrkey)
            const originalText = bytes.toString(CryptoJS.enc.Utf8)
            return originalText
        },
        createUser() {
            if (!this.$refs.form.validate()) {
                return
            }
            this.add_admin_form.password = this.encrypt(this.confirmPassword)
            this.$store.dispatch("createUser", this.add_admin_form).then(() => {
                this.requestCoreData()
                this.dialog.isOpen = false
            })
        },
        deleteUser(id) {
            this.$store.dispatch("deleteUser", id).then(() => {
                this.requestCoreData()
            })
        },
        requestCoreData() {
            this.$store.dispatch("getAllUser").then(() => {
                console.log(this.response_user_data)
                this.user_data = this.response_user_data.filter((user) => user.role != 'normalUser' )
            })
        }
    },
    computed: {
        ...mapGetters({
            response_user_data: "UAER_LIST",
        }),
        filteredItems() {
            var filtered = Object.values(this.user_data)
            this.searchs.forEach((search) => {
                const lowTextSearch = search.keyword.toString().toLowerCase()
                filtered = filtered.filter((item) => item[search.field].toString().toLowerCase().includes(lowTextSearch))
            })
            return filtered
        }
    }
}
</script>

<style lang="scss" scoped>
#manage-admin-view {
    background-color: blueviolet;
    height: 90vh;
    width: 100%;
}

.main-search-table {
    height: 100%;
}

.search-bar {
    height: 15%;
}

.header-table {
    position: sticky;
    top: 0;
}

.admin-table {
    height: 85%;
    overflow-y: scroll !important;
}

.tbody-container {
    height: 100%;
}
</style>
