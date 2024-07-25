import { describe, it, expect, beforeEach } from 'vitest';

import { ProjectMember, ProjectMemberRole } from '../../../../domain/entities/project-member.entity';
import { ProjectMemberInMemoryRepository } from './project-member-in-memory.repository';

describe('ProjectMemberInMemoryRepository', () => {
    let repository: ProjectMemberInMemoryRepository;

    beforeEach(() => {
        repository = new ProjectMemberInMemoryRepository();
    });

    it('should create multiple project members successfully', async () => {
        const projectMembers = [
            new ProjectMember({ id: '1', userId: 'user1', projectId: 'project1', role: ProjectMemberRole.MEMBER }),
            new ProjectMember({ id: '2', userId: 'user2', projectId: 'project1', role: ProjectMemberRole.MEMBER }),
        ];

        const createdProjectMembers = await repository.createMany(projectMembers);

        expect(createdProjectMembers).toEqual(projectMembers);
        expect(repository['projectMembers'].length).toBe(2);
        expect(repository['projectMembers']).toEqual(projectMembers);
    });

    it('should add project members to the existing list', async () => {
        const initialProjectMember = new ProjectMember({ id: '1', userId: 'user1', projectId: 'project1', role: ProjectMemberRole.MEMBER });
        await repository.createMany([initialProjectMember]);

        const newProjectMembers = [
            new ProjectMember({ id: '2', userId: 'user2', projectId: 'project1', role: ProjectMemberRole.MEMBER }),
            new ProjectMember({ id: '3', userId: 'user3', projectId: 'project1', role: ProjectMemberRole.MEMBER }),
        ];

        await repository.createMany(newProjectMembers);

        expect(repository['projectMembers'].length).toBe(3);
        expect(repository['projectMembers']).toEqual([initialProjectMember, ...newProjectMembers]);
    });
});
