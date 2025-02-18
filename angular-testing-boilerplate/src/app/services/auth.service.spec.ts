import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
        AuthService,
      ],
    });
    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('debería hacer login correctamente', async () => {
    // given
    const mockResponse = { token: 'faje-jwt-tokem' };
    // when
    const login$ = service.login('user@user.com', 'password12345');
    const loginPromise = firstValueFrom(login$);

    const req = httpTesting.expectOne('/api/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      email: 'user@user.com',
      password: 'password12345',
    });

    req.flush(mockResponse); // simular respuesta exitosa del backend
    // then
    expect(await loginPromise).toEqual(mockResponse);
  });
});

// dos formas de trabajar tewst

// 1- cada test es independiente
// 2- cada test depende del anterior
