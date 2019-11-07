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
  scan_interval: 60
  domains: 
    - domain: example.com
      hosts:
        - "subdomain"
        - "@"
      password: YOUR_PASSWORD
    - domain: example2.com
      password: YOUR_SECOND_PASSWORD
```

{% configuration %}
  scan_interval:
    description: Time between updates (in minutes)
    required: false
    default: 5
    type: integer
  domains:
    description: A list of domains to configure.
    required: false
    type: list
    keys:
      domain:
        description: Your namecheap TLD (example.com).
        required: true
        type: string
      hosts:
        description: A list of hosts on the domain to be updated.
        required: false
        default: ["@"]
        type: list
      password:
        description: The namecheap "Dynamic DNS Password" you can find under the "Advanced DNS" tab.
        required: true
        type: string
{% endconfiguration %}

See the [How do I set up a Host for Dynamic DNS?](https://www.namecheap.com/support/knowledgebase/article.aspx/43/11/how-do-i-set-up-a-host-for-dynamic-dns) for further instructions.

If you would like to update the root domain, you should use the host "@". In order to update all subdomains, use the host "*".

### Service `update`

 You can use the service `update` to update any domain.

 | Service data attribute | Optional | Description |
 | ---------------------- | -------- | ----------- |
 | `domain` | no | String, domain to update, defaults to configured domain.
 | `host` | no | String, host to update, defaults to configured hose.
 | `password` | no | String, password as given on namecheap management page, defaults to configured password.

 Examples:

 ```yaml
 # Example script to update dns
 script:
   update_dns:
     sequence:
       - service: namecheapdns.update
         data:
           domain: myhost.com
           host: subdomain
           password: key123ab
 ```
 
 ### Service `update_all`
 
 You can use the service `update_all` to update all configured domains and hosts.
 
 Examples:
 
  ```yaml
 # Example script to update dns
 script:
   update_all_dns:
     sequence:
       - service: namecheapdns.update_all
 ```
