import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RaintigCreationAttributes, Raiting } from './raiting.model';
import { UpdateRaitingDto } from './dto/update-raiting.dto';
import { DeleteRaitingDto } from './dto/delete-raiting.dto';

@Injectable()
export class RaitingService {

    constructor(@InjectModel(Raiting) private raitingTable: typeof Raiting) { }

    async createRaiting(raiting: RaintigCreationAttributes) {
        if (await this.raitingTable.findOne({ where: { userId: raiting.userId, productId: raiting.productId } }))
            throw new HttpException(`user ${raiting.userId} already post raiting to product ${raiting.productId}`, HttpStatus.BAD_REQUEST)
        const newRaiting = await this.raitingTable.create(raiting)
        return newRaiting
    }

    async updateRaing(raiting: UpdateRaitingDto) {
        if (await this.raitingTable.findOne({ where: { userId: raiting.userId, productId: raiting.productId } })) {
            const updatedRaiting = await this.raitingTable.update(raiting, { where: { userId: raiting.userId, productId: raiting.productId } })
            return updatedRaiting
        }
        throw new HttpException(`user ${raiting.userId} didn't post raitng to product ${raiting.productId}`, HttpStatus.BAD_REQUEST)
    }

    async deleteRaiting(raiting: DeleteRaitingDto) {
        if (await this.raitingTable.findOne({ where: { userId: raiting.userId, productId: raiting.productId } })) {
            return await this.raitingTable.destroy({ where: { userId: raiting.userId, productId: raiting.productId } })
        }
        throw new HttpException(`user ${raiting.userId} didn't post raitng to product ${raiting.productId}`, HttpStatus.BAD_REQUEST)
    }

    async getUserRaintings(userId: number) {
        const raitings = await this.raitingTable.findAll({ where: { userId: userId } })
        return raitings
    }

    async getProductRaintings(productId: number) {
        const raitings = await this.raitingTable.findAll({ where: { productId: productId } })
        return raitings
    }

}