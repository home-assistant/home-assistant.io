---
layout: page
title: "Tor Onion Service Configuration"
description: "Configure Tor to work with home assistant to provide secure remote access without opening your firewall"
date: 2016-07-06 13:05
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Infrastructure
---

This is an example about how you can configure Tor to provide secure remote access to your home assitance instance as an Onion site, through Tor's Hidden Service feature.

This is useful if you want to have:

 * Access your home assistant instance remotely without opening a firewall port or setting up a VPN
 * Don't want to or know how to get an SSL/TLS certificate and HTTPS configuration setup
 * Want to use state of the art cryptography technology to protect access to your personal, private data

You can learn more about how Tor can be used to secure home automation and IoT platforms through this short set of slides available at: https://github.com/n8fr8/talks/blob/master/onion_things/Internet%20of%20Onion%20Things.pdf

#### {% linkable_title Onion Sites %}

Onion sites are websites that run on a Tor Hidden Service node.

"dot onion" sites are an IETF recognized special use domain name: https://datatracker.ietf.org/doc/rfc7686/

#### {% linkable_title Tor Setup %}

sudo apt-get install tor

Tor's main configiuration file `/etc/tor/torrc`

```torrc
...
HiddenServiceDir /var/lib/tor/homeassistant/
HiddenServicePort 80 127.0.0.1:8123
HiddenServiceAuthorizeClient stealth haremote1
...
```

Then, restart Tor: > /etc/init.d/tor restart

Then read the new generated authentication cookie from the /var/lib/tor/homeassistant/hostname file
to see the new "dot onion" hostname and authentication cookie values.


#### {% linkable_title Client Access Setup %}

Add the authentication cookie to your torrc client configuration on your laptop or mobile device, like this:
HidServAuth yourserverhere.onion yourauthcookiehere

For Tor Browser, add it here:
tor-browser_en-US/Browser/TorBrowser/Data/Tor/torrc-defaults

for Orbot, add it in Orbot->Menu->Settings to the "Torrc Custom Config" entry.

Restart, and you should be able to access the site via the .onion address still, but no one without the authentication cookie will be able to.

