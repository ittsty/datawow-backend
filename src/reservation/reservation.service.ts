import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { concerts, reservations, reservationHistory } from '../mock/bd';
import { randomUUID } from 'crypto';
import { ActionType } from '../types';

@Injectable()
export class ReservationService {
  reserve(userId: string, concertId: string) {
    const concert = concerts.find((c) => c.id === concertId);
    const concertIndex = concerts.findIndex((c) => c.id === concertId);
    if (!concert) throw new NotFoundException('Concert not found');
    if (concert.reservedSeats >= concert.totalSeats)
      throw new BadRequestException('No seats available');

    const exists = reservations.find(
      (r) => r.userId === userId && r.concertId === concertId,
    );
    if (exists) throw new BadRequestException('Already reserved');

    const history = {
      id: randomUUID(),
      userId,
      concertId,
      concertName: concerts[concertIndex].name,
      action: ActionType.RESERVE,
      createdAt: new Date(),
    };

    reservations.push(history);
    reservationHistory.push(history);
    concert.reservedSeats++;

    return reservationHistory;
  }

  cancel(userId: string, concertId: string) {
    const index = reservations.findIndex(
      (r) => r.userId === userId && r.concertId === concertId,
    );
    const concert = concerts.find((c) => c.id === concertId);
    const concertIndex = concerts.findIndex((c) => c.id === concertId);
    if (index === -1) throw new NotFoundException('Reservation not found');
    const history = {
      id: randomUUID(),
      userId,
      concertId,
      concertName: concerts[concertIndex].name,
      action: ActionType.CANCEL,
      createdAt: new Date(),
    };

    reservations.splice(index, 1);
    reservationHistory.push(history);
    if (!concert) throw new NotFoundException('Concert not found');
    concert.reservedSeats--;

    return { message: 'Canceled successfully' };
  }
  getMyReservations(userId: string) {
    const userHistory = reservations.filter((r) => r.userId === userId);

    const activeReservations = new Map<string, boolean>();

    userHistory.forEach((h) => {
      if (h.action === 'RESERVE') {
        activeReservations.set(h.concertId, true);
      }

      if (h.action === 'CANCEL') {
        activeReservations.delete(h.concertId);
      }
    });

    return Array.from(activeReservations.keys());
  }
  getAllReservations() {
    return reservationHistory;
  }

  getStats() {
    const totalSeats = concerts.reduce((sum, c) => sum + c.totalSeats, 0);

    const reserveCount = reservationHistory.filter(
      (r) => r.action === 'RESERVE',
    ).length;

    const cancelCount = reservationHistory.filter(
      (r) => r.action === 'CANCEL',
    ).length;

    return {
      totalSeats,
      reserveCount,
      cancelCount,
    };
  }
}
