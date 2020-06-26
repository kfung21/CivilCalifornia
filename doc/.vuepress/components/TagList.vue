<!-- .vuepress/components/TagList.vue -->
<template lang="html">
  <div>
    <br/>
    <br/>
    <!-- <span v-for="tag in Object.keys(tags)"> -->
    <span v-for="tag in sortedKeys">
      <h2 :id="tag">
        <router-link
          :to="{ path: `/tags.html#${tag}`}"
          class="header-anchor"
          aria-hidden="true">#</router-link>
        {{tag}}
      </h2>
      <ul>
        <li v-for="page in tags[tag]">
          <router-link
            :to="{ path: page.path}">{{page.title}}</router-link>
        </li>
      </ul>
    </span>
  </div>
</template>

<script>
export default {
  name: 'TagList',
  methods: {
    getTags() {
      
    }
  },
  computed: {
    sortedKeys() {
      let tags = {}
      for (let page of this.$site.pages) {
        for (let index in page.frontmatter.tags) {
          const tag = page.frontmatter.tags[index]
          if (tag in tags) {
            tags[tag].push(page)
          } else if (page.frontmatter.hidden==true){
          } else {
            tags[tag] = [page]
          }
        }
      } 
      const keys = Object.keys(tags).sort()
      return keys
    },
    tags() {
      let tags = {}
      for (let page of this.$site.pages) {
        for (let index in page.frontmatter.tags) {
          // console.log(page.frontmatter.tags);
          const tag = page.frontmatter.tags[index]
          if (tag in tags) {
            tags[tag].push(page)
          } else if (page.frontmatter.hidden==true){

          } else {
            tags[tag] = [page]
          }
        }
      }
      // console.log(tags);

      return tags
    }
  },
  mounted() {
    // console.log(this.$site.pages.frontmatter.tags)
  }
}
</script>