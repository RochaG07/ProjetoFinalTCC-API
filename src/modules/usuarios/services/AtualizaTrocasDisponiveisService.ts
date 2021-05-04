//Esse service atualiza o número de trocas diponíveis e a data em que a próxima troca estará diponível
//com base no dia em que foi chamada  

//Utilizado para a rota de criação de trocas no backend e obter as informações precisas para exibir no front 

import { differenceInWeeks, addWeeks, isAfter, subSeconds, differenceInSeconds } from 'date-fns';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';

interface IResponse {
    trocasDisponiveis : number,
    proxTrocaDisp : Date | null,
}
class AtualizaTrocasDisponiveisService{
    public async executar(usuario: Usuario):Promise<IResponse> {

        let trocasDisponiveis = usuario.trocasDisponiveis;
        let proxTrocaDisp = usuario.proxTrocaDisp;

        const dataAtual = new Date(Date.now());

        if(proxTrocaDisp){
            if(isAfter(dataAtual, proxTrocaDisp)){
                const qtdSemanasExcedentes = differenceInWeeks(dataAtual, proxTrocaDisp);

                trocasDisponiveis += 1 + qtdSemanasExcedentes;

                if( trocasDisponiveis >= 3){
                    trocasDisponiveis = 3;

                    proxTrocaDisp = null;
                } else {
                    //Desconta o tempo que passou para gerar nova data de proxTrocaDisp
                    const proxTrocaDispComSemanasAdd = addWeeks(proxTrocaDisp, qtdSemanasExcedentes);

                    const diffEntreProxTrocaDispComSemanasAddEDataAtual = 
                    differenceInSeconds(dataAtual, proxTrocaDispComSemanasAdd);

                    proxTrocaDisp =  subSeconds(addWeeks(dataAtual, 1),
                    diffEntreProxTrocaDispComSemanasAddEDataAtual);
                }
            }
        }

        return {
            trocasDisponiveis,
            proxTrocaDisp,
        };
    }
}

export default AtualizaTrocasDisponiveisService;