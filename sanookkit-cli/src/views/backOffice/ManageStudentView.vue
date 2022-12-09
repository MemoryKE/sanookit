<template>
<div id="manage-student-view">
    <v-card class="mx-auto" tile>
        <!-- <v-card-title>Tutorials</v-card-title> -->
        <v-card-title class="search-bar">
            <div class="search-bar-title">
                <v-text-field v-for="(search, index) of searchs" :key="index" v-model="search.search" append-icon="mdi-magnify" :label="search.title" single-line hide-details></v-text-field>
            </div>
        </v-card-title>
        <v-card-actions>
            <v-list-item class="grow">
                <!-- <v-list-item-avatar color="grey darken-3">
                    <v-img class="elevation-6" alt="" src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-img>
                </v-list-item-avatar> -->

                <!-- <v-list-item-content>
                    <v-list-item-title>Evan You</v-list-item-title>
                </v-list-item-content> -->

                <v-row align="center" class="mr-1" justify="end">
                    <!-- <v-icon class="mr-1">
                        mdi-pen
                    </v-icon>
                    <v-icon class="mr-1">
                        mdi-delete
                    </v-icon>
                    <v-icon class="mr-1">
                        mdi-heart
                    </v-icon>
                    <span class="subheading mr-2">256</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1">
                        mdi-share-variant
                    </v-icon>
                    <span class="subheading">45</span> -->
                    <v-btn small rounded color="success" @click="addNewStudentHandle">
                        <v-icon>
                            mdi-plus
                        </v-icon> เพิ่มนักเรียน
                    </v-btn>
                    <v-btn small rounded color="success" @click="getData(api.baseUrl)" v-if="false">
                        <v-icon>
                            mdi-plus
                        </v-icon>
                    </v-btn>
                    <v-btn small rounded color="success" @click="updateAllData()" v-if="false">
                        <v-icon>
                            mdi-minus
                        </v-icon>
                    </v-btn>
                </v-row>
            </v-list-item>
        </v-card-actions>

        <v-data-table :headers="headers" :items="filteredItems">
            <template v-slot:item.edit_btn="{ item }">
                <v-btn text @click="onClickEditHandle(item)">
                    <v-icon>
                        mdi-pencil
                    </v-icon>
                </v-btn>
            </template>
            <template v-slot:item.remove_btn="{ item }">
                <v-btn text small rounded color="error" @click="removeResourceHandle(item._id)">
                    <v-icon>
                        mdi-delete
                    </v-icon>
                    <!-- ลบนักเรียน -->
                </v-btn>
                <!-- <v-btn text small rounded color="error" @click="deleteStudent(item._id)">
                    <v-icon>
                        mdi-delete
                    </v-icon>
                    ลบนักเรียน
                </v-btn> -->

            </template>
            <!-- <template v-slot:item="row">
                <tr>
                    <td>{{row.item.no}}</td>
                    <td>{{row.item.result}}</td>
                    <td>
                        <v-btn class="mx-2" fab dark small color="pink" @click="onButtonClick(row.item)">
                            <v-icon dark>mdi-heart</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </template> -->
        </v-data-table>

        <!-- <v-card-actions>
            <v-btn small color="error" @click="removeAllTutorials">
                Remove All
            </v-btn>
        </v-card-actions> -->
    </v-card>
    <v-dialog v-model="deleteDialog" width="500">
        <v-card>
            <v-card-title>
                ยืนยันการลบนักเรียน
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="deleteDialog = false">
                    ยกเลิก
                </v-btn>
                <v-btn color="error" small rounded @click="deleteStudent(removeId)">
                    ยืนยัน
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" v-if="dialog" persistent max-width="1000px" @click:outside="closeDialogHandle">
        <v-card>
            <v-card-title class="bg-title">
                <span class="text-h5">ข้อมูลนักเรียน</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" class="mx-2" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="รหัสกระเป๋า" disabled required v-model="add_form_field.bag_id">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="รหัสประชาชน" counter maxlength="13" :rules="[rules.required, rules.couter13]" v-model="add_form_field.id_card">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="2" md="2">
                                <v-select :items="['ด.ช.', 'ด.ญ.']" label="คำนำหน้า" :rules="[rules.required]" v-model="add_form_field.sex"></v-select>
                            </v-col>
                            <v-col cols="12" sm="5" md="5">
                                <v-text-field label="ชื่อจริง" ref="firstname" :rules="[rules.required]" v-model="add_form_field.firstname"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="5" md="5">
                                <v-text-field label="นามสกุล" ref="surname" :rules="[rules.required]" v-model="add_form_field.surname"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="10">
                                <v-text-field label="โรงเรียน" ref="school" :rules="[rules.required]" v-model="add_form_field.school"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="2">
                                <v-select :items="grade_list" item-text="text" item-value="value" label="ระดับชั้น" ref="grade" :rules="[rules.required]" v-model="add_form_field.grade"></v-select>
                            </v-col>

                            <v-col cols="12" class="bg-title">
                                <h3>ที่อยู่</h3>
                            </v-col>
                            <v-col cols="12" sm="4" md="4">
                                <v-text-field label="บ้านเลขที่" ref="house_no" :rules="[rules.required]" v-model="add_form_field.address.house_no"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4">
                                <v-text-field label="ถนน" ref="road" :rules="[rules.required]" v-model="add_form_field.address.road"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="8" md="8">
                                <v-autocomplete :items="city_list" item-text="name_th" item-value="name_th" label="จังหวัด" ref="city" :rules="[rules.required]" v-model="add_form_field.address.city"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="4" md="4">
                                <v-autocomplete :items="getDistrictList(add_form_field.address.city)" item-text="name_th" item-value="name_th" label="เขต" ref="state" :rules="[rules.required]" v-model="add_form_field.address.district"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="4" md="4">
                                <v-autocomplete :items="getSubdistrictList(add_form_field.address.city, add_form_field.address.district)" item-text="name_th" item-value="name_th" label="แขวง" ref="state" :rules="[rules.required]" v-model="add_form_field.address.subdistrict"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="4" md="4">
                                <v-autocomplete :items="getPostalCodeList(add_form_field.address.city, add_form_field.address.district)" item-text="zip_code" item-value="zip_code" label="รหัสไปรษณีย์" :rules="[rules.required]" v-model="add_form_field.address.postal_code"></v-autocomplete>
                            </v-col>
                        </v-row>

                    </v-container>
                </v-form>
                <!-- <small>*indicates required field</small> -->
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="closeDialogHandle">
                    ยกเลิก
                </v-btn>
                <v-btn color="success" small rounded @click="updateStudent()" v-if="!isAddNewForm">
                    บันทึก
                </v-btn>
                <v-btn color="success" small rounded @click="submitAddForm" v-if="isAddNewForm">
                    เพิ่มนักเรียน
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <!-- <v-dialog v-model="deleteDialog" v-if="deleteDialog" persistent max-width="1000px" @click:outside="deleteDialog = false">
        <v-card>
            <v-card-title>
                ยืนยันการลบนักเรียน
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="deleteDialog = false">
                    ยกเลิก
                </v-btn>
                <v-btn color="success" small rounded @click="submitAddForm" v-if="isAddNewForm">
                    ยืนยัน
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog> -->
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
import provinceList from "@/datas/province.json"
import provinceData from "@/datas/citys.json"
import axios from "axios";

