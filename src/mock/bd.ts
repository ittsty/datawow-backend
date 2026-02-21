import { randomUUID } from 'crypto';
import { ActionType, Concert, ReservationHistory, User } from '../types';

export const concerts: Concert[] = [
  {
    id: 'c1',
    name: 'Blackpink World Tour',
    description: 'Live in Bangkok 2026',
    totalSeats: 500,
    reservedSeats: 2,
  },
  {
    id: 'c2',
    name: 'Taylor Swift Eras Tour',
    description: 'Live in Phuket',
    totalSeats: 300,
    reservedSeats: 1,
  },
  {
    id: 'c3',
    name: 'หมดแล้ว Concert',
    description: 'Sold out concert',
    totalSeats: 2,
    reservedSeats: 2,
  },
];

export const reservations: ReservationHistory[] = [
  {
    id: randomUUID(),
    userId: 'u2',
    concertId: 'c1',
    concertName: 'Taylor Swift Eras Tour',
    action: ActionType.RESERVE,
    createdAt: new Date('2024-09-12T10:39:20'),
  },
  {
    id: randomUUID(),
    userId: 'u2',
    concertId: 'c1',
    concertName: 'Taylor Swift Eras Tour',
    action: ActionType.CANCEL,
    createdAt: new Date('2024-09-12T15:00:00'),
  },
  {
    id: randomUUID(),
    userId: 'u1',
    concertId: 'c2',
    concertName: 'Taylor Swift Eras Tour',
    action: ActionType.RESERVE,
    createdAt: new Date('2024-09-12T18:00:00'),
  },
];

export const reservationHistory: ReservationHistory[] = [
  {
    id: randomUUID(),
    userId: 'u2',
    concertId: 'c1',
    concertName: 'Taylor Swift Eras Tour',
    action: ActionType.RESERVE,
    createdAt: new Date('2024-09-12T10:39:20'),
  },
  {
    id: randomUUID(),
    userId: 'u2',
    concertId: 'c1',
    concertName: 'Taylor Swift Eras Tour',
    action: ActionType.CANCEL,
    createdAt: new Date('2024-09-12T15:00:00'),
  },
  {
    id: randomUUID(),
    userId: 'u1',
    concertId: 'c2',
    concertName: 'Taylor Swift Eras Tour',
    action: ActionType.RESERVE,
    createdAt: new Date('2024-09-12T18:00:00'),
  },
];
