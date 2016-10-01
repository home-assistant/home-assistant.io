---
layout: page
title: "Nest"
description: "Instructions how to integrate Nest into Home Assistant."
date: 2016-01-29 21:57
sidebar: true
comments: false
sharing: true
footer: true
logo: nest_thermostat.png
ha_category: Hub
featured: true
---

The Nest component is the main component to integrate all [Nest](https://nest.com/) related platforms. Besides this component you will have to setup your thermostat and any connected sensors separately.

```yaml
# Example configuration.yaml entry
nest:
  username: USERNAME
  password: PASSWORD

climate:
  platform: nest
```

```yaml
# Example configuration.yaml entry to show only devices at your vacation home
nest:
  username: USERNAME
  password: PASSWORD
  structure: Vacation

climate:
  platform: nest
```

```yaml
# Example configuration.yaml entry to show only devices at your vacation and primary homes
nest:
  username: USERNAME
  password: PASSWORD
  structure:
    - Vacation
    - Primary

climate:
  platform: nest
```

Configuration variables:

- **username** (*Required*): Your Nest username.
- **password** (*Required*): Your Nest password.
- **structure** (*Optional*): The structure or structures you would like to include devices from. If not specified, this will include all structures in your Nest account.
