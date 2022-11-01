<template>
<div id="about-page">
    <div id="section-1">
        <h1>
            SANOOKKIT
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
    </div>
    <div id="sticky-section">
        <div id="section-3">
            <div>
                <h5 class="text-wrap text-center">
                    {{paragraph_2}}
                </h5>
            </div>
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
        }
    },
    mounted() {

    },
    methods: {

    }

}
</script>

<style scoped>
#about-page {
    width: 100vw;
    height: 100vh;
    /* padding-left: 5%;
    padding-right: 5%; */
    background-image: url('@/assets/about_bg.png');
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

#section-2 {
    width: 90%;
    height: 60vh;
    padding: 10%;
    background-color: antiquewhite;
    border-radius: 20px 20px 0 0;
    position: sticky;
    top: 25vh;
    margin-left: 5%;
    margin-right: 5%;
}

#section-2 h1 {
    margin-bottom: 3%;
}

#section-3 {
    width: 100%;
    height: 72vh;
    padding: 15%;
    background-color: rgb(254, 199, 128);
    background-image: url('@/assets/about_bg_s3.png');
    background-size:  100% 100%;
    background-position: center;
}

#section-4 {
    width: 100%;
    height: 80vh;
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
    background-color: aqua;
}
</style>
