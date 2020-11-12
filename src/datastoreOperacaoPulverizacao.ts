import { reactive } from 'vue';

//keep data/ state here
const listDataOperacaoPulverizacao = reactive<Map<string, any>>((new Map <string, any>()));

export default function(){

    return {
        //props
        listDataOperacaoPulverizacao,

        //functions
        addOrUpdateOperacaoPulverizacao:(item: any, id?: string) => {
            //if id use it, else create one
            const _id = id || new Date().getTime().toString();
            
            //add to map, set id
            listDataOperacaoPulverizacao.set( _id,{
                ...item,
                id:_id,
                responsavelTecnico: "José da Silva",
                ultimaAlteracao: new Date().toString(),
            })
        },
    
        //Delete Alvo
        deleteOperacaoPulverizacao:(item: any) => {
            listDataOperacaoPulverizacao.delete(item.id);
        },
    }
}