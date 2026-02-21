import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @Post(':concertId/:userId')
  reserve(
    @Param('concertId') concertId: string,
    @Param('userId') userId: string,
  ) {
    return this.reservationService.reserve(userId, concertId);
  }
  @Delete(':concertId/:userId')
  cancel(
    @Param('concertId') concertId: string,
    @Param('userId') userId: string,
  ) {
    return this.reservationService.cancel(userId, concertId);
  }
  @Get('me/:userId')
  myReservation(@Param('userId') userId: string) {
    return this.reservationService.getMyReservations(userId);
  }
  @Get()
  async allReservation() {
    return await this.reservationService.getAllReservations();
  }
}
