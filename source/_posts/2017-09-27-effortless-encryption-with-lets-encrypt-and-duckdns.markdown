---
title: "Effortless encryption with Let's Encrypt and DuckDNS"
description: "Get Home Assistant encrypted in less than 5 minutes."
date: 2017-09-27 00:05:00 +0000
date_formatted: "September 27, 2017"
author: Paulus Schoutsen
author_twitter: balloob
categories: How-To
og_image: /images/blog/2015-12-lets-encrypt/letsencrypt-secured-fb.png
---

When Let's Encrypt launched we were estatic: finally an easy and free way for our users to securely access their homes remotely. Let's Encrypt signifianctly lowered the bar to get and renew SSL certificates. However, this process could still be quite an obstacle for our users. It required opening ports on the router and remembering to renew the certificate every so often.

Thanks to a [blog post][splitbrain] by Andreas Gohr I realized that DuckDNS supports setting TXT records, making it compatible with the DNS-01 challenge of Let's Encrypt. The DNS-01 challenge is using the DNS record of the domain instead of interacting with the server. This means that it's not needed for the user to open any ports!

I have worked together with [Pascal Vizeli][pvizeli] on updating the DuckDNS add-on for Hass.io and today we're proud to announce it now includes automatic generation and updating of Let's Encrypt certificates for your DuckDNS domain. The only thing that you have to add to your DuckDNS configuration is that you accept the Let's Encrypt [terms of service][terms] and point Home Assistant at the generated certificates and you're good to go. No other work is required.

To get started today, start with making sure that you have [Hass.io installed][hassio]. After that, go to the Hass.io panel in Home Assistant, open the add-on store, scroll down to DuckDNS and install it. In the DuckDNS settings change "accept_terms" to true and start it.

Next up is to configure Home Assistant with the config below and restart it. You're now good to go! Make sure to use the right protocol when browsing to your instance: `https://<your_domain>.duckdns.org`. Happy secure controlling your house!

```yaml
# Example configuration.yaml entry for the HTTP component
http:
  ssl_certificate: /ssl/fullchain.pem
  ssl_key: /ssl/privkey.pem
```

If you're not using Hass.io, check out the [blog post][splitbrain] by Andreas for instructions.

If you enjoy the free service provided by DuckDNS and Let's Encrypt, consider donating to their cause:

 - [Become a Patreon of DuckDNS](https://www.patreon.com/user?u=3209735)
 - [Donate to Let's Encrypt](https://letsencrypt.org/donate/)

More information:

 - [Hass.io][hassio]
 - [Installing Hass.io][hassio-install]
 - [DuckDNS add-on][addon-duckdns]
 - [DuckDNS][duckdns]
 - [Let's Encrypt][le]

[splitbrain]: https://www.splitbrain.org/blog/2017-08/10-homeassistant_duckdns_letsencrypt
[terms]: https://letsencrypt.org/repository/
[pvizeli]: https://github.com/pvizeli
[hassio]: /hassio/
[hassio-install]: /hassio/installation/
[addon-duckdns]: /addons/duckdns/
[duckdns]: http://www.duckdns.org/
[le]: https://letsencrypt.org/
