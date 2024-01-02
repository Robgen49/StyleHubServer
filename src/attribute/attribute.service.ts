import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attribute } from './attribute.model';

@Injectable()
export class AttributeService {
    constructor(@InjectModel(Attribute) private attributeTable: typeof Attribute) { }

    private async createAttribute(typeId: number, name: string) {
        const attribute = await this.attributeTable.create({ typeId: typeId, name: name })
        return attribute
    }

    private async deleteAttribute(typeId: number, name: string) {
        await this.attributeTable.destroy({ where: { typeId: typeId, name: name } })
    }

    private async updateAttribute(typeId: number, newName: string, oldName: string) {
        await this.attributeTable.update({ name: newName }, { where: { typeId: typeId, name: oldName } })
    }

    async getAttibutes(typeId: number) { 
        const attributes = await this.attributeTable.findAll({ where: { typeId: typeId } })
        return attributes
    }

    async updateAttributes(typeId: number, newNames: string[], oldNames: string[]) {
        newNames.forEach(async (newName: string, index: number) => await this.updateAttribute(typeId, newName, oldNames[index]))
    }
    
    async createAttributes(typeId: number, names: string[]) {
        names.forEach(async (name: string) => await this.createAttribute(typeId, name))
    }

    async deleteAttributes(typeId: number, names: string[]) {
        names.forEach(async (name: string) => await this.deleteAttribute(typeId, name))
    }

    async deleteAllAttributes(typeId: number) {
        await this.attributeTable.destroy({ where: { typeId: typeId } })
    }

}