// Fixtures for the article that holds rendered Markdown. The slot
// stands in for what Astro renders from a page's Markdown: headings
// carry the `id` Astro gives them.
const sample = `
<p>The paragraph right after the title is the page's lead, set larger
than the text that follows. It links to the <a href="/privacy/">Privacy
Policy</a>.</p>
<p>Body text continues at the reading size, with a
<a href="https://wordpress.com/tos/">link to another site</a>.</p>
<h2 id="1-your-account">1. Your account</h2>
<p>Each section opens with a heading that can be linked to.</p>
<ul>
  <li>The first item in a list.</li>
  <li>A second item, long enough to wrap onto another line at narrow
  widths so the line height and indent can be checked.</li>
</ul>
<h3 id="general-terms">General terms</h3>
<p>Subheadings are set in capitals.</p>
`;

export default {
  title: "Prose",
  description:
    "Article for rendered Markdown: title, lead paragraph, headings, " +
    "lists and links.",
  variants: [
    { name: "with title", props: { title: "Terms of Service" }, slot: sample },
    { name: "without title", slot: sample },
  ],
};
