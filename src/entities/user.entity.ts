import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";
import Cart from "./cart.entity";
import { Rating } from "./rating.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 256, nullable: false })
  name: string;

  @Column({ length: 256, unique: true })
  email: string;

  @Column({ unique: true, nullable: false })
  user_name: string;

  @Column()
  birth_date: string;

  @Column()
  tel: string;

  @Column({ default: false })
  is_adm: boolean;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(type=>Rating,rating=>rating.user)
  rating:Rating;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne((type) => Cart, { eager: true })
  @JoinColumn()
  cart: Cart;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
