---
title: "Remote access"
description: "Setting up remote access for Home Assistant."
---

If you're interested in logging in to Home Assistant while away, you'll have to make your instance remotely accessible. Below are a few options to do this.

<div class='note warning'>

Remember to follow the [securing checklist](/docs/configuration/securing/) before doing this.

</div>

## Home Assistant Cloud

Users of <a href="https://www.nabucasa.com">Home Assistant Cloud</a> can use the <a href="https://www.nabucasa.com/config/remote/">Remote UI</a> without requiring any configuration.

A unique remote URL will be generated and given to you along with a certificate so all your traffic to Home Assistant is encrypted automatically.

## VPN

A secure way to remotely access your Home Assistant is to use a Virtual Private Network (VPN) service such as [Tailscale](https://tailscale.com/) or [ZeroTier One](https://www.zerotier.com/).

A VPN connection needs to be established before you can connect to your Home Assistant from outside your local network. The VPN makes this connection secure. When using the Home Assistant Companion app (such as on a mobile device), without this connection, your sensors will not update in Home Assistant.

## Port forwarding

Set up port forwarding (for any port) from your router to port 8123 on the computer that is hosting Home Assistant. General instructions on how to do this can be found by searching `<router model> port forwarding instructions`. You can use any free port on your router and forward that to port 8123.

A problem with making a port accessible is that some Internet Service Providers only offer dynamic IPs. This can cause you to lose access to Home Assistant while away. You can solve this by using a free Dynamic DNS service like [DuckDNS](https://www.duckdns.org/).

If you cannot access your Home Assistant installation remotely, remember to check if your ISP provides you with a dedicated IP, instead of one shared with other users via a [CG-NAT](https://en.wikipedia.org/wiki/Carrier-grade_NAT). This is becoming fairly common nowadays due to the shortage of IPv4 addresses. Some, if not most ISPs will require you to pay an extra fee to be assigned a dedicated IPv4 address.

<div class='note'>

Just putting a port up is not secure. You should definitely consider encrypting your traffic if you are accessing your Home Assistant installation remotely. For details please check the [set up encryption using Let's Encrypt](/blog/2017/09/27/effortless-encryption-with-lets-encrypt-and-duckdns/) blog post or this [detailed guide](/docs/ecosystem/certificates/lets_encrypt/) to using Let's Encrypt with Home Assistant.

</div>
