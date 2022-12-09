<template>
<div id="about_bag_container">

    <div id="about-bag-with-bg">

        <!-- <v-file-input multiple class="testtt" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an avatar" label="หน้าปกคู่มือสนุกคิด" v-model="addCliImgForm.img" /> -->
        <!--  @click="addCliImg()" -->
        <!-- <v-btn class="testttt" color="blue darken-1" text @click="dialogTest = true">
            บันทึก
        </v-btn> -->
    </div>
    <div id="section-2">
        <div class="center-center-content">
            <p>{{paragraph1}}</p>
        </div>
    </div>
    <!-- <div id="section-3">
        <h6>จากจุดเริ่มต้นดังกลาวได้นํามาสู่การพัฒนาและทดลองชุดนวัตกรรมการนําความรู้
            ไปหาผู้เรียนที่ได้ผ่านกระบวนการวิจัยและพัฒนาจนเกิดเป็น
            “ถุงสนุกคิด” หรือ “Sanook Kit”
            ที่ได้พัฒนาสื่อและอุปกรณ์ในการเรียนรู้ที่เหมาะสมกับการเรียนรู้ของแต่ละระดับชั้นทั้งในมิติ
            ด้านสติปัญญา ด้านทักษะชีวิต และด้านร่างกาย พร้อมคู่มือประกอบการเรียนรู้เล่มนี้ ที่มี
            เป้าประสงค์ในการเปลี่ยนบ้านให้เป็นพื้นที่แห่งการเรียนรู้ของนักเรียนและเชื่อมประสานกับ
            การเรียนรู้จากในห้องเรียนทั้งในรูปแบบออนไลน์และออนไซต์ โดยนักเรียน ครอบครัว และครู
            จะมีบทบาทในการจัดการเรียนรู้ที่สนุกสนานร่วมกัน</h6>

    </div> -->
    <div id="section-4">
        <v-row id="paralax-number">
            <v-col cols="12" class="mb-5">
                <h1><span class="sanook-hl">ถุงสนุกคิด</span> ถูกส่งมอบให้นักเรียน</h1>
            </v-col>
            <v-col v-for="(deal, index) of amountDeal" :key="index" md="4">
                <number tag="h2" :class="`paralax-text-${index}`" :ref="deal.unit" :format="formatRunNumber" :to="deal.quantity" :duration="1" animationPaused />
                <h3>{{deal.unit}}</h3>
            </v-col>
        </v-row>
    </div>
    <div id="title-section">
        <div class="background-repeat"></div>
        <h1>ในถุงสนุกคิดมีอะไรบ้าง?</h1>
    </div>
    <div id="bag-items-section">
        <v-row class="bag-items-section-contain" :style="{backgroundColor: bagSelectorColor[bagSelect].bg}">
            <v-col cols="12" sm="12" md="4" class="bag-selecter">
                <div v-for="(item, index) of 6" :key="index" :style="{backgroundColor: bagSelect == index ? '#fff' : bagSelectorColor[bagSelect].card, color: bagSelect == index ?  bagSelectorColor[bagSelect].card : '#fff'}" :class="`select-card ${bagSelect == index ?'select-card-active':'select-card-unactive'}`" @click="selectGradeBagHandle(index)">
                    <v-img :src="require(`../assets/${bagImgNameList[index]}`)" max-width="100px" />
                    <span>ถุงสนุกคิด ป. {{item}}</span>
                </div>
                <!-- <v-img @click="selectBagHandle()" v-for="(item, index) of 7" :style="{left: 15 + 10 * index + '%'}" :key="index" src="../assets/bag-1.png" class="bag-in-list" /> -->
            </v-col>
            <v-col cols="12" sm="12" md="7" id="bag-items-in-list-contain" class="bag-items-in-list-contain" :style="{backgroundColor: '#fff'}">
                <div id="box-dot-list" class="box-dot-list">

                    <div v-for="(dot, index) in dotList[bagSelect].dotList" class="dot-pointer" :style="{backgroundColor: bagSelectorColor[bagSelect].card, bottom: dot.bottom, left: dot.left}" @mouseover="mouseOverDotHandle(dot, index)" @mouseleave="mouseLeaveDotHandle"></div>
                    <img :src="require(`../assets/${dotList[bagSelect].bagImg}`)" class="box-dot-list-img" max-height="100%"></img>
                    <div class="tooltip-bag" :style="{backgroundColor: bagSelectorColor[bagSelect].card, top: bagDetailTooltip.top + 'px', left: bagDetailTooltip.left + 'px'}" v-if="isShowBagDetailTooltip">
                        {{bagDetailTooltip.title}}
                    </div>
                </div>

                <!-- <v-img src="../assets/bag-1-items.png" class="bag-items-in-list" /> -->
            </v-col>
            <v-col cols="12" md="1" :style="{backgroundColor: bagSelectorColor[bagSelect].bg}">

            </v-col>
        </v-row>
        <!-- <v-img src="../assets/bag-1-items.png" class="bag-items-in-list" /> -->
        <!-- <v-img @click="selectBagHandle()" v-for="(item, index) of 7" :style="{left: 15 + 10 * index + '%'}" :key="index" src="../assets/bag-1.png" class="bag-in-list" /> -->
    </div>
    <div id="img-activities-section" >
        <v-carousel class="p-10" cycle hide-delimiter-background show-arrows-on-hover height="650px" width="auto" >
            <!-- <v-carousel-item v-for="(item, index) of activities_item" :key="index" :src="`${imgBaseURL}${item.name}`" /> -->
            <v-carousel-item edger>
                <v-img class="carousel-img" :src="require('../assets/IMG_3178.jpg')" height="100%" eager/>
            </v-carousel-item>
            <v-carousel-item eager>
                <v-img class="carousel-img" :src="require('../assets/IMG_3179.jpg')" height="100%" eager/>
            </v-carousel-item>
            <v-carousel-item eager>
                <v-img class="carousel-img" :src="require('../assets/IMG_3180.jpg')" height="100%" eager/>
            </v-carousel-item>
        </v-carousel>
        <!-- <img :src="require('../assets/IMG_3178.jpg')" />
        <img :src="require('../assets/IMG_3178.jpg')" /> -->
    </div>
    <!-- <div :id="`bag-section-${pageIndex+1}`" class="bag-section" v-for="(section, pageIndex) of item_bag_list" :key="pageIndex">
        <v-img v-for="(item, itemIndex) of section.item_list" :key="itemIndex" :src="require(`../assets/${item.img_url}`)" class="bag-item" @mouseover="mouseOver(`bag-section-${pageIndex+1}`, pageIndex, itemIndex)" @mouseleave="mouseleave(pageIndex)" />
        <div class="circle-bg"></div>
        <div class="tooltip-bag" :style="{backgroundColor: '#FA897B', top: tooltip_position.top + 'px', left: tooltip_position.left + 'px'}" v-if="section.isShowTooltip">
            {{tooltip_text}}
        </div>
        <v-img src="../assets/bag-1.png" class="center-bag" @click="clickBagHandle(`bag-section-${pageIndex+1}`)" />
    </div> -->

