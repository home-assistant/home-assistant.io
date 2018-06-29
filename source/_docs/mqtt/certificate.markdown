---
layout: page
title: "MQTT Certificate"
description: "Instructions on how to setup MQTT with a certificate in Home Assistant."
date: 2015-08-07 18:00
sidebar: true
comments: false
sharing: true
footer: true
logo: mqtt.png
---

Using certificates will give you an additional layer of security for your MQTT communication. 

To integrate MQTT with certificate into Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
mqtt:
  certificate: /home/paulus/dev/addtrustexternalcaroot.crt
```

Configuration variables:

- **certificate** (*Optional*): 'auto' or the certificate authority certificate file that is to be treated as trusted by this client. 'auto' uses the bundled certificates. If a file is specified the file should contain the root certificate of the certificate authority that signed your broker's certificate, but may contain multiple certificates. Example: `/home/user/identrust-root.pem`
- **client_key** (*Optional*): Client key, eg. `/home/user/owntracks/cookie.key`.
- **client_cert** (*Optional*): Client certificate, eg. `/home/user/owntracks/cookie.crt`.

