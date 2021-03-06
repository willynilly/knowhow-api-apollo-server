exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.bigincrements("id").primary();
      table.text("email_address").notNullable().defaultTo("");
      table.text("phone_number").notNullable().defaultTo("");
      table.text("password").notNullable();
      table.text("first_name").notNullable().defaultTo("");
      table.text("last_name").notNullable().defaultTo("");
      table.text("description").notNullable().defaultTo("");
      table.boolean("is_admin").notNullable().defaultTo(false);
      table
        .boolean("is_verified_by_email_address")
        .notNullable()
        .defaultTo(false);
      table
        .boolean("is_verified_by_phone_number")
        .notNullable()
        .defaultTo(false);
      table.timestamp("created_date").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updated_date").notNullable().defaultTo(knex.fn.now());
      table.boolean("is_active").notNullable().defaultTo(true);
    })
    .createTable("badges", function (table) {
      table.bigincrements("id").primary();
      table
        .bigInteger("author_user_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.text("achievement").notNullable().defaultTo("");
      table.timestamp("created_date").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updated_date").notNullable().defaultTo(knex.fn.now());
      table.boolean("is_active").notNullable().defaultTo(true);
    })
    .createTable("reviews", function (table) {
      table.bigincrements("id").primary();
      table
        .bigInteger("badge_id")
        .notNullable()
        .references("id")
        .inTable("badges")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .bigInteger("requester_user_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .bigInteger("reviewer_user_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table.boolean("is_approved").notNullable().defaultTo(false);
      table.boolean("approval_is_expired").notNullable().defaultTo(false);
      table.boolean("denial_is_expired").notNullable().defaultTo(false);

      table.timestamp("reviewed_date");
      table.timestamp("review_due_date");
      table.timestamp("approval_expiration_date");
      table.timestamp("denial_expiration_date");

      table.text("requester_invite").notNullable().defaultTo("");
      table.timestamp("requester_invite_date");

      table.text("reviewer_comment").notNullable().defaultTo("");
      table.timestamp("reviewer_comment_date");

      table.text("requester_comment").notNullable().defaultTo("");
      table.timestamp("requester_comment_date");

      table.timestamp("created_date").notNullable().defaultTo(knex.fn.now());
      table.timestamp("updated_date").notNullable().defaultTo(knex.fn.now());
      table.boolean("is_active").notNullable().defaultTo(true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("badges")
    .dropTableIfExists("reviews");
};
