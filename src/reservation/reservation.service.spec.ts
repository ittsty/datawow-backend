import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  concerts,
  reservations,
  reservationHistory,
} from '../mock/bd';
import { ActionType } from '../types';

describe('ReservationService', () => {
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationService],
    }).compile();

    service = module.get<ReservationService>(ReservationService);

    // reset mock db ทุกครั้ง
    concerts.length = 0;
    reservations.length = 0;
    reservationHistory.length = 0;
  });

  describe('reserve', () => {
    it('should throw if concert not found', () => {
      expect(() =>
        service.reserve('user1', 'invalid'),
      ).toThrow(NotFoundException);
    });

    it('should throw if seats are full', () => {
      concerts.push({
        id: 'c1',
        name: 'Concert',
        description: '',
        totalSeats: 1,
        reservedSeats: 1,
      });

      expect(() =>
        service.reserve('user1', 'c1'),
      ).toThrow(BadRequestException);
    });

    it('should throw if already reserved', () => {
      concerts.push({
        id: 'c1',
        name: 'Concert',
        description: '',
        totalSeats: 10,
        reservedSeats: 0,
      });

      reservations.push({
        id: 'r1',
        userId: 'user1',
        concertId: 'c1',
        concertName: 'Concert',
        action: ActionType.RESERVE,
        createdAt: new Date(),
      });

      expect(() =>
        service.reserve('user1', 'c1'),
      ).toThrow(BadRequestException);
    });

    it('should reserve successfully', () => {
      concerts.push({
        id: 'c1',
        name: 'Concert',
        description: '',
        totalSeats: 10,
        reservedSeats: 0,
      });

      const result = service.reserve('user1', 'c1');

      expect(reservations).toHaveLength(1);
      expect(reservationHistory).toHaveLength(1);
      expect(concerts[0].reservedSeats).toBe(1);

      expect(result).toHaveLength(1);
    });
  });

  describe('cancel', () => {
    it('should throw if reservation not found', () => {
      expect(() =>
        service.cancel('user1', 'c1'),
      ).toThrow(NotFoundException);
    });

    it('should cancel successfully', () => {
      concerts.push({
        id: 'c1',
        name: 'Concert',
        description: '',
        totalSeats: 10,
        reservedSeats: 1,
      });

      reservations.push({
        id: 'r1',
        userId: 'user1',
        concertId: 'c1',
        concertName: 'Concert',
        action: ActionType.RESERVE,
        createdAt: new Date(),
      });

      const result = service.cancel('user1', 'c1');

      expect(result).toEqual({
        message: 'Canceled successfully',
      });

      expect(reservations).toHaveLength(0);
      expect(reservationHistory).toHaveLength(1);
      expect(concerts[0].reservedSeats).toBe(0);
    });
  });

  describe('getMyReservations', () => {
    it('should return active reservations only', () => {
      reservations.push(
        {
          id: '1',
          userId: 'user1',
          concertId: 'c1',
          concertName: 'Concert 1',
          action: ActionType.RESERVE,
          createdAt: new Date(),
        },
        {
          id: '2',
          userId: 'user1',
          concertId: 'c2',
          concertName: 'Concert 2',
          action: ActionType.RESERVE,
          createdAt: new Date(),
        },
        {
          id: '3',
          userId: 'user1',
          concertId: 'c2',
          concertName: 'Concert 2',
          action: ActionType.CANCEL,
          createdAt: new Date(),
        },
      );

      const result = service.getMyReservations('user1');

      expect(result).toEqual(['c1']);
    });
  });

  describe('getAllReservations', () => {
    it('should return reservation history', () => {
      reservationHistory.push({
        id: '1',
        userId: 'user1',
        concertId: 'c1',
        concertName: 'Concert',
        action: ActionType.RESERVE,
        createdAt: new Date(),
      });

      const result = service.getAllReservations();

      expect(result).toHaveLength(1);
    });
  });
});