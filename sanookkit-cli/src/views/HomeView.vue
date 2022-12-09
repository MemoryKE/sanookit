<template>
<div class="home-container">
    <div id="info-section">
        <img id="logo-info-section" src="../assets/home_logo_info_section.png" ></img>
        <img id="title-info-section" src="../assets/home_title_info_section.png" ></img>
    </div>
    <div id="number-section">
        <h1>เราแจกไปแล้วกว่า</h1>
        <b-row id="paralax-number">
            <b-col v-for="(deal, index) of amountDeal" :key="index" md="4">
                <number tag="h1" :class="`paralax-text-${index}`" :ref="index.toString()" :format="formatRunNumber" :to="deal.quantity" :duration="1" animationPaused />
                <h3>{{deal.unit}}</h3>
            </b-col>
        </b-row>
    </div>
    <div id="activity-section">
        <v-carousel class="p-10" cycle hide-delimiter-background show-arrows-on-hover height="700px">
            <v-carousel-item v-for="(item, index) of activities_item" :key="index" :src="`${imgBaseURL}${item.name}`" />
            <!-- <v-carousel-item :src="require('../assets/IMG_3178.jpg')">
            </v-carousel-item>
            <v-carousel-item :src="require('../assets/IMG_3179.jpg')">
            </v-carousel-item>
            <v-carousel-item :src="require('../assets/IMG_3180.jpg')">
            </v-carousel-item> -->
        </v-carousel>
    </div>
    <div id="news-section">
        <h1>ข่าวสารความรู้</h1>
        <div class="overflow-mask">
            <v-card v-for="(news, index) of newsList" :key="index" class="mx-auto" max-width="344">
                <v-img :src="news.img_url" height="200px"></v-img>
                <v-card-subtitle class="text-wrap" :style="{fontSize: '22px'}">
                    {{news.description}}
                </v-card-subtitle>

                <v-card-actions>
                    <v-card-subtitle :style="{fontSize: '18px'}">{{news.date}}</v-card-subtitle>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </div>
    </div>
    <div id="footer-section">
        <v-container>
        <v-row class="pb-5 pt-5 h-100">
            <v-col md="6">
                <h3 :style="{fontSize: '22px'}">Sanook Kit</h3>
            </v-col>
            <v-col md="3" :style="{fontSize: '20px'}">
                <h4>ช่องทางติดต่อ</h4>
                <div><v-icon>mdi-email-outline</v-icon> sanookkit@sanookkit.com</div>
                <div><v-icon>mdi-email-outline</v-icon> sanookkitthai@gmail.com</div>
            </v-col>
            <v-col md="3" :style="{fontSize: '22px'}">
                <h4 class="w-100 text-center">ช่องทางติดต่อ</h4>
                <div><v-btn @click="$router.push('/')" text small class="w-100 text-md-left" :style="{fontSize: '22px'}">หน้าหลัก</v-btn></div>
                <div><v-btn @click="$router.push('/about')" text small class="w-100 text-md-left" :style="{fontSize: '22px'}">เกี่ยวกับ</v-btn></div>
                <div><v-btn @click="$router.push('/learning-resource')" text small class="w-100 text-md-left" :style="{fontSize: '22px'}">แหล่งเรียนรู้</v-btn></div>
                <div><v-btn @click="$router.push('/tracking')" text small class="w-100 text-md-left" :style="{fontSize: '22px'}">ติดตามกระเป๋า</v-btn></div>
            </v-col>
        </v-row>
        <hr/>
        <v-row>
            <v-col md="12">
                <p>Copyright <v-icon>mdi-copyright</v-icon> 2022</p>
            </v-col>
        </v-row>
    </v-container>
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
import {
    AMOUNT_DEAL,
    ACTIVITY_IMAGE_LIST,
    NEWS_LIST
} from '../datas/homeData.json'
import axios from 'axios';

export default {
    name: 'Home',
    data() {
        return {
            activities_item: [],
            imgBaseURL: "https://www.sanookkit.com/assets/",
            amountDeal: [],
            isOnScreen: false,
            activityList: [],
            newsList: [],
            imgList: [
            '../assets/IMG_3178.jpg',
            '../assets/IMG_3178.jpg'
            ]
        }
    },
    mounted() {
        this.setupData()
        this.requestData()
        this.getCliImg()
    },
    created() {
        window.addEventListener('scroll', this.eventScrollHandler);
    },
    destroyed() {
        window.removeEventListener('scroll', this.eventScrollHandler);
    },
    methods: {
        getCliImg() {
            axios.get('https://sanookkit-server.vercel.app/cliImgAsset').then((res) => {
                console.log(res)
                this.activities_item = res.data
            })
        },
        setupData() {
            // this.amountDeal = AMOUNT_DEAL
            this.newsList = NEWS_LIST
            this.activityList = ACTIVITY_IMAGE_LIST
        },
        inScreenFirst() {
            const runNumberBar = document.getElementById('paralax-number')
            const first_section = document.getElementById('info-section')
            const rect = runNumberBar.getBoundingClientRect();
            if (rect.top > first_section.offsetTop && rect.bottom < first_section.offsetHeight && !this.isOnScreen) {
                this.amountDeal.forEach((_, index) => {this.$refs[index][0].restart()})
                this.isOnScreen = true
            }
        },
        eventScrollHandler() {
            const runNumberBar = document.getElementById('paralax-number')
            const first_section = document.getElementById('info-section')
            const rect = runNumberBar.getBoundingClientRect();
            if ((rect.top < first_section.offsetHeight && rect.bottom > first_section.offsetTop) && !this.isOnScreen) {
                this.amountDeal.forEach((_, index) => {this.$refs[index][0].restart()})
                this.isOnScreen = true
            } else if ((rect.bottom <= first_section.offsetTop || rect.top >= first_section.offsetHeight - 12) && this.isOnScreen) {
                this.isOnScreen = false
            }
        },
        formatRunNumber(num) {
            var formated = num.toLocaleString();
            if (formated.indexOf('.') != -1) {

                formated = formated.slice(0, formated.indexOf('.'))
            }
            return formated
        },
        completed() {
            console.log(this.$refs.number2)
        },
        requestData() {
            this.$store.dispatch("getStudentList").then(() => {
                const schools = []
                const cities = []
                this.student_data.filter((student) => {
                    if (schools.indexOf(student.school) == -1) {
                        schools.push(student.school)
                    }
                    if (cities.indexOf(student.address.city) == -1) {
                        cities.push(student.address.city)
                    }
                })
                this.amountDeal.push({
                    quantity: schools.length,
                    unit: "โรงเรียน"
                })
                this.amountDeal.push({
                    quantity: this.student_data.length,
                    unit: "ใบ"
                })
                this.amountDeal.push({
                    quantity: cities.length,
                    unit: "จังหวัด"
                })
            })
        }
    },
    computed: {
        ...mapGetters({
            student_data: "STUDENT_LIST",
        }),
    }
}
</script>

