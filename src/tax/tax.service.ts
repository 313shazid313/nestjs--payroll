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

  //! create tax
  async createTax(createTaxDto: CreateTaxDto) {
    const existingSlab = await this.taxRepository.findOne({
      where: {
        minSalary: LessThanOrEqual(createTaxDto.maxSalary),
        maxSalary: MoreThanOrEqual(createTaxDto.minSalary),
      },
    });

    if (existingSlab) {
      throw new ConflictException('This slab exists in DB');
    }

    const newTax = this.taxRepository.create(createTaxDto);

    await this.taxRepository.save(newTax);
  }

  async getAllTax() {
    const data = await this.taxRepository.find();

    return data;
  }

  async getTaxById(id: number) {
    return await this.taxRepository.findOne({
      where: { id },
      relations: ['department_id'],
    });
  }
}
