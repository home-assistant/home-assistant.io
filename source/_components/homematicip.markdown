---
layout: page
title: "HomematicIP"
description: "Instructions for integrating HomematicIP into Home Assistant."
date: 2018-03-06 20:40
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Hub
ha_iot_class: "Cloud Polling"
ha_release: 0.66
featured: false
---

The [HomematicIP](http://www.homematicip.com/) component platform is used as an interface to the cloud server.
For for communication [homematicip-rest-api](https://github.com/coreGreenberet/homematicip-rest-api) is used.

To set up the component:

- **generate the authentication token**:
```yaml
generate_auth_token.py
```

- ** add the information to your `configuration.yaml` file:

```yaml
homematicip:
  - name: NAME
    accesspoint: IDENTIFIER
    authtoken: AUTHTOKEN
```

Configuration variables (global):

- **name** (*Required*): Name to identify your access point, this will be
  used to prefix your device names.
- **accesspoint** (*Required*): This is the access point id (SGTIN)
- **authtoken** (*Required*): Authentification token generated with
`generate_auth_token.py`.

