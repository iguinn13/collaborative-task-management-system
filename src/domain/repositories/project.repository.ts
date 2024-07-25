import { Project } from '../entities/project.entity';

export interface IProjectRepository {
    create(project: Project): Promise<Project>;
    findByName(name: string): Promise<Project | null>;
}
