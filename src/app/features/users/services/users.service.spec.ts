import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UsersService } from './users.service';
import { environment } from 'src/environments/environment';
import { Result } from '../models/users';
import { HttpClient } from '@angular/common/http';

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;
  const userUrl = `${environment.apiUrl}?key=${environment.apiKey}&ref=dj79qdvb&results=5`;
  let httpClient: HttpClient;

  const mockData: Result[] = [
    {
      "name": "Jaden Jakubowski",
      "gender": "Female",
      "location": "South America",
      "email": "ncmcaafphd@yahoo.com",
      "age": 30,
      "seniority": 1649370078,
      "phoneNumber": "(188) 810-3215",
      "nationality": "Irish",
      "img": "https://i.picsum.photos/id/1035/5854/3903.jpg?hmac=DV0AS2MyjW6ddofvSIU9TVjj1kewfh7J3WEOvflY8TM"
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        UsersService
      ]
    });
    service = TestBed.inject(UsersService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getusers() method', () => {
    expect(service.getUsers()).toBeDefined();
  });

  it('should retrieve data from the api by get method', () => {
    service.getUsers().subscribe(res => {
      const req = httpTestingController.expectOne(userUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(mockData);
    })
  });

  it('should retrieve data from the api', () => {
    service.getUsers().subscribe(res => {
      expect(res.length).toBeGreaterThan(0);
      expect(res).toBe(mockData);
    });
  });

  it('should not retrieve data from the api', () => {
    const req = httpTestingController.expectNone(userUrl);
    expect(req).toBeUndefined();
  });

});
