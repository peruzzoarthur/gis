"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRasterDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_raster_dto_1 = require("./create-raster.dto");
class UpdateRasterDto extends (0, mapped_types_1.PartialType)(create_raster_dto_1.CreateRasterDto) {
}
exports.UpdateRasterDto = UpdateRasterDto;
//# sourceMappingURL=update-raster.dto.js.map