---
layout: page
title: "Debugging Hass.io"
description: "Tips and tricks for when things go wrong."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

The following debug tips and tricks are for people who are running the Hass.io image. If you use the generic Linux installer script, you should be able to access your host and logs as per your host.

## {% linkable_title SSH access to the host %}

Create an `authorized_keys` file in the root of your SD card with your public key. Once the device is booted, you can access your device as root over SSH on port 22222.

Windows instructions how to generate and use private/public keys with Putty are [here][windows-keys]. Instead of the droplet instructions, add the public key as per above instructions.

## {% linkable_title Checking the logs %}

```bash
# Logs from the supervisor service on the Host OS
journalctl -f -u resin-supervisor.service

# Hass.io supervisor logs
docker logs hassio_supervisor

# Home Assistant logs
docker logs homeassistant
```

[windows-keys]: https://www.digitalocean.com/community/tutorials/how-to-use-ssh-keys-with-putty-on-digitalocean-droplets-windows-users
