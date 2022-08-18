import { Controller, Get, UseGuards, Query, Param } from '@nestjs/common';
import { UseRole } from 'src/role/decorator/role.decorator';
import { Role } from 'types/enum/role.enum';
import { AdminService } from '../service/admin.service';
import { ApiQuery, ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { FindAllOptions } from 'types/user.types';
import { SortData } from 'types/enum/admin.enum';

type Sort = FindAllOptions['sort'];

@ApiTags('Admin')
@UseRole(Role.ADMIN)
@UseGuards(JwtAuthGuard)
@Controller('api/admin')
@ApiBearerAuth('Authorization')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'sort', enum: SortData, required: false })
  @ApiParam({ name: 'username', type: String, required: true })
  @Get('findByUsername/:username')
  public async findByUsername(
    @Param('username') username: string,
    @Query('sort') sort?: Sort,
    @Query('limit') limit?: number,
    @Query('page') page?: number,
  ): Promise<any> {
    const options = { sort, limit, page };
    return await this.adminService.findByUsername(username, options);
  }

  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'sort', enum: SortData, required: false })
  @ApiParam({ name: 'email', type: String, required: true })
  @Get('findByEmail/:email')
  public async findByEmail(
    @Param('email') email: string,
    @Query('sort') sort?: Sort,
    @Query('limit') limit?: number,
    @Query('page') page?: number,
  ): Promise<any> {
    const options = { sort, limit, page };
    return await this.adminService.findByEmail(email, options);
  }

  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'sort', enum: SortData, required: false })
  @ApiParam({ name: 'role', type: String, required: true })
  @Get('findByRole/:role')
  public async findByRole(
    @Param('role') role: string,
    @Query('sort') sort?: Sort,
    @Query('limit') limit?: number,
    @Query('page') page?: number,
  ): Promise<any> {
    const options = { sort, limit, page };
    return await this.adminService.findByRole(role, options);
  }
}
