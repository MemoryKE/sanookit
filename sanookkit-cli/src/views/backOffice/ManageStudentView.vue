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

                            <v-dialog v-if="head.key == 'remove_btn'" v-model="addDataDialog" persistent max-width="1000px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn v-bind="attrs" v-on="on" class="mx-2" rounded dark small color="cyan">
                                        <v-icon dark left>
                                            mdi-plus
                                        </v-icon>
                                        เพิ่มนักเรียน
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title class="bg-title">
                                        <span class="text-h5">ข้อมูลนักเรียน</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-form ref="addFieldForm" class="mx-2" lazy-validation>
                                            <v-container>
                                                <v-row>
                                                    <v-col cols="12" sm="6" md="6">
                                                        <!-- <v-text-field label="รหัสกระเป๋า" :rules="[rules.required]" required v-model="add_form_field.bag_id">
                                                        </v-text-field> -->
                                                    </v-col>
                                                    <v-col cols="12" sm="6" md="6">
                                                        <v-text-field label="รหัสประชาชน" counter maxlength="13" :rules="[rules.required, rules.couter13]" v-model="add_form_field.id_card">
                                                        </v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="2" md="2">
                                                        <v-select :items="['ด.ช.', 'ด.ญ.']" label="คำนำหน้า" :rules="[rules.required]" v-model="add_form_field.sex"></v-select>
                                                    </v-col>
                                                    <v-col cols="12" sm="5" md="5">
                                                        <v-text-field label="ชื่อจริง" :rules="[rules.required]" v-model="add_form_field.firstname"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="5" md="5">
                                                        <v-text-field label="นามสกุล" :rules="[rules.required]" v-model="add_form_field.surname"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="10">
                                                        <v-text-field label="โรงเรียน" :rules="[rules.required]" v-model="add_form_field.school"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="2">
                                                        <v-select :items="grade_list" item-text="text" item-value="value" label="ระดับชั้น" :rules="[rules.required]" v-model="add_form_field.grade"></v-select>
                                                    </v-col>

                                                    <v-col cols="12" class="bg-title">
                                                        <h3>ที่อยู่</h3>
                                                    </v-col>
                                                    <v-col cols="12" sm="4" md="4">
                                                        <v-text-field label="บ้านเลขที่" :rules="[rules.required]" v-model="add_form_field.address.house_no"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="4" md="4">
                                                        <v-text-field label="ถนน" :rules="[rules.required]" v-model="add_form_field.address.road"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12" sm="8" md="8">
                                                        <v-autocomplete v-on:change="selectCityHandle(add_form_field.address.city)" :items="default_filter.city_list" item-text="name_th" item-value="name_th" label="จังหวัด" :rules="[rules.required]" v-model="add_form_field.address.city"></v-autocomplete>
                                                    </v-col>
                                                    <v-col cols="12" sm="4" md="4">
                                                        <v-autocomplete v-on:change="selectDistrictHandle(add_form_field.address.district, add_form_field.address.city)" :items="default_filter.district_list" item-text="name_th" item-value="name_th" :disabled="add_form_field.address.city == ''" label="เขต" :rules="[rules.required]" v-model="add_form_field.address.district"></v-autocomplete>
                                                    </v-col>
                                                    <v-col cols="12" sm="4" md="4">
                                                        <v-autocomplete v-on:change="selectSubdistrictHandle(add_form_field.address.subdistrict, add_form_field.address.district, add_form_field.address.city)" :items="default_filter.subdistrict_list" item-text="name_th" item-value="name_th" :disabled="add_form_field.address.district == ''" label="แขวง" :rules="[rules.required]" v-model="add_form_field.address.subdistrict"></v-autocomplete>
                                                    </v-col>
                                                    <v-col cols="12" sm="4" md="4">
                                                        <v-autocomplete :disabled="add_form_field.address.subdistrict == ''" :items="default_filter.postal_code_list" item-text="zip_code" item-value="zip_code" label="รหัสไปรษณีย์" :rules="[rules.required]" v-model="add_form_field.address.postal_code"></v-autocomplete>
                                                    </v-col>
                                                </v-row>

                                            </v-container>
                                        </v-form>
                                        <small>*indicates required field</small>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="cancelAddForm">
                                            ยกเลิก
                                        </v-btn>
                                        <v-btn color="blue darken-1" text @click="submitAddForm">
                                            บันทึก
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </th>
                    </tr>
                </thead>
                <tbody class="tbody-custom">
                    <tr v-for="(item, index) of filteredItems" :key="index">
                        <td v-for="(head, index) of headers" :key="index" class="table-column">
                            <p v-if="head.key != 'edit_btn' && head.key != 'remove_btn'">{{item[head.key]}}</p>

                            <v-btn v-if="head.key == 'edit_btn'" class="mx-2" rounded dark small color="cyan" @click="onClickEditHandle(item)">
                                <v-icon dark>
                                    mdi-pencil
                                </v-icon>
                            </v-btn>

                            <v-btn v-if="head.key == 'remove_btn'" class="mx-2" rounded dark small color="primary" @click="deleteStudent(item._id)">
                                <v-icon dark>
                                    mdi-minus
                                </v-icon>
                                ลบนักเรียน
                            </v-btn>

                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="1000px">
        <v-card>
            <v-card-title class="bg-title">
                <span class="text-h5">ข้อมูลนักเรียน</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" class="mx-2" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="รหัสกระเป๋า" :rules="[rules.required]" disabled required v-model="add_form_field.bag_id">
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
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">
                    ยกเลิก
                </v-btn>
                <v-btn color="blue darken-1" text @click="updateStudent()">
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
import provinceList from "@/datas/province.json"
import provinceData from "@/datas/citys.json"

export default {
    name: 'ManageStudentView',
    data() {
        return {
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
                    align: 'start',
                    sortable: true,
                    key: 'bag_id',
                },
                {
                    text: 'ชื่อ - นามสกุล นักเรียน',
                    key: 'fullname'
                },
                {
                    text: 'รหัสประชาชน',
                    key: 'id_card'
                },
                {
                    text: 'ระดับชั้น',
                    key: 'grade_string'
                },
                {
                    text: 'โรงเรียน',
                    key: 'school'
                },
                {
                    text: 'ที่อยู่',
                    key: 'address_string'
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
            }
        }
    },
    mounted() {
        this.requestData()
        this.setupData()

        // this.getPostalList()
        // this.getSubdistrictList()
    },
    methods: {
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
            for(let i = 0; i < digits; i++) {
                if(strNumber.length >=  digits) return strNumber
                strNumber = `0${strNumber}`
            }
            return strNumber
        },
        submitAddForm() {
            if (this.$refs.addFieldForm[0].validate()) {
                this.add_form_field.bag_id = `${this.add_form_field.grade}${this.addZeroFormat(this.students.length+1, 3)}`
                this.$store.dispatch("addNewStudent", this.add_form_field).then((_) => {
                    this.addDataDialog = false
                    this.requestData()

                })
            }
            console.log(this.$refs.addFieldForm[0].validate())
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
            this.add_form_field = item
            this.dialog = true
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
        requestData() {
            this.$store.dispatch("getStudentList").then(() => {
                this.student_data.map((item) => {
                    item["fullname"] = `${item.sex} ${item.firstname} ${item.surname}`
                    const address = item.address
                    item["address_string"] = `${address.house_no} ${address.road} ${address.district} ${address.subdistrict} ${address.city} ${address.postal_code}`
                    item["grade_string"] = this.grade_list[item.grade - 1].text
                })
                this.students = this.student_data
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
