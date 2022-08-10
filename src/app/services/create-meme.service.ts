import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CreateMemeService {
  private url = 'http://localhost:4200/api';

  constructor(private httpClient: HttpClient) {}

  createMeme(memeId: string, firstText: string, secondText: string) {
    const body = new HttpParams()
      .set('username', 'erc2804')
      .set('password', 'Test#123456!')
      .set('template_id', memeId)
      .set('boxes[0][text]', firstText)
      .set('boxes[1][text]', secondText);

    return this.httpClient.post<any>(this.url, body);
  }
}
