import { describe, it, expect } from 'vitest';
import { ProjectInMemoryRepository } from './project-in-memory.repository';
import { Project } from 'src/domain/entities/project.entity';

describe('ProjectInMemoryRepository', () => {
    let repository: ProjectInMemoryRepository;

    beforeEach(() => {
        repository = new ProjectInMemoryRepository();
    });

    it('should create a project successfully', async () => {
        const project = new Project({
            id: '1',
            name: 'Test Project',
            description: 'Test Description',
            owner: { id: 'owner-id' },
        });

        const createdProject = await repository.create(project);

        expect(createdProject).toEqual(project);
        expect(repository['projects'].length).toBe(1);
        expect(repository['projects'][0]).toEqual(project);
    });

    it('should find a project by name', async () => {
        const project = new Project({
            id: '1',
            name: 'Test Project',
            description: 'Test Description',
            owner: { id: 'owner-id' },
        });

        await repository.create(project);

        const foundProject = await repository.findByName('Test Project');

        expect(foundProject).toEqual(project);
    });

    it('should return null if project with name does not exist', async () => {
        const foundProject = await repository.findByName('Nonexistent Project');

        expect(foundProject).toBeNull();
    });
});
