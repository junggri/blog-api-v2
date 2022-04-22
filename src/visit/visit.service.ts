import { Injectable } from '@nestjs/common';
import { VisitInput } from '@src/visit/input/visit.input';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Visit } from '@src/entities';
import { Repository } from 'typeorm';
import { ONE_DAY, SIX_HOURS, TEN_MINUTE } from '../../core/constant';
import { v4 } from 'uuid';
import { ExternalApiModule } from '@src/externalApi/externalApi.module';
import { ExternalApiService } from '@src/externalApi/externalApi.service';
import { DashBoardInput } from '@src/Hit/input/hit.input';
import { DateService } from '@src/date/date.service';

interface ReverseGeoLocation {
  name: string
  code: { id: string, type: string, mappingId: string },
  region: {
    area0: { name: string, coords: any },
    area1: { name: string, coords: any, alias: string },
    area2: { name: string, coords: any },
    area3: { name: string, coords: any },
    area4: { name: string, coords: any }
  }
}

@Injectable()
export class VisitService {

  constructor(
    @InjectRepository(Visit) private visitRepository: Repository<Visit>,
    private readonly dateService: DateService,
    private readonly externalApiService: ExternalApiService,
  ) {
  }

  async getVisitorDashBoard(data: DashBoardInput) {
    const { before, after }: { before: Date, after: Date } = this.dateService.calculateDate(data.frequency);

    const result = await this.visitRepository
      .createQueryBuilder('visit')
      .andWhere('visit.created_at >= :before', { before })
      .andWhere('visit.created_at < after', { after })
      .orderBy('visit.created_at', 'DESC')
      .getMany();

    return result;
  }

  async createVisit(res: Response, data: VisitInput) {
    const identifier = res.req.cookies['visit_identifier'];
    const now = new Date();
    const kst = new Date(now.setHours(now.getHours() + 9));

    if (identifier) {
      const recentDate = await this.visitRepository
        .createQueryBuilder('visit')
        .select()
        .where('identifier = :identifier', { identifier: identifier })
        .getOne();

      const diff = ((kst as any) - (recentDate.updatedAt as any)) / SIX_HOURS;

      if (diff > 1) {
        const updateResult = await this.visitRepository
          .createQueryBuilder('visit')
          .update()
          .set({
            count: () => 'count + 1 ',
          })
          .where('identifier = :identifier', { identifier: identifier })
          .execute();

        return updateResult.affected;
      }
    }

    const newIdentifier = v4();
    const geolocation: ReverseGeoLocation = await this.externalApiService.reverseGeolocation(data);

    const insertResult = await this.visitRepository
      .createQueryBuilder('visit')
      .insert()
      .values({
        identifier: newIdentifier,
        country: geolocation.region.area0.name,
        city: geolocation.region.area1.name,
        regionName: geolocation.region.area2.name,
        regionAddress: geolocation.region.area3.name,
      })
      .execute();

    res.cookie('visit_identifier', newIdentifier, { maxAge: ONE_DAY, httpOnly: true, secure: true });

    return insertResult.identifiers[0].id;
  }
}
