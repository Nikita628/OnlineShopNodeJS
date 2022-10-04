export interface IUserDbModel {
  id: number;
  name: string;
  email: string;
}

export interface IUserDbModelCreation extends Omit<IUserDbModel, "id"> {}
