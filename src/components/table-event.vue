<template>
    <div>
      <div class="table-responsive">
          <table class="table table-hover table-borderless">
            <thead>
                <th style="width: 15%"></th>
                <th style="width: 10%"></th>
                <th v-for="(Hora, index) in TablaThead" :key="index"> {{Hora }} </th>
            </thead>
            <tbody v-for="(channel, index) in EventData.channels" :key="index">
                <tr v-for="(room, indexRoom) in channel.rooms" :key="indexRoom"> 
                   <td v-if="(indexRoom == 0)" :rowspan="channel.rooms.length">  
                       {{ channel.name}}
                   </td> 
                   <td class="border-start border-end border-dark">
                       {{ room.name }}
                   </td>
                   <td v-for="(Hora, indexHora) in TablaThead" :key="indexHora">
                        <column-table :Hora="Hora" :Sesiones="room.sessions"></column-table>
                   </td>
                </tr>
            </tbody>
          </table>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
import ColumnTable from './column-table.vue'
import columnTable from './column-table.vue'

export default {
  components: { columnTable },
    name : 'table-event',
    component :{
        ColumnTable
    },
    data(){
        return {
            OrganizerSlug : this.$route.params.slugOrganizer,
            EventSlug : this.$route.params.SlugEvent,
            EventData : {},
            TablaThead : []
        }
    },
    mounted(){
        this.DatosEvento()
    },
    methods:{
        DatosEvento(){
            axios.get('organizer/' + this.OrganizerSlug + '/events/' + this.EventSlug)
            .then((Response) =>{
                if(Response.status == 200){
                    this.EventData = Response.data;
                    this.HorasEvento();
                }
            })
            .catch((error) => {
                console.log(error);
            });
        },
        HorasEvento(){
            this.EventData.channels.forEach(Channel => {
                Channel.rooms.forEach(Room => {
                    Room.sessions.forEach(Session => {
                        let Hora = Session.start.substr(11,2);
                        
                        if(!this.TablaThead.includes(Hora)){
                            this.TablaThead.push(Hora);
                        }
                    })
                })
            })
            this.TablaThead = this.TablaThead.sort((a,b) =>a-b);
        }
    } 
}
</script>