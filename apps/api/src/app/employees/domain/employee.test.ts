import { EmployeeImplementation } from './employee';
import { CreatedEmployeeEvent } from './events/created-employee.event';

describe('EmployeeImplementation', () => {
  let employee: EmployeeImplementation;
  const properties = {
    id: '1',
    name: 'John Doe',
    payType: 'Hourly',
    payRate: 25,
    customerId: '123',
  };

  beforeEach(() => {
    employee = new EmployeeImplementation(properties);
  });

  it('should return the correct id', () => {
    expect(employee.getId()).toEqual(properties.id);
  });

  it('should return the correct name', () => {
    expect(employee.getName()).toEqual(properties.name);
  });

  it('should return the correct pay type', () => {
    expect(employee.getPayType()).toEqual(properties.payType);
  });

  it('should return the correct pay rate', () => {
    expect(employee.getPayRate()).toEqual(properties.payRate);
  });

  it('should return the correct customer id', () => {
    expect(employee.getCustomerId()).toEqual(properties.customerId);
  });

  it('should apply the CreatedEmployeeEvent when createdSuccessfully is called', () => {
    const spy = jest.spyOn(employee, 'apply');
    employee.createdSuccessfully();
    expect(spy).toHaveBeenCalledWith(new CreatedEmployeeEvent(properties.name));
  });
});
