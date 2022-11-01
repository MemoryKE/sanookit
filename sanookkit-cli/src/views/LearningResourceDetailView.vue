<template>
<div class="detail-view">
    <template>
        <b-row>
            <b-col md="7" class="header-title">
                <!-- <div class="text-overline mb-4">
                        Greyhound divisely hello coldly fonwderfullyGreyhound divisely hello coldly fonwderfullyGreyhound divisely hello coldly fonwderfullyGreyhound divisely hello coldly fonwderfullyGreyhound divisely hello coldly fonwderfully
                    </div> -->
                <v-list-item-title class="text-h5 mb-1">
                    {{itemDetail.title}}
                </v-list-item-title>
                <v-list-item-subtitle class="text-wrap">
                    {{itemDetail.description}}
                </v-list-item-subtitle>
                <v-chip-group active-class="deep-purple accent-4 white--text" row>
                    <v-chip>{{gradeLists[itemDetail.grade].title}}</v-chip>

                    <!-- <v-chip v-for="(k, index) of itemDetail.knowledgeTypes" :key="index">{{k}}</v-chip> -->
                </v-chip-group>
            </b-col>
            <b-col md="2"></b-col>
            <b-col md="3">
                <v-list-item-avatar tile size="200" color="grey">
                    <v-img :src="`${baseURL}${itemDetail.img_name}`" />
                </v-list-item-avatar>
            </b-col>
        </b-row>
    </template>
    <template>
        <v-container class="role-content lighten-5">
            <b-row class="mb-6" no-gutters>
                <b-col md="5">
                    <div>
                        <v-img src="@/assets/p-role.png"></v-img>

                    </div>
                </b-col>
                <b-col md="2"></b-col>
                <b-col md="5">
                    <div class="p-role">
                        <v-img src="@/assets/t-role.png"></v-img>

                    </div>
                </b-col>
                <b-col md="5">
                    <div>
                        <div class="bg-white p-role">
                            <v-card-subtitle class="text-wrap bg-white">
                                {{itemDetail.parent_des}}
                            </v-card-subtitle>
                        </div>
                    </div>
                </b-col>
                <b-col md="2"></b-col>
                <b-col md="5">
                    <div class="p-role">
                        <div class="bg-white p-role">
                            <v-card-subtitle class="text-wrap bg-white">
                                {{itemDetail.teacher_des}}
                            </v-card-subtitle>
                        </div>

                    </div>
                </b-col>
            </b-row>

        </v-container>
    </template>
    <v-container>
        <v-row>
            <h1>ตัวอย่างกิจกรรม</h1>
        </v-row>
        <b-row class="activity-card" v-for="(activity, index) of itemDetail.activities" :key="index">
            <b-col md="7" class="act-content">
                <!-- <div class="text-overline mb-4">
                        Greyhound divisely hello coldly fonwderfullyGreyhound divisely hello coldly fonwderfullyGreyhound divisely hello coldly fonwderfullyGreyhound divisely hello coldly fonwderfullyGreyhound divisely hello coldly fonwderfully
                    </div> -->
                <v-list-item-title class="text-h5 mb-1 text-wrap">
                    {{activity.title}}
                </v-list-item-title>
                <v-list-item-subtitle class="text-wrap">
                    {{activity.description}}
                </v-list-item-subtitle>
                <v-chip-group active-class="deep-purple accent-4 white--text" row>
                    <v-chip>sdf</v-chip>

                    <v-chip>7:30PM</v-chip>
                </v-chip-group>
            </b-col>
            <b-col md="2"></b-col>
            <b-col md="3">
                <v-list-item-avatar tile size="200" color="grey">
                    <v-img :src="`${baseURL}${activity.qr_name}`" />
                </v-list-item-avatar>
            </b-col>

            <b-col class="pl-9" md="12">รูปภาพประกอบ</b-col>
            <b-col class="act-img-container" mb="12" v-for="(img_act, index) of activity.imgs_name" :key="index">
                <v-img :src="`${baseURL}${img_act}`"></v-img>
            </b-col>
        </b-row>
    </v-container>
</div>
</template>

<script>
export default {
    name: 'LearningDetail',
    data() {
        return {
            itemDetail: {
                title: `บัตรอักษรภาษาอังกฤษ`,
                description: `บัตรอักษรภาษาอังกฤษ ที่สามารถส่งเสริมความรู้และทักษะทางด้านภาษาอังกฤษ โดยผู้ปกครอง
และ นักเรียนสามารถเรียนรู้ด้วยบัตรอักษรภาษาอังกฤษโดยตรง และสามารถนําไปประยุกต์ใช้ใน
กิจกรรมด้านอื่นๆ ที่หลากหลาย`,
                img_name: '',
                grade: 1,
                knowledgeTypes: [],
                parent_des: `ผู้ปกครองสามารถชักชวนบุตรหลานทํากิจกรรม หากมีพื้นฐาน
ความรู้ทางภาษาอังกฤษ สามารถช่วยตั้งคําถาม อธิบายวิธีการเล่น กติกา ให้การเสริมแรง
โดยการให้คําชมเชย ให้รางวัล สร้างความท้าทายในโจทย์ที่ยากขึ้นตามลําดับตลอด
จนช่วยอธิบายสร้างความเข้าใจที่ถูกต้องเมื่อบุตรหลานของท่านมีความเข้าใจที่คลาดเคลื่อน`,
                teacher_des: `ครูสามารถใช้บัตรอักษรภาษาอังกฤษเป็นส่วนหนึ่งในการจัดการชั้นเรียน
เช่น การเล่นเกม การแข่งขันชิงรางวัล การมอบหมายการบ้านและกิจกรรมการเรียนรู้ที่บ้าน`,
            },
            gradeLists: [{
                    title: "ทั้งหมด",
                    value: 0
                },
                {
                    title: "ป.1",
                    value: 1
                },
                {
                    title: "ป.2",
                    value: 2
                },
                {
                    title: "ป.3",
                    value: 3
                },
                {
                    title: "ป.4",
                    value: 4
                },
                {
                    title: "ป.5",
                    value: 5
                },
                {
                    title: "ป.6",
                    value: 6
                },
            ],
            baseURL: ''
        }
    },
    mounted() {
        let data = this.$route.params;
        console.log("data is", data);
        this.itemDetail = data.media
        this.baseURL = data.baseURL
    }
}
</script>

<style>
.header-title {
    border: 10px dotted #1C6EA4;
border-radius: 15px;
}
.detail-view {
    width: 100vw;
    background-color: antiquewhite;
    padding: 10% 10% 0 10%;
}

.role-content {
    margin-top: 50px;
    margin-bottom: 50px;
}

.activity-card {
    background-color: #ffffff;
    margin-bottom: 5%;
}

.p-role {
    height: 100%;
}

.act-content {
    padding: 2%;
}

.act-img-container {
    padding: 2% 10% 2% 10%;
}
</style>
