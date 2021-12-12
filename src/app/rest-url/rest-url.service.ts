import { Injectable } from '@angular/core';

@Injectable()
export class RestUrlService {
  constructor() { }

  getRestUrl() {
    var data = require('./restUrl.json');
    return (<any>data)
  }
}