</div>
</template>

<script>
import {
    text1,
    text2,
    text3
} from "@/datas/aboutData.json"
import {
    mapGetters
} from "vuex";

export default {
    name: 'AboutBag',
    data() {
        return {
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
            rules: {
                required: value => !!value || 'Required.',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                },
                fileSize: value => !value || value.size < 2000000 || 'Avatar size should be les'
            },
            dialogTest: false,
            addAnotherResourceForm: {
                title: '',
                grade: 0,
                img_file: null,
                refer_link: ''
            },
            addCliImgForm: {
                img: null
            },
            baseURL: "https://www.sanookkit.com/assets/",
            bagDetailTooltip: {
                title: '',
                left: 0,
                top: 0,
            },
            bagSelectorColor: [{
                    card: '#FA897B',
                    bg: '#ffd7cf'
                },
                {
                    card: '#79dbff',
                    bg: '#cff0ff'
                },
                {
                    card: '#a9c66a',
                    bg: '#e4ffac'
                },
                {
                    card: '#8b8ef5',
                    bg: '#bfdbff'
                },
                {
                    card: '#f5c88b',
                    bg: '#ffe9bf'
                },
                {
                    card: '#f5b48b',
                    bg: '#ffceaf'
                }
            ],
            isShowBagDetailTooltip: false,
            bagSelect: 0,
            bagImgNameList: [
                'bag-1.png',
                'bag-2.png',
                'bag-3.png',
                'bag-4.png',
                'bag-5.png',
                'bag-6.png'
            ],
            dotList: [{
                    bagImg: 'bag-1-items.png',
                    dotList: [{
                            left: '50%',
                            bottom: '55%',
                            title: 'โดมิโน่ (DOMINOES)'
                        },
                        {
                            left: '20%',
                            bottom: '35%',
                            title: 'บัตรอักษรภาษาอังกฤษ'
                        },
                        {
                            left: '25%',
                            bottom: '55%',
                            title: 'นิทานเรื่อง "ป๋องแป๋งติดจอ"'
                        },
                        {
                            left: '35%',
                            bottom: '80%',
                            title: 'ดินน้ำมัน'
                        },
                        {
                            left: '55%',
                            bottom: '75%',
                            title: 'สมุดคัดลายมือ'
                        },
                        {
                            left: '80%',
                            bottom: '70%',
                            title: 'ลูกบอล'
                        },
                        {
                            left: '80%',
                            bottom: '45%',
                            title: 'สมุดลากเส้นระบายสีและสีไม้'
                        }
                    ]
                },
                {
                    bagImg: 'bag-2-items.png',
                    dotList: [{
                            left: '50%',
                            bottom: '55%',
                            title: 'โดมิโน่ (DOMINOES)'
                        },
                        {
                            left: '20%',
                            bottom: '35%',
                            title: 'บัตรอักษรภาษาอังกฤษ'
                        },
                        {
                            left: '20%',
                            bottom: '55%',
                            title: 'หนังสือ 100 First English Words'
                        },
                        {
                            left: '35%',
                            bottom: '80%',
                            title: 'ลูกบอล'
                        },
                        {
                            left: '55%',
                            bottom: '75%',
                            title: 'นิทานชุด ฝึกอ่านภาษาไทยกับชาลีและชีวา ตอน สระพาสนุก'
                        },
                        {
                            left: '80%',
                            bottom: '65%',
                            title: 'วงล้อคณิตศาสตร์'
                        },
                        {
                            left: '75%',
                            bottom: '45%',
                            title: 'นิทานเรื่องกะทิยอมรับผิดอย่างกล้าหาญ'
                        }
                    ]
                },
                {
                    bagImg: 'bag-3-items.png',
                    dotList: [{
                            left: '55%',
                            bottom: '55%',
                            title: 'สมุดระบายสี และสีชอล์ก'
                        },
                        {
                            left: '20%',
                            bottom: '45%',
                            title: 'นิทานของขวัญสุดพิเศษ'
                        },
                        {
                            left: '20%',
                            bottom: '65%',
                            title: 'หนังสือรู้ทัน ป้องกัน อุทกภัย'
                        },
                        {
                            left: '45%',
                            bottom: '80%',
                            title: 'เกมสะกดคําภาษาอังกฤษ'
                        },
                        {
                            left: '75%',
                            bottom: '75%',
                            title: 'แบบผึกสนุกคิดคณิตรอบตัว ป.3'
                        },
                        {
                            left: '85%',
                            bottom: '45%',
                            title: 'เกมสะกดคําภาษาอังกฤษ'
                        }
                    ]
                },
                {
                    bagImg: 'bag-4-items.png',
                    dotList: [{
                            left: '50%',
                            bottom: '55%',
                            title: 'สมุดวาดเขียน และสีน้ํา'
                        },
                        {
                            left: '15%',
                            bottom: '45%',
                            title: 'หนังสือ 1,000 คําศัพท์ภาษาอังกฤษสําหรับเด็ก'
                        },
                        {
                            left: '15%',
                            bottom: '65%',
                            title: 'ลูกบอล'
                        },
                        {
                            left: '35%',
                            bottom: '80%',
                            title: 'นิทานอาชีพในฝันของตูตู'
                        },
                        {
                            left: '65%',
                            bottom: '75%',
                            title: 'เอแม็ท (A-MATH)'
                        },
                        {
                            left: '80%',
                            bottom: '50%',
                            title: 'หนังสือความลับของโลก'
                        }
                    ]
                },
                {
                    bagImg: 'bag-5-items.png',
                    dotList: [{
                            left: '50%',
                            bottom: '55%',
                            title: 'หนังสือ ๙ คําพ่อสอน'
                        },
                        {
                            left: '20%',
                            bottom: '40%',
                            title: 'หนังสือสร้างเด็ก 2 ภาษา สอนลูกพูดอังกฤษ'
                        },
                        {
                            left: '20%',
                            bottom: '65%',
                            title: 'หนังสือกิจกรรมเสริมทักษะคณิตศาสตร์ ป.5'
                        },
                        {
                            left: '50%',
                            bottom: '80%',
                            title: 'ราชาธิราช ฉบับการ์ตูน'
                        },
                        {
                            left: '80%',
                            bottom: '65%',
                            title: 'หนังสือพับกระดาษหรรษา'
                        },
                        {
                            left: '80%',
                            bottom: '40%',
                            title: 'ลูกบอล'
                        }
                    ]
                },
                {
                    bagImg: 'bag-6-items.png',
                    dotList: [{
                            left: '50%',
                            bottom: '55%',
                            title: 'สมุดวาดเขียน และสีโปสเตอร์'
                        },
                        {
                            left: '20%',
                            bottom: '45%',
                            title: 'หนังสือ Why อวกาศ'
                        },
                        {
                            left: '32%',
                            bottom: '77%',
                            title: 'หนังสือ Word Search ศัพท์ซ่อนหา พาสนุก เก่งอังกฤษ'
                        },
                        {
                            left: '57%',
                            bottom: '80%',
                            title: 'รูบิค'
                        },
                        {
                            left: '80%',
                            bottom: '65%',
                            title: 'หนังสือวรรณคดีไทย รามเกียรติ์'
                        },
                        {
                            left: '80%',
                            bottom: '35%',
                            title: 'เชือกกระโดด'
                        }
                    ]
                }
            ],
            amountDeal: [],
            bagList: [{
                bag_id: "bag-1",
                item_list: [
                    ""
                ]
            }],
            paragraph1: text1,
            paragraph2: text2,
            paragraph3: text3,
            screenWidth: screen.width,
            isOnScreen: false,

            item_bag_list: [{
                item_list: [

                    {
                        img_url: 'item_g1_2.jpg',
                        img_title: 'โดมิโน่ (DOMINOES)'
                    },
                    {
                        img_url: 'item_g1_1.png',
                        img_title: 'สมุดคัดลายมือ'
                    },
                    {
                        img_url: 'item_g1_3.png',
                        img_title: 'บัตรอักษรภาษาอังกฤษ'
                    },
                    {
                        img_url: 'item_g1_4.jpg',
                        img_title: 'สมุดลากเส้นระบายสีและสีไม้'
                    },
                    {
                        img_url: 'item_g1_5.jpg',
                        img_title: 'ดินน้ำมัน'
                    },
                    {
                        img_url: 'item_g1_6.png',
                        img_title: 'นิทานเรื่อง "ป๋องแป๋งติดจอ"'
                    },
                    {
                        img_url: 'item_g1_7.jpg',
                        img_title: 'ลูกบอล'
                    }
                ],
                isShowTooltip: false
            }],
            tooltip_text: '',
            tooltip_position: {
                left: 0,
                top: 0
            }
        }
    },
    created() {
        // addEventListener('scroll', this.eventScrollHandler);
        addEventListener('resize', () => {
            this.screenWidth = screen.width
            // console.log(this.screenWidth)
        });
    },
    destroyed() {
        window.removeEventListener('scroll', this.eventScrollHandler);
    },
    mounted() {
        const doc = document.getElementById("about_bag_container")
        // this.bagList.forEach((bagname) => {
        //     const bag = document.getElementById(bagname)
        //     bag?.addEventListener('mouseover', this.test)
        //     bag?.addEventListener('mouseout', this.unhoover)
        // })
        doc.addEventListener('scroll', this.eventScrollHandler);
        this.requestData()
        // bag.addEventListener('mouseover', this.test)
        // console.log(screen)
    },
    methods: {
        selectGradeBagHandle(index) {
            console.log(index)
            this.bagSelect = index
        },
        mouseOverDotHandle(item, index) {
            console.log('test')
            const box = document.getElementById('box-dot-list')
            const target = box.childNodes[index]
            this.bagDetailTooltip.top = target.offsetTop + 20
            this.bagDetailTooltip.left = target.offsetLeft
            this.bagDetailTooltip.title = this.dotList[this.bagSelect].dotList[index].title
            this.isShowBagDetailTooltip = true
        },
        mouseLeaveDotHandle() {
            this.isShowBagDetailTooltip = false
        },
        selectBagHandle() {
            console.log('click')
            const selectBag = document.querySelector('.bag-items-in-list')
            selectBag.style.transform = 'translate(-50%, 0) scale(5)'
            selectBag.style.transformOrigin = 'bottom'
        },
        mouseleave(index) {
            this.item_bag_list[index].isShowTooltip = false
        },
        mouseOver(sectionId, index, itemIndex) {
            this.item_bag_list[index].isShowTooltip = true
            const section = document.getElementById(sectionId)
            const target = section.childNodes[itemIndex]
            console.log(target.offsetTop)
            console.log(target.offsetLeft)
            this.tooltip_position.top = target.offsetTop + target.offsetHeight / 2 + 10
            this.tooltip_position.left = target.offsetLeft
            this.tooltip_text = this.item_bag_list[index].item_list[itemIndex].img_title
            // tooltip.innerHTML = "testttttt"

        },
        clickBagHandle(bag_list_index) {
            const ii = document.getElementById(bag_list_index)
            ii.lastChild.style.top = '80%'
            ii.lastChild.style.transform = 'translate(-50%, -50%) scale(1)'
            const timeout = setTimeout(() => {
                this.moveHandle(ii)
            }, 1000)
            // const intervalID = setInterval(this.setupAnimation, 5000);
            setTimeout(() => {
                if (ii.firstChild.offsetTop == ii.lastChild.offsetTop) {
                    ii.lastChild.style.top = '50%'
                    ii.lastChild.style.transform = 'translate(-50%, -50%) scale(2)'
                }
            }, 2000)

            console.log(ii.childNodes)
            // ii.style.top = '50%'
        },
        moveHandle(ii) {
            console.log('test')
            ii.childNodes.forEach((item, index) => {
                if ((item.offsetLeft != ii.lastChild.offsetLeft ||
                        item.offsetTop != ii.lastChild.offsetTop) &&
                    index < ii.childNodes.length - 3) {
                    item.style.top = '80%'
                    item.style.left = '50%'
                    item.style.transform = 'scale(0)'
                    return
                }
                if (index == 0) {
                    item.style.top = '50%'
                    item.style.transform = 'translate(-50%, -50%) scale(1)'
                    return
                }
                if ((ii.childNodes.length - 4) % 2 == 0) {
                    switch (index) {
                        case 1:
                            item.style.top = '65%'
                            item.style.left = '15%'
                            item.style.transform = 'translate(-50%, -50%) scale(1) rotate(-30deg)'
                            break;
                        case 2:
                            item.style.top = '40%'
                            item.style.left = '25%'
                            item.style.transform = 'translate(-50%, -50%) scale(1) rotate(-20deg)'
                            break;
                        case 3:
                            item.style.top = '25%'
                            item.style.left = '40%'
                            item.style.transform = 'translate(-50%, -50%) scale(1) rotate(-10deg)'
                            break;
                        case 4:
                            item.style.top = '25%'
                            item.style.left = '60%'
                            item.style.transform = 'translate(-50%, -50%) scale(1) rotate(10deg)'
                            break;
                        case 5:
                            item.style.top = '40%'
                            item.style.left = '75%'
                            item.style.transform = 'translate(-50%, -50%) scale(1) rotate(20deg)'
                            break;
                        case 6:
                            item.style.top = '65%'
                            item.style.left = '85%'
                            item.style.transform = 'translate(-50%, -50%) scale(1) rotate(30deg)'
                            break;

                        default:
                            break;
                    }
                }
            })
        },
        test(event) {
            console.log(event.target.id)
            const item1 = document.getElementById('item-1')
            item1.className = 'classname'
        },
        unhoover(event) {
            console.log(event)
            const item1 = document.getElementById('item-1')
            item1.className = 'item'
        },
        eventScrollHandler() {
            const runNumberBar = document.getElementById('paralax-number')
            const first_section = document.getElementById('section-3')
            const rect = runNumberBar.getBoundingClientRect();
            // console.log(rect.top)
            // console.log(screen.height)
            // console.log(rect.bottom)
            if ((rect.top < screen.height && rect.bottom > 0) && !this.isOnScreen) {
                this.amountDeal.forEach((item, index) => {
                    // console.log(this.$refs)
                    this.$refs[item.unit][0].restart()
                })
                this.isOnScreen = true
            } else if ((rect.bottom <= 0 || rect.top >= screen.height - 13) && this.isOnScreen) {
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
        addCliImg() {
            const cliImg = {
                img_files: this.addCliImgForm.img
            }
            this.$store.dispatch("addCliImageList", cliImg).then(() => {

            })
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

<style lang="scss" scoped>
/* bag */
.testtt {
    position: absolute;
    bottom: 0%;
}

.testttt {
    position: absolute;
    bottom: 20%;
}

.box-dot-list {
    height: 100%;
    width: auto;
    position: absolute;
    /* background-color: #63c8b1; */
    transform: translate(-50%, 0);
    left: 50%;

    /* background-image: url('../assets/bag-1-items.png'); */
    /* background-size: auto 100%;
    background-position: center; */
}

@media only screen and (min-width: $media-size-laptop) {
    #paralax-number div h2 {
        font-size: 124px;
    }

    #title-section h1 {
        font-size: 64px;
    }

    .paralax-text-0 {
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
        text-shadow: 5px 0px 0px #f0c977,
            -5px 5px 0px #f0c977,
            5px -5px 0px #f0c977,
            5px 5px 0px #f0c977,
            -5px -5px 0px #f0c977,
            -5px 0px 0px #f0c977,
            0px -5px 0px #f0c977,
            0px 5px 0px #f0c977;
    }
    #img-activities-section {
        background-image: url('../assets/about-bag-activities-bg.png');
        background-size: 100% 100%;
        width: 100%;
        height: 100vh;
        scroll-snap-align: start;
        display: flex;
        // flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0 10% 0 10%;
        // padding-top: 10%;
    }
    .carousel-img {
        height: 100%;
        width: auto;
    }
}

@media only screen and (max-width: $media-size-ipad) {
    .box-dot-list {
        height: 50%;
    }

    .bag-selecter {
        height: 50%;
    }

    .select-card-active {
        margin: 2% 0 2% 5% !important;
        max-height: 35% !important;
    }

    #paralax-number div h1 {
        font-size: 40px !important;
    }

    #paralax-number div h2 {
        font-size: 72px;
    }

    .paralax-text-0 {
        text-shadow: $paralax-number-border-ipad 0px 0px #a7c36f,
            $paralax-number-border-ipad-negative $paralax-number-border-ipad 0px #a7c36f,
            $paralax-number-border-ipad $paralax-number-border-ipad-negative 0px #a7c36f,
            $paralax-number-border-ipad $paralax-number-border-ipad 0px #a7c36f,
            $paralax-number-border-ipad-negative $paralax-number-border-ipad-negative 0px #a7c36f,
            $paralax-number-border-ipad-negative 0px 0px #a7c36f,
            0px $paralax-number-border-ipad-negative 0px #a7c36f,
            0px $paralax-number-border-ipad 0px #a7c36f;
    }

    /* #86E3CE #D0E6A5 #FFDD94 */
    .paralax-text-1 {
        text-shadow: $paralax-number-border-ipad 0px 0px #63c8b1,
            $paralax-number-border-ipad-negative $paralax-number-border-ipad 0px #63c8b1,
            $paralax-number-border-ipad $paralax-number-border-ipad-negative 0px #63c8b1,
            $paralax-number-border-ipad $paralax-number-border-ipad 0px #63c8b1,
            $paralax-number-border-ipad-negative $paralax-number-border-ipad-negative 0px #63c8b1,
            $paralax-number-border-ipad-negative 0px 0px #63c8b1,
            0px $paralax-number-border-ipad-negative 0px #63c8b1,
            0px $paralax-number-border-ipad 0px #63c8b1;
    }

    .paralax-text-2 {
        text-shadow: $paralax-number-border-ipad 0px 0px #f0c977,
            $paralax-number-border-ipad-negative $paralax-number-border-ipad 0px #f0c977,
            $paralax-number-border-ipad $paralax-number-border-ipad-negative 0px #f0c977,
            $paralax-number-border-ipad $paralax-number-border-ipad 0px #f0c977,
            $paralax-number-border-ipad-negative $paralax-number-border-ipad-negative 0px #f0c977,
            $paralax-number-border-ipad-negative 0px 0px #f0c977,
            0px $paralax-number-border-ipad-negative 0px #f0c977,
            0px $paralax-number-border-ipad 0px #f0c977;
    }

    #title-section h1 {
        font-size: 40px;
        white-space: nowrap;
    }
}

