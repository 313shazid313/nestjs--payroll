import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaxService } from './tax.service';
import { CreateTaxDto } from './dtos/taxCreate.dto';

import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Tax')
@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a tax slab',
    description: 'Creates a new tax slab for salary range.',
  })
  @ApiBody({
    type: CreateTaxDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Tax slab created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed',
  })
  async createTax(@Body() createTaxDto: CreateTaxDto) {
    return await this.taxService.createTax(createTaxDto);
  }
}
