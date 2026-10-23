// Fixtures for the social links row on the link-in-bio page (/bio/). Not
// a port of a Jekyll content tag, so there is no `liquid` source.
export default {
  title: "BioSocials",
  description: "Text pills linking to Home Assistant on other platforms.",
  variants: [
    {
      name: "four platforms",
      props: {
        links: [
          { platform: "mastodon", url: "https://fosstodon.org/@homeassistant", label: "Mastodon" },
          { platform: "youtube", url: "https://www.youtube.com/@home_assistant", label: "YouTube" },
          { platform: "github", url: "https://github.com/home-assistant", label: "GitHub" },
          { platform: "discord", url: "https://www.home-assistant.io/join-chat/", label: "Discord" },
        ],
      },
    },
  ],
};