@media only screen and (max-width: $media-size-mobile) {
    .bag-selecter {
        padding-top: 20% !important;
    }

    .select-card-active {
        margin: 2% 0 2% 2% !important;
    }

    .center-center-content {
        font-size: 16px !important;
    }

    #paralax-number div h1 {
        font-size: 24px !important;
    }

    #paralax-number div h2 {
        font-size: 32px;
    }

    .sanook-hl {
        font-size: 48px !important;
    }

    .sanook-hl::after {
        content: '"\a' !important;
        white-space: pre;
    }

    .paralax-text-0 {
        text-shadow: $paralax-number-border-mobile 0px 0px #a7c36f,
            $paralax-number-border-mobile-negative $paralax-number-border-mobile 0px #a7c36f,
            $paralax-number-border-mobile $paralax-number-border-mobile-negative 0px #a7c36f,
            $paralax-number-border-mobile $paralax-number-border-mobile 0px #a7c36f,
            $paralax-number-border-mobile-negative $paralax-number-border-mobile-negative 0px #a7c36f,
            $paralax-number-border-mobile-negative 0px 0px #a7c36f,
            0px $paralax-number-border-mobile-negative 0px #a7c36f,
            0px $paralax-number-border-mobile 0px #a7c36f;
    }

    /* #86E3CE #D0E6A5 #FFDD94 */
    .paralax-text-1 {
        text-shadow: $paralax-number-border-mobile 0px 0px #63c8b1,
            $paralax-number-border-mobile-negative $paralax-number-border-mobile 0px #63c8b1,
            $paralax-number-border-mobile $paralax-number-border-mobile-negative 0px #63c8b1,
            $paralax-number-border-mobile $paralax-number-border-mobile 0px #63c8b1,
            $paralax-number-border-mobile-negative $paralax-number-border-mobile-negative 0px #63c8b1,
            $paralax-number-border-mobile-negative 0px 0px #63c8b1,
            0px $paralax-number-border-mobile-negative 0px #63c8b1,
            0px $paralax-number-border-mobile 0px #63c8b1;
    }

    .paralax-text-2 {
        text-shadow: $paralax-number-border-mobile 0px 0px #f0c977,
            $paralax-number-border-mobile-negative $paralax-number-border-mobile 0px #f0c977,
            $paralax-number-border-mobile $paralax-number-border-mobile-negative 0px #f0c977,
            $paralax-number-border-mobile $paralax-number-border-mobile 0px #f0c977,
            $paralax-number-border-mobile-negative $paralax-number-border-mobile-negative 0px #f0c977,
            $paralax-number-border-mobile-negative 0px 0px #f0c977,
            0px $paralax-number-border-mobile-negative 0px #f0c977,
            0px $paralax-number-border-mobile 0px #f0c977;
    }

    #title-section h1 {
        font-size: 32px;
        white-space: nowrap;
    }
}

