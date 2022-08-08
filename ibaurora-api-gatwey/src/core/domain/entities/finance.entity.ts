import { BaseEntity } from '../../base/entities/base.entity';

export class Finance extends BaseEntity {
  public value: number;
  public title: string;
  public type: string;
}
