import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//IMPORTACION DE LAS VISTAS
import Listevent from './views/Listevent'
import DetailEvent from './views/DetailEvent'

//RUTAS
const router = new VueRouter({
    mode : 'history',
    routes: [
        {
            path : '/',
            component : Listevent,
        },
        {
            path : '/DetailEvent/:slugOrganizer/:SlugEvent',
            component : DetailEvent
        }
    ]
});

export default router;