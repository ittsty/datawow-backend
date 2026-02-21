import { ReservationService } from './reservation.service';
import { concerts, reservationHistory } from '../mock/bd';
import { ActionType } from '../types';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('ReservationService', () => {
  let service: ReservationService;

  const userId = 'u1';
  const concertId = '1';

  function resetMockData() {
    reservationHistory.length = 0;

    concerts.length = 0;

    concerts.push({
      id: '1',
      name: 'Concert One',
      description: 'Test concert',
      totalSeats: 2,
      reservedSeats: 0,
    });

    concerts.push({
      id: '2',
      name: 'Full concert',
      description: 'No seats',
      totalSeats: 1,
      reservedSeats: 1,
    });
  }

  beforeEach(() => {
    service = new ReservationService();
    resetMockData();
  });

  describe('reserve', () => {
    it('should reserve successfully', () => {
      const result = service.reserve(userId, concertId);

      expect(result.length).toBe(1);

      expect(result[0]).toMatchObject({
        userId,
        concertId,
        action: ActionType.RESERVE,
      });

      expect(concerts[0].reservedSeats).toBe(1);
    });

    it('should throw if concert not found', () => {
      expect(() =>
        service.reserve(userId, '999'),
      ).toThrow(NotFoundException);
    });

    it('should not allow double reservation', () => {
      service.reserve(userId, concertId);

      expect(() =>
        service.reserve(userId, concertId),
      ).toThrow(BadRequestException);
    });

    it('should throw if no seats available', () => {
      expect(() =>
        service.reserve(userId, '2'),
      ).toThrow(BadRequestException);
    });
  });

  describe('cancel', () => {
    it('should cancel successfully', () => {
      service.reserve(userId, concertId);

      const result = service.cancel(userId, concertId);

      expect(result).toEqual({
        message: 'Canceled successfully',
      });

      expect(reservationHistory.length).toBe(2);

      expect(reservationHistory[1]).toMatchObject({
        action: ActionType.CANCEL,
      });

      expect(concerts[0].reservedSeats).toBe(0);
    });

    it('should throw if reservation not found', () => {
      expect(() =>
        service.cancel(userId, concertId),
      ).toThrow(NotFoundException);
    });

    it('should throw if concert not found during cancel', () => {
      service.reserve(userId, concertId);

      concerts.length = 0;

      expect(() =>
        service.cancel(userId, concertId),
      ).toThrow(NotFoundException);
    });
  });


  describe('getMyReservations', () => {
    it('should return only user reservations', () => {
      service.reserve('u1', '1');
      service.reserve('u2', '1');

      const result = service.getMyReservations('u1');

      expect(result.length).toBe(1);
      expect(result[0].userId).toBe('u1');
    });
  });


  describe('getAllReservations', () => {
    it('should return all reservations', () => {
      service.reserve('u1', '1');
      service.reserve('u2', '1');
      const result = service.getAllReservations();
      expect(result.length).toBe(2);
    });
  });
});
