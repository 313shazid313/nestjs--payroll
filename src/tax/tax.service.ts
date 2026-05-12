import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Tax } from './tax.entity';
import { CreateTaxDto } from './dtos/taxCreate.dto';

@Injectable()
export class TaxService {
  constructor(
    @InjectRepository(Tax)
    private taxRepository: Repository<Tax>,
  ) {}

  async createTax(createTaxDto: CreateTaxDto) {
    const existingSlab = await this.taxRepository.find({
      where: {
        minSalary: LessThanOrEqual(createTaxDto.minSalary),
        maxSalary: MoreThanOrEqual(createTaxDto.maxSalary),
      },
    });

    if (existingSlab) {
      throw new ConflictException('This slab exists in DB');
    }

    const newTax = this.taxRepository.create({
      minSalary: createTaxDto.minSalary,
      maxSalary: createTaxDto.maxSalary,
      percentage: createTaxDto.percentage,
    });

    await this.taxRepository.save(newTax);
  }
}
