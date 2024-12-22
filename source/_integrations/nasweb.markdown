---
title: NASweb
description: Integrate NASweb devices
ha_category:
  - Switch
ha_release: '2024.12'
ha_codeowners:
  - '@nasWebio'
ha_iot_class: Local Push
ha_domain: nasweb
ha_config_flow: true
ha_platforms:
  - switch
ha_integration_type: hub
---

The **NASweb** {% term integration %} brings the device's smart home features into **Home Assistant**, converting them into {% term entities %} that users can monitor, control, and incorporate into {% term scripts %} and {% term automations %}.

NASweb combines the functions of a control panel and the ability to manage building automation. The device monitors the flow of information from sensors and programmable switches and stores settings, definitions, and configured actions. [More information.](https://www.chomtech.pl/produkt/naswebio-multisystemowy-sterownik-automatyki-budynkowej/)

  ![NASweb Smart Home Features Graph](/images/integrations/nasweb/nasweb_scheme.png)

## Prerequisites

Before you can add the NASweb integration to Home Assistant, you need to create a user that has access to the NASweb API.

To create a NASweb user with access to the NASweb API, follow these steps:

1. To log into device **NASweb** page, enter the device IP in your local network:
   - `https://<Device IP address>/nasweb` (for example: `https://192.168.117.230/nasweb`)
2. In the top-right corner, select your user and in the pop-up, select **Administrators**.
    ![Device Dashboard](/images/integrations/nasweb/dashboard.png)
3. Find the user you want to have access to the NASweb API from Home Assistant. Select **Edit**.
    - The `admin` user cannot be used for this. Select another user.
    ![Device Administrators](/images/integrations/nasweb/users.png)
4. In the left **Modules** column, find the **API** module.
5. Click the **API** module to move it into the right-hand column (`1`), which lists modules enabled for this user.
    - To save changes, select **Apply** (`2`).
    ![Administrator User Details](/images/integrations/nasweb/modules.png)

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: NASweb device address

User:
  description: Login of user with enabled API module

Password:
  description: Password of user with enabled API module

{% endconfiguration_basic %}
