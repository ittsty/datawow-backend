export type Role = 'ADMIN' | 'USER';

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

export type Reservation = {
  id: string;
  userId: string;
  concertId: string;
};
