export type CreateProjectDTO = {
    name: string;
    ownerId: string;
    description: string;
    members: Array<{
        id: string;
        role: string;
    }>;
}
