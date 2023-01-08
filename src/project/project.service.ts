import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { CreateProjectInput } from './dto/create-project.input';
import type { UpdateProjectInput } from './dto/update-project.input';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  private readonly _repo: Repository<Project>;

  constructor(@InjectRepository(Project) repo: Repository<Project>) {
    this._repo = repo;
  }

  async create(createProjectInput: CreateProjectInput) {
    const project = new Project();

    Object.keys(createProjectInput).forEach((k) => {
      const key = k as keyof CreateProjectInput;

      project.createEntity(key, createProjectInput[key]);
    });

    return this._repo.save(project);
  }

  async findAll() {
    return this._repo.find();
  }

  async findOneById(id: number) {
    return this._repo.findOneBy({ id });
  }

  async findOneByName(name: string) {
    return this._repo.findOneBy({ name });
  }

  async update(updateProjectInput: UpdateProjectInput) {
    const project = await this.findOneById(updateProjectInput.id);

    if (!project) throw new NotFoundException();

    console.log(Object.getPrototypeOf(updateProjectInput));

    Object.keys(updateProjectInput).forEach((k) => {
      const key = k as keyof UpdateProjectInput;

      project.updateEntity(key, updateProjectInput[key]);
    });

    await this._repo.save(project);

    return 'update succeed';
  }

  async remove(id: number) {
    await this._repo.delete(id);

    return 'delete succeed';
  }
}
