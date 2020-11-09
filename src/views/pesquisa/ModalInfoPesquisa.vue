<template>
    <ion-modal
        :is-open= "isOpenInfo"
        @onDidDismiss="handleDidDismiss()"
    >
        <ion-page>
            <ion-header>
                <ion-toolbar>
                    <ion-title>Informações</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <ion-item>
                    <ion-label>
                        <div class="ion-text-wrap">Safra: {{safra}} </div>
                        <div class="ion-text-wrap">Região: {{regiao}} </div>
                        <div class="ion-text-wrap">Município: {{municipio}} </div>
                        <div class="ion-text-wrap">UR: {{ur}} </div>
                        <div class="ion-text-wrap">Produtor: {{produtor}} </div>
                        <div class="ion-text-wrap">Cultivar: {{cultivar}} </div>
                        <div class="ion-text-wrap">Data da emergência: {{dataDeEmergencia}} </div>
                        <div class="ion-text-wrap">Encerramento da Coleta: {{encerramentoDaColeta}} </div>
                    </ion-label>
                </ion-item>
                <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                    <ion-fab-button color="danger" @click="handleDidDismiss()">
                    <ion-icon :icon="close"></ion-icon>
                    </ion-fab-button>
                </ion-fab>
            </ion-content>
        </ion-page>
    </ion-modal>
</template>

<script lang="ts">
import { 
    IonModal,
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonItem,
 } from "@ionic/vue";
import { defineComponent, SetupContext} from "vue";
import { close } from 'ionicons/icons';

export default defineComponent({
    name: 'ModalInfoPesquisa',
    components:{
        IonModal,
        IonPage,
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonLabel,
        IonItem,
    },
    props: {
        isOpenInfo : {
            default: false,
            required: true,
        }
    },
    data(){
        return {
            safra: "2020/2021",
            regiao: "Pato Branco",
            municipio: "Pato Branco",
            ur: "Carnieletto",
            produtor: "Antonio da Silva",
            cultivar: "50i52 Rsf Ipro",
            dataDeEmergencia: "01/10/2019",
            encerramentoDaColeta: "13/09/2020",
        }
    },

    setup(props: any, ctx: SetupContext){   
        const handleDidDismiss = () => {
            ctx.emit('modal-info-fechado');
        };

        return{
            //functions
            handleDidDismiss,

            //icons
            close,
        };
    }
});

</script>