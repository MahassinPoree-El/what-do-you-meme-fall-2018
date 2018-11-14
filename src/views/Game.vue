<template>
<div>
    <div class="alert alert-success">
        Yay we have a game!
    </div>

    <div class="row">
        <div class="col-md-4">
            <div class="card" >
                    <h5 class="card-header">
                        Players
                        <a @click.prevent="login" class="btn btn-sm btn-primary" :class="{disabled: playerId() !== null}">+</a>
                        <span ve-if="playerId() !== null">(Welcome {{state.players[playerId()].name}}) </span>
                    </h5>
                    <ul class="list-group list-group-flush">
                        <li v-for="p in state.players" :key="p.id"
                            class="list-group-item">
                            <img />
                            <h5>{{p.name}}</h5>
                            <span v-if="p.id == state.dealerId" class="badge badge-success">
                                Dealer

                            </span> &nbsp;
                            <span class="badge badge-primary badge-pill">{{p.score}}</span>
                        </li>
 
                    </ul>
            </div>
            <div class="card" >
                <h5 class="card-header">My Captions</h5>
                <ul class="list-group list-group-flush">
                    <li v-for="c in myCaptions" :key="c"
                        @click.prevent="submitCaption(c)"
                        class="list-group-item">{{c}}</li>
                </ul>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card" >
                <img class="card-img" :src="state.picture.url" :alt="state.picture.name">
                <a @click.prevent="flipPicture" class="btn btn-primary">Flip Picture</a>

            </div>
        </div>
        <div class="col-md-4">
            <div class="card" >
                <h5 class="card-header">Played Captions</h5>
                <ul class="list-group list-group-flush">
                    <li v-for="c in state.playedCaptions" :key="c.text"
                        class="list-group-item">
                        {{c.text }}
                        <div>
                            <a  v-if="isDealer"
                                @click.prevent="chooseCaption(c)"
                                class="btn btn-primary btn-sm">Choose</a>
                                <span class="badge" :class= c.playerName ? 'badge-success': "badge-secondary">
                                    
                                    {{c.playerName || "Hidden"}}
                                </span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss">
    li.list-group-item {
        display: flex;
        align-content: center;
        justify-content: space-between;
        flex-wrap: wrap;
        img {
            width: 30px; height: 30px;
            margin-right: 5px;
        }
        h5 {
            flex-grow: 1;
        }
    }
</style>

<script> // everything u make in the api u gotta put it in this import too
let loopTimer = null;
//cant rely of JS dwnlded on browser cuz issa security risque
import * as api from '@/services/api_access';
import * as fb from '@/ services/facebook';
export default {
    data(){
        return {
            state: {
                picture: "",
                players: [],
                playedCaptions: [],
            },
            myCaptions: [],
        }
    },
    created(){
        loopTimer = setInterval(this.refresh, 1000);
        if(api.playerId !== null && this.myCaptions.length == 0)
        {
            api.GetMyCaptions().then(x=> this.myCaptions = x)
        }
    },
    methods: {
        refresh(){
            api.GetState()
            .then(x=> this.state = x)
        },
        flipPicture(){
            api.FlipPicture()
            .then(()=> this.refresh())
        },
        login() {
            fb.FBlogin();
            //api.Login(prompt('What is your name?'))
            //.then(()=> api.GetMyCaptions().then(x=> this.myCaptions = x) )
            //.then(()=> this.refresh())
        },
        submitCaption(c){
            api.SubmitCaption(c)
            .then(x=> {
                this.myCaptions.splice(this.myCaptions.indexOf(c), 1);
                this.myCaptions.push(x[0]);
            })
            .then(()=> this.refresh())
        },
        chooseCaption(c){
            api.ChooseCaption(c)
            .then(()=> this.refresh())
        },
        playerId: ()=> api.playerId
    },
    computed: {
        isDealer(){
            return this.playerId() == this.state.dealerId;
        }
    }
}
</script>


