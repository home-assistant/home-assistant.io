---
title: "Docker Hub Rate Limit"
description: "Docker Hub is rate limiting how many pulls you can do."
---

## The issue

Docker Hub enforces a limit on how often you can fetch container information from their container registry. For more details, see the [Docker Hub rate limit documentation][docker-rate-limit].

Home Assistant uses Docker Hub as the container registry. When your IP address is rate limited, updating Home Assistant containers will fail.

## The solutions

If you are running watchtower or similar solutions to keep your containers up to date, reconfigure them to check less often. If you are running a Supervised installation, you should also consider removing them completely, since running software alongside the Supervisor is [not supported][unsupported-software].

Once you've done that, you need to wait until the limit is lifted. This can take up to 6 hours.

If you are sharing the IP address with other parties, their usage will also affect you. The Supervisor supports signing in to Docker Hub with an account. With an account, all fetches between the Supervisor and Docker Hub are authenticated and are not limited by the anonymous rate limits. Authenticated users are also rate limited, but that is a dedicated limit tied to your account.

_If you do not have a Docker Hub account [you can create one here][dockerhub-signup]._

To use your Docker Hub credentials with the Supervisor:

1. Go to {% my supervisor_store title="**Settings** > **Apps** > **Install app**" %}.
2. In the top-right corner of the screen, select the three dots {% icon "mdi:dots-vertical" %} menu, and select **Registries**.

3. In the dialog that opens up, select **Add new registry** and enter `docker.io` as the registry, followed by your credentials:

    <p class='img'>
    <img src='/images/screenshots/supervisor_registry_dockerhub.png' alt='Adding authentication for Docker Hub in the Supervisor panel.'>
    Adding authentication for Docker Hub in the Supervisor panel.
    </p>

    {% note %}
    The screenshot above may show `hub.docker.com` as the registry value, but the correct value is `docker.io`. `hub.docker.com` is the website for browsing Docker Hub, while `docker.io` is the registry hostname the Supervisor uses to authenticate.
    {% endnote %}

_If you do not want to use the UI, this can also be done with the [CLI]_

[docker-rate-limit]: https://docs.docker.com/docker-hub/download-rate-limit/
[dockerhub-signup]: https://hub.docker.com/signup
[unsupported-software]: /more-info/unsupported/software/
[CLI]: https://github.com/home-assistant/cli
