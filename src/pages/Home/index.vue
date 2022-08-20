<template>
    <div>
        <!-- 全局组件不需要再import引入了 -->
       <TypeNav/>
       <list-container></list-container>
       <Recommend/>
       <Rank/>
       <Like/>
       <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
       <Brand/>
       <!-- <button @click="add">+</button>
       <span>{{count}}</span> -->
    </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {mapState} from 'vuex'
    export default {
        components:{
            ListContainer,
            Recommend,
            Rank,
            Like,
            Floor,
            Brand
        },
        // computed:{
        //     ...mapState(['count'])
        // },
        // methods:{
        //     add(){
        //         this.$store.dispatch('add')
        //     }
        // },
        mounted(){
            //派发action，获取floor的数据
            this.$store.dispatch('getFloorList')
            // //获取用户信息在首页展示
            // this.$store.dispatch('getUserInfo')
        },
        computed:{
            ...mapState({
                floorList:state => state.home.floorList
            })
        }
    }
</script>

<style lang="less" scoped>

</style>