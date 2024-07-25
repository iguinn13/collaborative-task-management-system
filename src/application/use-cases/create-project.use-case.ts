import { ConflictError } from 'src/shared/errors/conflict.error';
import { NotFoundError } from 'src/shared/errors/not-found.error';
import { BadRequestError } from 'src/shared/errors/bad-request.error';

import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IProjectRepository } from 'src/domain/repositories/project.repository';
import { IProjectMemberRepository } from 'src/domain/repositories/project-member.repository';

import { Project } from 'src/domain/entities/project.entity';
import { ProjectMember, ProjectMemberRole } from 'src/domain/entities/project-member.entity';

import { IUniqueIdentifierGeneratorService } from '../services/unique-identifier-generator.service';

export type CreateProjectUseCaseInput = {
    name: string;
    ownerId: string;
    description: string;
    members: Array<{
        id: string;
        role: string;
    }>;
};

export type CreateProjectUseCaseOutput = {
    id: string;
};

export class CreateProjectUseCase {
    public constructor(
        private readonly userRepository: IUserRepository,
        private readonly projectRepository: IProjectRepository,
        private readonly projectMemberRepository: IProjectMemberRepository,
        private readonly uniqueIdentifierGeneratorService: IUniqueIdentifierGeneratorService,
    ) {}

    // @TODO -> Implement transactions
    public async execute(input: CreateProjectUseCaseInput): Promise<CreateProjectUseCaseOutput> {
        const projectAlreadyExists = await this.projectRepository.findByName(input.name);
        if (projectAlreadyExists) throw new ConflictError('Project with the provided name already exists');

        const owner = await this.userRepository.findById(input.ownerId);
        if (!owner) throw new NotFoundError('Owner not found');

        if (new Set(input.members.map((member) => member.id)).size !== input.members.length) {
            throw new BadRequestError('Member ID duplicated');
        }

        const foundedMembers = await this.userRepository.findByIds(input.members.map((member) => member.id));
        if (foundedMembers.length !== input.members.length) throw new NotFoundError('One or more members not found');

        const project = new Project({
            owner,
            name: input.name,
            description: input.description,
            id: this.uniqueIdentifierGeneratorService.generate(),
        });

        await this.projectRepository.create(project);

        const projectMembers = input.members.map((member) => {
            if (!Object.values(ProjectMemberRole).includes(member.role as ProjectMemberRole)) {
                throw new BadRequestError(`Role from user ${member.id} does not exist`);
            }

            return new ProjectMember({
                userId: member.id,
                projectId: project.id,
                role: member.role as ProjectMemberRole,
                id: this.uniqueIdentifierGeneratorService.generate(),
            });
        });

        await this.projectMemberRepository.createMany(projectMembers);

        return { id: project.id };
    }
}
