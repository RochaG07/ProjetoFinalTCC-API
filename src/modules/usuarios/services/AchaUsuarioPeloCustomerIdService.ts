import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsuariosRepository from '../repositories/IUsuariosRepository';
import ICustomerProvider from '../providers/StripeProviders/CustomerProvider/models/ICustomerProvider';

import Usuario from '../infra/typeorm/entities/Usuario';

@injectable()
class AchaUsuarioPeloCustomerIdService{
    constructor(
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,
        @inject('CustomerProvider')
        private customerProvider: ICustomerProvider,
    ){}
    
    public async executar(idUser: string):Promise<Usuario> {
        let usuario = await this.usuariosRepository.acharPorId(idUser);

        if(!usuario){
            throw new AppError("Somente usuarios autenticados", 401);
        }

        const customer = await this.customerProvider.getCustomer(usuario.email);

        if(!customer){
            throw new AppError("CustomerId inválido", 401);
        } 

        return usuario;
    }
}

export default AchaUsuarioPeloCustomerIdService;