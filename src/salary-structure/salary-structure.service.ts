import { Injectable } from '@nestjs/common';
import { SalaryStructure } from './salary-structure.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SalaryStructureService {
  constructor(
    @InjectRepository(SalaryStructure)
    private salaryStructureRepository: Repository<SalaryStructure>,
  ) {}
}
