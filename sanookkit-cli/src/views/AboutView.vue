<template>
<div id="about-page">
    <div id="section-1">
        ที่มา
        <h1>
            ถุงสนุกคิด
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
            <div class="partner-banner" @click="openLink(0)">
                <img src="../assets/partner-logo.png" />
            </div>
            <div class="partner-banner" @click="openLink(1)">
                <img src="../assets/eef-logo.png" />
            </div>
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
                    <v-img class="full_img" :src="require(`../assets/${item}`)" />
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

<style lang="scss" scoped>
#about-page {
    width: 100vw;
    height: 100vh;
    /* padding-left: 5%;
    padding-right: 5%; */
    background-image: url('https://www.sanookkit.com/assets/b18944a1c5761a0105282ae9cbec58ac');
    background-size: auto 100%;
    background-position: center;
    overflow-x: scroll;
    padding-left: 5%;
    padding-right: 5%;
}

#section-1 {
    width: 100%;
    height: 30vh;
    top: 0;
    left: 0;
    position: sticky;
    margin-top: 30vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    color: #669c8f;
}

#section-1 h1 {
    font-size: 72px;

    width: auto;
    /* color:aqua; */
    color: #b476d1;
    //     background-clip: text;
    //     color: transparent;
    // background-image: linear-gradient(to right, #4947b6 0%, #CFE5FF 50%) !important;
}
#section-1 h1::before {
    content: '"';
    color: #FA897B
}
#section-1 h1::after {
    content: '"';
    color: #FA897B
}

#sticky-section {
    position: sticky;
    top: 27vh;
}

.blank-section {
    width: 100%;
    height: 100vh;
    padding: 10%;
    background-color: antiquewhite;
    border-radius: 20px 20px 0 0;
    position: sticky;
    top: 25vh;
}

// section 2
#section-2 {
    width: 100%;
    height: 80vh;
    padding: 10%;
    background-color: antiquewhite;
    border-radius: 20px 20px 0 0;
    position: sticky;
    top: 25vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#section-2 h1 {
    font-size: 54px;
    margin-bottom: 3%;
    color: #4ae19f;
}


#partner-tabs {
    display: flex;
    flex-direction: row;
    height: 30%;
    justify-content: space-between;
}

#partner-tabs div {
    position: relative;
}

.partner-banner {
    cursor: pointer;
    height: 100%;
}

.partner-banner img {
    height: 100%;
}

// section 3
#section-3 {
    width: 100%;
    height: 72vh;
    padding: 15%;
    background-color: rgb(254, 199, 128);
    background-image: url('../assets/about_bg_s3.png');
    background-size: 100% 100%;
    border-radius: 20px 20px 0 0;
    background-position: center;
}

#activity-section {
    width: 100%;
    height: 700px;
    background-color: antiquewhite;
}

.carousel__viewport {
    width: 100%;
    height: 100%;
    list-style: none;
    display: flex;
    align-items: center;
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
}

.full_img {
    width: 100%;
    height: 100%;
    // /* border-radius: 20px; */
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
    width: 100%;
    height: 80vh;
    padding: 5% 10% 0 10%;
    background-color: antiquewhite;
    // backdrop-filter: blur(20px);
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
    // background-color: rgb(255, 220, 175);
}

#footer {
    width: 100%;
    height: 100vh;
}

@media only screen and (max-width: $media-size-ipad) {
    #about-page {
        padding: 0;
    }

    #activity-section {
        width: 100%;
        height: 40vh;
    }

    .carousel__viewport {
        width: 100%;
        height: 90%

    }
    #partner-tabs {
        height: 20%;
    }
    .full_img {
        border-radius: 10px;
    }

    #section-3 {
        padding: 15% 5% 0 5%;
    }

    #section-3 div h5 {
        font-size: 16px;
    }
}

@media only screen and (max-width: $media-size-mobile) {

    #section-1 h1 {
        font-size: 36px;
    }

    #section-2 h1 {
        font-size: 26px;
    }

    #section-2 h5 {
        font-size: 16px;
    }

    #partner-tabs {
        height: 20%;
    }
    #section-4  {
        padding: 5% 5% 0 5%;
    }
    #section-4  div h5 {
        font-size: 18px;
    }
    #activity-section {
        width: 100%;
        height: 30vh;
    }
    .carousel__viewport {
        width: 100%;
        height: 100%
    }

    .full_img {
        border-radius: 10px;
    }
}
</style>
