import { Args, Query, Resolver } from '@nestjs/graphql';
import { GoogleService } from '@src/google/google.service';
import { Google } from '@src/entities/Google';
import { Youtube, YoutubeInput } from '@src/entities/Youtube';


@Resolver()
export class GoogleResolver {
  constructor(
    private readonly googleService: GoogleService,
  ) {
  }

  @Query(() => String)
  ping() {
    return 'pong';
  }

  @Query(() => Google)
  async getVisitor() {
    const data: any = await this.googleService.getVisitor();

    return {
      totalsForAllResults: {
        user: JSON.parse(data).totalsForAllResults['ga:users'],
        session: JSON.parse(data).totalsForAllResults['ga:sessions'],
      },
      rows: JSON.parse(data).rows[JSON.parse(data).rows.length - 1][2],
    };
  }

  @Query(() => Youtube)
  async getVideos(@Args('data') data: YoutubeInput) {
    return this.googleService.getVideos(data);
  }


}
