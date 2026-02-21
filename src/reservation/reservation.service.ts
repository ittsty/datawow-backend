import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { concerts, reservationHistory } from '../mock/bd';
import { randomUUID } from 'crypto';
import { ActionType } from '../types';

@Injectable()
export class ReservationService {
  reserve(userId: string, concertId: string) {
    const concert = concerts.find((c) => c.id === concertId);

    if (!concert) throw new NotFoundException('Concert not found');
    if (concert.reservedSeats >= concert.totalSeats)
      throw new BadRequestException('No seats available');

    const exists = reservationHistory.find(
      (r) => r.userId === userId && r.concertId === concertId,
    );
    if (exists) throw new BadRequestException('Already reserved');

    const history = {
      id: randomUUID(),
      userId,
      concertId,
      action: ActionType.RESERVE,
      createdAt: new Date(),
    };

    reservationHistory.push(history);
    concert.reservedSeats++;

    return reservationHistory;
  }

  cancel(userId: string, concertId: string) {
    const index = reservationHistory.findIndex(
      (r) => r.userId === userId && r.concertId === concertId,
    );

    if (index === -1) throw new NotFoundException('Reservation not found');
    const history = {
      id: randomUUID(),
      userId,
      concertId,
      action: ActionType.CANCEL,
      createdAt: new Date(),
    };

    reservationHistory.push(history);
    const concert = concerts.find((c) => c.id === concertId);
    if (!concert) throw new NotFoundException('Concert not found');
    concert.reservedSeats--;

    return { message: 'Canceled successfully' };
  }

  getMyReservations(userId: string) {
    return reservationHistory.filter((r) => r.userId === userId);
  }

  getAllReservations() {
    return reservationHistory;
  }
}
