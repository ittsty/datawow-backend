import { Test, TestingModule } from '@nestjs/testing';
import { ConcertService } from './concert.service';
import { NotFoundException } from '@nestjs/common';
import { concerts } from 'src/mock/bd';

describe('ConcertService', () => {
  let service: ConcertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConcertService],
    }).compile();

    service = module.get<ConcertService>(ConcertService);

    // reset mock DB ทุกครั้งก่อน test
    concerts.length = 0;
  });

  describe('findAll', () => {
    it('should return all concerts', () => {
      concerts.push({
        id: '1',
        name: 'Test Concert',
        description: 'Test Desc',
        totalSeats: 100,
        reservedSeats: 0,
      });

      const result = service.findAll();

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Test Concert');
    });

    it('should return empty array if no concerts', () => {
      const result = service.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('create', () => {
    it('should create a concert correctly', () => {
      const data = {
        name: 'New Concert',
        description: 'Awesome show',
        totalSeats: 200,
      };

      const result = service.create(data);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined(); // randomUUID
      expect(result.name).toBe(data.name);
      expect(result.description).toBe(data.description);
      expect(result.totalSeats).toBe(200);
      expect(result.reservedSeats).toBe(0);

      expect(concerts).toHaveLength(1);
    });
  });

  describe('delete', () => {
    it('should delete concert successfully', () => {
      concerts.push({
        id: 'delete-id',
        name: 'Delete Concert',
        description: '',
        totalSeats: 100,
        reservedSeats: 0,
      });

      const result = service.delete('delete-id');

      expect(result).toEqual({
        message: 'Deleted successfully',
      });

      expect(concerts).toHaveLength(0);
    });

    it('should throw NotFoundException if concert not found', () => {
      expect(() => service.delete('invalid-id')).toThrow(
        NotFoundException,
      );

      expect(() => service.delete('invalid-id')).toThrow(
        'Concert not found',
      );
    });
  });
});