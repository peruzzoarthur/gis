import { Test, TestingModule } from '@nestjs/testing';
import { RasterController } from './raster.controller';
import { RasterService } from './raster.service';

describe('RasterController', () => {
  let controller: RasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RasterController],
      providers: [RasterService],
    }).compile();

    controller = module.get<RasterController>(RasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
