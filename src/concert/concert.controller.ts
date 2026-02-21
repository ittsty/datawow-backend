import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ConcertService } from "./concert.service";

@Controller("concert")
export class ConcertController {
  constructor(private concertService: ConcertService) {}

  @Get()
  getAll() {
    return this.concertService.findAll();
  }

  @Post("create")
  create(
    @Body()
    body: {
      name: string;
      description: string;
      totalSeats: number;
    }
  ) {
    return this.concertService.create(body);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.concertService.delete(id);
  }
}
