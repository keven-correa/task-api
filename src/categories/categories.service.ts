import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const {name} = createCategoryDto;
    const newCategory = await  this.categoryRepository.create({
      name
    });
    await this.categoryRepository.save(newCategory);
    return newCategory;
  }

  async findAll(): Promise<Category[]> {
    const query = this.categoryRepository.createQueryBuilder('categories');
    const categories = await query.getMany();
    return categories;
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({where: {id}});

    if(!category){
      throw new NotFoundException(`The category with ${id} not found.`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    await this.categoryRepository.update(id, updateCategoryDto);
    const updated = await this.categoryRepository.findOne({where: {id}});
    if (updated) {
      return updated;
    }

    throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: number): Promise<void> {
    const task = await this.categoryRepository.delete(id);
    if(!task.affected){
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }else{
      throw new HttpException('Deleted', HttpStatus.OK)
    }
  }
}
