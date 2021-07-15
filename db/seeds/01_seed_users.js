const users = [
  {
    id: "1",
    email_address: "some_email_address_2",
    phone_number: "some_phone_number_2",
    password: "some_password_2",
    first_name: "Finn",
    last_name: "Weber",
    description:
      "I recently found a job at a bakery and am learning how to bake bread.",
    is_admin: false,
    is_verified: true,
    is_active: true,
  },

  {
    id: "2",
    email_address: "some_email_address_1",
    phone_number: "some_phone_number_1",
    password: "some_password_1",
    first_name: "Aahad",
    last_name: "El Din",
    description: "I am an experienced baker.",
    is_admin: false,
    is_verified: true,
    is_active: true,
  },

  {
    id: "3",
    email_address: "some_email_address_3",
    phone_number: "some_phone_number_3",
    password: "some_password_3",
    first_name: "Fatima",
    last_name: "Saleh",
    description: "I am a mother who is training to become a social worker.",
    is_admin: false,
    is_verified: true,
    is_active: true,
  },

  {
    id: "4",
    email_address: "some_email_address_3",
    phone_number: "some_phone_number_3",
    password: "some_password_3",
    first_name: "Elke",
    last_name: "Schmidt",
    description: "I am a social worker who enjoys mentoring.",
    is_admin: false,
    is_verified: true,
    is_active: true,
  },

  {
    id: "5",
    email_address: "some_email_address_3",
    phone_number: "some_phone_number_3",
    password: "some_password_3",
    first_name: "Lila",
    last_name: "Al Zubi",
    description: "I am a student learning how to fix cars and trucks.",
    is_admin: false,
    is_verified: true,
    is_active: true,
  },

  {
    id: "6",
    email_address: "some_email_address_3",
    phone_number: "some_phone_number_3",
    password: "some_password_3",
    first_name: "Omar",
    last_name: "Awad",
    description:
      "I am a automechanic who loves to teach people about automobiles.",
    is_admin: false,
    is_verified: true,
    is_active: true,
  },

  {
    id: "7",
    email_address: "some_email_address_3",
    phone_number: "some_phone_number_3",
    password: "some_password_3",
    first_name: "Yosef",
    last_name: "Saleh",
    description: "I am a cook who is learning how to cook vegan meals.",
    is_admin: false,
    is_verified: true,
    is_active: true,
  },

  {
    id: "8",
    email_address: "some_email_address_8",
    phone_number: "some_phone_number_8",
    password: "some_password_3",
    first_name: "Jana",
    last_name: "Khatib",
    description: "I am a chef who loves to make different vegan meals.",
    is_admin: false,
    is_verified: true,
    is_active: true,
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert(users);
    });
};
