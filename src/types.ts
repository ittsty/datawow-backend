export type Role = 'ADMIN' | 'USER';
export enum ActionType{
  RESERVE = 'RESERVE',
  CANCEL = 'CANCEL',
}

export type User = {
  id: string;
  email: string;
  role: Role;
};

export type Concert = {
  id: string;
  name: string;
  description: string;
  totalSeats: number;
  reservedSeats: number;
};

export type ReservationHistory = {
  id: string;
  userId: string;
  concertId: string;
  action: ActionType;
  createdAt: Date;
};
