import { BadRequestException, ConflictException } from '@nestjs/common';

export class DriverEntity {
  constructor(
    private id: string,
    private name: string,
    private isDriving: boolean,
  ) {
    if (!this.id) throw new BadRequestException('Id is required');
    if (!this.name) throw new BadRequestException('name is required');
    if (typeof this.isDriving !== 'boolean')
      throw new BadRequestException('isDriving is required');
  }

  //--------GETTERS----------
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getIsDriving() {
    return this.isDriving;
  }

  //--------DOMAIN BEHAVIOR ----------

  updateName(newName: string): void {
    if (newName === this.name)
      throw new ConflictException('You can`t use the same name');

    this.name = newName;
  }

  updateIsDriving(newStatus: boolean): void {
    if (newStatus === this.isDriving)
      throw new ConflictException('You can`t use the same status');

    this.isDriving = newStatus;
  }
}
