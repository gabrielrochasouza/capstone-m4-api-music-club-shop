import { type } from "os";
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
import { Product } from "./product.entity";
import { User } from "./user.entity";
  
  @Entity("ratings")
  export class Rating {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ length: 120 })
    name: string;
  
    @Column({ nullable: true })
    rating_score: number;

    @Column()
    user_id:string;
  
    @Column({ nullable: true })
    message: string;

    @ManyToOne(type=>Product,product=>product.ratings)
    product:Product;

    @ManyToOne(type=>User,user=>user.rating)
    user:User
  
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
  