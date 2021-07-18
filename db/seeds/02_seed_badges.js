const badges = [
  {
    id: "1",
    author_user_id: "1",
    achievement: "I baked a loaf of rye bread.",
    is_active: true,
  },

  {
    id: "2",
    author_user_id: "1",
    achievement: "I baked a loaf of sourdough bread.",
    is_active: true,
  },

  {
    id: "3",
    author_user_id: "1",
    achievement: "I baked a loaf of wheat bread.",
    is_active: true,
  },

  {
    id: "4",
    author_user_id: "1",
    achievement: "I baked a loaf of raisin bread.",
    is_active: true,
  },

  {
    id: "5",
    author_user_id: "3",
    achievement: "I greeted a client in German.",
    is_active: true,
  },

  {
    id: "6",
    author_user_id: "4",
    achievement: "I greeted a client in Arabic.",
    is_active: true,
  },

  {
    id: "7",
    author_user_id: "5",
    achievement: "I changed the oil of a VW Polo.",
    is_active: true,
  },

  {
    id: "8",
    author_user_id: "5",
    achievement: "I changed the tire of a VW Polo.",
    is_active: true,
  },

  {
    id: "9",
    author_user_id: "7",
    achievement: "I peeled and chopped an avocado.",
    is_active: true,
  },

  {
    id: "10",
    author_user_id: "7",
    achievement: "I peeled and chopped an onion.",
    is_active: true,
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("badges")
    .del()
    .then(async function () {
      // Inserts seed entries
      let i_badges = await knex("badges").insert(badges);
      await knex.raw("select setval('badges_id_seq', max(id)) from badges");
      return i_badges;
    });
};
