import { Injectable } from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';

@Injectable()
export class DatabaseService {
  private db: JsonDB;

  constructor() {
    this.db = new JsonDB(new Config('database', true, true));
  }

  async createEntity(entityType: string, entity: any) {
    await this.db.push(`/${entityType}`, entity);
  }

  async getEntities(entityType: string) {
    if (!(await this.db.exists(`/${entityType}`))) return [];
    return await this.db.getData(`/${entityType}`);
  }

  async getEntity(entityType: string, id: string) {
    return await this.db.find(`/${entityType}`, (entity) => entity.id === id);
  }

  async updateEntity(entityType: string, id: string, entity: any) {
    const newEntity = { id, ...entity };
    const entityIndex = await this.db.getIndex(`/${entityType}`, id);
    return await this.db.push(`/${entityType}[${entityIndex}]`, entity, true);
    // true means overwrite
    // does it mean i don't need to use Object.assign?
    //  yes, you don't need to use Object.assign
  }

  async deleteEntity(entityType: string, id: string) {
    const index = await this.db.getIndex(`/${entityType}`, id);
    await this.db.delete(`/${entityType}[${index}]`);
  }

  async exists(entityType: string, value: string) {
    if (!(await this.db.exists(`/${entityType}`))) return false;
    return await this.db.find(
      `/${entityType}`,
      (entity) => entity.name === value,
    );
  }
}
