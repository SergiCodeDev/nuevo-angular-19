import {
  // fireEvent,
  render,
  screen,
} from '@testing-library/angular';
import { userEvent } from '@testing-library/user-event';
import { of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let authServiceMock: jest.Mocked<AuthService>;

  beforeEach(async () => {
    authServiceMock = {
      login: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    delete (window as any).location;
    window.location = { href: '' } as any;
  });

  it('debería redirigir al deshaboard en login exitoso', async () => {
    // given
    authServiceMock.login.mockReturnValueOnce(of({ token: 'fake-jwt-token' }));

    await render(LoginComponent, {
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    });

    // when
    // fireEvent.input(screen.getByPlaceholderText('Email'), {target: { value: 'user@user.com' },});
    // fireEvent.input(screen.getByPlaceholderText('Password'), {target: { value: 'password12345' },});
    // fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await userEvent.type(screen.getByPlaceholderText('Email'), 'user@user.com');
    await userEvent.type(
      screen.getByPlaceholderText('Password'),
      'password12345'
    );
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    // then
    expect(authServiceMock.login).toHaveBeenCalledWith(
      'user@user.com',
      'password12345'
    );
    expect(window.location.href).toBe('/deshaboard');
  });

  it('debería dar un error login fallido', async () => {
    // given
    authServiceMock.login.mockReturnValueOnce(
      throwError(() => ({ error: { message: 'Invalid email or password' } }))
    );

    await render(LoginComponent, {
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    });

    // when

    await userEvent.type(screen.getByPlaceholderText('Email'), 'user@user.com');
    await userEvent.type(
      screen.getByPlaceholderText('Password'),
      'errorPassword12345'
    );
    await userEvent.click(screen.getByRole('button', { name: /login/i }));

    // then
    expect(authServiceMock.login).toHaveBeenCalledWith(
      'user@user.com',
      'errorPassword12345'
    );
    const errorMessage = await screen.findByText('Invalid email or password');
    expect(errorMessage).toBeTruthy();
  });
});
