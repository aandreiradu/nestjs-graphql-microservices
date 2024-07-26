import { UnauthorizedException } from '@nestjs/common';

export const authContext = ({ req }) => {
  if (req?.headers?.authorization) {
    console.info('Authoriaztion header is ', req?.headers?.authorization);
    // perform the authorization here
    return {
      user: { id: '123' },
    };
  }

  throw new UnauthorizedException();
};
