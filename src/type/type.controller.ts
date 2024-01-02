import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TypeService } from './type.service';
import { RoleGuard } from 'src/auth/role.guard';
import { CreateTypeDto } from './dto/create-type.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Type } from './type.model';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Attribute } from 'src/attribute/attribute.model';
import { DeleteTypeAttributesDto } from './dto/delete-type-attributes.dto';

@ApiTags('Types of products')
@Controller('type')
export class TypeController {

    constructor(private typeService: TypeService) { }

    @ApiOperation({ summary: 'Create type with attributes' })
    @ApiResponse({ status: 201, type: Type })
    @Post()
    @UseGuards(new RoleGuard('creator'))
    createType(@Body() createTypeDto: CreateTypeDto) {
        return this.typeService.createType(createTypeDto)
    }

    @ApiOperation({ summary: 'Update type with attributes' })
    @ApiResponse({ status: 200, description: 'void' })
    @Put()
    @UseGuards(new RoleGuard('creator'))
    updateType(@Body() updateTypeDto: UpdateTypeDto) {
        return this.typeService.updateType(updateTypeDto)
    }

    // @ApiOperation({ summary: 'Get type attributes' })
    // @ApiResponse({ status: 200, type: [Attribute] })
    // @ApiParam({ name: 'name', example: '/type/cars' })
    // @Get('/:name')
    // @UseGuards(new RoleGuard('creator'))
    // getType(@Param('name') name: string) {
    // return this.typeService.getTypeAttributes(name)
    // }

    @ApiOperation({ summary: 'Get type attributes' })
    @ApiResponse({ status: 200, type: [Attribute] })
    @ApiParam({ name: 'id', example: '/type/id' })
    @Get('/:id')
    getType(@Param('id') id: number) {
        return this.typeService.getTypeAttributesById(id)
    }

    @ApiOperation({ summary: 'Delete type attributes' })
    @ApiResponse({ status: 200, description: 'void' })
    @Delete()
    @UseGuards(new RoleGuard('creator'))
    deleteTypeAttributes(@Body() deleteTypeAttributesDto: DeleteTypeAttributesDto) {
        return this.typeService.deleteTypeAttributes(deleteTypeAttributesDto)
    }

    @ApiOperation({ summary: 'Delete type' })
    @ApiResponse({ status: 200, description: 'void' })
    @ApiParam({ name: 'name', example: '/type/cars' })
    @Delete('/:name')
    @UseGuards(new RoleGuard('creator'))
    deleteType(@Param('name') name: string) {
        return this.typeService.deleteType(name)
    }
}
