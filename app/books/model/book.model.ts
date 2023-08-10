import { DataTypes, Model, DATE, Sequelize } from "sequelize";
import sequelize from "../../common/sequelize.config";

class Book extends Model {
  public id!: string;
  public title!: string;
  public author!: string;
  public publishedYear!: number;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    author: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    publishedYear: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    createdAt: {
      type: DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DATE,
      allowNull: false,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    },
  },
  {
    tableName: "books",
    sequelize: sequelize,
  }
);

export default Book;
