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
            <ion-content class="ion-padding">
                <ion-item>
                    <ion-label>Safra: {{safra}}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Região: {{regiao}}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Município: {{municipio}}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>UR: {{ur}}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Produtor: {{produtor}}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Cultivar: {{cultivar}}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Data da emergência: {{dataDeEmergencia}}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Encerramento da Coleta: {{encerramentoDaColeta}}</ion-label>
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