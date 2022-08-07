---
title: "Docker Hub Rate Limit"
description: "Docker Hub is rate-limiting how many pull you can do."
---

## The issue

Docker Hub enforces a limit on how much you are allowed to fetch container information from their container registry. [Read more about how it's handled here][docker-rate-limit].

Home Assistant uses Docker Hub as the container registry. When your IP address is rate limited updating our containers will fail.

## The solutions

If you are running watchtower or similar solutions to keep your containers up to date, you need to reconfigure them to check less often than the default configuration. If you are running a Supervised installation, you should also consider removing them completely since running those alongside the Supervisor is [not supported][unsupported-container].

When this is done, you need to wait until the limit has lifted, this can take up to 6 hours.

If you are sharing the IP address with other parties, their usage will also affect you. The Supervisor supports logging in to Docker Hub with an account, with this approach, all the fetches between the Supervisor and Docker Hub will be using authentication and will not be limited by the anonymous rate limits. Authenticated users are also rate limited, but that is a dedicated limit tied to your account.

_If you do not have a Docker Hub account [you can create one here][dockerhub-signup]._

To use your Docker Hub credentials with the Supervisor:

- You need to have the advanced user toggle enabled in your user profile setting.
- Go to the {% my supervisor title="Settings > Add-ons" %} in the Home Assistant UI.
- Click on "Add-on Store".
- Click the three dots in the top right corner of the screen, and select "Registries".

In the dialog that opens up, click on "Add new registry" and enter `hub.docker.com` as the registry followed by your credentials:

<p class='img'>
<img src='/images/screenshots/supervisor_registry_dockerhub.png' alt='Adding authentication for Docker Hub in the Supervisor panel.'>
Adding authentication for Docker Hub in the Supervisor panel
</p>

_If you do not want to use the UI, this can also be done with the [CLI]_

[docker-rate-limit]: https://docs.docker.com/docker-hub/download-rate-limit/
[dockerhub-signup]: https://hub.docker.com/signup
[unsupported-container]: /more-info/unsupported/container.md
[CLI]: https://github.com/home-assistant/cli
