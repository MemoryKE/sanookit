<template>
<div class="home-container">
    <div id="info-section"></div>
    <div id="number-section">
        <h1>เราแจกไปแล้วกว่า</h1>
        <b-row id="paralax-number">
            <b-col v-for="(deal, index) of amountDeal" :key="index" md="4">
                <number tag="h1" class="large-text" :ref="index.toString()" :format="formatRunNumber" :to="deal.quantity" :duration="1" animationPaused />
                <h3>{{deal.unit}}</h3>
            </b-col>
        </b-row>
    </div>
    <div id="activity-section">
        <v-carousel cycle hide-delimiter-background show-arrows-on-hover height="700px">
            <v-carousel-item :src="require('../assets/IMG_3178.jpg')">
            </v-carousel-item>
            <v-carousel-item :src="require('../assets/IMG_3179.jpg')">
            </v-carousel-item>
            <v-carousel-item :src="require('../assets/IMG_3180.jpg')">
            </v-carousel-item>
        </v-carousel>
    </div>
    <div id="news-section">
        <h1>ข่าวสารความรู้</h1>
        <div class="overflow-mask">
            <v-card v-for="(news, index) of newsList" :key="index" class="mx-auto" max-width="344">
                <v-img :src="news.img_url" height="200px"></v-img>
                <v-card-subtitle class="text-wrap">
                    {{news.description}}
                </v-card-subtitle>

                <v-card-actions>
                    <v-card-subtitle>{{news.date}}</v-card-subtitle>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </div>
    </div>
    <div id="footer-section">
        <v-container>
        <v-row class="pb-5 pt-5 h-100">
            <v-col md="6">
                <h3>sanookit</h3>
            </v-col>
            <v-col md="3">
                <h4>ช่องทางติดต่อ</h4>
                <div><v-icon>mdi-email-outline</v-icon> sanookkit@sanookkit.com</div>
            </v-col>
            <v-col md="3">
                <h4 class="w-100 text-center">ช่องทางติดต่อ</h4>
                <div><v-btn @click="$router.push('/')" text small class="w-100 text-md-left">หน้าหลัก</v-btn></div>
                <div><v-btn @click="$router.push('/about')" text small class="w-100 text-md-left">เกี่ยวกับ</v-btn></div>
                <div><v-btn @click="$router.push('/learning-resource')" text small class="w-100 text-md-left">แหล่งเรียนรู้</v-btn></div>
                <div><v-btn @click="$router.push('/tracking')" text small class="w-100 text-md-left">ติดตามกระเป๋า</v-btn></div>
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
    AMOUNT_DEAL,
    ACTIVITY_IMAGE_LIST,
    NEWS_LIST
} from '../datas/homeData.json'

export default {
    name: 'Home',
    data() {
        return {
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
    },
    created() {
        window.addEventListener('scroll', this.eventScrollHandler);
    },
    destroyed() {
        window.removeEventListener('scroll', this.eventScrollHandler);
    },
    methods: {
        setupData() {
            this.amountDeal = AMOUNT_DEAL
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
        }
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
    background-image: url('@/assets/home_page_bg.jpg');
    background-size: 100% 100%;
    background-position: center;
    margin-bottom: 10vh;
}

#number-section h1 {
    text-align: center;
}

#paralax-number {
    width: 100%;
    margin: 0 !important;
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
