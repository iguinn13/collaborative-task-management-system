import { Body, Controller, Post } from '@nestjs/common';

import { CreateProjectDTO } from '../dtos/create-project.dto';
import { CreateProjectUseCase, CreateProjectUseCaseInput } from 'src/application/use-cases/create-project.use-case';

type CreateProjectControllerResponse = {
    id: string;
}

@Controller('/projects')
export class CreateProjectController {
    public constructor(
        private readonly createProjectUseCase: CreateProjectUseCase,
    ) {}

    @Post()
    public async handle(@Body() body: CreateProjectDTO): Promise<CreateProjectControllerResponse> {
        const input: CreateProjectUseCaseInput = {
            name: body.name,
            ownerId: body.ownerId,
            members: body.members,
            description: body.description,
        };

        return this.createProjectUseCase.execute(input);
    }
}
