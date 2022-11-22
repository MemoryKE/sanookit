<template>
<div class="tracking">
    <b-card no-body class="overflow-hidden center-center">
        <b-row no-gutters>
            <b-col cols="12" md="6" class="left-card">
                <div class="flex-col">
                    <h4 class="text-h4 text--primary">
                        ติดตามกระเป๋า
                    </h4>
                    <v-tabs v-model="tab" background-color="transparent" color="basil">
                        <v-tab v-for="(item, index) of tabsList" :key="index">
                            {{ item.title }}
                        </v-tab>
                    </v-tabs>
                    <v-text-field v-model="tabsList[tab].value" :label="tabsList[tab].title" background-color="#EFEFEF" flat solo type="email">
                        <template #append>
                            <v-btn color="#FC877D" value="Subscribe">
                                <v-icon color="#fff">mdi-magnify</v-icon>
                            </v-btn>
                        </template>
                    </v-text-field>
                </div>
            </b-col>
            <b-col cols="12" md="6" class="p-3">
                <h6 class="text-h6 text--primary">
                        รายละเอียด
                </h6>
                <v-simple-table>
                    <template v-slot:default>
                        <tbody>
                            <!-- <tr v-for="(item, index) of userDetails" :key="index">
                                <td>{{ item }}</td>
                            </tr> -->
                            <tr>
                                <td>เลขกระเป๋า</td>
                                <td>{{ filteredItems?.bag_id }}</td>
                            </tr>
                            <tr>
                                <td>ชื่อผู้ใช้</td>
                                <td>{{ filteredItems?.fullname }}</td>
                            </tr>
                            <tr>
                                <td>รหัสประชาชน</td>
                                <td>{{ filteredItems?.id_card }}</td>
                            </tr>
                            <tr>
                                <td>ระดับชั้น</td>
                                <td>{{ filteredItems?.grade_string }}</td>
                            </tr>
                            <tr>
                                <td>ชื่อโรงเรียน</td>
                                <td>{{ filteredItems?.school }}</td>
                            </tr>
                            <tr>
                                <td>ที่อยู่</td>
                                <td>{{ filteredItems?.address_string }}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </b-col>
        </b-row>
    </b-card>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Tracking',
    data() {
        return {
            tab: 0,
            searchText: '',
            userDetails: {},
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
            tabsList: [
                {
                    title: 'เลขกระเป๋า',
                    key: 'bag_id',
                    value: ''
                },
                {
                    title: 'ชื่อจริง',
                    key: 'fullname',
                    value: ''
                },
                {
                    title: 'รหัสบัตรประชาชน',
                    key: 'id_card',
                    value: ''
                }
            ]
        }
    },
    mounted() {
        this.requestData()
    },
    methods: {
        changeFilterHandle() {
            this.searchText =  this.tab
        },
        requestData() {
            this.$store.dispatch("getStudentList").then(() => {
                this.student_data.map((item) => {
                    item["fullname"] = `${item.sex} ${item.firstname} ${item.surname}`
                    const address = item.address
                    item["address_string"] = `${address.house_no} ${address.road} ${address.district} ${address.subdistrict} ${address.city} ${address.postal_code}`
                    item["grade_string"] = this.grade_list[item.grade - 1].text
                })
                this.userDetails = this.student_data
            })
        }
    },
    computed: {
        ...mapGetters({
            student_data: "STUDENT_LIST",
        }),
        filteredItems() {
            var filtered = Object.values(this.userDetails)
            const lowTextSearch = this.tabsList[this.tab].value.toString().toLowerCase()
            console.log(filtered)
            filtered = filtered.filter((item) => item[this.tabsList[this.tab].key].toString().toLowerCase().includes(lowTextSearch))
            console.log(filtered)
            return filtered.length == 1 && this.tabsList[this.tab].value.toString() != "" ? filtered[0] : {
                grade_string: '',
                fullname: '',
                bag_id: '',
                id_card: '',
                school: '',
                address_string: ''
            }
        }

    }

}
</script>

<style>
.flex-col {
    display: flex;
    flex-direction: column;
    gap: 2em;
}

.tracking {
    width: 100vw;
    height: 100vh;
    background-color: #DCEEEA;
    justify-content: center;
    align-content: center;
}
/* darken-3 */

.center-center {
    width: 80%;
    position: fixed;
    /* or absolute */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.display-inline {
    display: inline;
    width: 100%;
}
</style>

<style scoped>
.left-card {
    padding: 2% !important;
}
</style>
