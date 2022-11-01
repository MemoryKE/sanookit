<template>
<div id="manage-student-view">
    <v-card class="main-search-table">
        <v-card-title class="search-bar">
            <div class="search-bar-title">
                <v-text-field v-for="(search, index) of searchs" :key="index" v-model="search.search" append-icon="mdi-magnify" :label="search.title" single-line hide-details></v-text-field>

            </div>
        </v-card-title>

        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th v-for="(head, index) of headers" :key="index">
                            <p v-if="head.key != 'remove_btn'">{{head.text}}</p>

                            <v-menu v-if="head.key == 'remove_btn'" top :offset-y="true">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn class="mx-2" rounded dark small v-bind="attrs" v-on="on">
                                        <v-icon dark left>
                                            mdi-plus
                                        </v-icon>
                                        เพิ่มแหล่งเรียนรู้
                                    </v-btn>
                                </template>

                                <v-list>
                                    <v-list-item v-on:click="addResourceBtnHandle(index)" v-for="(item, index) in dropdown_add_item" :key="index">
                                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </th>
                    </tr>
                </thead>
                <tbody class="tbody-custom">
                    <tr v-for="(item, index) of filteredItems" :key="index">
                        <td v-for="(head, index) of headers" :key="index" class="table-column">
                            <p v-if="head.key != 'edit_btn' && head.key != 'remove_btn'"><span v-if="head.key == 'grade'">ป.</span>{{item[head.key]}}</p>

                            <v-btn v-if="head.key == 'edit_btn'" class="mx-2" rounded dark small color="cyan" @click="onClickEditBtnHandle(item)">
                                <v-icon dark>
                                    mdi-pencil
                                </v-icon>
                            </v-btn>

                            <v-btn v-if="head.key == 'remove_btn'" class="mx-2" rounded dark small color="primary" @click="deleteLearningResource(item._id)">
                                <v-icon dark>
                                    mdi-minus
                                </v-icon>
                                ลบแหล่งเรียนรู้
                            </v-btn>

                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-card>
    <v-dialog v-model="dialog[0].isOpen" persistent max-width="1000px">
        <v-card>
            <v-card-title class="bg-title">
                <span class="text-h5">ข้อมูลนักเรียน</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="manualForm" class="mx-2" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="10" md="10">
                                <v-text-field label="หัวข้อความรู้" hint="This field uses counter prop" :rules="[rules.required]" v-model="addManualForm.title" />
                            </v-col>

                            <v-col cols="12" sm="2">
                                <v-select :items="grade_list" item-text="text" item-value="value" label="ระดับชั้น" ref="grade" :rules="[rules.required]" v-model="addManualForm.grade" />
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-file-input :rules="[rules.required]" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" label="หน้าปกคู่มือสนุกคิด" v-model="addManualForm.img_file" />
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-file-input :rules="[rules.required]" accept=".pdf" placeholder="Pick an avatar" label="คู่มือสนุกคิด" v-model="addManualForm.pdf_file" />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog[0].isOpen = false">
                    ยกเลิก
                </v-btn>
                <v-btn color="blue darken-1" text @click="addNewManual()">
                    บันทึก
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialog[1].isOpen" persistent max-width="1000px">
        <v-card>
            <v-card-title class="bg-title">
                <span class="text-h5">ข้อมูลนักเรียน</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="mediaForm" class="mx-2" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="10" md="10">
                                <v-text-field label="หัวข้อความรู้" hint="This field uses counter prop" :rules="[rules.required]" v-model="addMediaForm.title" />
                            </v-col>
                            <v-col cols="12" sm="2">
                                <v-select :items="grade_list" item-text="text" item-value="value" label="ระดับชั้น" ref="grade" :rules="[rules.required]" v-model="addMediaForm.grade" />
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-file-input :rules="[rules.required]" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" label="หน้าปกคู่มือสนุกคิด" v-model="addMediaForm.img_file" />
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-textarea label="คำอธิบาาย" hint="This field uses counter prop" :rules="[rules.required]" v-model="addMediaForm.description" />
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-textarea label="บทบาทผู้ปกครอง" hint="This field uses counter prop" :rules="[rules.required]" v-model="addMediaForm.parent_des" />
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-textarea label="บทบาทครู" hint="This field uses counter prop" :rules="[rules.required]" v-model="addMediaForm.teacher_des" />
                            </v-col>

                            <v-col cols="12" class="bg-title">
                                <h3>ตัวอย่างกิจกรรม</h3>
                            </v-col>
                        </v-row>
                        <v-row v-for="(activity, index) of addMediaForm.activities" :key="index">
                            <v-col cols="6" class="bg-title">
                                <h5>ตัวอย่างกิจกรรมที่{{index+1}}</h5>
                            </v-col>
                            <v-col cols="6" class="bg-title">
                                <v-btn class="float-right" rounded dark small v-if="index > 0" @click="removeActivityHandle(index)">
                                    <v-icon>
                                        mdi-minus
                                    </v-icon>
                                    ลบกิจกรรม
                                </v-btn>
                            </v-col>
                            <v-col cols="12" sm="10" md="6">
                                <v-text-field label="หัวข้อความรู้" hint="This field uses counter prop" :rules="[rules.required]" v-model="activity.title" />
                            </v-col>
                            <!-- <v-col cols="12" sm="2">
                                <v-select :items="grade_list" item-text="text" item-value="value" label="ระดับชั้น" ref="grade" :rules="[rules.required]" v-model="activity.grade" />
                            </v-col> -->
                            <v-col cols="12" sm="6" md="6">
                                <v-file-input :rules="[rules.required]" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" label="หน้าปกคู่มือสนุกคิด" v-model="activity.qr_file" />
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-file-input :rules="[rules.required]" multiple accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" label="หน้าปกคู่มือสนุกคิด" v-model="activity.img_files" />
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-textarea label="คำอธิบาาย" hint="This field uses counter prop" :rules="[rules.required]" v-model="activity.description" />
                            </v-col>
                            <!-- <v-col cols="12" sm="6" md="6">
                                <v-file-input :rules="[rules.required]" accept=".pdf" placeholder="Pick an avatar" label="คู่มือสนุกคิด" v-model="activity.pdf_file" />
                            </v-col> -->
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-btn class="float-right" rounded dark small @click="addNewActivityHandle()">
                                    <v-icon>
                                        mdi-plus
                                    </v-icon>
                                    เพิ่มกิจกรรม
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog[1].isOpen = false">
                    ยกเลิก
                </v-btn>
                <v-btn color="blue darken-1" text @click="addNewMedia()">
                    บันทึก
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialog[2].isOpen" persistent max-width="1000px">
        <v-card>
            <v-card-title class="bg-title">
                <span class="text-h5">ข้อมูลนักเรียน</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="anotherResourceForm" class="mx-2" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="10" md="10">
                                <v-text-field label="หัวข้อความรู้" hint="This field uses counter prop" :rules="[rules.required]" v-model="addAnotherResourceForm.title" />
                            </v-col>
                            <v-col cols="12" sm="2">
                                <v-select :items="grade_list" item-text="text" item-value="value" label="ระดับชั้น" ref="grade" :rules="[rules.required]" v-model="addAnotherResourceForm.grade" />
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-file-input :rules="[rules.required]" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" label="หน้าปกคู่มือสนุกคิด" v-model="addAnotherResourceForm.img_file" />
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="แหล่งอ้างอิง" hint="This field uses counter prop" :rules="[rules.required]" v-model="addAnotherResourceForm.refer_link" />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog[2].isOpen = false">
                    ยกเลิก
                </v-btn>
                <v-btn color="blue darken-1" text @click="dialog[2].type == 'addNew' ? addNewAnotherResource() : editAnotherResource()">
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

