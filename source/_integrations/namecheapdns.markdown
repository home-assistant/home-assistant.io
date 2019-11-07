---
title: "NamecheapDNS"
description: "Keep your namecheap dynamic DNS up to date"
logo: namecheap.png
ha_category:
  - Network
ha_release: 0.56
---

With the `namecheapdns` integration you can automatically update your dynamic DNS entry at [namecheapdns](https://www.namecheap.com/store/domains/freedns/).

<div class='note warning'>
Namecheap only supports IPv4 addresses to update.
</div>

## Configuration

To use the integration in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
namecheapdns:
  domain: example.com
  password: YOUR_PASSWORD
```

{% configuration %}
  host:
    description: The host part or "subdomain" part you want to update.
    required: false
    type: string
  domain:
    description: Your namecheap TLD (example.com).
    required: true
    type: string
  password:
    description: The namecheap "Dynamic DNS Password" you can find under the "Advanced DNS" tab.
    required: true
    type: string
{% endconfiguration %}

See the [How do I set up a Host for Dynamic DNS?](https://www.namecheap.com/support/knowledgebase/article.aspx/43/11/how-do-i-set-up-a-host-for-dynamic-dns) for further instructions

### Service `update`

You can use the service `update` to update any domain.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `domain` | yes | String, domain to update, defaults to configured domain.
| `host` | yes | String, host to update, defaults to configured hose.
| `password` | yes | String, password as given on namecheap management page, defaults to configured password.

Examples:

```yaml
# Example script to update dns for an unconfigured host
script:
  update_dns:
    sequence:
      - service: namecheapdns.update
        data:
          domain: myhost.com
          host: subdomain
          password: key123ab
```

```yaml
# Example script to update dns for a configured host
script:
  update_dns:
    sequence:
      - service: namecheapdns.update
```

```yaml
# Example script to update dns for an unconfigured subdomain on the configured domain
script:
  update_dns:
    sequence:
      - service: namecheapdns.update
        data:
          host: subdomain
```

```yaml
# Example script to update dns for all subdomains on the configured domain
script:
  update_dns:
    sequence:
      - service: namecheapdns.update
        data:
          host: *
```
