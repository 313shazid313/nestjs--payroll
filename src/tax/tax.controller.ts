import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TaxService } from './tax.service';
import { CreateTaxDto } from './dtos/tax.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Tax')
@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a tax slab',
    description: 'Creates a new tax slab for a given salary range.',
  })
  @ApiBody({
    type: CreateTaxDto,
    description: 'Payload to create a tax slab',
  })
  @ApiResponse({
    status: 201,
    description: 'Tax slab created successfully',
    type: CreateTaxDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation failed',
  })
  createTax(@Body() createTaxDto: CreateTaxDto) {
    return this.taxService.createTax(createTaxDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all tax slabs',
    description: 'Returns a list of all tax slabs.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of tax slabs retrieved successfully',
    type: [CreateTaxDto],
  })
  getAllTaxes() {
    return this.taxService.getAllTax();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get tax slab by ID',
    description: 'Returns a single tax slab by its ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Tax slab ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Tax slab found',
    type: CreateTaxDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Tax slab not found',
  })
  singleTax(@Param('id', ParseIntPipe) id: number) {
    return this.taxService.getTaxById(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update tax slab',
    description: 'Updates an existing tax slab by ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Tax slab ID',
  })
  @ApiBody({
    type: CreateTaxDto,
    description: 'Updated tax slab data',
  })
  @ApiResponse({
    status: 200,
    description: 'Tax slab updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Tax slab not found',
  })
  updateTax(
    @Param('id', ParseIntPipe) id: number,
    @Body() createTaxDto: CreateTaxDto,
  ) {
    return this.taxService.updateTax(id, createTaxDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete tax slab',
    description: 'Deletes a tax slab by ID.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Tax slab ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Tax slab deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Tax slab not found',
  })
  deleteTax(@Param('id', ParseIntPipe) id: number) {
    return this.taxService.deleteTax(id);
  }
}
