import { ProjectMember } from '../../../../domain/entities/project-member.entity';
import { IProjectMemberRepository } from '../../../../domain/repositories/project-member.repository';

export class ProjectMemberInMemoryRepository implements IProjectMemberRepository {
    private projectMembers: Array<ProjectMember> = [];

    public async createMany(projectMembers: Array<ProjectMember>): Promise<Array<ProjectMember>> {
        for (const projectMember of projectMembers) this.projectMembers.push(projectMember);
        return projectMembers;
    }
}
