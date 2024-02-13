import { CreatedEmployeeEvent } from '../../domain/events/created-employee.event';
import { CreatedEmployeeHandler } from './created-employee-handler.event';

describe('CreatedEmployeeEventHandler', () => {
  let handler: CreatedEmployeeHandler;

  beforeEach(() => {
    handler = new CreatedEmployeeHandler();
  });

  it('should handle the CreatedEmployeeEvent', async () => {
    const event: CreatedEmployeeEvent = {
      name: 'John Doe',
    };

    const consoleSpy = jest.spyOn(console, 'log');

    await handler.handle(event);

    expect(consoleSpy).toHaveBeenCalledWith('CreatedEmployeeEvent', event);
  });
});
