---
title: Google Assistant
description: Setup for Google Assistant integration
ha_category:
  - Voice
featured: true
ha_release: 0.56
ha_iot_class: Cloud Push
ha_codeowners:
  - '@home-assistant/cloud'
ha_domain: google_assistant
ha_integration_type: system
ha_platforms:
  - button
  - diagnostics
---

The `google_assistant` integration allows you to control your Home Assistant devices via Google Assistant on your mobile, tablet, or Google Home device.

If you want to send commands to Google Assistant to control devices supported by Google Assistant but not by Home Assistant, or broadcast messages to Google Assistant speakers and displays without interrupting music/video playback, take a look at the [Google Assistant SDK](/integrations/google_assistant_sdk) integration.

## Automatic setup via Home Assistant Cloud

With [Home Assistant Cloud](/cloud/), you can connect your Home Assistant instance in a few simple clicks to Google Assistant. With Home Assistant Cloud you don't have to deal with dynamic DNS, SSL certificates, or opening ports on your router. Just log in via the user interface and a secure connection with the cloud will be established. Home Assistant Cloud requires a paid subscription after a 30-day free trial.

For Home Assistant Cloud users, documentation can be found [here](https://www.nabucasa.com/config/google_assistant/).

## Manual setup (if you don't have Home Assistant Cloud)

The Google Assistant integration (without Home Assistant Cloud) requires a bit more setup than most due to the way Google requires Assistant Apps to be set up.

### Prerequisites

To use Google Assistant, your Home Assistant configuration has to be [externally accessible with a hostname and SSL certificate](/docs/configuration/remote/).

- If you haven't already configured that, you should do so before continuing.
- If you make DNS changes to accomplish this, ensure you have allowed up to the full 48 hours for DNS changes to propagate, otherwise, Google may not be able to reach your server.
- Once you have confirmed you can reach your Home Assistant from outside your home network, you can set up the Google integration:

### Google Cloud Platform configuration

1. Create a new project in the [Google Developer Console](https://console.home.google.com/projects).
    1. Select **Create a Project**
    2. On the **Get started** page, select **Create project**.
       - Give your project a name and select **Create project**.
    3. Save your Project ID (it's under the main project name) for use below.
    4. Select **Add a Cloud-to-Cloud integration**.
    5. In the bottom right corner, select **Next: Develop**, then select **Next: Setup**.
    6. Select all applicable device types (you can select them all).
    7. Create an app icon 144 x 144 pixels and upload it.
    8. Under **Account Linking**, in the **OAuth Client ID** field, enter `https://oauth-redirect.googleusercontent.com/r/[YOUR_PROJECT_ID]`.
    9. Replace `[YOUR_PROJECT_ID]` with your project ID from above.
    10. Fill in the details:
        - In the **Client Secret** field, add any string (without special characters).Home Assistant doesn't need this field.
        - In the **Authorization URL** field, enter `https://[yourdomain:port]/auth/authorize`.
        - In the **Token URL** field, enter `https://[yourdomain:port]/auth/token`.
        - In the **Cloud fulfillment URL** field, enter `https://[yourdomain:port]/api/google_assistant`.
        - For now, skip **Local fulfillment** and **App Flip**.
        - Under **Scope(s)**, enter `email`. Select **Add scope** and enter `name`.
        - Leave the checkbox **Have Google transmit Client ID and secret via HTTP basic auth header** unchecked/cleared.
        - Select **Save**.
          - **Result**: You will see your project saved with the status **Draft**.
          - You do not need to test.

2. In the left hand menu of your project, select the **Analytics** link.
   - Select the hamburger {% icon "mdi:hamburger-menu" %} menu and select **APIs and Services**.
3. Enable device sync ([see below for more information](#enable-device-sync)).
    1. In the left hand menu, select **Credentials**.
    2. In the **Credentials** view, select **Create credentials** and next **Service account**.
        1. **Service account name**: Give your account a self-selected name.
        2. Select **Create and Continue**.
        3. Under **Select a role**, select **Service Accounts** > **Service Account Token Creator**.
        4. Select **Continue** and then **Done**.
    3. Under **Service Accounts**, there should now be an account called [name from 3.2.1]@[projectname].iam.gserviceaccount.com.
    4. Select the pencil button of that service account.
    5. Go to **Keys** and **Add key**.
    6. Create a private key in JSON format.
    7. This will start a download of a JSON file.
        1. Rename the file to `SERVICE_ACCOUNT.JSON`.
        2. In Home Assistant, add this file to your config-folder. This will be the same folder as your {% term "`configuration.yaml`" %}.
    8. Go back to [Google Cloud Platform](https://console.cloud.google.com/) and select **Close**.
    9. Then select **Save**.
    10. Go to the **Search products and resources** and search for **Homegraph API** and select it.
    11. Enable the HomeGraph API.

4. Add the `google_assistant` integration configuration to your {% term "`configuration.yaml`" %} file and restart Home Assistant following the [configuration guide](#yaml-configuration) below.
5. Add services in the Google Home App (note that app versions may be slightly different).
    1. Open the Google Home app.
    2. Select the `+` button on the top left corner, select **Set up device**. In the **Set up a device** screen, select **Works with Google**. You should have `[test] <Action Name>` listed under **Add new**. Selecting that should lead you to a browser to login your Home Assistant instance, then redirect back to a screen where you can set rooms and nicknames for your devices if you wish.

{% important %}
If you've added Home Assistant to your phone's home screen, you have to first remove it from the home screen. Otherwise, this HTML5 app will show up instead of a browser. Using it would prevent Home Assistant redirecting back to the Google Home app.
{% endimportant %}

### Allow other users

If you want to allow other household users to control the devices:

1. Open the project you created in the [Actions on Google console](https://console.actions.google.com/).
2. Select **Test** on the top of the page, then select **Simulator** located to the page left, then click the three little dots (more) icon in the upper right corner of the console.
3. Select **Manage user access**. This redirects you to the Google Cloud Platform IAM permissions page.
4. Select **Grant access** at the top of the page.
    1. Enter the email address of the user you want to add.
    2. Select **Select a role** and choose **Project** > **Viewer**.
    3. Select **Save**.
    4. Copy and share the Actions project link (`https://console.actions.google.com/project/YOUR_PROJECT_ID/simulator`) with the new user.
5. Have the new user open the link with their own Google account, agree to the **Terms of Service** popup. Then select **Start Testing**, select **Version - Draft** in the dropdown, and select **Done**.
6. Have the new user go to their **Google Assistant** app to add `[test] your app name` to their account.

### Enable device sync

If you want to support active reporting of state to Google's server (configuration option `report_state`) and synchronize Home Assistant devices with the Google Home app (`google_assistant.request_sync` service), you will need to create a service account. It is recommended to set up this configuration key as it also allows the usage of the following command, "Ok Google, sync my devices". Once you have set up this component, you will need to call this service (or command) each time you add a new device in Home Assistant that you wish to control via the Google Assistant integration. This allows you to update devices without unlinking and relinking an account (see [below](#troubleshooting)).

The service account is created by following Step 4 (Enable device sync) in the previous section [Google Cloud Platform configuration](#google-cloud-platform-configuration).

Try it with "OK Google, sync my devices" - the Google Home app should import your exposed Home Assistant devices and prompt you to assign them to rooms.

### Enable local fulfillment

Google Assistant devices can send their commands locally to Home Assistant allowing them to respond faster.

Your Home Assistant instance needs to be connected to the same network as the Google Assistant device that you’re talking to so that it can be discovered via mDNS discovery (UDP broadcasts).

Your Google Assistant devices will still communicate via the internet to:

- Get credentials to establish a local connection.
- Send commands that involve a [secure device](#secure-devices).
- Send commands if local fulfillment fails.

{% important %}
The [HTTP integration](/integrations/http) must **not** be configured to use an SSL certificate with the [`ssl_certificate` option](/integrations/http/#ssl_certificate).

This is because the Google Assistant device will connect directly to the IP of your Home Assistant instance and will fail if it encounters an invalid SSL certificate.

For secure remote access, use a reverse proxy such as the {% my supervisor_addon addon="core_nginx_proxy" title="NGINX SSL" %} add-on instead of directing external traffic straight to Home Assistant.
{% endimportant %}

1. Open the project you created in the [Actions on Google console](https://console.actions.google.com/).
2. Select **Develop** on the top of the page, then select **Actions** located in the hamburger menu on the top left.
3. Upload Javascript files
   1. Download `app.js` from [here](https://github.com/NabuCasa/home-assistant-google-assistant-local-sdk/releases/latest)
   2. Select the **Upload JavaScript files** button.
   3. Select **Upload your JavaScript targeting Node** and upload the `app.js` from step 3.1.
   4. Select **Upload your JavaScript targeting Chrome (browser)** and upload the `app.js` from step 3.1.
4. Check the box **Support local query** under **Add capabilities**.
5. Add device scan configuration:
   1. Select **+ New scan config** if no configuration exists.
   2. Select **MDNS**.
   3. Set **MDNS service name** to `_home-assistant._tcp.local`
   4. Select **Add field**, then under **Select a field**, choose **Name**.
   5. Enter a new **Value** field set to `.*\._home-assistant\._tcp\.local`
6. Save your changes.
7. Either wait for 30 minutes, or restart all your Google Assistant devices.
8. Restart Home Assistant Core.
9. With a Google Assistant device, try saying "OK Google, sync my devices." This can be helpful to avoid issues, especially if you are enabling local fulfillment sometime after adding cloud Google Assistant support.

You can debug the setup by following [these instructions](https://developers.home.google.com/local-home/test#debugging_from_chrome).

### YAML configuration

Now add your setup to your {% term "`configuration.yaml`" %} file, such as:

```yaml
# Example configuration.yaml entry
google_assistant:
  project_id: YOUR_PROJECT_ID
  service_account: !include SERVICE_ACCOUNT.JSON
  report_state: true
  exposed_domains:
    - switch
    - light
  entity_config:
    switch.kitchen:
      name: CUSTOM_NAME_FOR_GOOGLE_ASSISTANT
      aliases:
        - BRIGHT_LIGHTS
        - ENTRY_LIGHTS
    light.living_room:
      expose: false
      room: LIVING_ROOM
```

{% configuration %}
project_id:
  description: Project ID from the Actions on Google console (looks like `words-2ab12`)
  required: true
  type: string
secure_devices_pin:
  description: "Pin code to say when you want to interact with a secure device."
  required: false
  type: string
  default: ""
service_account:
  description: Service account information. You can use an include statement with your downloaded JSON file, enter data here directly or use secrets file to populate.
  required: true
  type: map
  keys:
    private_key:
      description: Private key in PEM format
      required: true
      type: string
    client_email:
      description: Service email address
      required: true
      type: string
report_state:
  description: Actively report state changes on entities. This speeds up response time for actions affecting multiple entities since Google Assistant knows pre-hand what state they are. It is also required for some features on visual controls.
  required: false
  default: false
  type: boolean
expose_by_default:
  description: "Expose devices in all supported domains by default. If `exposed_domains` domains is set, only these domains are exposed by default. If `expose_by_default` is set to false, devices have to be manually exposed in `entity_config`."
  required: false
  default: true
  type: boolean
exposed_domains:
  description: List of entity domains to expose to Google Assistant if `expose_by_default` is set to true. This has no effect if `expose_by_default` is set to false.
  required: false
  type: list
entity_config:
  description: Entity specific configuration for Google Assistant
  required: false
  type: map
  keys:
    YOUR_ENTITY_ID:
      description: Entity to configure
      required: false
      type: map
      keys:
        name:
          description: Name of the entity to show in Google Assistant
          required: false
          type: string
        expose:
          description: Force an entity to be exposed/excluded.
          required: false
          type: boolean
          default: true
        aliases:
          description: Aliases that can also be used to refer to this entity
          required: false
          type: list
        room:
          description: Allows for associating this device to a Room in Google Assistant.
          required: false
          type: string
{% endconfiguration %}

### Available domains

Currently, the following domains are available to be used with Google Assistant, listed with their default types:

- alarm_control_panel (arm/disarm)
- button (scene)
- camera (streaming, requires compatible camera)
- climate (on/off, temperature setting, hvac_mode)
- cover (on/off/set position/stop/start=toggle cover)
- event (only entities with device class `doorbell` are supported)
- fan (on/off/speed percentage/preset mode)
- group (on/off)
- humidifier (humidity setting/on/off/mode)
- input_boolean (on/off)
- input_button
- input_select (option/setting/mode/value)
- light (on/off/brightness/rgb color/color temp)
- lock
- media_player (on/off/set volume (via set volume)/source (via set input source)/control playback)
- scene (on)
- script (on)
- select
- sensor (temperature setting for temperature sensors and humidity setting for humidity sensors)
- switch (on/off)
- vacuum (dock/start/stop/pause)
- valve (open/close/set position/stop/start=toggle valve)
- water_heater (on-off/temperature setting/operation mode)

{% note %}
Some of these devices may not display correctly in the Google Home app, such as media_player, however voice commands will still work.
{% endnote %}

### Secure devices

Certain devices are considered secure. This includes devices in the `lock` domain, the `alarm_control_panel` domain, as well as `covers` with device types `door`, `garage`, or `gate`.

By default, secure devices cannot be opened by Google Assistant unless a `secure_devices_pin` code is set up. To allow opening, set the `secure_devices_pin` to something. You will then be prompted to speak the pin when opening the device. Closing or locking these devices does not require a pin.

If a code is set for the Alarm control panel, it must be the same as the `secure_devices_pin`. If `code_arm_required` is set to `false`, the system will arm without prompting for the pin.

### Room/Area support

Entities that have not been explicitly assigned to rooms but have been placed in Home Assistant areas will return room hints to Google with the devices in those areas.

{% note %}
Some devices, such as `scene` or `script`, must be assigned to an `area` before other members of a shared Google Home Household can use them. This is because household members in a shared Google Home will not be able to view devices that are not assigned to a room _unless_ they were the user who linked the service to Google Home. This issue isn't immediately apparent because `script` and `scene` devices aren't visible in the main Google Home dashboard.
  
The automatic room assignment will not work when multiple homes are set up in your Google account.
{% endnote %}

### Climate operation modes

There is not an exact 1-1 match between Home Assistant and Google Assistant for the available operation modes.
Here are the modes that are currently available:

- off
- heat
- cool
- heatcool (auto)
- fan-only
- dry
- eco

### TV Channels

There is no TV channel object in Home Assistant. TV channel can only be changed by number, not by name (for example, `Turn to channel two`).

### Troubleshooting

#### 404 errors on request sync

Syncing from Google Assistant may fail after a period of time, likely around 30 days, due to the fact that your Actions on Google app is technically in testing mode and has never been published. Eventually, it seems that the test expires. Control of devices will continue to work but syncing may not. If you say "Ok Google, sync my devices" and get the response "Unable to sync Home Assistant" (or whatever you named your project), this can usually be resolved by going back to your test app in the [Actions on Google console](https://console.actions.google.com/) and clicking `Simulator` under `TEST`. Regenerate the draft version Test App and try asking Google to sync your devices again. If regenerating the draft does not work, go back to the `Action` section and just hit the `enter` key for the URL to recreate the Preview.

Syncing from Home Assistant will always work and will automatically update entity changes.

The `request_sync` service requires that the initial sync from Google includes the `agent_user_id`. If not, the service will log an error that reads something like "Request contains an invalid argument". If this happens, then [unlink the account](https://support.google.com/googlenest/answer/7126338) from Home Control and relink.

The `request_sync` service may fail with a 404 if the `project_id` of the HomeGraph API differs from the `project_id` of the Actions SDK found in the preferences of your project on [Actions on Google console](https://console.actions.google.com). Resolve this by:

  1. Removing your project from the [Google Cloud API Console](https://console.cloud.google.com).
  2. Add a new project to the [Actions on Google console](https://console.actions.google.com) Here you get a new `project_id`.
  3. Run through the previously mentioned [Actions on Google console] setup instructions until the step to create a `service_account`.
  4. Once you begin to create a new `service_account` in the [Google Cloud API Console], ensure you select the project created in  [Actions on Google console] by verifying the `project_id`.
  5. Enable HomeGraph API to the new project.

Verify that the Google Assistant is available on `https://[YOUR HOME ASSISTANT URL:PORT]/api/google_assistant` If it is working it should return `405: Method Not Allowed` when opened in a browser or via curl.

#### 403 errors on request sync

The `request_sync` action may fail with a 403 if the HomeGraph API is not enabled. Go to [Google API Console](https://console.cloud.google.com/apis/api/homegraph.googleapis.com/overview) and verify that HomeGraph API is enabled for your project.

#### 404 errors on report state

If you receive 404 errors linked to reporting state in your log, Home Assistant is reporting state for entities that were never synced to Google. Ask your Google Home to `Sync my devices` or run the `google_assistant.request_sync` action.

#### Error during linking: "Could not update the setting. Please check your connection"

Your fulfillment URL may be invalid or unreachable. Recheck the `Fulfillment URL` as specified in [Manual Setup](#manual-setup-if-you-dont-have-home-assistant-cloud) and verify that it's publicly reachable.

#### 500 / 429 error on request sync

This error may occur if the service key is invalid. Try deleting and creating a new service account and key.

#### NGINX

When using NGINX, ensure that your `proxy_pass` line _does not_ have a trailing `/`, as this will result in errors. Your line should look like:

    proxy_pass http://localhost:8123;

### Unlink and relink

If you're having trouble with _Account linking failed_ after you unlinked your service, try clearing the browser history and cache.

### Failed linking - Could not update the setting. Please check your connection

If you're having trouble linking your account, with the error message `Could not update the setting. Please check your connection` after logging into your Home Assistant instance, try setting `expose_by_default: false` then exposing a single simple device (light or switch preferably). It is also worth checking if any home ad blocker is disabled if you are having issues.
