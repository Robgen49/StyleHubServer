import { ApiProperty } from "@nestjs/swagger";

export class DeleteTypeAttributesDto {

    @ApiProperty({ example: "cars", description: "name of type" })
    readonly name: string;

    @ApiProperty({ example: ["mileage", "color", "engine power", "fuel tank capacity"], description: "names of attributes" })
    readonly attributeNames: string[];
}