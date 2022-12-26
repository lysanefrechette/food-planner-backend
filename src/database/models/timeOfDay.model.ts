import { Model } from 'objection';

export class TimeOfDayModel extends Model {
  id: number;
  name: string;

  static tableName = 'time_of_day';
}