export default {
    name: 'ManageLearningResourceView',
    data() {
        return {
            trueDialog: true,
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
                fileSize: value => !value || value.size < 2000000 || 'Avatar size should be les'
            },
            dropdown_add_item: [{
                    title: "คู่มือสนุกคิด"
                },
                {
                    title: "สื่อสนุกคิด"
                },
                {
                    title: "แหล่งเรียนรู้อื่น"
                },
            ],
            addDataDialog: false,
            dialog: [{
                    isOpen: false,
                    type: ''
                },
                {
                    isOpen: false,
                    type: ''
                },
                {
                    isOpen: false,
                    type: ''
                },
            ],
            searchs: [{
                    title: 'ระดับชั้น',
                    search: '',
                    key: 'grade'
                },
                {
                    title: 'หัวข้อความรู้',
                    search: '',
                    key: 'title'
                },
                {
                    title: 'หมวดหมู่แหล่งเรียนรู้',
                    search: '',
                    key: 'learning_type'
                }
            ],
            headers: [{
                    text: 'ระดับชั้น',
                    align: 'start',
                    sortable: true,
                    key: 'grade',
                },
                {
                    text: 'หัวข้อความรู้',
                    key: 'title'
                },
                {
                    text: 'หมวดหมู่แหล่งเรียนรู้',
                    key: 'learning_type'
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
            grade_list: [{
                    text: "ป.1",
                    value: 1
                },
                {
                    text: "ป.2",
                    value: 2
                },
                {
                    text: "ป.3",
                    value: 3
                },
                {
                    text: "ป.4",
                    value: 4
                },
                {
                    text: "ป.5",
                    value: 5
                },
                {
                    text: "ป.6",
                    value: 6
                }
            ],
            learning_data: [],
            addManualForm: {
                title: "",
                grade: 0,
                img_file: null,
                pdf_file: null,
                type: "",
            },
            addAnotherResourceForm: {
                title: '',
                grade: 0,
                img_file: null,
                refer_link: ''
            },
            addMediaForm: {
                title: '',
                grade: 0,
                img_file: null,
                description: '',
                teacher_des: '',
                parent_des: '',
                activities: [{
                    title: '',
                    qr_file: null,
                    img_files: null,
                    description: ''
                }]
            },
            upload_img_list: [{
                title: '',
                img_list: null
            }]
        }
    },
    mounted() {
        this.requestData()
        this.setupData()
        

        // this.getPostalList()
        // this.getSubdistrictList()
    },
    methods: {
        addNewManual() {
            // const blobImg = new Blob()
            // blobImg.
            // console.log(blobImg)
            // console.log(typeof blobImg)
            if (!this.$refs.manualForm.validate()) {
                return
            }
            const manualData = {
                title: this.addManualForm.title,
                grade: this.addManualForm.grade,
                image_name_list: [{
                        type: 'normal',
                        index: 0,
                        image_name: this.addManualForm.img_file.name,
                        field: 'img_name'
                    },
                    {
                        type: 'normal',
                        index: 0,
                        image_name: this.addManualForm.pdf_file.name,
                        field: 'pdf_name'
                    },
                ],
                learning_type: "คู่มือสนุกคิด",
                img_files: [this.addManualForm.img_file, this.addManualForm.pdf_file]
            }
            this.$store.dispatch("addLearningResourceList", manualData).then((_) => {
                    this.dialog[0].isOpen = false
                    this.requestData()
            })
        },
        async addNewMedia() {
            if (!this.$refs.mediaForm.validate()) {
                return
            }
            console.log('test')

            const [img_name_list, img_file_list] = await this.mapImageMediaList()
            console.log('test after')
            const mediaData = {
                title: this.addMediaForm.title,
                grade: this.addMediaForm.grade,
                description: this.addMediaForm.description,
                teacher_des: this.addMediaForm.teacher_des,
                parent_des: this.addMediaForm.parent_des,
                image_name_list: img_name_list,
                learning_type: 'สื่อสนุกคิด',
                img_files: img_file_list,
                activities: this.mapActivities()
            }
            this.$store.dispatch("addLearningResourceList", mediaData).then((_) => {
                this.dialog[1].isOpen = false
                this.requestData()
            })
        },
        mapActivities() {
            var activities_list = []
            this.addMediaForm.activities.forEach((act) => {
                activities_list.push({
                    title: act.title,
                    description: act.description,
                    qr_name: "",
                    imgs_name: ["morkUp"],
                })
            })
            return activities_list
        },
        mapImageMediaList() {
            var image_name_list = [{
                type: 'normal',
                field: 'img_name'
            }]
            var img_file_list = [this.addMediaForm.img_file]
            this.addMediaForm.activities.forEach((activity, index) => {
                image_name_list.push({
                    type: 'activity',
                    index: index,
                    field: 'qr_name'
                })
                img_file_list.push(activity.qr_file)
                activity.img_files.forEach((img) => {
                    image_name_list.push({
                        type: 'activity',
                        index: index,
                        field: 'imgs_name'
                    })
                    img_file_list.push(img)
                })

            })
            return [image_name_list, img_file_list]
        },
        addNewActivityHandle() {
            this.addMediaForm.activities.push(
                {
                    title: '',
                    qr_file: null,
                    img_files: null,
                    description: ''
                }
            )
        },
        removeActivityHandle(activity_index) {
            this.addMediaForm.activities.splice(activity_index, 1)
        },
        addNewAnotherResource() {
            if (!this.$refs.anotherResourceForm.validate()) {
                return
            }
            const anotherResourceData = {
                title: this.addAnotherResourceForm.title,
                grade: this.addAnotherResourceForm.grade,
                refer_link: this.addAnotherResourceForm.refer_link,
                image_name_list: [{
                    type: 'normal',
                    image_name: this.addAnotherResourceForm.img_file.name,
                    field: 'img_name'
                }],
                learning_type: 'แหล่งเรียนรู้อื่น',
                img_files: [this.addAnotherResourceForm.img_file]
            }
            this.$store.dispatch("addLearningResourceList", anotherResourceData).then((_) => {
                this.dialog[2].isOpen = false
                this.requestData()
            })
        },
        setupData() {
        },
        onClickEditBtnHandle(item) {
            const target_dialog = this.dropdown_add_item.map(e => e.title).indexOf(item.learning_type);
            this.dialog[target_dialog].isOpen = true
            this.dialog[target_dialog].type = 'edit'
            switch (item.learning_type) {
                case 'คู่มือสนุกคิด':
                    this.addManualForm = item
                    break;
                case 'สื่อสนุกคิด':
                    this.addMediaForm = item
                    break;
                case 'แหล่งเรียนรู้อื่น':
                    this.addAnotherResourceForm = item
                    break;
                default:
                    break;
            }
            // this.addMediaForm 
        },
        editAnotherResource() {
            
        },
        onClickEditHandle(item) {
            this.add_form_field = item
            this.dialog = true
        },
        deleteLearningResource(target_id) {
            this.$store.dispatch("deleteLearningResource", target_id).then((_) => {
                this.requestData()
            })
        },
        deleteStudent(target_id) {
            this.$store.dispatch("deleteStudent", target_id).then((_) => {
                this.requestData()
            })
        },
        updateStudent() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch("updateStudent", this.add_form_field).then((_) => {
                    this.requestData()
                })
                this.dialog = false
            }
        },
        addResourceBtnHandle(index) {
            this.dialog[index].isOpen = !this.dialog[index].isOpen
            this.dialog[index].type = 'addNew'
        },
        requestData() {
            this.$store.dispatch("getLearningResourceList").then(() => {
                console.log(this.learning_resource_data)
                this.learning_data = this.learning_resource_data
            })
        }
    },
    computed: {
        ...mapGetters({
            learning_resource_data: "LEARNING_RESOURCE_LIST",
        }),
        filteredItems() {
            var filtered = Object.values(this.learning_data)
            this.searchs.forEach((search) => {
                const lowTextSearch = search.search.toString().toLowerCase()
                filtered = filtered.filter((item) => item[search.key].toString().toLowerCase().includes(lowTextSearch))
            })
            return filtered
        }

    }
}
</script>

<style lang="scss">
#manage-student-view {
    width: 100vw;
    min-height: 90vh;
    background-color: #E4E3FF;
    padding: 2%;

}

.main-search-table {
    // height: 50%;
    // overflow-y: hidden;
}

.search-bar {
    padding-left: 5%;
    padding-right: 5%;
}

.search-bar-title {
    width: 100%;
    padding: 10px 5% 10px 5%;
    column-gap: 2%;
    display: flex;
    background-color: #B499FF;
    border-radius: 10px;
}

.table-column {
    max-width: 150px;
    // width: 100px;
    overflow-x: scroll;
}

.bg-title {
    background-color: #C7B2FF;
}

.tbody-custom {
    height: 100px !important;
    overflow-y: hidden !important;
}

// form media

@media only screen and (max-width: $media-size-mobile) {
    .search-bar-title {
        flex-direction: column;
    }
}
</style>