export default {
    name: 'ManageStudentView',
    data() {
        return {
            removeId: null,
            isAddNewForm: true,
            deleteDialog: false,
            testData: [{
                bag_id: 0
            }],
            search_result: [{
                no: 0,
                result: 'aaa'
            }, {
                no: 2,
                result: 'bbb'
            }],
            rules: {
                couter13: value => value.length == 13 || 'กรุณากรอกให้ครบ 13 หลัก',
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
            },
            addDataDialog: false,
            add_form_field: {
                firstname: "",
                surname: "",
                sex: "",
                id_card: "",
                bag_id: "",
                school: "",
                grade: 0,
                score: "",
                address: {
                    house_no: "",
                    road: "",
                    city: "",
                    postal_code: "",
                    district: "",
                    subdistrict: ""
                }
            },
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
            searchs: [{
                    title: 'ชื่อ - นามสกุล นักเรียน',
                    search: '',
                    key: 'fullname'
                },
                {
                    title: 'รหัสประชาชน',
                    search: '',
                    key: 'id_card'
                },
                {
                    title: 'รหัสกระเป๋า',
                    search: '',
                    key: 'bag_id'
                }
            ],
            headers: [{
                    text: 'รหัสกระเป๋า',
                    value: 'bag_id',
                },
                {
                    text: 'ชื่อ - นามสกุล นักเรียน',
                    value: 'fullname'
                },
                {
                    text: 'รหัสประชาชน',
                    value: 'id_card'
                },
                {
                    text: 'ระดับชั้น',
                    value: 'grade_string'
                },
                {
                    text: 'โรงเรียน',
                    value: 'school'
                },
                {
                    text: 'ที่อยู่',
                    value: 'address_string'
                },
                {
                    text: 'แก้ไขข้อมูล',
                    value: 'edit_btn'
                },
                {
                    text: 'ลบนักเรียน',
                    value: 'remove_btn'
                }
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
            students: [],
            city_list: [],
            district_list: [],
            subdistrict_list: [],
            postal_code_list: [],
            default_filter: {
                city_list: [],
                district_list: [],
                subdistrict_list: [],
                postal_code_list: [],
            },
            api: {
                baseUrl: "https://sheets.googleapis.com/v4/spreadsheets/1JtPlAHk_FgntyHq-9scqcbajklu73Qjv3IOgBq9Vkas/values/ชีต1/?alt=json&key=AIzaSyD_x7-SFTptQZPX8lsbqZioR-bJ9xqN-GM",
            },
        }
    },
    mounted() {
        this.requestData()
        this.setupData()
        
        // this.getData(this.api.baseUrl)
        // this.getPostalList()
        // this.getSubdistrictList()
    },
    methods: {
        getData(apiUrl) {
            axios.get(apiUrl).then((res) => {
                const students = []
                console.log(res.data.values)
                const data = res.data.values
                data.forEach((studentData) => {
                    if (studentData[0] != 'ที่' && (studentData.length == 3 || studentData.length == 4 || studentData.length == 5)) {
                        var student = {
                            bag_id: "",
                            grade: 0,
                            sex: "",
                            // id_card: "",
                            firstname: "",
                            surname: "",
                            school: 'โรงเรียนพีระยานาวินคลองหินวิทยา',
                            address: {
                                city: "ปัตตานี",
                                // city: 'จังหวัดพะเยา'
                            }
                        }
                        // student.school = 'โรงเรียนบ้านแม่อมกิ' + (studentData[4] == undefined ? '' : ' ' + studentData[4])
                        student.bag_id = studentData[1]
                        student.grade = parseInt(studentData[1][0])
                        student.sex = (studentData[2].search('เด็กชาย') != -1) || (studentData[2].search('ด.ช.') != -1) ? 'ด.ช.' : 'ด.ญ.'
                        if (studentData[2].search('เด็กชาย') != -1) {
                            student.firstname = studentData[2].substring(7)
                        } else if (studentData[2].search('ด.ช.') != -1) {
                            student.firstname = studentData[2].substring(4)
                        } else if (studentData[2].search('เด็กหญิง') != -1) {
                            student.firstname = studentData[2].substring(8)
                        } else if (studentData[2].search('ด.ญ.') != -1) {
                            student.firstname = studentData[2].substring(4)
                        }
                        // student.firstname = (studentData[2].search('เด็กชาย') != -1) || (studentData[2].search('ด.ช.') != -1) ? studentData[2].substring(7) : studentData[2].substring(8)
                        if(student.firstname[0] == " ") {
                            student.firstname = student.firstname.substring(1)
                        }
                        student.surname = studentData[3] == undefined || studentData[3] == 'ไม่มีนามสกุล' || studentData[3] == '' ? "-" : studentData[3]
                        students.push(student)
                    }
                })
                console.log(students)
                this.addStudentList(students)
            });
        },
        updateAllData() {
                // this.student_data[1].address.city = this.student_data[1].address.city.search('จังหวัด') != -1 ? this.student_data[1].address.city.substring(7) : this.student_data[1].address.city
                //     this.$store.dispatch("updateStudent", this.student_data[1])
            
            this.$store.dispatch("updateAllStudentList").then((_) => {
                this.requestData()
            })
        },
        addStudentList(list) {
            this.$store.dispatch("addNewStudentList", list).then((_) => {
                this.requestData()
            })
        },
        removeResourceHandle(id) {
            this.removeId = id
            this.deleteDialog = true
        },
        setupData() {
            this.city_list = provinceList
            this.default_filter.city_list = this.getCityList()
        },
        selectCityHandle(city_name) {
            const set = new Set()
            provinceData.forEach((subdistrict) => {
                if (subdistrict.amphure.province.name_th == city_name) {
                    set.add(subdistrict.amphure)
                }
            })
            this.default_filter.district_list = [...set]
        },
        selectDistrictHandle(district_name, city_name) {
            const set = new Set()
            provinceData.forEach((subdistrict) => {
                if (subdistrict.amphure.name_th == district_name &&
                    subdistrict.amphure.province.name_th == city_name) {
                    set.add(subdistrict)
                }
            })
            this.default_filter.subdistrict_list = [...set]
            this.default_filter.postal_code_list = [...set]
        },
        selectSubdistrictHandle(subdistrict_name, district_name, city_name) {
            const set = new Set()
            provinceData.forEach((subdistrict) => {
                if (subdistrict.amphure.province.name_th == city_name &&
                    subdistrict.amphure.name_th == district_name &&
                    subdistrict.name_th == subdistrict_name) {
                    subdistrict.zip_code = subdistrict.zip_code.toString()
                    set.add(subdistrict)
                }
            })
            this.default_filter.postal_code_list = [...set]
        },
        addZeroFormat(number, digits) {
            var strNumber = number.toString()
            for (let i = 0; i < digits; i++) {
                if (strNumber.length >= digits) return strNumber
                strNumber = `0${strNumber}`
            }
            return strNumber
        },
        submitAddForm() {
            if (this.$refs.form.validate()) {
                const latestID =  this.student_data.filter((item) => item.grade == 1)
                console.log(latestID.length)
                this.add_form_field.bag_id = `${this.add_form_field.grade}${this.addZeroFormat(latestID.length+1, 3)}`
                this.$store.dispatch("addNewStudent", this.add_form_field).then((_) => {
                    this.dialog = false
                    this.requestData()

                })
            }
        },
        cancelAddForm() {
            this.addDataDialog = false
            this.add_form_field = {
                firstname: "",
                surname: "",
                sex: "",
                id_card: "",
                bag_id: "",
                school: "",
                grade: 0,
                score: "",
                address: {
                    house_no: "",
                    road: "",
                    city: "",
                    postal_code: "",
                    district: "",
                    subdistrict: ""
                }
            }
        },
        getCityList() {
            const set = new Set()
            provinceData.forEach((subdistrict) => {
                set.add(subdistrict.amphure.province)
            })
            return [...set]
        },
        onChangeDistrictListHandle(district_name) {
            const set = new Set()
            provinceData.forEach((subdistrict) => {
                if (subdistrict.amphure.name_th == district_name) {
                    set.add(subdistrict.amphure.name_th)
                }
            })
            this.subdistrict_list = [...set]
        },
        getDistrictList(city_name) {
            const set = new Set()
            provinceData.forEach((subdistrict) => {
                if (subdistrict.amphure.province.name_th == city_name) {
                    set.add(subdistrict.amphure)
                }
            })
            return [...set]
        },
        getSubdistrictList(city_name, district_name) {
            const set = new Set()
            provinceData.forEach((subdistrict) => {
                if (subdistrict.amphure.province.name_th == city_name &&
                    subdistrict.amphure.name_th == district_name) {
                    set.add(subdistrict)
                }
            })
            return [...set]
        },
        getPostalCodeList(city_name, district_name) {
            const set = new Set()
            provinceData.forEach((subdistrict) => {
                if (subdistrict.amphure.province.name_th == city_name &&
                    subdistrict.amphure.name_th == district_name) {
                    subdistrict.zip_code = subdistrict.zip_code.toString()
                    set.add(subdistrict)
                }
            })
            return [...set]
        },
        onClickEditHandle(item) {
            console.log(item)
            this.dialog = true
            this.isAddNewForm = false
            this.add_form_field = item

        },
        addNewStudentHandle() {
            this.isAddNewForm = true
            this.dialog = true
        },
        closeDialogHandle() {
            this.dialog = false
            this.add_form_field = {
                firstname: "",
                surname: "",
                sex: "",
                id_card: "",
                bag_id: "",
                school: "",
                grade: 0,
                score: "",
                address: {
                    house_no: "",
                    road: "",
                    city: "",
                    postal_code: "",
                    district: "",
                    subdistrict: ""
                }
            }
        },
        deleteStudent(target_id) {
            this.$store.dispatch("deleteStudent", target_id).then((_) => {
                this.deleteDialog = false
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
        requestData() {
            this.$store.dispatch("getStudentList").then(() => {
                this.students = this.student_data.map((item) => {
                    const address = item.address
                    var data = {
                        _id: item._id,
                        firstname: item?.firstname || "",
                        surname: item?.surname || "",
                        fullname: `${item?.sex || ""} ${item?.firstname || ""} ${item?.surname || ""}`,
                        sex: item?.sex || "",
                        id_card: item?.id_card || "",
                        bag_id: item?.bag_id || "",
                        school: item?.school || "",
                        grade: item?.grade || 0,
                        grade_string: this.grade_list[(item?.grade || 0) - 1].text,
                        score: item?.id_card || "",
                        address_string: `${address?.house_no || ''} ${address?.road || ''} ${address?.district || ''} ${address?.subdistrict || ''} ${address?.city || ''} ${address?.postal_code || ''}`,
                        address: {
                            house_no: address?.house_no || '',
                            road: address?.road || '',
                            city: address?.city || '',
                            postal_code: address?.postal_code || '',
                            district: address?.district || '',
                            subdistrict: address?.subdistrict || ''
                        }
                    }
                    return data
                })
                // this.students = this.student_data
                console.log(this.students)
            })
        }
    },
    computed: {
        ...mapGetters({
            student_data: "STUDENT_LIST",
        }),
        filteredItems() {
            var filtered = Object.values(this.students)
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

@media only screen and (max-width: $media-size-mobile) {
    .search-bar-title {
        flex-direction: column;
    }
}
</style>
