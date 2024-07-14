"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCoordDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_coord_dto_1 = require("./create-coord.dto");
class UpdateCoordDto extends (0, mapped_types_1.PartialType)(create_coord_dto_1.CreateCoordDto) {
}
exports.UpdateCoordDto = UpdateCoordDto;
//# sourceMappingURL=update-coord.dto.js.map