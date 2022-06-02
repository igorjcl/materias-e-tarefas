import { Activity } from './activity';

export interface SchoolSubjects {
  id: number;
  title: string;
  status: boolean;
  userId: number;
  activities: Activity[];
}
