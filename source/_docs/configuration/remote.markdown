---
title: "Remote access to Home Assistant"
description: "There are different ways to reach your Home Assistant from outside your home network. The recommended option is Home Assistant Cloud, which works without exposing anything to the internet."
related:
  - docs: /docs/configuration/securing/
    title: Securing your instance
  - url: https://www.nabucasa.com/config/remote/
    title: Home Assistant Cloud - remote access
---

By default, your Home Assistant only listens on your local network, which keeps things private and secure. If you want to reach it from outside your home, for example to control your devices while you are at work or on holiday, you have a few options.

The easiest and safest option for most people is [Home Assistant Cloud](/cloud/). Other options are listed further down for those who prefer to set things up themselves.

{% tip %}
Before exposing Home Assistant to the internet, follow the [securing checklist](/docs/configuration/securing/).
{% endtip %}

## Home Assistant Cloud

[Home Assistant Cloud](https://www.nabucasa.com) gives you remote access to your Home Assistant from anywhere, without opening any ports on your router and without exposing your home network to the internet. Setup takes a single toggle in the user interface.

A unique remote URL is generated for you, and all traffic between your device and your home is encrypted automatically. Your Home Assistant Cloud subscription also helps fund the development of Home Assistant itself.

## VPN

A secure way to remotely access your Home Assistant is to use a Virtual Private Network (VPN) service such as [Tailscale](https://tailscale.com/) or [ZeroTier One](https://www.zerotier.com/).

A VPN connection needs to be established before you can connect to your Home Assistant from outside your local network. The VPN makes this connection secure. When using the Home Assistant Companion app (such as on a mobile device), without this connection, your sensors will not update in Home Assistant.

## Port forwarding

Set up port forwarding from your router to the port Home Assistant listens on. By default, this is port 8123 on the computer that is hosting Home Assistant. If you changed the Home Assistant HTTP server port, use the port shown under {% my network title="**Settings** > **System** > **Network**" %}. General instructions on how to do this can be found by searching `<router model> port forwarding instructions`. You can use any free port on your router and forward that to the Home Assistant HTTP server port.

A problem with making a port accessible is that some Internet Service Providers only offer dynamic IPs. This can cause you to lose access to Home Assistant while away. You can solve this by using a free Dynamic DNS service like [DuckDNS](https://www.duckdns.org/).

If you cannot access your Home Assistant installation remotely, remember to check if your ISP provides you with a dedicated IP, instead of one shared with other users via a [CG-NAT](https://en.wikipedia.org/wiki/Carrier-grade_NAT). This is becoming fairly common nowadays due to the shortage of IPv4 addresses. Some, if not most ISPs will require you to pay an extra fee to be assigned a dedicated IPv4 address.

{% caution %}
Just putting a port up is not secure. You should definitely consider encrypting your traffic if you are accessing your Home Assistant installation remotely. For details, please check the [set up encryption using Let's Encrypt](/blog/2017/09/27/effortless-encryption-with-lets-encrypt-and-duckdns/) blog post or this [detailed guide](https://community.home-assistant.io/t/196970) to using Let's Encrypt with Home Assistant.
{% endcaution %}

## Adding a remote URL to Home Assistant

To set the URL under which your Home Assistant can be accessed from outside your local network, follow these steps:

1. Go to {% my network title="**Settings** > **System** > **Network**" %}.
2. Under **Home Assistant URL**, in the **Internet** field, enter the external URL that you previously set up for your instance.
    - If you use Home Assistant Cloud, you can turn on **Use Home Assistant Cloud** instead, and your Nabu Casa URL is used automatically.
3. Select **Save**.
