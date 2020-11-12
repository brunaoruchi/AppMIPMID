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
            <ion-content class="ion-padding">
                <ion-item>
                    <ion-label>Nome: {{formInfoProduto.nome}}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Classe de Uso: {{formInfoProduto.classeDeUso}}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Unidade de Medida: {{unidadeDeMedida}}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Registro: {{formInfoProduto.registro}}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Empresa Registrante: {{formInfoProduto.empresaRegistrante}}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Classe Toxicológica: {{formInfoProduto.classeToxicologica}}</ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>Ingrediente Ativo (IA): {{formInfoProduto.ingredienteAtivo}}</ion-label>
                </ion-item>
                <ion-item>
                    <div>Concentração de IA</div>
                    <div>{{formInfoProduto.concentracaoDeIa}}</div>
                </ion-item>
                <ion-fab vertical="bottom" horizontal="end" slot="fixed">
                    <ion-fab-button color="danger" @click="handleDidDismissProduto()">
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
    name: 'ModalInfoProdutos',
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