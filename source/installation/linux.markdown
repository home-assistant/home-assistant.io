---
title: "Linux"
description: "Install Home Assistant on a Linux"
installation_type: linux
---
{% comment %}
Included sections for this page is located under source/_includes/installation
{% endcomment %}

{% include installation/operating_system.md %}
{% include installation/container.md %}
{% include installation/core.md %}
{% include installation/supervised.md %}

## Troubleshooting

### No access to the frontend

Symptom: You cannot open the Home Assistant page in your browser. If you are not using {% term "Home Assistant Operating System" %}, the cause may be an access restriction.

In newer Linux distributions, the access to a host is very limited. This means that you can't access the Home Assistant frontend that is running on a host outside of the host machine.

To fix this, you will need to open your machine's firewall for TCP traffic to port 8123. The method for doing this will vary depending on your operating system and the firewall you have installed. Below are some suggestions to try. Google is your friend here.

For UFW systems (for example, Debian):

```bash
sudo ufw allow 8123/tcp
```