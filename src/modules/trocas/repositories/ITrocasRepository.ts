import Troca from '../infra/typeorm/entities/Troca';

import ICriarTrocaDTO from '@modules/trocas/dtos/ICriarTrocaDTO';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';

export default interface ITrocasRepository{
    criar(data: ICriarTrocaDTO): Promise<Troca>;
    acharPorId(id: string): Promise<Troca | undefined>;
    acharTodosDeUmUsuario(usuario: Usuario): Promise<Troca[]>;
}