<template>
    <div>
        <div class="row mt-3" v-for="(event, index) in Events" :key="index">
            <div class="col-md-12">
               <div class="card"> 
                    <div class="card-body">
                    <router-link :to="'/DetailEvent/' + event.organizer.slug + '/' + event.slug">
                    <h3>{{ event.name }}</h3>
                    </router-link>
                    <p> {{event.organizer.name }} {{event.date}} </p>
                </div>
               </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Listevent',
    data(){
        return{
            Events: []
        }
    },
    mounted(){
        this.ListEvents();
    },
    methods : {
        ListEvents(){
            axios.get('events')
            .then((Response) => {
                if(Response.status == 200){
                    this.Events = Response.data.events;
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>
