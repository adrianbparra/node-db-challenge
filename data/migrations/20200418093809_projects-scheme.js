
exports.up = function(knex) {
    return ( 
        knex.schema
            .createTable("projects", tbl => {
                tbl.increments("id")
                tbl.string("name").notNullable()
                tbl.text("description")
                tbl.boolean("complete").defaultTo(false).notNullable()
            })
            .createTable("tasks", tbl => {
                tbl.increments("id")
                tbl.text("description").notNullable()
                tbl.text("notes")
                tbl.integer("project_id")
                    .notNullable()
                    .unsigned()
                    .references("id")
                    .inTable("projects")
                    .onDelete("CASCADE")
                    .onUpdate("CASCADE")
                tbl.boolean("complete").defaultTo(false).notNullable()
            })
            .createTable("resources", tbl => {
                tbl.increments("id")
                tbl.string("name").notNullable().unique()
                tbl.text("description")
                tbl.integer("project_id")
                    .notNullable()
                    .unsigned()
                    .references("id")
                    .inTable("projects")
                    .onDelete("CASCADE")
                    .onUpdate("CASCADE")
            })
    )
};

exports.down = function(knex) {
  return (
      knex.schema
    .dropTableIfExists("resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("projects")
  )
};
