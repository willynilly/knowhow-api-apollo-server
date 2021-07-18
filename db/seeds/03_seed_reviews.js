const reviews = [
  {
    id: "1",
    badge_id: "1",
    requester_user_id: "1",
    reviewer_user_id: "2",
    requester_invite:
      "Mr. El Din, I finished baking the rye bread. Can you submit a review for my work?",
    reviewer_comment: "Well done.",
    requester_comment: "Thank you.",
    is_approved: true,
  },
  {
    id: "2",
    badge_id: "2",
    requester_user_id: "1",
    reviewer_user_id: "2",
    is_approved: true,
  },
  {
    id: "3",
    badge_id: "3",
    requester_user_id: "1",
    reviewer_user_id: "2",
    is_approved: true,
  },
  {
    id: "4",
    badge_id: "4",
    requester_user_id: "1",
    reviewer_user_id: "2",
    is_approved: false,
    is_denied: true,
    reviewer_comment:
      "Unfortunately, you used too many raisins. Try it again and then I will review it again.",
  },
  {
    id: "5",
    badge_id: "5",
    requester_user_id: "3",
    reviewer_user_id: "4",
    reviewer_comment:
      "Fatima is quickly learning German. Her pronunciation is perfect.",
  },
  {
    id: "6",
    badge_id: "6",
    requester_user_id: "4",
    reviewer_user_id: "3",
    reviewer_comment: "Elke is so kind and eager to learn Arabic.",
  },
  {
    id: "7",
    badge_id: "7",
    requester_user_id: "7",
    reviewer_user_id: "8",
    reviewer_comment: "Lila was careful and efficient.",
    requester_comment:
      "Mr. Awad is very knowledgable about the different kinds of oil. I learned a lot from him.",
  },
  {
    id: "8",
    badge_id: "8",
    requester_user_id: "7",
    reviewer_user_id: "8",
    reviewer_comment:
      "I like how you added lemon juice to the avocado after chopping it.",
    requester_comment: "Thank you for teaching me this trick.",
  },
  {
    id: "9",
    badge_id: "9",
    requester_user_id: "5",
    reviewer_user_id: "6",
    reviewer_comment: "I like how you chopped onion into small pieces.",
    requester_comment: "Thanks.",
  },
  {
    id: "10",
    badge_id: "10",
    requester_user_id: "5",
    reviewer_user_id: "6",
    reviewer_comment: "Lila already knew how to change the tire correctly.",
  },
  {
    id: "11",
    badge_id: "4",
    requester_user_id: "1",
    reviewer_user_id: "2",
    is_approved: true,
    is_denied: false,
    requester_invite: "Mr. El Din, can you review my raisin bread again?",
    reviewer_comment:
      "Looks good. You used the correct amount of raisins this time.",
    requester_comment: "Thanks, I used a measuring cup.",
  },
];

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("reviews")
    .del()
    .then(async function () {
      // Inserts seed entries
      let i_reviews = await knex("reviews").insert(reviews);
      await knex.raw("select setval('reviews_id_seq', max(id)) from reviews");
      return i_reviews;
    });
};
