---
title: "Improved Hass.io build system"
description: "We're introducing a new and improved Hass.io build system for Hass.io and add-ons."
date: 2017-09-26 04:00:00 +0100
date_formatted: "September 26, 2017"
author: Pascal Vizeli
categories: Technology
---

{% note %}
This is going to be a technical post for Hass.io add-on developers and people that run locally build add-ons (not the default).
{% endnote %}

Two months ago we [introduced Hass.io][intro], allowing our users to easily install, update and manage their Home Assistant installation. In this short time we've seen great adoption from the community. Around 20% of our users are choosing Hass.io as their method of running Home Assistant today. We've also seen many add-ons being made available on [the forums][addon-repos]. There are currently 14 reposities full of add-ons being shared!

Hass.io is built on top of Docker, a container runtime. One thing that Docker did not support was dynamic build environements. That was annoying for Hass.io because by supporting multiple CPU architectures, that was exactly what we needed! Luckily this feature has been added in Docker 17.05. By moving to Docker 17.05 as the minimum supported version we will be able to replace our templated Dockerfile approach with standard Dockerfiles that work out of the box. Thanks to [Frenck][frenck] for notifying us of this new build feature.

This change only impacts people that build add-ons or use add-ons that are built locally. You can check if your add-on is building locally on the detail page of add-ons.

{% tip %}

If you are an add-on developer, read [the documentation][publishing-addons] on how to publish your add-ons to Docker Hub. This will greatly improve the user experience.

{% endtip %}

### Template changes

As an add-on developer, you will only have to change one line in your template to make it compatible with the new system. If you wish, you can also change the default build options for your image using the new [`build.json`][build-file] file.

Old:

```dockerfile
FROM %%BASE_IMAGE%%
```

New:

```dockerfile
ARG BUILD_FROM
FROM $BUILD_FROM
```

### When

The new system will become active with Hass.io 0.64 and Host OS 1.1. Host OS 1.1 is available today. Navigate to Advanced Settings in the Hass.io panel to start the OTA update.

We have also updated our build scripts and replaced it with a [builder docker engine][builder]. This builder makes deploying Hass.io components very easy. All basic functionality is supported. If you want more functionality, check out [the builder by the Community Hass.io Add-ons project][community-builder].

[hassio-hardware-image-release]: https://github.com/home-assistant/hassio-build/releases/tag/1.1
[install]: /hassio/installation/
[builder]: https://github.com/home-assistant/hassio-builder
[frenck]: https://github.com/frenck
[build-file]: /developers/hassio/addon_config/#add-on-extended-build
[addon-repos]: https://community.home-assistant.io/tags/hassio-repository
[community-builder]: https://github.com/hassio-addons/build-env
[intro]: /blog/2017/07/25/introducing-hassio/
[publishing-addons]: /developers/hassio/addon_publishing/#custom-add-ons
