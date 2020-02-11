<template>

    <div id="app">
        <b-container>
            <router-view>
            
            </router-view>
        </b-container>
    </div>

</template>

<script>
    import PagedHome from './components/PagedHome.vue';

    export default {
        name: 'app',
        components: {
            PagedHome
        }
    };
</script>

<style>
</style>

