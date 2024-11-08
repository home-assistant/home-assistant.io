---
title: NASweb
description: Integrate NASweb devices
ha_category:
  - Switch
ha_release: '2024.11'
ha_codeowners:
  - '@nasWebio'
ha_iot_class: Local Push
ha_domain: nasweb
featured: true
ha_config_flow: true
ha_platforms:
  - switch
ha_integration_type: hub
---


NASweb combines the functions of a control panel and the ability to manage building automation. The device monitors the flow of information from sensors and programmable switches and stores settings, definitions and configured actions.\
[MORE INFO](https://www.chomtech.pl/produkt/naswebio-multisystemowy-sterownik-automatyki-budynkowej/)

  ![](/images/integrations/nasweb/nasweb_scheme.png)

## Prerequisites

Before you can add the NASweb integration to Home Assistant, you need to create a user that has access to the NASweb API.

To create a NASweb user with access to the NASweb API, follow thses steps:

1. To log into device `NASweb` page, enter the device IP in your local network:
   - `https://` + `Device IP` + `/nasweb` (for example: `https://192.168.117.230/nasweb`)
2. In the top-right corner, select your user and in the pop-up, select **Administrators**.
    ![](/images/integrations/nasweb/dashboard.png)
3. Find the user you want to have access to the NASweb API from Home Assistant. Select **Edit**.
    - The `admin` user cannot be used for this. Select another user.
    ![](/images/integrations/nasweb/users.png)
4. In the left **Modules** column, find the **API** module.
5. Select the **API** module and drag it into the right-hand column (`1`), which lists modules enabled for this user. 
    - To save changes, select **Apply** (`2`).
    ![](/images/integrations/nasweb/modules.png)

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: NASweb device address

User:
  description: Login of user with enabled `API` module

Password:
  description: Password of user with enabled `API` module

{% endconfiguration_basic %}
