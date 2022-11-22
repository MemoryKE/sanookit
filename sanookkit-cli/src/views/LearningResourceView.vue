<template>
<div class="learning-resource">
    <div class="grade-selector" >
    <v-select item-text="title" solo item-value="value" v-model="selectedGrade" :items="gradeLists" /></div>
    <h1 class="title-1">คู่มือสนุกคิด</h1>
    <div class="overflow-mask">
        <!-- <div class="overflow-container"> -->
        <div v-for="(book, index) of filteredManualList" :key="index" class="book" @click="clickOpenPDF(book.pdf_name)">
            <v-img class="manual_img" :src="`${baseURL}${book.img_name}`"></v-img>
        </div>
        <!-- </div> -->
        
    </div>
    <h1 class="title-2">สื่อสนุกคิด</h1>
    <div class="sanookit-item-view">
        <div class="flex-page">
            <div v-for="(item, index) of pageList" :key="index" @click="clickMoreLearningDetail(item)" class="item-card">
                <div :style="{backgroundImage: `url(${baseURL}${item.img_name})`}" class="card-img"></div>
                <div class="card-text">
                    <h5>{{item.title}}</h5>
                    <!-- <p>{{item.description}}</p> -->
                    <v-chip-group active-class="deep-purple accent-4 white--text" row>
                        <v-chip class="grade">{{gradeLists[item.grade].title}}</v-chip>

                        <!-- <v-chip>7:30PM</v-chip> -->
                    </v-chip-group>
                </div>
            </div>
        </div>
        <v-pagination v-model="currentPage" :length="pageLenght" circle></v-pagination>
    </div>
    <h1 class="title-3">แหล่งเรียนรู้อื่น</h1>
    <div class="author">
        <v-container>
            <v-row>
                <v-col cols="12" md="6" v-for="(item, index) of filteredAuthorList" :key="index" >
        <v-card class="mx-auto author-card" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title class="text-h5 mb-1">
                        {{item.title}}
                    </v-list-item-title>
                    <v-chip-group active-class="deep-purple accent-4 white--text" row>
                        <v-chip class="white-text grade">{{gradeLists[item.grade].title}}</v-chip>
                    </v-chip-group>
                </v-list-item-content>

                <v-list-item-avatar tile size="120" color="grey">
                    <v-img :src="`${baseURL}${item.img_name}`" />
                </v-list-item-avatar>
            </v-list-item>

            <v-card-actions>

                <v-btn class="refer-btn" :href="item.refer_link" outlined rounded text target="_blank">
                    ไปยังแหล่งอ้างอิง
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
            </v-row>
        </v-container>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'LearningResource',
    data() {
        return {
            baseURL: "https://www.sanookkit.com/assets/",
            selectedGrade: 0,
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
            manualList: [
                {
                    title: "",
                    grade: 0,
                    learning_type: "",
                    img_name: "",
                    pdf_name: "",
                }
            ],
            currentPage: 1,
            screenWidth: screen.width,
            sanookit_item: [

            ],
            authorList: [{
                    title: 'title',
                    grade: 1,
                    url_qrcode: '',
                    img_qrcode: ''
                },
                {
                    title: 'title',
                    grade: 1,
                    url_qrcode: '',
                    img_qrcode: ''
                },
                {
                    title: 'title',
                    grade: 1,
                    url_qrcode: '',
                    img_qrcode: ''
                },
                {
                    title: 'title',
                    grade: 1,
                    url_qrcode: '',
                    img_qrcode: ''
                },
                {
                    title: 'title',
                    grade: 1,
                    url_qrcode: '',
                    img_qrcode: ''
                },
                {
                    title: 'title',
                    grade: 1,
                    url_qrcode: '',
                    img_qrcode: ''
                },
            ]
        }
    },
    created() {
        addEventListener('resize', () => {
            this.screenWidth = screen.width
        });
        this.requestData()

    },
    methods: {
        clickOpenPDF(pdf_name) {
            console.log(pdf_name)
            const data = { pdf_url: `${this.baseURL}${pdf_name}`,name: pdf_name }
            console.log(`${this.baseURL}${pdf_name}`)
            this.$router.push({name: 'PDFShowView', params: data})
        },
        clickMoreLearningDetail(media) {
            const data = {media: media, baseURL: this.baseURL}
            this.$router.push({name: 'LearningDetail', params: data})
        },
        requestData() {
            this.$store.dispatch("getLearningResourceList").then(() => {
                console.log(this.learning_resource_data)
                this.manualList = this.learning_resource_data.filter((item) => item.learning_type == 'manual')
                this.sanookit_item = this.learning_resource_data.filter((item) => item.learning_type == 'media')
                this.authorList = this.learning_resource_data.filter((item) => item.learning_type == 'another')
            })
        }
    },
    computed: {
        ...mapGetters({
            learning_resource_data: "LEARNING_RESOURCE_LIST",
        }),
        pageLenght() {
            return Math.ceil(this.sanookit_item.length / this.pageSize)
        },
        pageList() {
            const filtered = this.sanookit_item.filter((item) => item.grade === this.selectedGrade || this.selectedGrade === 0)
            const from = (this.currentPage - 1) * this.pageSize
            const to = (this.currentPage * this.pageSize)
            return filtered.slice(from, to)
        },
        pageSize() {
            if (this.screenWidth > 900) {
                return 8
            } else if (this.screenWidth <= 900 && this.screenWidth > 550) {
                return 6
            } else {
                return 2
            }
        },
        filteredAuthorList() {
            return this.authorList.filter((item) => item.grade === this.selectedGrade || this.selectedGrade === 0)
        },
        filteredManualList() {
            return this.manualList.filter((item) => item.grade === this.selectedGrade || this.selectedGrade === 0)
        }
    }
}
</script>

