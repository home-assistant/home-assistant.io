---
title: "DuckDNS"
description: "Automatically update your Duck DNS IP address with integrated HTTPS support via Let's Encrypt."
featured: true
---

[Duck DNS](https://www.duckdns.org/) is a free service which will point a DNS (sub domains of duckdns.org) to an IP of your choice. This add-on includes support for Let's Encrypt and will automatically create and renew your certificates. You will need to sign up for a Duck DNS account before using this add-on.

```json
{
  "lets_encrypt": {
    "accept_terms": true,
    "certfile": "fullchain.pem",
    "keyfile": "privkey.pem"
  },
  "token": "sdfj-2131023-dslfjsd-12321",
  "domains": ["my-domain.duckdns.org"],
  "seconds": 300
}
```

{% configuration %}
lets_encrypt:
  description: Let's Encrypt is a free, automated, and open certificate authority.
  required: true
  type: map
  keys:
    accept_terms:
      description: If you accept the [Let's Encrypt Subscriber Agreement](https://letsencrypt.org/repository/), it will generate and update Let's Encrypt certificates for your DuckDNS domain.
      required: true
      type: boolean
      default: false
token:
  description: Your Duck DNS API key, from your DuckDNS account page.
  required: true
  type: string
domains:
  description: A list of domains to update DNS.
  required: true
  type: list
seconds:
  description: Seconds between updates to Duck DNS.
  required: true
  type: integer
{% endconfiguration %}

## Home Assistant configuration

Use the following configuration in Home Assistant to use the generated certificate:

```yaml
http:
  base_url: my-domain.duckdns.org
  server_port: 8123  # 8123 is also the default value
  ssl_certificate: /ssl/fullchain.pem
  ssl_key: /ssl/privkey.pem
```

If you use a port other than `8123` or an SSL proxy, change the port number accordingly.

## Router configuration

You'll need to forward the port you listed in your configuration (8123 in the example above) on your router to your Home Assistant system. You can find guides on how to do this on [Port Forward](https://portforward.com/). Noting that you'll only need to forward the TCP port.

Ensure that you allocate the Home Assistant system a fixed IP on your network before you configure port forwarding. You can do this either on the computer itself (see the [install guide](/hassio/installation/) or via a static lease on your router.

Restart Home Assistant for the configured changes to take effect. When you access the Home Assistant frontend you will now need to use `https`, even when accessing local instances, for example at `https://192.168.0.1:8123`.

## Generate Let's Encrypt certificate for Duck DNS sub sub domains 

To generate certificates for nr.my-domain.duckdns.org update the domain JSON settings to:

```json
{
  ...
  "domains": ["my-domain.duckdns.org","*.my-domain.duckdns.org"],
  ...
}
```
