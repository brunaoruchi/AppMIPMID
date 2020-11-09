import { reactive } from 'vue';

//keep data/ state here
const listDataAlvo = reactive<Map<string, any>>((new Map <string, any>()));

listDataAlvo.set("1", {
    id: "1",
    nome: "TARGA MAX",
    classeDeUso: "Herbicida",
    unidadeDeMedida: "G",
    registro: "12117",
    empresaRegistrante: "IHARA",
    classeToxicologica: "III",
    ingredienteAtivo: "50",
    concentracaoDeIa: "QUIZALOFOPE-P-ETILICO",
    responsavelTecnico: "José da Silva",
    ultimaAlteracao: new Date().toString(),
    }
);

listDataAlvo.set("2", {
    id: "2",
    nome: "Fox",
    classeDeUso: "Fungicida",
    unidadeDeMedida: "L",
    registro: "13509",
    empresaRegistrante: "BAYER",
    classeToxicologica: "I",
    ingredienteAtivo: "150+175",
    concentracaoDeIa: "TRIFLOXISTRO + PROTIOCONAZ",
    responsavelTecnico: "José da Silva",
    ultimaAlteracao: new Date().toString(),
    }
);


export default function(){

    return {
        //props
        listDataAlvo,

        //functions
        addOrUpdateAlvo:(item: any, id?: string) => {
            //if id use it, else create one
            const _id = id || new Date().getTime().toString();
            
            //add to map, set id
            listDataAlvo.set( _id,{
                ...item,
                id:_id,
                responsavelTecnico: "José da Silva",
                ultimaAlteracao: new Date().toString(),
            })
        },
    
        //Delete Alvo
        deleteAlvo:(item: any) => {
            listDataAlvo.delete(item.id);
        }
    }
}