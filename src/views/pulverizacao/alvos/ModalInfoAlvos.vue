<template>
    <ion-modal
        :is-open= "isOpenInfo"
        @onDidDismiss="handleDidDismissAlvo()"
    >
        <ion-page>
            <ion-header>
                <ion-toolbar>
                    <ion-title>Informações</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
                <ion-item>
                    <ion-label>Descrição: {{formInfoAlvo.descricao}}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Classe de Uso: {{formInfoAlvo.classeDeUso}}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Responsável Técnico: {{formInfoAlvo.responsavelTecnico}}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Última Alteração: {{ new Date(formInfoAlvo.ultimaAlteracao).getDate()}}/{{ new Date(formInfoAlvo.ultimaAlteracao).getMonth()+1}}/{{ new Date(formInfoAlvo.ultimaAlteracao).getFullYear()}}</ion-label>
                </ion-item>
                <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                    <ion-fab-button color="danger" @click="handleDidDismissAlvo()">
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
import { defineComponent, SetupContext, reactive, watch } from "vue";
import { close } from 'ionicons/icons';
export default defineComponent({
    name: 'ModalInfoAlvos',
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
        },
        initialValues:{
            default: {},
        }
    },

    setup(props: any, ctx: SetupContext){   
        const formInfoAlvo = reactive<any> ({
            descricao: "",
            classeDeUso: "",
        });

        watch(
            () => props.initialValues,
            (newVal) => {
                if(newVal) {
                Object.assign( formInfoAlvo, props.initialValues);
                }
            }
        );

        const handleDidDismissAlvo = () => {
           
            //emit evento
            ctx.emit('modal-info-fechado');
        };

        return{
            //functions
            handleDidDismissAlvo,

            //proprieties
            formInfoAlvo,

            close

        };
    }
});

</script>

<style scoped>
    ion-item {
        width: 100%;
    }
</style>