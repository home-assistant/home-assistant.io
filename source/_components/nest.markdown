---
layout: page
title: "Nest"
description: "Instructions how to integrate Nest into Home Assistant."
date: 2016-01-29 21:57
sidebar: true
comments: false
sharing: true
footer: true
logo: nest.png
ha_category: Hub
featured: true
---

The Nest component is the main component to integrate all [Nest](https://nest.com/) related platforms. To connect Nest, you will have to [sign up for a developer account](https://developers.nest.com/products) and get a client_id and client_secret.

```yaml
# Example configuration.yaml entry
nest:
  client_id: ABCD
  client_secret: ABCD
```

```yaml
# Example configuration.yaml entry to show only devices at your vacation and primary homes
nest:
  username: USERNAME
  password: PASSWORD
  structure:
    - Vacation
    - Primary
```

Configuration variables:

- **client_id** (*Required*): Your Nest developer client id.
- **client_secret** (*Required*): Your Nest developer client secret.
- **structure** (*Optional*): The structure or structures you would like to include devices from. If not specified, this will include all structures in your Nest account.
