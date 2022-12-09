<template>
<div id="manage-cli-asset-view">
    <v-card>
        <v-card-title class="bg-title">
            <span class="text-h5">รูปกิจกรรม</span>
        </v-card-title>
        <v-card-text>
            <v-form ref="activitiesForm">
                <v-file-input :rules="[rules.required]" multiple accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" label="รูปกิจกรรม" v-model="imgListAddForm.img_files" />
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="addNewCliImage('activities')">เพิ่มรูปภาพ</v-btn>
        </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar.visible" auto-height :color="snackbar.color" :multi-line="snackbar.mode === 'multi-line'" :timeout="snackbar.timeout" :top="snackbar.position === 'top'">
        <v-layout align-center pr-4>
            <v-layout column>
                <div>
                    <strong>{{ snackbar.title }}</strong>
                </div>
            </v-layout>
        </v-layout>
        <v-btn v-if="snackbar.timeout === 0" icon @click="snackbar.visible = false">
            <v-icon>clear</v-icon>
        </v-btn>
    </v-snackbar>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
import axios from "axios";

export default {
    name: "ManageCliAssetView",
    data() {
        return {
            rules: {
                required: value => !!value || 'Required.'
            },
            imgListAddForm: {
                img_infos: [],
                img_files: null
            },
            snackbar: {
                color: null,
                icon: null,
                mode: null,
                position: "top",
                text: null,
                timeout: 7500,
                title: null,
                visible: false
            },
        }
    },
    mounted() {
        this.getCliImg()
    },
    methods: {
        snackbarShow(type) {
            if (!type) return;
            switch (type) {
                case "error":
                    this.snackbar = {
                        color: "error",
                        icon: "error",
                        mode: "multi-line",
                        position: "top",
                        timeout: 3000,
                        title: "อัพโหลไม่สำเร็จ",
                        text: "Something's gone wrong, sorry.",
                        visible: true
                    };
                    break;
                case "info":
                    this.snackbar = {
                        color: "info",
                        icon: "info",
                        mode: "multi-line",
                        position: "top",
                        timeout: 0,
                        title: "Information",
                        text: "This is useful and is quite a long message, and won't be hidden automatically. You need to dismiss this by clicking the 'X' on the right.",
                        visible: true
                    };
                    break;
                case "success":
                    this.snackbar = {
                        color: "success",
                        icon: "check_circle",
                        mode: "multi-line",
                        position: "top",
                        timeout: 3000,
                        title: "อัพโหลดสำเร็จ",
                        text: "That worked, hoorah.",
                        visible: true
                    };
                    break;
                case "warning":
                    this.snackbar = {
                        color: "warning",
                        icon: "warning",
                        mode: "multi-line",
                        position: "top",
                        timeout: 7500,
                        title: "Warning",
                        text: "You probably shouldn't have seen that, oops.",
                        visible: true
                    };
                    break;
            }
        },
        getCliImg() {
            axios.get('https://sanookkit-server.vercel.app/cliImgAsset').then((res) => {
                console.log(res)
            })
        },
        addNewCliImage(img_section) {
            console.log(this.imgListAddForm.img_files)
            if (!this.$refs.activitiesForm.validate()) {
                return
            }

            const img_info_list = this.mapImageInfoList(this.imgListAddForm.img_files, img_section)

            this.imgListAddForm.img_infos = img_info_list
            console.log(this.imgListAddForm)

            this.$store.dispatch("addCliImgAssetList", this.imgListAddForm).then((_) => {
                const res = this.cli_img_asset_info
                console.log(res)
                this.$store.dispatch("addCliAssetList", res).then((response) => {
                    // this.dialog[1].isOpen = false
                    // this.requestData()
                    console.log(response)
                    this.snackbarShow('success')
                    this.imgListAddForm = {
                        img_infos: [],
                        img_files: null
                    }
                }).catch((err) => {
                    this.snackbarShow('error')
                })
            }).catch((err) => {
                this.snackbarShow("error")
            })
        },
        mapImageInfoList(imgList, img_section) {
            var img_info_list = []
            imgList.forEach((item) => {
                img_info_list.push({
                    ori_name: item.name,
                    name: "",
                    file_type: item.type,
                    img_section: img_section
                })
            })
            return img_info_list
        },
    },
    computed: {
        ...mapGetters({
            cli_img_asset_info: "CLI_IMG_ASSET_INFO",
        }),
    }
}
</script>

<style lang="scss" scoped>
#manage-cli-asset-view {
    width: 100vw;
    min-height: 90vh;
    background-color: #E4E3FF;
    padding: 2%;
}
</style>
