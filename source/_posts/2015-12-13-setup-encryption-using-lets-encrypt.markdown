---
layout: post
title: "Set up encryption using Let's Encrypt"
description: "Tutorial how to encrypt your connection with Home Assistant."
date: 2015-12-13 10:05:00 -0800
date_formatted: "December 13, 2015"
author: Paulus Schoutsen
comments: true
categories: How-To
og_image: /images/blog/2015-12-lets-encrypt/letsencrypt-secured-fb.png
---

Exposing your Home Assistant instance outside of your network always has been tricky. You have to set up port forwarding on your router and most likely add a dynamic DNS service to work around your ISP changing your IP. After this you would be able to use Home Assistant from anywhere but there is one big red flag: no encryption.

This tutorial will take you through the steps to setup a dynamic DNS for your IP and allow trusted encrypted connection to it - for free using [DuckDNS] and [Let's Encrypt].

<p class='img'>
<img src='/images/blog/2015-12-lets-encrypt/letsencrypt-secured.png' />
</p>

<!--more-->

### {% linkable_title Requirements %}

The DuckDNS part of this tutorial has no requirements but there are a few requirements as of now to run the Let's Encrypt client.

 - Direct connection to the internet or admin access to your router to set up port forwarding
 - A machine running a Unix-ish OS that include Python 2.6 or 2.7 (Docker can be used)

<img src='/images/supported_brands/duckdns.png' style='clear: right; border:none; box-shadow: none; float: right; margin-left: 8px; margin-bottom: 8px;' width='60' />

### {% linkable_title DuckDNS %}

The first step is to set up [DuckDNS]. This is a free dynamic DNS service that you can use to get a DuckDNS.org subdomain to point at your house. A dynamic DNS service works by having your home computer tell DuckDNS.org every 5 minutes what its IP is so that DuckDNS can make sure your domain name is set up correctly.

For this example we will assume our domain is hass-example.duckdns.org.

First step is to acquire and set up our domain name. For this, go to [DuckDNS], log in with any of the supported login providers and add a domain. After this check out their [installation instructions][duckdns-install] to finish your installation of DuckDNS. If you're on a Raspberry Pi, see 'Pi' in the category 'Operating Systems'.

<img src='/images/supported_brands/letsencrypt.png' style='clear: right; border:none; box-shadow: none; float: right; margin-left: 8px; margin-bottom: 8px;' width='60' />

### {% linkable_title Let's Encrypt %}

[Let's Encrypt] is a free, automated, and open certificate authority (CA). We will use this to acquire a certificate that can be used to encrypted our connection with Home Assistant.

Let's Encrypt will give you a free 90-day certificate if you pass their domain validation challenge. Domains are validated by having certain data be accessible on your domain for Let's Encrypt ([they describe it better themselves][letsencrypt-technology]).

Assuming that your home is behind a router, the first thing to do is to set up port forwarding from your router to your computer that will run Let's Encrypt. For the Let's Encrypt set up we need to temporary forward ports `80` (http connections) and `443` (https connections). This can be set up by accessing your router admin interface ([Site with port forwarding instructions per router][port-forward]).

Now you're ready to run Let's Encrypt:

```bash
$ git clone https://github.com/letsencrypt/letsencrypt
[…]
$ cd letsencrypt
$ ./letsencrypt-auto certonly --email $ ./letsencrypt-auto certonly --email your@email.address -d hass-example.duckdns.org

Updating letsencrypt and virtual environment dependencies.......
Running with virtualenv: sudo /path/letsencrypt/bin/letsencrypt certonly --email your@e-mail.address -d hass-example.duckdns.org

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at
   /etc/letsencrypt/live/hass-example.duckdns.org/fullchain.pem. Your cert
   will expire on 2016-03-12. To obtain a new version of the
   certificate in the future, simply run Let's Encrypt again.
 - If like Let's Encrypt, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

If you're using Docker, run the following command to generate the required keys:

```bash
sudo mkdir /etc/letsencrypt /var/lib/letsencrypt
sudo docker run -it --rm -p 443:443 -p 80:80 --name letsencrypt \
                -v "/etc/letsencrypt:/etc/letsencrypt" \
                -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
                quay.io/letsencrypt/letsencrypt:latest certonly \
                --email your@e-mail.address -d hass-example.duckdns.org
```

With either method your certificate will be generated and put in the directory `/etc/letsencrypt/live/hass-example.duckdns.org`. As the lifetime is only 90 days, you will have to repeat this every 90 days.

<img width="60" src="/images/favicon-192x192.png" style='float: right; border:none; box-shadow: none;'>

### {% linkable_title Home Assistant %}

Before updating the Home Assistant configuration, we have to update the port forwarding at your router config. We can drop the port forwarding for port `80` as we no longer care about unecrypted messages. Update port `443` to forward to port `8123` on the computer that will run Home Assistant.

The final step is to point Home Assistant at the generated certificates. Before you do this, make sure that the user running Home Assistant has read access to the folder that holds the certificates.

```yaml
http:
  api_password: YOUR_SECRET_PASSWORD
  ssl_certificate: /etc/letsencrypt/live/hass.example.com/fullchain.pem
  ssl_key: /etc/letsencrypt/live/hass.example.com/privkey.pem
```

You can now navigate to https://hass-example.duckdns.org and enjoy encryption!

_Big thanks to Fabian Affolter for his help and feedback on this article._

[DuckDNS]: https://duckdns.org
[duckdns-install]: https://www.duckdns.org/install.jsp
[Let's Encrypt]: https://letsencrypt.org
[letsencrypt-technology]: https://letsencrypt.org/howitworks/technology/
[port-forward]: http://portforward.com
