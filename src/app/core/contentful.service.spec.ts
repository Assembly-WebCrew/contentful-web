import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { ContentfulService } from './contentful.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ContentfulService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      providers: [ContentfulService]
    });
  });

  it('should be created', inject([ContentfulService], (service: ContentfulService) => {
    expect(service).toBeTruthy();
  }));
});
