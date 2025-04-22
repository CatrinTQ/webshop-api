import { RowDataPacket } from "mysql2";

export interface IProduct extends RowDataPacket{
  id: number;
  title: string;
  description: boolean;
  stock: number;
  price: number;
  image: string;
  created_at: string;
}