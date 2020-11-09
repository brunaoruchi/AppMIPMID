<template>
    <ion-modal
        :is-open= "isOpenInfo"
        @onDidDismiss="handleDidDismissProduto()"
    >
        <ion-page>
            <ion-header>
                <ion-toolbar>
                    <ion-title>Informações</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <ion-item>
                    <ion-label position="stacked">Nome</ion-label>
                    <ion-input disabled v-model="formInfoProduto.nome"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="stacked">Classe de Uso</ion-label>
                    <ion-input disabled v-model="formInfoProduto.classeDeUso"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="stacked">Unidade de Medida</ion-label>
                    <ion-input disabled v-model="formInfoProduto.unidadeDeMedida"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="stacked">Registro</ion-label>
                    <ion-input disabled v-model="formInfoProduto.registro"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="stacked">Empresa Registrante</ion-label>
                    <ion-input disabled v-model="formInfoProduto.empresaRegistrante"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="stacked">Classe Toxicológica</ion-label>
                    <ion-input disabled v-model="formInfoProduto.classeToxicologica"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="stacked">Ingrediente Ativo (IA)</ion-label>
                    <ion-input disabled v-model="formInfoProduto.ingredienteAtivo"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="stacked">Concentração de IA</ion-label>
                    <ion-input disabled v-model="formInfoProduto.concentracaoDeIa"></ion-input>
                </ion-item>               
                <ion-button @click="handleDidDismissProduto()">Fechar</ion-button>
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
    name: 'ModalInfoProdutos',
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
    
    setup(props: any, ctx: SetupContext){   
        const formInfoProduto = reactive<any> ({
            nome: "",
            classeDeUso: "",
            unidadeDeMedida: "",
            registro: "",
            empresaRegistrante: "",
            classeToxicologica: "",
            ingredienteAtivo: "",
            concentracaoDeIa: "",
        });

        watch(
            () => props.initialValues,
            (newVal) => {
                if(newVal) {
                Object.assign( formInfoProduto, props.initialValues);
                }
            }
        );

        const handleDidDismissProduto = () => {
           
            //emit evento
            ctx.emit('modal-info-fechado');
        };

        return{
            //functions
            handleDidDismissProduto,

            //proprieties
            formInfoProduto,

            //icons

        };
    }
});

</script>