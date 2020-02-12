<template>

    <div class="home" >

        <h1>{{ msg }}</h1>

        <b-table striped hover :items="dataContext" :fields="fields"  responsive="sm" >
            <template v-slot:cell(thumbnailUrl)="data">
                <b-img :src="data.value" thumbnail fluid></b-img>
            </template>
            <template v-slot:cell(title_link)="data">
                <b-link :to="{ name: 'book_view', params: { 'id' : data.item.bookId } }">{{ data.item.title }}</b-link>
            </template>

        </b-table>
    </div>
   
</template>

<template>
    <div v-if="pageCount > 0">
        <Paginate :current-page="currentPage"
                  :page-count="pageCount"
                  class="paged-home__pagination"
                  @nextPage="pageChangeHandle('next');"
                  @previousPage="pageChangeHandle('previous');"
                  @loadPage="pageChangeHandle">
        </Paginate>

    </div>
</template>

<script>
    import axios from 'axios';
    import Paginate from './Paginate.vue'
   
    export default {

        name: 'PagedHome',
        components: {
            Paginate
        },
        static: {
            visibleItemsPerPageCount: 10
        },
        props: {
            msg: String            
        },
         data: () => ({

                fields: [
                    { key: 'thumbnailUrl', label: 'Book Image' },
                    { key: 'title_link', label: 'Book Title', sortable: true, sortDirection: 'desc' },
                    { key: 'isbn', label: 'ISBN', sortable: true, sortDirection: 'desc' },
                    { key: 'descr', label: 'Description', sortable: true, sortDirection: 'desc' }
                ],
                items: [],
                currentPage: 1,
                pageCount: 0,
         
        }),

         mounted() {
            try {
                axios.get("https://localhost:5001/books").then(response => {

                    this.pageCount = Math.ceil(
                        response.data.length / this.$options.static.visibleItemsPerPageCount);
                });

             } catch (error) {
             throw error;
             }

        },

        methods: {

            pageChangeHandle(value) {

                if (value) {

                    switch (value) {
                        case 'next':
                            this.currentPage += 1;
                            break;
                        case 'previous':
                            this.currentPage -= 1;
                            break;
                        default:
                            this.currentPage = 1;
                    }
                }



            },

            dataContext(cts, callback) {

                try {

                    if (this.pageCount == 0) {

                   
                            axios.get("https://localhost:5001/books").then(response => {

                                this.pageCount = Math.ceil(
                                    response.data.length / this.$options.static.visibleItemsPerPageCount);
                            });
                  

                         axios.get(`https://localhost:5001/books/?page=${this.currentPage}&pageSize=
                                    ${this.$options.static.visibleItemsPerPageCount}`).then(response => {

                                        callback(response.data);
                        });

                     }

                  } catch (error) {
                           throw error;
                  }


            }

        }

       
           
    }              
   

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .paged-home {
        &__pagination{        
            position: fixed;
            bottom: 50px;
            left: 50%;
            transform: translateX(-50%);
        }
    }

</style>

