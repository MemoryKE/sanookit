<template>
<div id="about_bag_container">
    <!-- <div class="bag-section">
        <div id="bag-1" >test bag</div>
        <div id="item-1" class="item">test item</div>
    </div> -->
    <div id="section-1">
    </div>
    <div id="section-2">
        <div class="center-center-content">
            <p>“ถุงสนุกคิด” หรือ “Sanook Kit” มีจุดเริ่มต้นจากกองทุนเพื่อความเสมอภาคทาง
                การศึกษา (กสศ.) และมูลนิธิรางวัลสมเด็จเจาฟ้ามหาจักรี ซึ่งเป็นหน่วยงานสําคัญที่มีบทบาท
                ในการส่งเสริม สนับสนุน และให้ความช่วยเหลือด้านการศึกษา ได้ตระหนักถึงผลกระทบจาก
                สถานการณ์การแพร่ระบาดของไวรัสโคโรนา หรือโควิด-19 ที่ส่งผลให้เด็กๆ ต้องหยุดไปโรงเรียน
                หรือเรียนออนไลน์ จึงทําให้เด็กตกอยูในภาวะถดถอยทางการเรียนรู้ (Learning Loss) ทั้งจาก
                การขาดการเรียนรู้ที่ต่อเนื่อง การขาดการทบทวนเนื้อหาที่ได้เรียนรู หรือการขาดกิจกรรมที่
                ส่งเสริมการเรียนรู้ อันจะส่งผลกระทบต่อการเรียนรู้และพัฒนาการของเด็กทั้งในระยะสั้นและ
                ระยะยาว จึงเป็นจุดเริ่มต้นสําคัญที่ทําใหเกิดการพัฒนานวัตกรรมการนําความรู้ไปหาผู้เรียน
                ในระยะแรกภายใต้ชื่อ “ถุงยังชีพ ทางการศึกษา” ที่มุงเปลี่ยนบานให้เป็นพื้นที่แห่งการเรียนรู้
                ของนักเรียนที่ครอบครัวจะมีสวนรวมในการจัดการเรียนรู้ให้กับนักเรียนที่บ้านจากสื่อและ
                อุปกรณการเรียนรู้ที่เหมาะสมกับช่วงวัยพรอมสิ่งของจําเป็นในการป้องกันตนเองจากไวรัส
                โคโรนาที่บรรจุภายในถุงยังชีพทางการศึกษาและได้จัดส่งมอบให้แก่นักเรียนระดับชั้นประถม
                ศึกษาปีที่ 1-6 ของโรงเรียนในพื้นที่นําร่องที่จะได้รับผลกระทบอย่างรุนแรงและมีความเหลื่อมล้ํา
                และความไม่เท่าเทียมกันทางการศึกษาที่สูงกว่านักเรียนทั่วไป โดยเริ่มต้นดําเนินงานในพื้นที่
                ชุมชนคลองเตย กรุงเทพมหานครที่จะเป็นต้นแบบการทดลองเพื่อนําไปสู่การขยายผลใน
                โรงเรียนต่างๆ ทั่วประเทศต่อไป</p>
        </div>
    </div>
    <div id="section-3">
        <h6 >จากจุดเริ่มต้นดังกลาวได้นํามาสู่การพัฒนาและทดลองชุดนวัตกรรมการนําความรู้
            ไปหาผู้เรียนที่ได้ผ่านกระบวนการวิจัยและพัฒนาจนเกิดเป็น
            “ถุงสนุกคิด” หรือ “Sanook Kit”
            ที่ได้พัฒนาสื่อและอุปกรณ์ในการเรียนรู้ที่เหมาะสมกับการเรียนรู้ของแต่ละระดับชั้นทั้งในมิติ
            ด้านสติปัญญา ด้านทักษะชีวิต และด้านร่างกาย พร้อมคู่มือประกอบการเรียนรู้เล่มนี้ ที่มี
            เป้าประสงค์ในการเปลี่ยนบ้านให้เป็นพื้นที่แห่งการเรียนรู้ของนักเรียนและเชื่อมประสานกับ
            การเรียนรู้จากในห้องเรียนทั้งในรูปแบบออนไลน์และออนไซต์ โดยนักเรียน ครอบครัว และครู
            จะมีบทบาทในการจัดการเรียนรู้ที่สนุกสนานร่วมกัน</h6>
            
    </div>
    <div id="section-4">
        <b-row id="paralax-number">
            <b-col v-for="(deal, index) of amountDeal" :key="index" md="4">
                <number tag="h1" class="large-text" :ref="deal.unit" :format="formatRunNumber" :to="deal.quantity" :duration="1" animationPaused />
                <h3>{{deal.unit}}</h3>
            </b-col>
        </b-row>
    </div>
    
</div>
</template>

<script>
export default {
    name: 'AboutBag',
    data() {
        return {
            amountDeal: [{
                    "unit": "โรงเรียน",
                    "quantity": 20
                },
                {
                    "unit": "ใบ",
                    "quantity": 2000
                },
                {
                    "unit": "จังหวัด",
                    "quantity": 20
                }
            ],
            bagList: [
                {
                    bag_id: "bag-1",
                    item_list: [
                        ""
                    ]
                }
            ],
            screenWidth: screen.width,
            isOnScreen: false
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
        
        // bag.addEventListener('mouseover', this.test)
        // console.log(screen)
    },
    methods: {
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
    }
}
</script>

<style scoped>
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

#section-1 {
    width: 100%;
    height: 100vh;
    background-color: aqua;
    scroll-snap-align: start;
    /* padding: auto; */
    background-image: url('../assets/about_bag_bg.png');
    background-size: 100% 100%;
}

.center-center-content {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    max-width: 600px;
}

#section-2 {
    width: 100%;
    height: 100vh;
    background-color: rgb(32, 74, 74);
    scroll-snap-align: start;
    background-image: url('../assets/cloud_bg.png');
    background-size: 100% 100%;
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
#section-4 {scroll-snap-align: start;
    height: 100vh;
    width: 100%;
    background-color: aquamarine;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.bag-section {scroll-snap-align: start;
    height: 100vh;
    width: 100%;
    background-color: rgb(73, 118, 103);
}

</style>
