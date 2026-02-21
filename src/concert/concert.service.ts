import { Injectable, NotFoundException } from "@nestjs/common";

import { randomUUID } from "crypto";
import { concerts } from "src/mock/bd";
import { Concert } from "src/types";

@Injectable()
export class ConcertService {

  findAll(): Concert[] {
    return concerts;
  }

  create(data: {
    name: string;
    description: string;
    totalSeats: number;
  }): Concert {
    const concert: Concert = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      totalSeats: data.totalSeats,
      reservedSeats: 0,
    };
    concerts.push(concert);
    return concert;
  }

  delete(id: string) {
    const index = concerts.findIndex(c => c.id === id);
    if (index === -1)
      throw new NotFoundException("Concert not found");

    concerts.splice(index, 1);
    return { message: "Deleted successfully" };
  }
}
