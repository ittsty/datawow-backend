import { Concert, Reservation, User } from '../types';

export const users: User[] = [
  {
    id: 'u1',
    email: 'admin@test.com',
    role: 'ADMIN',
  },
  {
    id: 'u2',
    email: 'user@test.com',
    role: 'USER',
  },
];

export const concerts: Concert[] = [
  {
    id: '1',
    name: 'Concert One',
    description: 'testing 123',
    totalSeats: 500,
    reservedSeats: 100,
  },
  {
    id: '2',
    name: 'Concert two',
    description: 'testing 123dsadsadasdasda',
    totalSeats: 500,
    reservedSeats: 500,
  },
];

export const reservations: Reservation[] = [];
