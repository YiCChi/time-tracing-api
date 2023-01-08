import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';
import { ProjectService } from './project.service';

@Resolver(() => Project)
export class ProjectResolver {
  private readonly _projectService: ProjectService;

  constructor(projectService: ProjectService) {
    this._projectService = projectService;
  }

  @Mutation(() => Project)
  async createProject(@Args('createProjectInput') createProjectInput: CreateProjectInput) {
    return this._projectService.create(createProjectInput);
  }

  @Query(() => [Project], { name: 'projects', nullable: 'items' })
  async findAll() {
    return this._projectService.findAll();
  }

  @Query(() => Project, { name: 'project', nullable: true })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this._projectService.findOneById(id);
  }

  @Mutation(() => String)
  async updateProject(@Args('updateProjectInput') updateProjectInput: UpdateProjectInput) {
    return this._projectService.update(updateProjectInput);
  }

  @Mutation(() => String)
  async removeProject(@Args('id', { type: () => Int }) id: number) {
    return this._projectService.remove(id);
  }
}