.box-dot-list-img {
    max-height: 100%;
    width: auto !important;
    transition: all 1s;
}

.bag-items-in-list-contain {
    /* background-image: url('../assets/bag-1-items.png'); */
    background-size: auto 100%;
    background-position: center;
    height: 100%;
}

@keyframes example {
    from {
        outline-width: 0;
    }

    to {
        outline-width: 10px;
    }
}

.dot-pointer {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    outline-style: solid;
    position: absolute;
    z-index: 1100;
    outline-color: white;
    transform: translate(-50%, -50%);
    animation-name: example;
    animation-duration: 1s;
    animation-iteration-count: infinite;
}

.dot-pointer:hover {
    background-color: #2c1815 !important;
}

#bag-items-section {
    width: 100%;
    height: 100vh;
    /* background-color: #a7c36f; */
    scroll-snap-align: start;
}

/* #e6ffb8 */
/* b3d868 */
/* ffad84 */

.bag-items-section-contain {
    width: 100%;
    height: 100%;

    /* background-color: #6c8344; */
    margin: 0 !important;
}

.bag-selecter {
    display: flex;
    flex-direction: column;
    padding-top: 10%;
    /* row-gap: 5%; */
}

.select-card-active {
    /* background-color: #ffffff; */
    /* color: #a9c66a; */
    border-radius: 20px;
    width: 100%;
    max-height: 15%;
    font-size: 36px;
    padding: 2%;
    margin: 5% 0 5% 5%;
    /* box-shadow: 0px 0px 34px 0px rgba(230, 91, 91, 0.5) inset; */
    /* box-shadow: 0px 0px 34px 0px rgba(230, 91, 91, 0.5) inset; */
    /* border-width: 5px;
    border-color: aliceblue;
    border-style: dashed; */
}

