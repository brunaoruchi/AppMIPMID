<template>
    <ion-modal
        :is-open= "isOpen"
        @onDidDismiss="handleDidDismiss(true)"
    >
        <ion-page>
            <ion-header>
                <ion-toolbar>
                    <ion-title>Adicionar e Editar</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content class="ion-padding">
                <ion-item>
                    <ion-label>Nome: </ion-label>
                    <ion-input v-model="formInfoProduto.nome"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label>Classe de Uso:</ion-label>
                    <ion-select
                        placeholder="Selecionar"
                        :value="formInfoProduto.classeDeUso"
                        @ionChange="formInfoProduto.classeDeUso= $event.target.value"
                        ok-text="Confirmar" cancel-text="Cancelar"
                    >
                        <ion-select-option>Acaricida</ion-select-option>
                        <ion-select-option>Bactericida</ion-select-option>
                        <ion-select-option>Espelhante Adesivo</ion-select-option>
                        <ion-select-option>Fungicida</ion-select-option>
                        <ion-select-option>Estimulante</ion-select-option>
                        <ion-select-option>Herbicida</ion-select-option>
                        <ion-select-option>Inseticida</ion-select-option>
                        <ion-select-option>Outros</ion-select-option>
                        <ion-select-option>Adjuvante</ion-select-option>
                        <ion-select-option>Lesmicida/Moluscicida</ion-select-option>
                        <ion-select-option>Feromônio</ion-select-option>
                        <ion-select-option>Nematicida</ion-select-option>
                        <ion-select-option>Formicida</ion-select-option>
                        <ion-select-option>Regulador de Crescimento</ion-select-option>
                        <ion-select-option>Agente Biológico</ion-select-option>
                        <ion-select-option>Inseticida Biológico</ion-select-option>
                        <ion-select-option>Adubo Foliar</ion-select-option>
                        <ion-select-option>Sal Comum</ion-select-option>
                        <ion-select-option>Multiplas</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ion-label>Unidade de Medida:</ion-label>
                    <ion-select
                        placeholder="Selecionar"
                        :value="formInfoProduto.unidadeDeMedida"
                        @ionChange="formInfoProduto.unidadeDeMedida= $event.target.value"
                        ok-text="Confirmar" cancel-text="Cancelar"
                    >
                        <ion-select-option>Unid</ion-select-option>
                        <ion-select-option>L</ion-select-option>
                        <ion-select-option>ML</ion-select-option>
                        <ion-select-option>KG</ion-select-option>
                        <ion-select-option>G</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ion-label>Registro:</ion-label>
                    <ion-input type="number" v-model="formInfoProduto.registro"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label>Empresa Registrante</ion-label>
                    <ion-input v-model="formInfoProduto.empresaRegistrante"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label>Classe Toxicológica:</ion-label>
                    <ion-select
                        placeholder="Selecionar"
                        :value="formInfoProduto.classeToxicologica"
                        @ionChange="formInfoProduto.classeToxicologica= $event.target.value"
                        ok-text="Confirmar" cancel-text="Cancelar"
                    >
                        <ion-select-option>I</ion-select-option>
                        <ion-select-option>II</ion-select-option>
                        <ion-select-option>III</ion-select-option>
                        <ion-select-option>IV</ion-select-option>
                        <ion-select-option>V</ion-select-option>
                        <ion-select-option>INDEFINIDA</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ion-label>Ingrediente Ativo (IA):</ion-label>
                    <ion-input type="number" v-model="formInfoProduto.ingredienteAtivo"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label>Concentração de IA:</ion-label>
                    <ion-input v-model="formInfoProduto.concentracaoDeIa"></ion-input>
                </ion-item>
                <ion-button class="botao-cancelar" color="danger" expand="block" @click="handleDidDismiss(true)">
                <ion-icon :icon="closeOutline"></ion-icon>Cancelar</ion-button>
                <ion-button color="success" expand="block" @click="handleDidDismiss(false)">
                <ion-icon :icon="checkmarkOutline"></ion-icon>Salvar</ion-button>
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
import { defineComponent, SetupContext, reactive, computed, watch } from "vue";
import { checkmarkOutline, closeOutline } from 'ionicons/icons';
export default defineComponent({
    name: 'ModalProdutos',
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
        isOpen : {
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

        const inEditMode = computed(()=> props.initialValues?.id ? true : false);

        watch(
            () => props.initialValues,
            (newVal) => {
                if(newVal && inEditMode.value) {
                Object.assign( formInfoProduto, props.initialValues);
                }
            }
        );

        const handleDidDismiss = (isCancelled: boolean) => {
            if(!props.isOpen) return;
            let payload = null;
            if(isCancelled){
                payload = {
                    isCancelled: true,
                    formInfoProduto: null,
                };
            }else if(inEditMode.value) {
                //Alterando o alvo através do id
                payload = {
                    isCancelled: false,
                    formInfoProduto: { ...formInfoProduto, id: props.initialValues?.id}
                };
            }else{
                //Criando um novo alvo
                payload = {
                isCancelled: false,
                formInfoProduto: { ...formInfoProduto}
            };
            }

            //emit evento
            ctx.emit('modal-alvo-fechado', payload);

            //Limpa os campos
            Object.assign(formInfoProduto, {
                nome: "",
                classeDeUso: "",
                unidadeDeMedida: "",
                registro: "",
                empresaRegistrante: "",
                classeToxicologica: "",
                ingredienteAtivo: "",
                concentracaoDeIa: "",
            });
        };

        return{
            //functions
            handleDidDismiss,

            //proprieties
            formInfoProduto,
            inEditMode,

            //icons
            checkmarkOutline,
            closeOutline 

        };
    }
});

</script>
<style scoped>
    ion-item {
        width: 100%;
    } 
    .botao-cancelar{
        margin-top: 20px;
    }
</style>