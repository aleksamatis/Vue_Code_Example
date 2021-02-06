<template>
<div class="blog">
    <header-section />
    <blog-header  v-on:section-selected="onSectionSelected"/>
    <div class="main-blog">
      <div v-for="record in visibleRecords" v-bind:key="record.id" class="media">
        <blog-list-item v-bind:record="record"/>
      </div>
    </div>
    <div class="elements-pagination">
      <hr />
      <div style="">
        <div class="elements-pagination-prev-next" @click="currentPage = 1">Первая</div>
        <el-pagination small layout="pager" :total="filteredRecords.length" :page-size="recordsPerPage" v-bind:current-page.sync="currentPage"/>
        <div class="elements-pagination-prev-next" @click="currentPage = totalPages">Последняя</div>
      </div>
    </div>
    <blog-footer class="section1_2" />
    <footer-component class="section8 page-fixed-item" />
</div>
</template>
<script>
import HeaderSection from "~/components/HeaderSection.vue";
import FooterComponent from "~/components/FooterComponent.vue";
import BlogListItem from "~/components/blog/BlogListItem.vue";
import BlogHeader from "~/components/blog/BlogHeader.vue";
import BlogFooter from "~/components/blog/BlogFooter.vue";
export default {
  components: {
    HeaderSection,
    FooterComponent,
    BlogHeader,
    BlogFooter,
    BlogListItem,
  },
  data() {
    return {
      filter: "all",
      recordsPerPage: 4,
      currentPage: 1,
    };
  },
  fetch(context) {
    if (!context.store.state.savedRecords) {
      return context.store.dispatch('fetchSavedRecords');
    }
  },
  asyncData: function({$axios}) {
    return $axios.get('/api/blog.json').then(res =>{
      return res.data;
    })
  },
  computed: {
    visibleRecords() {
      const start = (this.currentPage - 1)* this.recordsPerPage;
      const end = start + this.recordsPerPage;
      return this.filteredRecords.slice(start, end);
    },
    filteredRecords() {
      if (!this.records) {
        return [];
      }
      if (this.filter != "all") {
        return this.records.filter(record => {
          return record.section === this.filter;
        });
      }
      return this.records;
    },
    totalPages() {
      return Math.ceil(this.filteredRecords.length / this.recordsPerPage);
    },
  },
  methods: {
    onSectionSelected(section) {
      this.filter = section;
    }
  }
};
</script>
<style lang="scss">
.media {
   width: 50%;
}
@media (max-width: 500px) {
  .media {
    width: 100%;
  }
}
.main-blog {  
  max-width: 1100px;
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  margin: auto;
}
.elements-pagination {
  text-align:center; 
  margin-top:50px;
  margin-bottom:50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.elements-pagination-prev-next {
  margin-left: 20px;
  margin-right: 20px;
  color: #666666;
  font-size: 15px;
  cursor: pointer;
}
.elements-pagination > div {
  display: flex;
  justify-content:
  space-between;
  width: 80%;
}
.elements-pagination hr {
  height: 1px;
  margin-top: 0px;
  margin-bottom: 0px;
  background: #C4C4C4;
  width: 80%;
}

.el-pager li.number {
  color: #666666;
}

.el-pager li.number.active {
  color: #000000;
}
</style>