.select-card-unactive {
    /* background-color: #a9c66a; */
    width: 80%;
    max-height: 10%;
    font-size: 22px;
    /* color: white; */
}

.select-card {
    display: flex;
    column-gap: 10%;

    position: relative;
    overflow: hidden;
    transition: width 1s, height 1s, margin 1s, border-radius 1s;
}

.select-card:hover {
    filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.29));
}

.bag-in-list {
    width: 10%;
    /* height: 200px; */
    position: absolute;
    bottom: 0;
    /* left: 50%; */
    /* transform: translate(-50%, 0); */
}

.bag-items-in-list {
    max-width: 50%;
    position: absolute;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0) scale(1);
    transition: 0.5s;

}

/* .bag-items-in-list:hover {
    transform: translate(-50%, 0) scale(4);
    
} */

#bag-1 {
    width: 200px;
    height: 200px;
    background-color: black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.classname {
    animation-name: cssAnimation;
    animation-duration: 3s;
    animation-iteration-count: 1;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    position: absolute;
}

@keyframes cssAnimation {
    from {
        top: 50%;
        left: 50%;
        /* transform: rotate(0deg) scale(1) skew(0deg) translate(100px); */
    }

    to {
        top: 30%;
        left: 30%;
        /* transform: rotate(0deg) scale(2) skew(0deg) translate(100px); */
    }
}

