---
layout: page
title: "Debugging Hass.io"
description: "Tips and tricks for when things go wrong."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
redirect_from: /hassio/debugging/
---

<p class='note warning'>
This section is not for users. Use the [SSH add-on] to SSH into Hass.io. This is for <b>developers</b> of Hass.io. Do not ask for support if you are using these options.
</p>

[SSH add-on]: /addons/ssh/

The following debug tips and tricks are for people who are running the Hass.io image and are working on the base image. If you use the generic Linux installer script, you should be able to access your host and logs as per your host.

## {% linkable_title SSH access to the host %}

Create an `authorized_keys` file containing your public key, and place it in the root of the boot partition of your SD card. Once the device is booted, you can access your device as root over SSH on port 22222.

Windows instructions how to generate and use private/public keys with Putty are [here][windows-keys]. Instead of the droplet instructions, add the public key as per above instructions.

Alternative instructions, for Mac, Windows and Linux can be found [here](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/#platform-mac).

Follow steps 1-4 under 'Generating a new SSH key' (The other sections are not applicable to Hass.io and can be ignored.)

Step 3 in the link above, shows the path to the private key file `id_rsa` for your chosen operating system. Your public key, `id_rsa.pub`, is saved in the same folder. Next, select all text from text box "Public key for pasting into OpenSSH authorized_keys file" and save it to the root of your SD card as `authorized_keys`.

<p class='note'>
Make sure when you are copying the public key to the root of the /resin-boot partition of the SD card that you rename the file correctly to `authorized_keys` with no `.pub` file extension.
</p> 

You should then be able to SSH into your Hass.io device. On mac/linux, use:
```
ssh root@hassio.local -p 22222
```

## {% linkable_title Checking the logs %}

```bash
# Logs from the supervisor service on the Host OS
journalctl -f -u resin-supervisor.service

# Hass.io supervisor logs
docker logs resin_supervisor

# Home Assistant logs
docker logs homeassistant
```

[windows-keys]: https://www.digitalocean.com/community/tutorials/how-to-use-ssh-keys-with-putty-on-digitalocean-droplets-windows-users
