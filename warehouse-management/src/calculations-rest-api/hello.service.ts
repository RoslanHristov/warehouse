import { RESTDataSource } from 'apollo-datasource-rest';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculationsAPISerivce extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:5000/';
  }

  async getHello(): Promise<any> {
    return await this.get('calculation');
  }
}
