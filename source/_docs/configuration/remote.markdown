---
title: "Remote access to Home Assistant"
description: "There are different ways to reach your Home Assistant from outside your home network. The recommended option is Home Assistant Cloud, which works without exposing anything to the internet."
related:
  - docs: /docs/configuration/securing/
    title: Securing your instance
  - url: https://www.nabucasa.com/config/remote/
    title: Home Assistant Cloud - remote access
---

By default, you can only reach your Home Assistant from your local network, which keeps things private and secure. If you want to reach it from outside your home, for example to control your devices while you are at work or on holiday, you have a few options.

The easiest and safest option for most people is [Home Assistant Cloud](/cloud/). Other options are listed further down for those who prefer to set things up themselves.

{% tip %}
Before exposing Home Assistant to the internet, follow the [securing checklist](/docs/configuration/securing/).
{% endtip %}

## Home Assistant Cloud

[Home Assistant Cloud](https://www.nabucasa.com) gives you remote access to your Home Assistant from anywhere, without opening any ports on your router and without exposing your home network to the internet. After you sign in, setup takes a single toggle in the user interface.

A unique remote URL is generated for you, and all traffic between your device and your home is encrypted automatically. Your Home Assistant Cloud subscription also helps fund the development of Home Assistant itself.

## VPN

A secure way to remotely access your Home Assistant is to use a Virtual Private Network (VPN) service such as [Tailscale](https://tailscale.com/) or [ZeroTier One](https://www.zerotier.com/).

A VPN connection needs to be established before you can connect to your Home Assistant from outside your local network. The VPN makes this connection secure. When using the Home Assistant Companion app (such as on a mobile device), without this connection, your sensors will not update in Home Assistant.

## Reverse proxy

A reverse proxy is an intermediary server that sits in front of Home Assistant. When using a reverse proxy, you must configure Home Assistant to trust it; otherwise, requests will be blocked by design.

To trust your reverse proxy, go to {% my network title="**Settings** > **System** > **Network**" %}. Under **HTTP server**, turn on **Trust X-Forwarded-For** and add the proxy to **Trusted proxies**.

See [Reverse proxies in the HTTP integration documentation](/integrations/http/#reverse-proxies).

If your reverse proxy or CDN caches responses, see [Caching behind a reverse proxy or CDN](/integrations/http/#caching-behind-a-reverse-proxy-or-cdn).

## Port forwarding

Set up port forwarding from your router to the port Home Assistant listens on. To find this port, go to {% my network title="**Settings** > **System** > **Network**" %}. Under **HTTP server**, check the **Server port**.

The default port depends on your installation:

- New installations of {% term "Home Assistant Operating System" %} use port 80.
- Home Assistant OS installations set up before 2026.8 keep the port they already used, usually 8123.
- Other installation types use port 8123.

You set up port forwarding in your router's settings, usually through its web interface or app. The steps are different for each router. To find them, check your router's manual, or search the web for your router model and "port forwarding". On the router, you can use any free port and forward it to the Home Assistant port.

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
