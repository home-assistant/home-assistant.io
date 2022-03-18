---
title: Vconnex
description: Instructions on how to set up the Vconnex device within Home Assistant.
ha_category:
  - Switch
ha_iot_class: Cloud Push
ha_release: 2021.12
ha_config_flow: true
ha_domain: vconnex
ha_codeowners:
  - '@Vconnex'
  - '@hiep2902'
ha_platforms:
  - Switch
ha_dhcp: true
---

The Vconnex integration integrates Vconnex devices your have added to the Vhomenex app.

## Configuration of the Vconnex

### Prerequisites

- [Vhomenex App](https://smarthome.vconnex.vn/download/)
- Account on Vhomenex App

### Create a project

1. Open [Vconnex Project](https://hass.vconnex.vn) page.
1. Log in with your Vhomenex account.
2. In the left navigation bar, click `Project`. 
3. On the page that will appear listing your projects, select `Create`.
    ![Create project](/images/integrations/vconnex/project__create.png)
4. Fill your project information.
    ![Create project](/images/integrations/vconnex/project__create__fill-info.png)
5. Click `Save` to save with the project information.
6. Your new project should be appear in project list.

### Get authorization key

1. Click to `Project name` to view project detail.
    ![Project detail](/images/integrations/vconnex/project__detail.png)
2. Get `Authorization Key`, you will need these for setting up the integration in the next step.
    ![Authorization key](/images/integrations/vconnex/project__detail__auth-key.png)

{% include integrations/config_flow.md %}

{% configuration_basic %}
  "Client ID":
    description: Go to your [Vconnex Project](https://hass.vconnex.vn). Get the **Client ID** ([Authorization Key](#get-authorization-key)) on the **Project Detail**.

  "Client Secret":
    description: Go to your [Vconnex Project](https://hass.vconnex.vn). Get the **Client Secret** ([Authorization Key](#get-authorization-key)) on the **Project Detail**.

{% endconfiguration_basic %}