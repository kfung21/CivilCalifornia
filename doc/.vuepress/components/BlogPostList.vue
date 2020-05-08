<script>
export default {
    name: 'BlogPostList',
    props: {
        pages: {
            type: Array,
            default: []
        },
        pageSize: {
            type: Number,
            default: 5
        },
        startPage: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            currentPage: Math.ceil(this.startPage / this.pageSize),
            selectedTags: []
        }
    },
    computed: {
        filteredList() {
            if (this.pages) {
                
                return this.pages.filter(item => {
                    const isBlogPost = !!item.frontmatter.blog
                    const isReadyToPublish = new Date(item.frontmatter.date) <= new Date()
                     // check for locales
                    let isCurrentLocale = true;
                    if(this.$site.locales) {
                        const localePath = this.$route.path.split('/')[1] || "";
                        isCurrentLocale = item.relativePath.startsWith(localePath);   
                    }
                    // check if tags contain all of the selected tags
                    const hasTags = !!item.frontmatter.tags && this.selectedTags.every((tag) => item.frontmatter.tags.includes(tag))

                    if (!isBlogPost || !isReadyToPublish || (this.selectedTags.length > 0 && !hasTags) || !isCurrentLocale){ 
                        return false
                    }

                    return true
                    
                }).sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
            }
        },

        totalPages() {
            
            return Math.ceil(this.filteredList.length / this.pageSize)
        },
    },

    mounted() {
        this.currentPage =  Math.min(Math.max(this.currentPage, 0), this.totalPages - 1)
    },

    methods: {
        nextPage() {
            this.currentPage = this.currentPage >= this.totalPages - 1 ? this.totalPages - 1 : this.currentPage + 1
        },
        previousPage() {
            this.currentPage = this.currentPage < 0 ? 0 : this.currentPage - 1
        },
        addTag(tag) {
            const tagExists = this.selectedTags.some(item => {
                return item === tag
            })

            if (!tagExists){
                this.selectedTags = this.selectedTags.concat(tag)
            }
        },
        removeTag(tag) {
            this.selectedTags.filter(t => t != tag)
        },
        resetTags(){
            this.selectedTags = []
        }
    }
}
</script>

<template>
	<div>
        <br/>  
        <br/>
        <div 
            v-if="selectedTags.length > 0"
            class="filtered-heading"
        >
            <h2>
                Filtered by {{ selectedTags.join(',') }}
            </h2>
            <button
                type="button"
                @click="resetTags"
                class="btn clear-filter-btn"
            >
                Clear filter
            </button>
        </div>
        <ul class="blog-list">
            <br/>
            <li v-for="(item, index) in filteredList"
                class="blog-list__item card">
                <BlogPostPreview 
                    v-show="index >= currentPage * pageSize && index < (currentPage + 1) * pageSize"
                    :item="item"
                />
                <ul v-for="tag in item.frontmatter.tags" class="blog-list__tags">
                    <li>
                        <button @click="addTag(tag)" class="blog-list__tags__btn">#{{ tag }}</button>
                    </li>
                </ul>
            </li>
        </ul>

        <div class="pagination">
            <button v-show="currentPage > 0" 
                @click="previousPage"
                class="button--pagination"
                type="button" 
            >
                Previous
            </button>
            <button v-show="currentPage < totalPages - 1"
                @click="nextPage"
                class="button--pagination"
                type="button"
            >
                Next
            </button>
        </div>
    </div>
</template>

<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 70%;
  border-radius: 50px;
  padding: 5px 16px;
  transform: translate(10%)
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.blog-list {
	padding: 10;
	margin: 0;
    text-align: center;
}

.blog-list__item {
	list-style-type: none;
    margin: 0 0 10px 0;

}

.blog-list__tags {
    margin-bottom: 0px;
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.blog-list__tags__btn {
    display: inline-block;
    padding: 0 auto;
    height: auto;
    width: auto;
    font-size: auto;
    line-height: auto;
    border-radius: 25px;
    background-color: #f1f1f1;
    color: gray;
    box-shadow: 0 0;
    border: 1px solid gray;

}

.button--pagination {
	background-color: #32c8cf;
	border-radius: 4px solid;
	color: #fff;
	font-size: 0.8rem;
	padding: 0.5rem 0.75rem;
	text-transform: uppercase;
	font-weight: 700;
	box-shadow: 0 0;
	transition: background-color 0.2s ease-in, color 0.2s ease-in;
}

.button--pagination:hover {
    background-color: #fff;
    border: 1px solid #32c8cf;
    border-radius: 4px;
    color: #32c8cf;
}

.clear-filter-btn {
    align-self: center;
    margin-left: 20px;
    color: blue;

    border: 1px solid #32c8cf;
	border-radius: 4px;
	color: #32c8cf;
	font-size: 0.8rem;
	padding: 0.5rem 0.75rem;
	text-transform: uppercase;
	font-weight: 700;
	box-shadow: 0 0;
	transition: background-color 0.2s ease-in, color 0.2s ease-in;
}

.filtered-heading {
    display: flex;
}

.pagination {
    text-align: center;
}
</style>
