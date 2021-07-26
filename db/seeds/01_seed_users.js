const bcrypt = require("bcrypt");

let users = [
  {
    id: "1",
    email_address: "email_address_1",
    phone_number: "phone_number_1",
    password: "password_1",
    first_name: "Finn",
    last_name: "Weber",
    description:
      "I recently found a job at a bakery and am learning how to bake bread.",
    is_admin: false,
    is_verified_by_email_address: true,
    is_verified_by_phone_number: true,
    is_active: true,
  },

  {
    id: "2",
    email_address: "email_address_2",
    phone_number: "phone_number_2",
    password: "password_2",
    first_name: "Aahad",
    last_name: "El Din",
    description: "I am an experienced baker.",
    is_admin: false,
    is_verified_by_email_address: true,
    is_verified_by_phone_number: true,
    is_active: true,
  },

  {
    id: "3",
    email_address: "email_address_3",
    phone_number: "phone_number_3",
    password: "password_3",
    first_name: "Fatima",
    last_name: "Saleh",
    description: "I am a mother who is training to become a social worker.",
    is_admin: false,
    is_verified_by_email_address: true,
    is_verified_by_phone_number: true,
    is_active: true,
  },

  {
    id: "4",
    email_address: "email_address_4",
    phone_number: "phone_number_4",
    password: "password_4",
    first_name: "Elke",
    last_name: "Schmidt",
    description: "I am a social worker who enjoys mentoring.",
    is_admin: false,
    is_verified_by_email_address: true,
    is_verified_by_phone_number: true,
    is_active: true,
  },

  {
    id: "5",
    email_address: "email_address_5",
    phone_number: "phone_number_5",
    password: "password_5",
    first_name: "Lila",
    last_name: "Al Zubi",
    description: "I am a student learning how to fix cars and trucks.",
    is_admin: false,
    is_verified_by_email_address: true,
    is_verified_by_phone_number: true,
    is_active: true,
  },

  {
    id: "6",
    email_address: "email_address_6",
    phone_number: "phone_number_6",
    password: "password_6",
    first_name: "Omar",
    last_name: "Awad",
    description:
      "I am a automechanic who loves to teach people about automobiles.",
    is_admin: false,
    is_verified_by_email_address: true,
    is_verified_by_phone_number: true,
    is_active: true,
  },

  {
    id: "7",
    email_address: "email_address_7",
    phone_number: "phone_number_7",
    password: "password_7",
    first_name: "Yosef",
    last_name: "Saleh",
    description: "I am a cook who is learning how to cook vegan meals.",
    is_admin: false,
    is_verified_by_email_address: true,
    is_verified_by_phone_number: true,
    is_active: true,
  },

  {
    id: "8",
    email_address: "email_address_8",
    phone_number: "phone_number_8",
    password: "password_8",
    first_name: "Jana",
    last_name: "Khatib",
    description: "I am a chef who loves to make different vegan meals.",
    is_admin: false,
    is_verified_by_email_address: true,
    is_verified_by_phone_number: true,
    is_active: true,
  },
];

// hash the user passwords with salt
const saltRounds = 10;
users = users.map((user) => {
  user.password = bcrypt.hashSync(user.password, saltRounds);
  return user;
});

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(async function () {
      // Inserts seed entries
      const i_users = await knex("users").insert(users);
      // update the id sequence
      await knex.raw("select setval('users_id_seq', max(id)) from users");
      return i_users;
    });
};
