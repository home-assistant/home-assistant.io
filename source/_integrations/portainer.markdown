---
title: Portainer
description: Instructions on how to integrate Portainer containers into Home Assistant.
ha_category:
  - Sensor
ha_release: 2024.12
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@Thomas55555'
ha_platforms:
  - sensor
ha_integration_type: integration
ha_domain: portainer
---

The Portainer integration provides connectivity with one or more portainer instances. Currently only Docker containers in your Portainer instance are supported.

In order to use this integration you must get an access token.  Refer to [this guide](https://docs.portainer.io/api/access) for general overview of the process.

{% include integrations/config_flow.md %}

### Installation


1. Enter the access token you've got from the guid above. The access token typically looks like this: `ptr_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

2. Also enter the URL of the portainer instance. Here are a some valid example URLs:
   - `https://www.myportainer.com`
   - `https://192.168.178.99:9443`
   - `http://192.168.178.99:9000` - legacy
   - `https://myintranet:9443/portainer`

3. Also choose, if the SSL certificate should be verified.

4. Click **OK**


## Entities

Once you have enabled the Portainer integration, you should see the following entities:

### Sensor

The integration will create a sensor for each container running in the portainer instance, which shows the current state of the container.
