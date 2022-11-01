<template>
    <div class="book-container">
        <div class="page" id="first">
            <div class="back">
                <div class="outer">
                    <div class="content">
                        <h1 class="text-wrap">
                            {{paragraph_1}}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="page" id="flip_page_1">
            <div class="front">
                <div class="outer">
                    <div class="content">
                        <h1 class="text-wrap">
                            {{paragraph_1}}
                        </h1>
                    </div>
                </div>
            </div>
            <div class="back" id="third">
                <div class="outer">
                    <div class="content">
                        <div class="helper-class-to-make-bug-visbile">
                            <img src="https://tympanus.net/Development/BookBlock/images/demo1/2.jpg">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page" id="flip_page_2">
            <div class="front">
                <div class="outer">
                    <div class="content">
                        <img src="https://tympanus.net/Development/BookBlock/images/demo1/2.jpg">
                    </div>
                </div>
            </div>
            <div class="back" id="third">
                <div class="outer">
                    <div class="content">
                        <div class="helper-class-to-make-bug-visbile">
                            <img src="https://tympanus.net/Development/BookBlock/images/demo1/2.jpg">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page" id="fourth">
            <div class="front">
                <div class="outer">
                    <div class="content">
                        <img src="https://tympanus.net/Development/BookBlock/images/demo1/2.jpg">
                    </div>
                </div>
            </div>
        </div>

        <div id="prev"></div>
        <div id="next"></div>
    </div>
</template>

<script>
export default {
    mounted() {
        let prev = document.getElementById("prev");
        let next = document.getElementById("next");

        prev.addEventListener("click", this.prevImg);
        next.addEventListener("click", this.nextImg);
    },
    methods: {
        prevImg() {
            let flip_page_1 = document.getElementById('flip_page_1');

            flip_page_1.style.msTransform = "rotateX(0deg)";
            flip_page_1.style.webkitTransform = "rotateX(0deg)";
            flip_page_1.style.transform = "rotateX(0deg)";
        },
        nextImg() {
            let flip_page_1 = document.getElementById('flip_page_1');

            flip_page_1.style.msTransform = "rotateX(180deg)";
            flip_page_1.style.webkitTransform = "rotateX(180deg)";
            flip_page_1.style.transform = "rotateX(180deg)";
        }
    }
}
</script>

<style scoped>
body {
    margin: 4em;
}

img {
    width: 100%;

}

.book-container {
    width: 100%;
    height: 100vh;
    position: relative;

    z-index: 100;
    -webkit-perspective: 3000px;
    perspective: 3000px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.page {
    position: absolute;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transition-property: -webkit-transform;
    transition-property: transform;

    width: 100%;
    height: 50%;
    top: 50%;
    -webkit-transform-origin: left center;
    transform-origin: top center;
}

#first,
#first .back {
    -webkit-transform: rotateX(180deg);
    transform: rotateX(180deg);
}

#first {
    z-index: 102;
}

#flip_page_1 {
    z-index: 103;
    transition: transform 0.8s ease-in-out;
} 
#flip_page_2 {
    z-index: 102;
    transition: transform 0.8s ease-in-out;
} 

#third .content {
    width: 100%;
}

#fourth {
    z-index: 101;
}

.page>div,
.outer,
.content,
.helper-class-to-make-bug-visbile {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.page>div {
    width: 100%;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
}

.back {
    -webkit-transform: rotateX(-180deg);
    transform: rotateX(-180deg);
}

.outer {
    width: 100%;
    overflow: hidden;
    z-index: 999;
}

/* problematic class: `.content` */
.content {
    width: 100%;
    height: 200%;
    background: red;
}

.content h1 {
  position: absolute;
  left: 50%; /* relative to nearest positioned ancestor or body element */
  top: 50%; /*  relative to nearest positioned ancestor or body element */
  transform: translate(-50%, -50%)
}

.front .content {
    top: -100%;
}

/* controls */
#prev {
    position: absolute;
    width: 100%;
    height: 50%;
    left: 0% !important;
    z-index: 999;
}

#next {
    position: absolute;
    width: 100%;
    height: 50%;
    top: 50% !important;
    left: 0% !important;
    z-index: 999;
}

#prev:hover,
#next:hover {
    background: rgba(0, 0, 0, 0.05);
    cursor: pointer;
}

</style>