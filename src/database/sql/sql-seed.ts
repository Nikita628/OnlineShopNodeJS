import { RowDataPacket } from "mysql2";
import { IProduct } from "../../models/product";
import { dbPool } from "./sql";

const products: IProduct[] = [
  {
    id: '',
    title: "adipisicing",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi!",
    imageUrl:
      "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg",
    price: 123.33,
  },
  {
    id: '',
    title: "amet consectetur",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, modi!",
    imageUrl:
      "https://www.theeastnashvillian.com/wp-content/uploads/2020/07/Placeholder-template-image-1.jpg",
    price: 444.5,
  },
];

export async function seed() {
  try {
    //await dbPool.execute('DROP TABLE products;');

    await dbPool.execute(`
    CREATE TABLE IF NOT EXISTS products (
        id int NOT NULL AUTO_INCREMENT,
        title varchar(255) NOT NULL,
        imageUrl varchar(2000) NOT NULL,
        description TEXT NOT NULL,
        price double not null,
        PRIMARY KEY (Id)
      );
    `);

    const [rows] = await dbPool.execute(`
        SELECT COUNT(*) as count FROM products;
    `);

    if ((rows as RowDataPacket[])[0].count === 0) {
      // if table is empty, seed it
        for (const p of products) {
            await dbPool.execute(`
                INSERT INTO products (title, imageUrl, description, price)
                VALUES ('${p.title}', '${p.imageUrl}', '${p.description}', ${p.price});
            `);
        } 
    }

    //const [productsRows] = await dbPool.execute('select * from products');
    //console.log(productsRows);
  } catch (error) {
    console.error("seed error: ", error);
  }
}
