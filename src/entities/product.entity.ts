import { Expose } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Rating } from "./rating.entity";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120, unique: true })
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  img_url: string;

  @Column({ length: 120 })
  type: string;

  @Column()
  quantity_stock: number;

  @Column()
  label: string;

  @Column()
  description:string;

  @OneToMany(type=>Rating,rating=>rating.product,{eager:true})
  ratings:Rating[];

  @Expose({name:'rating_score_avg'})
  rating_score_avg():number {
    return this.ratings.reduce((acc,rate)=>acc+rate.rating_score,0)/this.ratings.length || 0
  } ;
    

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
