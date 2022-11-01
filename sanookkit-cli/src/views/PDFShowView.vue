<template>
<div id="pdf-container">
    <vue-pdf-embed ref="pdfRef" :page="page" :source="url" />
</div>
</template>

<script>
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'

export default {
    name: 'PDFShowView',
    data() {
        return {
            pdf_url: '',
            page: null,
            screenWidth: null,
            url: ''
        }
    },
    components: {
        VuePdfEmbed
    },
    mounted() {
        let data = this.$route.params;
        console.log("data is", data);
        this.pdf_url = data.name.toString()
        console.log(this.pdf_url)
        const tu = `http://127.0.0.1:3000/assets/${this.pdf_url}`
        this.url = data.pdf_url
        console.log(this.url)
    },
    created() {
        addEventListener('resize', () => {
            this.screenWidth = screen.width
            this.$router.go()
        });

    },
}
</script>
<!-- <v-img src="http://127.0.0.1:3000/à¸à¸¹à¹à¸¡à¸·à¸­ à¸.2.pdf" max-height="150"
  max-width="250"></v-img> -->
<style>
#pdf-container {
    width: 100vw;
}

/* .vue-pdf-embed {
    position: absolute;
    transform: translate(-50%, 0);
    left: 50%;
    width: 100%;
} */
</style>
