---
title: Enedis Linky
description: Instructions on how to integrate Linky consumption data within Home Assistant.
ha_release: 0.79
ha_category:
  - Energy
  - Sensor
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Quentame'
ha_domain: linky
---

The `linky` sensor platform is retrieving the consumption of your home from the [Linky electric meter](https://www.enedis.fr/linky-compteur-communicant).

## Setup the integration

You need to create an Enedis account [here](https://espace-client-connexion.enedis.fr/auth/UI/Login?realm=particuliers) if you don't have one already.

### Via the frontend

Menu: *Configuration* -> *Integrations*

Search for "Linky", add your credentials, click submit, you are done !

### Via the configuration file

Add the Linky sensor to your `configuration.yaml` file like below:

```yaml
# Example configuration.yaml entry
linky:
  - username: YOUR_LINKY_USERNAME
    password: YOUR_LINKY_PASSWORD
```

{% configuration %}
username:
  description: The Enedis account username.
  required: true
  type: string
password:
  description: The Enedis account password.
  required: true
  type: string
timeout:
  description: Timeout to wait for the Enedis API connection.
  required: false
  type: integer
  default: 10
{% endconfiguration %}
