import { Body, Controller, Post } from '@nestjs/common';

import { AuthenticateUserDTO } from '../dtos/authenticate-user.dto';
import { AuthenticateUserUseCase, AuthenticateUserUseCaseInput } from 'src/application/use-cases/authenticate-user.use-case';

type AuthenticateUserControllerResponse = {
    token: string;
}

@Controller('/users')
export class AuthenticateUserController {
    public constructor(
        private readonly authenticateUserUseCase: AuthenticateUserUseCase,
    ) {}

    @Post('/authenticate')
    public async handle(@Body() body: AuthenticateUserDTO): Promise<AuthenticateUserControllerResponse> {
        const input: AuthenticateUserUseCaseInput = {
            email: body.email,
            password: body.password,
        };

        return this.authenticateUserUseCase.execute(input);
    }
}
