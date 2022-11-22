<template>
<div id="about-page">
    <div id="section-1">
        <h1>
            ที่มาถุงสนุกคิด
        </h1>
    </div>
    <div class="blank-section"></div>
    <div id="section-2">
        <h1>
            จุดเริ่มต้นของถุงสนุกคิด
        </h1>
        <h5 class="text-wrap text-center">
            {{paragraph_1}}
        </h5>
        <div id="partner-tabs">
            <div>
            <div class="partner-banner" @click="openLink(0)">
                <v-img  src="../assets/partner-logo.png" height="200px"  max-width="100px" ></v-img>
            </div></div>
            <div>
            <div class="partner-banner" @click="openLink(1)">
                <v-img  src="../assets/eef-logo.png" max-width="300px" ></v-img>
            </div></div>
        </div>
        
    </div>
    <div id="sticky-section">
        <div id="section-3">
            <div>
                <h5 class="text-wrap text-center">
                    {{paragraph_2}}
                </h5>
            </div>
        </div>
        <div id="activity-section">
            <ul class="carousel__viewport">
                <li class="carousel__slide" v-for="(item, index) of activity_list" :key="index">
                    <v-img class="full_img" :src="require(`../assets/${item}`)"/>
                </li>
            </ul>
        </div>
        <div id="section-4">
            <div>
                <h5 class="text-wrap text-center">
                    {{paragraph_3}}
                </h5>
            </div>
        </div>
    </div>
    <div id="footer"></div>
</div>
</template>

<script>
import {
    text1,
    text2,
    text3
} from "@/datas/aboutData.json"

export default {
    name: 'About',
    data() {
        return {
            CURRENT_PAGE: 1,
            paragraph_1: text1,
            paragraph_2: text2,
            paragraph_3: text3,
            activity_list: [
                 `IMG_3178.jpg`,
                 `IMG_3179.jpg`,
                 `IMG_3180.jpg`
                
             ],
             latest_pos: 0,
             intervalID: null,
             partnerLink: [
                'https://www.pmca.or.th/',
                'https://www.eef.or.th/'
             ]
        }
    },
    mounted() {
        this.intervalID = setInterval(this.setupAnimation, 5000);
    },
    destroyed() {
        clearInterval(this.intervalID)
    },
    methods: {
        openLink(index) {
            window.open(this.partnerLink[index], '_blank', '')
        },
        setupAnimation() {
            const carousel = document.querySelector('.carousel__viewport')
            // console.log(carousel)
            // carousel.childNodes.forEach((node, index) => {
            //     console.log(node.offsetLeft)
            //     node.style.left = '-100%'
            // })
            console.log(carousel.scrollLeft)
            console.log(carousel.childNodes[1].offsetLeft)
            console.log(Math.ceil(carousel.scrollLeft / carousel.offsetWidth))
            const index = Math.ceil(carousel.scrollLeft / carousel.offsetWidth)
            if (this.activity_list.length > 1 && index == this.activity_list.length - 1) {
                // const first = this.activity_list.shift()
                // this.activity_list.push(first)
                // const backup = this.activity_list
                // this.activity_list = [this.activity_list[0]]
                carousel.scrollTo(0, 0)
                // setTimeout(() => {
                //     this.activity_list = backup
                // });
            } else {
                carousel.scrollTo(carousel.offsetWidth * 0.5 + carousel.scrollLeft, 0)
            }
            
            
            this.latest_pos = carousel.scrollLeft
        }
    }

}
</script>

<style scoped>
#about-page {
    width: 100vw;
    height: 100vh;
    /* padding-left: 5%;
    padding-right: 5%; */
    background-image: url('https://www.sanookkit.com/assets/b18944a1c5761a0105282ae9cbec58ac');
    background-size:  auto 100% ;
    background-position: center;
    overflow-x: scroll;
}

#section-1 {
    width: 100%;
    height: 30vh;
    top: 0;
    left: 0;
    position: sticky;
    margin-top: 30vh;
}

#section-1 h1 {
    position: absolute;
    transform: translate(0%, -50%);
    top: 50%;
    left: 5%;
    
}

#section-1 h1 {
    font-size: 72px;
    /* color:aqua; */
    color: linear-gradient(200.17deg, #030089 99.55%, #CFE5FF 140.19%);
}

#sticky-section {
    position: sticky;
    top: 27vh;
}

.blank-section {
    width: 90%;
    height: 100vh;
    padding: 10%;
    background-color: antiquewhite;
    border-radius: 20px 20px 0 0;
    position: sticky;
    top: 25vh;
    margin-left: 5%;
    margin-right: 5%;
}

#partner-tabs {
    display: flex;
    flex-direction: row;
    height: 80%;
    justify-content: space-around;
}
#partner-tabs div {
    position: relative;
}
.partner-banner {
    position: absolute;
    transform: translate(0, -50%);
    top: 50%;
    cursor: pointer;
}
#section-2 {
    width: 90%;
    height: 70vh;
    padding: 10%;
    background-color: antiquewhite;
    border-radius: 20px 20px 0 0;
    position: sticky;
    top: 25vh;
    margin: 0 5% 10% 5%;
}

#section-2 h1 {
    margin-bottom: 3%;
}

#section-3 {
    width: 90%;
    height: 72vh;
    padding: 15%;
    background-color: rgb(254, 199, 128);
    background-image: url('../assets/about_bg_s3.png');
    background-size:  100% 100%;
    border-radius: 20px 20px 0 0;
    background-position: center;
    margin: 0 5% 0 5%;
}

#activity-section {
    width: 90%;
    height: 700px;
    margin: 0 5% 0 5%;
    background-color: antiquewhite;
}

.carousel__viewport {
    list-style: none;
    width: 100%;
  height: 100%;
  display: flex;
  overflow-x: scroll;
  counter-reset: item;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  padding: 5%;
  column-gap: 2%;
}

.carousel__slide {
  position: relative;
  flex: 0 0 100%;
  /* counter-increment: item; */
  width: 90%;
  height: 100%;
  border-radius: 20px;
}

.full_img {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    scroll-snap-align: center;
    filter: drop-shadow(0 0 10px #0003);
}
 /* {
  left: 0;
  width: 100%;
  height: 100%;
  scroll-snap-align: center;
} */
/* .carousel__snapper {
  left: 0;
  width: 100%;
  height: 100%;
  scroll-snap-align: center;
} */

.red {
    background-color: #f99;
}

.blue {
    background-color: #030089;
}

.img-card {
    width: 1000px;
    height: 500px;
    background-color: black;
}

#section-4 {
    width: 90%;
    height: 80vh;
    margin: 0 5% 0 5%;
    padding: 5% 10% 0 10%;
    background-color: rgb(255, 220, 175);
    backdrop-filter: blur(20px);
}

#section-4 div {
    background-color: white;
    padding: 10% 10% 0 10%;
    height: 100%;
    border-radius: 20px 20px 0 0;
}

#footer-section {
    width: 100%;
    height: 20vh;
    background-color: rgb(255, 220, 175);
}

#footer {
    width: 100%;
    height: 100vh;
}
</style>
