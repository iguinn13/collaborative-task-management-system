import { Injectable } from '@nestjs/common';

import { Project } from 'src/domain/entities/project.entity';
import { IProjectRepository } from 'src/domain/repositories/project.repository';

@Injectable()
export class ProjectInMemoryRepository implements IProjectRepository {
    private projects: Array<Project> = [];

    public async create(project: Project): Promise<Project> {
        this.projects.push(project);

        return project;
    }

    public async findByName(name: string): Promise<Project | null> {
        return this.projects.find((project) => project.name === name) || null;
    }
}
