import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UsuarioRole {
  ADMIN = 'ADMIN',
  USUARIO = 'USUARIO',
}

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  nome!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  senha!: string;

  @Column({
    type: 'enum',
    enum: UsuarioRole,
    default: UsuarioRole.USUARIO,
  })
  role!: UsuarioRole;
}