import { ApiProperty } from "@nestjs/swagger";

export class UpdateTypeDto {

    @ApiProperty({ example: '1', description: "old name of type" })
    readonly oldName: string

    @ApiProperty({ example: "cars", description: "new name of type" })
    readonly newName: string;

    @ApiProperty({ example: ["mileage", "color", "engine power", "fuel tank capacity"], description: "old names of attributes" })
    readonly oldAttributeNames: string[];

    @ApiProperty({ example: ["mileage", "color", "engine power", "fuel tank capacity"], description: "new names of attributes" })
    readonly newAttributeNames: string[];

}