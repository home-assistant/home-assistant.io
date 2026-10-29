// Shared values for the Month of "What the Heck?!" page, /what-the-heck/.
//
// The Jekyll page keeps these in its front matter
// (source/what-the-heck/index.html); here they are one module the page and its
// components read, so a link that appears on half the sections is still
// changed in a single place.

/** The forum category every call to action on the page points at. */
export const forumUrl =
  "https://community.home-assistant.io/c/month-of-what-the-heck/61";

/** Real WTHs from the forum, played one at a time in "What is a WTH".
 *  Keep in step with `wth_statements` in the Jekyll page's front matter. */
export const statements = [
  "There’s no dashboard for real-time power usage. What the heck?!",
  "Bluetooth speakers can’t be paired easily. What the heck?!",
  "Sending a notification is far too complicated. What the heck?!",
  "Restoring a full backup takes forever. What the heck?!",
  "I can’t create a helper from a copy of another. What the heck?!",
  "I lose all energy history when I change an energy entity. What the heck?!",
  "There’s no easy way to turn a device on for X amount of time. What the heck?!",
  "Entity graphs don’t update live. What the heck?!",
  "Card visibility can’t be conditioned on time and date. What the heck?!",
  "I can’t see which automations are currently running. What the heck?!",
  "I can’t use a light as a switch. What the heck?!",
  "Scenes can’t restore the state of entities that were off. What the heck?!",
  "There are no battery alerts or replacement tracking. What the heck?!",
  "I can’t set the default dashboard per device instead of per user. What the heck?!",
  "Restoring a backup shows no progress indication. What the heck?!",
  "Designing dashboards on a PC for other devices is hard. What the heck?!",
  "Sidebar tooltips don’t disappear on their own. What the heck?!",
  "I can’t invert the direction of a cover. What the heck?!",
];

/** The replies the statements take turns with: statement n gets reply
 *  n modulo their number. Keep in step with `wth_replies`. */
export const replies = [
  "Oh, right. Obviously!",
  "Duh, why didn’t we think of that?",
  "Fair point. Noted!",
  "Okay, that one’s on us.",
  "Good catch!",
  "Huh. You’re right.",
  "Yep, that should be easier.",
  "Adding it to the list!",
];
