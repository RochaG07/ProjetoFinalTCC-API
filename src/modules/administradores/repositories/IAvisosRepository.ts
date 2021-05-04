import Administrador from '../infra/typeorm/entities/Administrador';
import Aviso from '../infra/typeorm/entities/Aviso';
import ICriaAvisoDTO from '../dtos/ICriaAvisoDTO';
import Usuario from '@modules/usuarios/infra/typeorm/entities/Usuario';

export default interface IAvisosRepository{
    criar(data: ICriaAvisoDTO): Promise<Aviso>;
    exibirTodos(idUser: string): Promise<Aviso[]>;
    getAviso(id: string): Promise<Aviso | undefined>;
    salvar(aviso: Aviso): Promise<Aviso>;

}