<style scoped>
.text-left {
    float: left !important;
}
.large-text {
    font-size: 72px;
}

.home-container {
    width: 100vw;
}

#info-section {
    height: 100vh;
    background-image: url('@/assets/home_bg_info_section.png');
    /* background-size: 100% 100%; */
    background-position: center;
    margin-bottom: 10vh;
    display: flex;
   justify-content: center;
   flex-direction: column;
   align-items: center;
   flex-wrap: wrap;
   row-gap: 5%;
}


@media screen and (orientation: portrait) {

/* แนวตั้ง */
/* Portrait styles */
#info-section {
    background-size: auto 100%;
}
#logo-info-section {
    width: 90%;
    height: auto;
    /* background-color: #86E3CE; */
}
#title-info-section {
    width: 80%;
    height: auto;
}
}

@media screen and (orientation: landscape) {

/* แนวนอน */
/* Landscape styles */
#info-section {
    background-size: 100% 100%;
}
#logo-info-section {
    width: auto;
    height: 50%;
    /* background-color: #86E3CE; */
}
#title-info-section {
    width: auto;
    height: 20%;
}
}

#number-section h1 {
    text-align: center;
}

#paralax-number {
    width: 100%;
    margin: 0 !important;
}

.paralax-text-0 {
    font-size: 124px;
    /* -webkit-text-stroke-width: 5px;
    -webkit-text-stroke-color: rgb(255, 255, 255); */
    color: #D0E6A5;
    /* filter: drop-shadow(0 0 0.75rem rgba(0,0,0,0.29)); */
    text-shadow: 5px 0px 0px #a7c36f,
-5px 5px 0px #a7c36f,
5px -5px 0px #a7c36f,
5px 5px 0px #a7c36f,
-5px -5px 0px #a7c36f,
-5px 0px 0px #a7c36f,
0px -5px 0px #a7c36f,
0px 5px 0px #a7c36f;
}
/* #86E3CE #D0E6A5 #FFDD94 */
.paralax-text-1 {
    font-size: 124px;
    /* -webkit-text-stroke-width: 5px;
    -webkit-text-stroke-color: rgb(255, 255, 255); */
    color: #86E3CE;
    /* filter: drop-shadow(0 0 0.75rem rgba(0,0,0,0.29)); */
    text-shadow: 5px 0px 0px #63c8b1,
-5px 5px 0px #63c8b1,
5px -5px 0px #63c8b1,
5px 5px 0px #63c8b1,
-5px -5px 0px #63c8b1,
-5px 0px 0px #63c8b1,
0px -5px 0px #63c8b1,
0px 5px 0px #63c8b1;
}

.paralax-text-2 {
    font-size: 124px;
    /* -webkit-text-stroke-width: 5px;
    -webkit-text-stroke-color: rgb(255, 255, 255); */
    color: #FFDD94;
    /* filter: drop-shadow(0 0 0.75rem rgba(0,0,0,0.29)); */
    text-shadow: 5px 0px 0px #f0c977,
-5px 5px 0px #f0c977,
5px -5px 0px #f0c977,
5px 5px 0px #f0c977,
-5px -5px 0px #f0c977,
-5px 0px 0px #f0c977,
0px -5px 0px #f0c977,
0px 5px 0px #f0c977;
}


#paralax-number div {
    text-align: center;
}

#activity-section {
    padding: 10vh 5vw 5vh 5vw;
}

#news-section {
    width: 80%;
    margin: 0 10% 10% 10%;
}

#news-section h1 {
    text-align: center;
    padding-top: 5vh;
    padding-bottom: 5vh;
}

.overflow-mask {
    width: 100%;
    overflow-x: scroll;
    display: flex;
    white-space: nowrap;
    column-gap: 20px;
    padding: 2vh;
    /* background-color: gray; */
}

/* footer */
#footer-section {
    width: 100%;
    height: 70%;
    background-color: aliceblue;
}
</style>
