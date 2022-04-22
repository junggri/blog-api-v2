import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '@src/auth/auth.service';
import { Auth } from '@src/entities/Auth';
import { UserInput } from '@src/user/input/user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@src/auth/guard/auth.guard';
import { AuthenticationError } from 'apollo-server-express';


@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Mutation(() => Auth)
  async login(@Args('data') data: UserInput) {
    const user = await this.authService.validateUser(data);

    if (!user) {
      throw new AuthenticationError('가입되지 않은 유저입니다.');
    }

    if (user) {
      const token = await this.authService.login(data);
      return token;
    }
  }


  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async validate() {
    return 'authorization success';
  }
}
