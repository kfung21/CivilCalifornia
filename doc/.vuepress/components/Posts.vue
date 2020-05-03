<template>
    <div class="post-container">
    <router-link v-for="page in pages" :to="page.path">
      <div class="post-card">
        <!-- <img class="article-image" src="../public/images/blog_hero_image.jpg" /> -->
        <div class="page-detail">
          <div class="page-title">{{ page.title }}</div>
          <div class="page-description">{{ page.frontmatter.description }}</div>
          <div class="page-author">Author: {{ page.frontmatter.author }}</div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>export default {
  data() {
    return {
      pages: []
    }
  },
  created () {
    this.$site.pages.forEach(page => {
      if (page.frontmatter.type === 'article' || page.frontmatter.title) {
        this.pages.push(page)
      }
    })
    console.log(this.$site);
    console.log(this.$site.pages);
  }
}
</script>

<style scoped>
.post-container {
  display: inline-flexbox;
  flex-wrap: wrap; 
  grid-template-columns: 100%;
}
.post-card {
  width: 50%;
  height: 150px;
  margin: 10%;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  display: inline-flex;
  align-items: center;
  
}
.article-image {
  height: 100%;
}
.description {
  grid-template-columns: 50%;
  display: flex;
  justify-content: center;
}
</style>
