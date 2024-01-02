import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Type } from './type.model';
import { AttributeService } from 'src/attribute/attribute.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { DeleteTypeAttributesDto } from './dto/delete-type-attributes.dto';

@Injectable()
export class TypeService {

    constructor(
        @InjectModel(Type) private typeTable: typeof Type,
        private attributeService: AttributeService
    ) { }

    private async getIdByName(name: string) {
        const id = (await this.typeTable.findOne({ where: { name: name } })).id
        return id
    }

    async getTypeById(id: number) {
        const type = await this.typeTable.findOne({ where: { id: id } })
        return type
    }

    async getTypeAttributes(name: string) {
        const id = await this.getIdByName(name)
        const attributes = await this.attributeService.getAttibutes(id)
        return attributes
    }

    async createType(createTypeDto: CreateTypeDto) {
        const type = await this.typeTable.create({ name: createTypeDto.name })
        await this.attributeService.createAttributes(type.id, createTypeDto.attributeNames)
        return type
    }

    async updateType(updateTypeDto: UpdateTypeDto) {
        const id = await this.getIdByName(updateTypeDto.oldName)
        console.log(id)
        await this.typeTable.update({ name: updateTypeDto.newName }, { where: { name: updateTypeDto.oldName } })
        await this.attributeService.updateAttributes(id, updateTypeDto.newAttributeNames, updateTypeDto.oldAttributeNames)
    }

    async deleteTypeAttributes(deleteTypeAttibutes: DeleteTypeAttributesDto) {
        const id = await this.getIdByName(deleteTypeAttibutes.name)
        await this.attributeService.deleteAttributes(id, deleteTypeAttibutes.attributeNames)
    }

    async deleteType(name: string) {
        const id = await this.getIdByName(name)
        await this.attributeService.deleteAllAttributes(id)
        await this.typeTable.destroy({ where: { id: id } })
    } 

    async getTypeAttributesById(typeId: number) {
        const type = await this.getTypeById(typeId);
        const attributes = await this.getTypeAttributes(type.name);
        return attributes
    }

}