import { UserLoggedInHandler } from './user-logged-in.handler';

import { UserLoggedInEvent } from '../../../domain/events/user-logged-in.event';

describe('UserLoggedInHandler', () => {
  let handler: UserLoggedInHandler;

  beforeEach(() => {
    handler = new UserLoggedInHandler();
  });

  it('should handle the UserLoggedInEvent', async () => {
    const event: UserLoggedInEvent = new UserLoggedInEvent('test@test.co');

    const consoleSpy = jest.spyOn(console, 'log');

    await handler.handle(event);

    expect(consoleSpy).toHaveBeenCalledWith('UserLoggedInEvent', event);
  });
});
