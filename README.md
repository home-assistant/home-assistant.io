Home Assistant Website

This repo contains the full source code for the Home Assistant website (https://home-assistant.io).

🔗 Access Points

Each branch deploys to a different live environment:

Production (current): https://www.home-assistant.io
Beta (rc): https://rc.home-assistant.io
Development (next): https://next.home-assistant.io

Every pull request automatically gets a Netlify preview linked in the first PR comment.

🛠️ Contributing & Setup

Full contribution and documentation guidelines are here:
https://developers.home-assistant.io/docs/documenting/

Follow that guide to install dependencies, run the site locally, and submit PRs.

🚀 Local Preview

Start a local preview server on http://127.0.0.1:4000:

bundle exec rake preview

Serve it to another device on your network by passing your local IP:

bundle exec rake preview[192.168.0.123]
⚡ Speed Up Build Times

Large changelogs make builds slow — use these helper commands when editing blog posts:

Isolate one specific post:

bundle exec rake isolate[filename-of-blogpost]

Re-enable all posts after you're done:

bundle exec rake integrate