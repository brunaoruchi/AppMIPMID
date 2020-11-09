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
            <ion-content>
                <ion-item>
                    <ion-label position="stacked">Descrição</ion-label>
                    <ion-input disabled v-model="formInfoAlvo.descricao"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="stacked">Classe de Uso</ion-label>
                    <ion-input disabled v-model="formInfoAlvo.classeDeUso"></ion-input>
                </ion-item>
                <ion-button @click="handleDidDismissAlvo()">Fechar</ion-button>
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
    IonInput,
    IonItem,
    IonButton,
 } from "@ionic/vue";
import { defineComponent, SetupContext, reactive, watch } from "vue";

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
        IonInput,
        IonItem,
        IonButton,
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
    data(){
        return {
            ur: "Cornélio Procópio",
            pulverizacao: {
                alvos: {
                id: 0,
                descricao: "Folhas Largas",
                classeDeUso: "Herbicida",
                data: "24-10-2020",
                responsavelTecnico: "José da Silva",
                ultimaAlteracao: "31-10-2020",
                }
            }
        }
    },

    setup(props: any, ctx: SetupContext){   
        const formInfoAlvo = reactive<any> ({
            descricao: "",
            classeDeUso: "",
            data: "",
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


        };
    }
});

</script>