#about_bag_container {
    width: 100%;
    height: 100vh;
    background-color: white;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;

    /* scroll-padding: 10px; */
}

#about-bag-with-bg {
    width: 100%;
    height: 100vh;
    scroll-snap-align: start;
    /* padding: auto; 
    background-image: url(require('@/assets/about_bag_bg.jpg')); */
    background-image: url('https://www.sanookkit.com/assets/269de4a8ef662462864e0a2907cf2535');
}

.center-center-content {
    position: relative;
    top: 50%;
    left: 50%;
    font-size: 24px;
    transform: translate(-50%, -50%);
    text-align: center;
    max-width: 800px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 180px;
    padding: 2% 5% 2% 5%;
}

#section-2 {
    width: 100%;
    height: 100vh;
    background-color: rgb(32, 74, 74);
    scroll-snap-align: start;
    background-image: url('../assets/cloud_bg.png');
}

#section-3 {
    width: 100%;
    height: 100vh;
    background-color: rgb(32, 74, 74);
    scroll-snap-align: start;
    background-image: url('../assets/only_cloud_bg.png');
    background-size: 100% auto;
    background-color: antiquewhite;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 20%;
}

#section-3 h6 {

    text-align: center;
    justify-content: center;
    max-width: 600px;
    background-color: white;
    position: relative;
    transform: translateX(-50%);
    left: 50%;
    padding: 5%;
    margin-bottom: 30%;
}

