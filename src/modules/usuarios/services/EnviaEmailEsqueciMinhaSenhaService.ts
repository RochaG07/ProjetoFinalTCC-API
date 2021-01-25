import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import ITokensUsuariosRepository from '../repositories/ITokensUsuariosRepository';
import IUsuariosRepository from '../repositories/IUsuariosRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

//import User from '../infra/typeorm/entities/User';


interface IRequest {
    email: string,
}

@injectable()
class EnviaEmailEsqueciMinhaSenhaService {  
    constructor (
        @inject('UsuariosRepository')
        private usuariosRepository: IUsuariosRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
        
        @inject('TokensUsuariosRepository')
        private tokensUsuariosRepository: ITokensUsuariosRepository,
    ){}

    public async execute({ email }: IRequest): Promise<void> {
        const usuario = await this.usuariosRepository.acharPorEmail(email);

        if(!usuario){
            throw new AppError('Usuário não existe');
        }

        const { token } = await this.tokensUsuariosRepository.gerar(usuario.id);

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'esqueci_minha_senha.hbs'
        )

        await this.mailProvider.sendMail({
            to: {
                name: usuario.nome,
                email: usuario.email,
            },
            subject: 'Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: usuario.nome,
                    link: `${process.env.APP_WEB_URL}/resetar-senha?token=${token}`,
                },
            },
        });
    }
}

export default EnviaEmailEsqueciMinhaSenhaService;