<style scoped>

.learning-resource {
    width: 100vw;
    background-color: #FFE8C1;
    padding: 10% 10% 5% 10%;
    z-index: 2000 !important;
    background-image: url('../assets/learning_bg.png');
    background-size: 100% 100vh;
    background-position: center;
    background-repeat: repeat-y;
}

.grade-selector {
    text-align: center;
    display: flex;
    width: 30%;
    position: fixed;
    right: 5%;
    top: 8%;
}

.title-1 {
    width: 100%;
    text-align: center;
    background-color: #FC877D;
    margin: 0 0 2% 0;
    padding: 1%;
    color: #ffffff;
    font-size: 24px;
}

.title-2 {
    width: 100%;
    text-align: center;
    background-color: #CE87E7;
    margin: 0 0 5% 0;
    padding: 2%;
    color: #ffffff;
    font-size: 24px;
    margin-top: 40px;
}

.title-3 {
    width: 100%;
    text-align: center;
    background-color: #95D5D2;
    margin: 5% 0 5% 0;
    padding: 1%;
    color: #ffffff;
    font-size: 24px;
}

.overflow-mask {
    width: 100%;
    overflow-x: scroll;
    overflow-y: visible;
    display: inline-block;
    white-space: nowrap;
    padding: 2% 10px 10px 10px;
    scroll-snap-type: x mandatory;
    scroll-padding: 10px;
}

.overflow-mask::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}
.overflow-mask::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(255, 131, 131, 0.5);
  box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}
.book {
    width: 280px;
    background-color: rgb(255, 255, 255);
    border-radius: 5%;
    padding: 5px;
    display: inline-block;
    margin-left: 20px;
    scroll-snap-align: start;
    /* box-shadow: 0px 0px 10px -5px rgba(0,0,0,0.29); */
    
}

.book:hover {
    box-shadow: 0px 0px 20px -5px rgba(0,0,0,0.29);
}

.manual_img {
    border-radius: 5%;
}

/*  */

.author {
    width: 100%;
    height: 400px;
    overflow-y: scroll;
    /* display: inline-block;
    display: flex;
    flex-wrap: wrap;
    column-gap: 2%;
    row-gap: 10px;
    align-items: stretch; */
}

.author-card {
    border-radius: 20px;
    /* width: 49%;
    max-height: 50%; */
}

.v-chip.grade {
    color: white !important;
  background: #FC877D !important;
}

.refer-btn {
    color: white !important;
  background: #95D5D2 !important;
}
/*  */
.sanookit-item-view {
    width: 100%;
}

.flex-page {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    column-gap: 4%;
    row-gap: 20px;
    margin-bottom: 40px;
}

.item-card {
    width: 22%;
    text-align: left;
    padding: 0% !important;
    border-width: 0px !important;
}
.item-card:hover {
    box-shadow: 0px 10px 5px -5px rgba(0,0,0,0.29);
}
.card-img {
    width: 100%;
    height: 200px;
    background-color: gray;
    border-radius: 10px 10px 0 0;
    background-size: 100% 100%;
    background-position: center;
}

.card-text {
    width: 100%;
    background-color: #ffffff;
    text-align: left;
    padding: 3% 3% 0 3%;
    border-radius: 0 0 10px 10px;
}

.card-text h5 {
    text-shadow: #CE87E7;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.card-text p {
    display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}

@media only screen and (max-width: 900px) {
    .flex-page {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-flow: wrap;
        column-gap: 5%;
        row-gap: 10px;
        padding: 0% !important;
    }

    .item-card {
        width: 30%;
        padding: 0% !important;
    }

}

@media only screen and (max-width: 550px) {
    .grade-selector {
        width: 80%;
        right: 10%;
        top: 7%;
    }

    .flex-page {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-flow: wrap;
        column-gap: 5%;
        row-gap: 10px;
        padding: 0%;
    }

    .item-card {
        width: 100%;
        padding: 0% !important;
    }

    .learning-resource {
        width: 100vw;
        background-color: #FFE8C1;
        padding: 30% 10% 5% 10%;
    }

    .author-card {
        width: 100%;
    }

}
</style>