#section-4 {
    position: relative;
    scroll-snap-align: start;
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
}

#title-section {
    position: relative;
    scroll-snap-align: start;
    height: 100vh;
    width: 100%;
    background-image: url('../assets/learning_bg.png');
    background-color: wheat;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #FA897B;
}

.background-repeat {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-image: url('../assets/cloundBngWText.png');
}

#title-section h1 {
    position: absolute;
    filter: drop-shadow(0 0 0.25rem rgba(255, 99, 99, 0.29));
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
}

.bag-section {
    scroll-snap-align: start;
    height: 100vh;
    width: 100%;
    background-color: wheat;
    position: relative;
    background-image: url('../assets/learning_bg.png');
    background-size: 100% 100vh;
    background-position: center;
}

.circle-bg {
    border-radius: 2000px 2000px 0 0;
    background-color: #FA897B;
    opacity: 0.5;
    width: 90%;
    height: 80%;
    border-bottom: 0;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0%);
    box-sizing: border-box;
}

.center-bag {
    position: absolute;
    transform: translate(-50%, -50%) scale(2);
    top: 50%;
    left: 50%;
    max-width: 10%;
    transition: all 1s;
}

.bag-item {
    position: absolute;
    transform: translate(-50%, -50%) scale(0);
    top: 80%;
    left: 50%;
    max-width: 10%;
    transition: all 1s;
    filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.29));
    z-index: 1010;
}

