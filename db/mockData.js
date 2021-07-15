const users = [
    {id: 1, first_name: "Ali"},
    {id: 2, first_name: "Hans"},
    {id: 3, first_name: "Fatima"},
    {id: 4, first_name: "Elke"},
    {id: 5, first_name: "Lila"}
];
  
const badges = [
    {id: 1, achievement: "I baked a loaf of rye bread."},
    {id: 2, achievement: "I proved that 1 + 2 + 3 ... + n = n(n + 1)/2."},
    {id: 3, achievement: "I changed a large truck tire."},
    {id: 4, achievement: "I identified a ripe avacado in the grocery store."}
];

const reviews = [
    {id: 1, badge: badges[0], requestor: users[0], reviewer: users[1], is_approved: true, is_denied: false},
    {id: 1, badge: badges[0], requestor: users[2], reviewer: users[3], is_approved: false, is_denied: true},
    {id: 1, badge: badges[0], requestor: users[3], reviewer: users[2], is_approved: true, is_denied: false}
];

module.exports = {
    users: users, 
    badges: badges, 
    reviews: reviews
}