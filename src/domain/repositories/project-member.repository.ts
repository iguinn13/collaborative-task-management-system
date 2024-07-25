import { ProjectMember } from '../entities/project-member.entity';

export interface IProjectMemberRepository {
    createMany(projectMembers: Array<ProjectMember>): Promise<Array<ProjectMember>>;
}