.tooltip-bag {
    position: absolute;
    font-size: 22px;
    transform: translate(-50%, 0);
    padding: 0 2% 0 2%;
    border-radius: 5px;
    border-color: white;
    border-style: solid;
    z-index: 1200;
    border-width: 4px;
    box-shadow: 0px 10px 5px -5px rgba(0, 0, 0, 0.29);
}

.tooltip-bag::before {
    content: "";
    position: absolute;
    top: -14px;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent white transparent;
}

#paralax-number {
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translate(0, -50%);
    margin: 0;
}

.sanook-hl {
    font-size: 72px;
    color: #FA897B;
}

#paralax-number div h1 {
    font-size: 54px;
}

.sanook-hl::before {
    content: '"';
    color: #f0c977;
}

.sanook-hl::after {
    content: '"';
    color: #f0c977;
}

.paralax-text-0 {
    /* -webkit-text-stroke-width: 5px;
    -webkit-text-stroke-color: rgb(255, 255, 255); */
    color: #D0E6A5;
    /* filter: drop-shadow(0 0 0.75rem rgba(0,0,0,0.29)); */
}

/* #86E3CE #D0E6A5 #FFDD94 */
.paralax-text-1 {
    /* -webkit-text-stroke-width: 5px;
    -webkit-text-stroke-color: rgb(255, 255, 255); */
    color: #86E3CE;
    /* filter: drop-shadow(0 0 0.75rem rgba(0,0,0,0.29)); */
}

.paralax-text-2 {
    /* -webkit-text-stroke-width: 5px;
    -webkit-text-stroke-color: rgb(255, 255, 255); */
    color: #FFDD94;
    /* filter: drop-shadow(0 0 0.75rem rgba(0,0,0,0.29)); */
}

.center-item {
    top: 80%;
    left: 50%;
    transition: all 2s;
}

.bag-bottom-bar {
    position: absolute;
    bottom: 0;
    height: 200px !important;
}

.bag-height {
    height: 300px;
}

.bag-container {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
}

.bag-detail-list-contain {
    width: 100%;
    height: 0 !important;
    overflow-y: scroll !important;
    border-radius: 20px;
}

.bag-detail-list {
    background-color: aliceblue;
    width: 100%;
}

.bag-detail-list tr {
    background-color: rgb(58, 80, 98);
    width: 100%;
    height: 300px;
}

.right-bag-detail {
    background-color: aquamarine;
}

// responsive
@media screen and (orientation: portrait) {

    /* แนวตั้ง */
    /* Portrait styles */
    #title-section {
        background-size: auto 100%;
    }

    .background-repeat {
        background-size: auto 100%;
        background-position: center;
    }

    #section-2 {
        background-size: auto 100%;
        background-position: center;
    }

    #about-bag-with-bg {
        background-size: auto 100%;
        background-position: center;
    }
}

@media screen and (orientation: landscape) {

    /* แนวนอน */
    /* Landscape styles */
    #title-section {
        background-size: 100% 100%;
    }

    .background-repeat {
        background-size: 100% 100%;
    }

    #section-2 {
        background-size: 100% 100%;
    }

    #about-bag-with-bg {
        background-size: 100% 100%;
    }
}
</style>
