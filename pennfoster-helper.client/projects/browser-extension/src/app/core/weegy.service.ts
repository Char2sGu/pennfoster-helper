import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { load } from 'cheerio';
import { concat, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Weegy {
  constructor(private httpClient: HttpClient) {}

  ask(question: string): Observable<unknown> {
    return concat(
      this.httpClient
        .post(
          'https://www.weegy.com/ItalkService.asmx?KeyService=Italk1029384756!Italkalskdjfhgz!',
          this.buildRequestSoap(question),
          {
            responseType: 'text',
            headers: {
              ['Accept']: '*/*',
              ['SOAPAction']: 'http://tempuri.org/ServiceCustomerEnterBeg',
              ['Content-Type']: 'text/xml; charset=UTF-8',
            },
          },
        )
        .pipe(map((response) => this.parseResponseSoap(response))),
    );
  }

  private buildRequestSoap(question: string): string {
    const $ = load(
      `
    <?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
            <ServiceCustomerEnterBeg xmlns="http://tempuri.org/">
            </ServiceCustomerEnterBeg>
        </soap:Body>
    </soap:Envelope>
    `,
      { xml: true },
    );

    const $parameterContainer = $('ServiceCustomerEnterBeg');
    $parameterContainer
      .append($('<Comment>').text(question))
      .append(
        $('<ConversationText>').text(`<b>User: </b>${question}<br></br>`),
      );

    return $.html().trim();
  }

  private parseResponseSoap(raw: string): string {
    const $ = load(raw);
    const $returns = $('string'); // the response contains multiple return values
    const $result = $($($returns[5]).text()); // the 5th return value is a piece of HTML containing Weegy's answer
    return $($result[0]).text(); // the HTML's first node as a text node is Weegy's answer
  }
}
