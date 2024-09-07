const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Image",
  tableName: "images",
  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },
    url: {
      type: "varchar",
      nullable: false,
    },
    format: {
      type: "varchar",
      nullable: false,
    },
    width: {
      type: "int",
      nullable: false,
    },
    height: {
      type: "int",
      nullable: false,
    },
    size: {
      type: "int",
      nullable: false,
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
});
