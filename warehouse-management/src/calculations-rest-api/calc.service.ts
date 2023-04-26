import { RESTDataSource } from 'apollo-datasource-rest';
import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class CalculationsAPISerivce extends RESTDataSource {
  private host = process.env.REST_API_HOST;

  constructor() {
    super();
    this.baseURL = `http://${this.host}:5000/`;
  }

  async getCalc(): Promise<any> {
    // For some reason i couldn't get this to work with RESTDataSource so i used node-fetch
    const res = await fetch(`http://${this.host}:5000/calculation`);
    const restToText = await res.text();
    return restToText;
  }
}
