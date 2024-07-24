import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDTO } from '../dtos/create-user.dto';
import { CreateUserUseCase, CreateUserUseCaseInput } from 'src/application/use-cases/create-user.use-case';

@Controller('/users')
export class CreateUserController {
    public constructor(
        private readonly createUserUseCase: CreateUserUseCase,
    ) {}

    @Post()
    public async handle(@Body() body: CreateUserDTO): Promise<{ id: string }> {
        const input: CreateUserUseCaseInput = {
            name: body.name,
            email: body.email,
            password: body.password,
        };

        const output = await this.createUserUseCase.execute(input);

        return output;
    }
}
