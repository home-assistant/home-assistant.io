---
title: Vconnex
description: Instructions on how to set up the Vconnex device within Home Assistant.
ha_category:
  - Switch
ha_iot_class: Cloud Push
ha_release: 0.1
ha_config_flow: true
ha_domain: vconnex
ha_codeowners:
  - '@Vconnex'
ha_platforms:
  - Switch
ha_dhcp: true
---

We create smart home devices that easily be installed and used. You can control lighting system, TVs, air conditioners, water heaters, curtains, ...via smartphone anywhere, all in one mobile application.
With Home Assistant Cloud, you can connect your Home Assistant instance in a few simple clicks to Vconnex.

## Configuration of the  Vconnex

### Condition Precedent

- You need to download and register an account in the Vhomenex app:
- [Vhomenex (Android)](https://smarthome.vconnex.vn/download/)
- [Vhomenex (IOS)](https://smarthome.vconnex.vn/download/)

### CREATE A PROJECT

1. Log in to the [Vconnex](https://hass.vconnex.vn/) with an account in the vhomenex app.
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

