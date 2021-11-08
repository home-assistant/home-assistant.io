---
title: Vconnex
description: Instructions on how to set up the Vconnex device within Home Assistant.
ha_category:
  - Meter
  - Switch
ha_iot_class: Cloud Push
ha_release: 0.1
ha_config_flow: true
ha_domain: vconnex
ha_codeowners:
  - '@Vconnex'
ha_dhcp: true
---

Integrate Vconnex devices into Home Assistant.

## Configuration of the  Vconnex

### PREREQUISITES

- First, you need to create an account in Vconnex's system.
- Next, you need to add the device to your account.

### CREATE A PROJECT

1. Log in to the [Vconnex](https://hass.vconnex.vn/).
2. In the left navigation bar, click `Project`. 
3. On the page that will appear listing your projects, select `Create`.
4. Next, you need to fill in the necessary information in the form.
   
    ![](/images/integrations/vconnex/create.png)

5. Click `Create` to continue with the project configuration.
6. You are taken to the project list page, where you can check the things you have just created.

    ![](/images/integrations/vconnex/view.png)

### GET AUTHORIZATION KEY

Click the created project to enter the Project page and get the Authorization Key. You will need these for setting up the integration. in the next step.
    
    ![](/images/integrations/vconnex/detail.png)

{% include integrations/config_flow.md %}

{% configuration_basic %}

  "Vconnex Access ID":
    description: Go to your project on [Vconnex](https://hass.vconnex.vn/). Find the Access ID under [Authorization Key](#get-authorization-key) on the Project Overview tab.

  "Vconnex IoT Access Secret":
    description: Go to your project on [Vconnex](https://hass.vconnex.vn/). Find the Access Secret under [Authorization Key](#get-authorization-key) on the Project Overview tab.

  Acount:
    description: Vhomenex app account.

  Password:
    description: The password of your app account.

{% endconfiguration_basic %}
