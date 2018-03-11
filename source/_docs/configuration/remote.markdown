---
layout: page
title: "Remote access"
description: "Setting up remote access for Home Assistant."
date: 2015-03-23 12:50
sidebar: true
comments: false
sharing: true
footer: true
---

If you're interested in logging in to Home Assistant while away, you'll have to make your instance remotely accessible. Remember to follow the [securing checklist](/docs/configuration/securing/) before doing this.

The most common approach is to set up port forwarding from your router to port 8123 on the computer that is hosting Home Assistant. General instructions on how to do this can be found by searching `<router model> port forwarding instructions`.

A problem with making a port accessible is that some Internet Service Providers only offer dynamic IPs. This can cause you to lose access to Home Assistant while away. You can solve this by using a free Dynamic DNS service like [DuckDNS](https://www.duckdns.org/).

Remember: Just putting a port up is not secure. You should definitely consider encrypting your traffic if you are accessing your Home Assistant installation remotely. For details please check the [set up encryption using Let's Encrypt](/blog/2015/12/13/setup-encryption-using-lets-encrypt/) blog post, or this [detailed guide](https://home-assistant.io/docs/ecosystem/certificates/lets_encrypt/) to using Let's Encrypt with HA.

Protect your communication with a [self-signed certificate](/cookbook/tls_self_signed_certificate/) between your client and the Home Assistant instance.

For another way to access your Home Assistant frontend, check out [the instructions how to use Tor](/cookbook/tor_configuration/).

