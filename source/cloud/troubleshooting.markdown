---
layout: page
title: "Troubleshooting Home Assistant Cloud"
description: "Pointers to help troubleshooting issues with Home Assistant Cloud."
date: 2018-07-17 20:00
sidebar: true
comments: false
sharing: true
footer: true
---

Alright, so you got all excited, tried to setup cloud and it failed? Not to worry, here are some common issues and how to resolve them.

## {% linkable_title Error fetching the cognito keyset %}

This issue can occur by Docker being misconfigured. This issue is especially common for people using the GENERIC installation of Hass.io on top of Ubuntu Bionic or another Linux installation. It is related to IPv6 being incorrectly marked as available.

The solution is to make sure that Docker uses a public available DNS server, like the Google ones. As root, run:

```
mkdir -p /etc/docker
echo '{"dns": ["8.8.8.8", "8.8.4.4"]}' > /etc/docker/daemon.json
```

## {% linkable_title Alexa: We were unable to link Home Assistant at this time. Please try again later %}

Some users are experiencing an issue when they are setting up the Home Assistant skill inside the Alexa app. We are still researching what is going on. Some users have reported that the issue went away if they configured Alexa to not expose all entities. You can try this by changing your cloud configuration like this:

```yaml
# Example configuration.yaml entry configuring Alexa
cloud:
  alexa:
    filter:
      include_entities:
        - light.kitchen
```

If this resolves the issue, please report it in the #cloud channel on Discord as it can help us find the entities that are causing this issue.
