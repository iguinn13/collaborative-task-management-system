import { vitest } from 'vitest';
import { ConflictError } from 'src/shared/errors/conflict.error';
import { NotFoundError } from 'src/shared/errors/not-found.error';
import { BadRequestError } from 'src/shared/errors/bad-request.error';

import { IUserRepository } from 'src/domain/repositories/user.repository';
import { IProjectRepository } from 'src/domain/repositories/project.repository';
import { IProjectMemberRepository } from 'src/domain/repositories/project-member.repository';

import { CreateProjectUseCase, CreateProjectUseCaseInput } from './create-project.use-case';
import { IUniqueIdentifierGeneratorService } from '../services/unique-identifier-generator.service';
import { ProjectMemberRole } from 'src/domain/entities/project-member.entity';

describe('CreateProjectUseCase Unit', () => {
    it('should create project with success', async () => {
        const userRepository: IUserRepository = {
            findById: vitest.fn().mockResolvedValue({ id: 'owner-id' }),
            findByIds: vitest.fn().mockResolvedValue([{ id: 'member-1' }, { id: 'member-2' }]),
        };

        const projectRepository: IProjectRepository = {
            findByName: vitest.fn().mockResolvedValue(null),
            create: vitest.fn().mockResolvedValue({ id: 'project-id' }),
        };

        const projectMemberRepository: IProjectMemberRepository = {
            createMany: vitest.fn().mockResolvedValue(null),
        };

        const uniqueIdentifierGeneratorService: IUniqueIdentifierGeneratorService = {
            generate: vitest.fn().mockReturnValue('unique-id'),
        };

        const createProjectUseCase = new CreateProjectUseCase(
            userRepository,
            projectRepository,
            projectMemberRepository,
            uniqueIdentifierGeneratorService,
        );

        const input: CreateProjectUseCaseInput = {
            name: 'New Project',
            ownerId: 'owner-id',
            description: 'Project Description',
            members: [
                { id: 'member-1', role: ProjectMemberRole.MEMBER },
                { id: 'member-2', role: ProjectMemberRole.MEMBER },
            ],
        };

        const output = await createProjectUseCase.execute(input);

        expect(output).toHaveProperty('id', 'unique-id');
        expect(projectRepository.findByName).toHaveBeenCalledWith('New Project');
        expect(userRepository.findById).toHaveBeenCalledWith('owner-id');
        expect(userRepository.findByIds).toHaveBeenCalledWith(['member-1', 'member-2']);
        expect(projectRepository.create).toHaveBeenCalled();
        expect(projectMemberRepository.createMany).toHaveBeenCalled();
    });

    it('should throw conflict error when project already exists', async () => {
        const userRepository: IUserRepository = {
            findById: vitest.fn().mockResolvedValue({ id: 'owner-id' }),
            findByIds: vitest.fn().mockResolvedValue([{ id: 'member-1' }, { id: 'member-2' }]),
        };

        const projectRepository: IProjectRepository = {
            findByName: vitest.fn().mockResolvedValue({ id: 'existing-project-id' }),
            create: vitest.fn().mockResolvedValue(null),
        };

        const projectMemberRepository: IProjectMemberRepository = {
            createMany: vitest.fn().mockResolvedValue(null),
        };

        const uniqueIdentifierGeneratorService: IUniqueIdentifierGeneratorService = {
            generate: vitest.fn().mockReturnValue('unique-id'),
        };

        const createProjectUseCase = new CreateProjectUseCase(
            userRepository,
            projectRepository,
            projectMemberRepository,
            uniqueIdentifierGeneratorService,
        );

        const input: CreateProjectUseCaseInput = {
            name: 'Existing Project',
            ownerId: 'owner-id',
            description: 'Project Description',
            members: [
                { id: 'member-1', role: ProjectMemberRole.MEMBER },
                { id: 'member-2', role: ProjectMemberRole.MEMBER },
            ],
        };

        try {
            await createProjectUseCase.execute(input);
        } catch (error) {
            expect(error).toBeInstanceOf(ConflictError);
            expect(error.message).toBe('Project with the provided name already exists');
        }
    });

    it('should throw not found error when owner does not exist', async () => {
        const userRepository: IUserRepository = {
            findById: vitest.fn().mockResolvedValue(null),
            findByIds: vitest.fn().mockResolvedValue([{ id: 'member-1' }, { id: 'member-2' }]),
        };

        const projectRepository: IProjectRepository = {
            findByName: vitest.fn().mockResolvedValue(null),
            create: vitest.fn().mockResolvedValue(null),
        };

        const projectMemberRepository: IProjectMemberRepository = {
            createMany: vitest.fn().mockResolvedValue(null),
        };

        const uniqueIdentifierGeneratorService: IUniqueIdentifierGeneratorService = {
            generate: vitest.fn().mockReturnValue('unique-id'),
        };

        const createProjectUseCase = new CreateProjectUseCase(
            userRepository,
            projectRepository,
            projectMemberRepository,
            uniqueIdentifierGeneratorService,
        );

        const input: CreateProjectUseCaseInput = {
            name: 'New Project',
            ownerId: 'invalid-owner-id',
            description: 'Project Description',
            members: [
                { id: 'member-1', role: ProjectMemberRole.MEMBER },
                { id: 'member-2', role: ProjectMemberRole.MEMBER },
            ],
        };

        try {
            await createProjectUseCase.execute(input);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundError);
            expect(error.message).toBe('Owner not found');
        }
    });

    it('should throw bad request error when member IDs are duplicated', async () => {
        const userRepository: IUserRepository = {
            findById: vitest.fn().mockResolvedValue({ id: 'owner-id' }),
            findByIds: vitest.fn().mockResolvedValue([{ id: 'member-1' }, { id: 'member-2' }]),
        };

        const projectRepository: IProjectRepository = {
            findByName: vitest.fn().mockResolvedValue(null),
            create: vitest.fn().mockResolvedValue(null),
        };

        const projectMemberRepository: IProjectMemberRepository = {
            createMany: vitest.fn().mockResolvedValue(null),
        };

        const uniqueIdentifierGeneratorService: IUniqueIdentifierGeneratorService = {
            generate: vitest.fn().mockReturnValue('unique-id'),
        };

        const createProjectUseCase = new CreateProjectUseCase(
            userRepository,
            projectRepository,
            projectMemberRepository,
            uniqueIdentifierGeneratorService,
        );

        const input: CreateProjectUseCaseInput = {
            name: 'New Project',
            ownerId: 'owner-id',
            description: 'Project Description',
            members: [
                { id: 'member-1', role: ProjectMemberRole.MEMBER },
                { id: 'member-1', role: ProjectMemberRole.MEMBER },
            ],
        };

        try {
            await createProjectUseCase.execute(input);
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestError);
            expect(error.message).toBe('Member ID duplicated');
        }
    });

    it('should throw not found error when one or more members do not exist', async () => {
        const userRepository: IUserRepository = {
            findById: vitest.fn().mockResolvedValue({ id: 'owner-id' }),
            findByIds: vitest.fn().mockResolvedValue([{ id: 'member-1' }]),
        };

        const projectRepository: IProjectRepository = {
            findByName: vitest.fn().mockResolvedValue(null),
            create: vitest.fn().mockResolvedValue(null),
        };

        const projectMemberRepository: IProjectMemberRepository = {
            createMany: vitest.fn().mockResolvedValue(null),
        };

        const uniqueIdentifierGeneratorService: IUniqueIdentifierGeneratorService = {
            generate: vitest.fn().mockReturnValue('unique-id'),
        };

        const createProjectUseCase = new CreateProjectUseCase(
            userRepository,
            projectRepository,
            projectMemberRepository,
            uniqueIdentifierGeneratorService,
        );

        const input: CreateProjectUseCaseInput = {
            name: 'New Project',
            ownerId: 'owner-id',
            description: 'Project Description',
            members: [
                { id: 'member-1', role: ProjectMemberRole.MEMBER },
                { id: 'invalid', role: ProjectMemberRole.MEMBER },
            ],
        };

        try {
            await createProjectUseCase.execute(input);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundError);
            expect(error.message).toBe('One or more members not found');
        }
    });

    it('should throw bad request error when member role is invalid', async () => {
        const userRepository: IUserRepository = {
            findById: vitest.fn().mockResolvedValue({ id: 'owner-id' }),
            findByIds: vitest.fn().mockResolvedValue([{ id: 'member-1' }, { id: 'member-2' }]),
        };

        const projectRepository: IProjectRepository = {
            findByName: vitest.fn().mockResolvedValue(null),
            create: vitest.fn().mockResolvedValue(null),
        };

        const projectMemberRepository: IProjectMemberRepository = {
            createMany: vitest.fn().mockResolvedValue(null),
        };

        const uniqueIdentifierGeneratorService: IUniqueIdentifierGeneratorService = {
            generate: vitest.fn().mockReturnValue('unique-id'),
        };

        const createProjectUseCase = new CreateProjectUseCase(
            userRepository,
            projectRepository,
            projectMemberRepository,
            uniqueIdentifierGeneratorService,
        );

        const input: CreateProjectUseCaseInput = {
            name: 'New Project',
            ownerId: 'owner-id',
            description: 'Project Description',
            members: [
                { id: 'member-1', role: ProjectMemberRole.MEMBER },
                { id: 'member-2', role: 'INVALID_ROLE' },
            ],
        };

        try {
            await createProjectUseCase.execute(input);
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestError);
            expect(error.message).toBe('Role from user member-2 does not exist');
        }
    });
});
