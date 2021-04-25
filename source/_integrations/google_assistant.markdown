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
---

The `google_assistant` integration allows you to control things via Google Assistant on your mobile, tablet or Google Home device.

## Automatic setup via Home Assistant Cloud

With [Home Assistant Cloud](/cloud/), you can connect your Home Assistant instance in a few simple clicks to Google Assistant. With Home Assistant Cloud you don't have to deal with dynamic DNS, SSL certificates or opening ports on your router. Just log in via the user interface and a secure connection with the cloud will be established. Home Assistant Cloud requires a paid subscription after a 30-day free trial.

For Home Assistant Cloud Users, documentation can be found [here](https://www.nabucasa.com/config/google_assistant/).

## Manual setup

The Google Assistant integration (without Home Assistant Cloud) requires a bit more setup than most due to the way Google requires Assistant Apps to be set up.

<div class='note warning'>

To use Google Assistant, your Home Assistant configuration has to be [externally accessible with a hostname and SSL certificate](/docs/configuration/remote/). If you haven't already configured that, you should do so before continuing. If you make DNS changes to accomplish this, please ensure you have allowed up to the full 48 hours for DNS changes to propagate, otherwise, Google may not be able to reach your server. Once you have confirmed you can reach your Home Assistant from outside your home network, you can set up the Google integration:

</div>

### Google Cloud Platform configuration

1. Create a new project in the [Actions on Google console](https://console.actions.google.com/).
    1. Click `New Project` and give your project a name.
    2. Click on the `Smart Home` card, then click the `Start Building` button.
    3. Click `Name your Smart Home action` under `Quick Setup` to give your Action a name - Home Assistant will appear in the Google Home app as `[test] <Action Name>`
    4. Click on the `Overview` tab at the top of the page to go back.
    5. Click `Build your Action`, then click `Add Action(s)`.
    6. Add your Home Assistant URL: `https://[YOUR HOME ASSISTANT URL:PORT]/api/google_assistant` in the `Fulfillment URL` box, replace the `[YOUR HOME ASSISTANT URL:PORT]` with the domain / IP address and the port under which your Home Assistant is reachable.
    7. Click `Save`.
    8. Click the three little dots (more) icon in the upper right corner, select `Project settings`
    9. Make note of the `Project ID` that are listed on the `GENERAL` tab of the `Settings` page.
2. `Account linking` is required for your app to interact with Home Assistant.
    1. Start by going back to the `Overview` tab.
    2. Click on `Setup account linking` under the `Quick Setup` section of the `Overview` page.
    3. If asked, leave options as they default `No, I only want to allow account creation on my website` and select `Next`.
    4. Then if asked, for the `Linking type` select `OAuth` and `Authorization Code`. Click `Next`
    5. Enter the following:
        1. Client ID: `https://oauth-redirect.googleusercontent.com/r/[YOUR_PROJECT_ID]`. (Replace `[YOUR_PROJECT_ID]` with your project ID from above)
        2. Client Secret: Anything you like, Home Assistant doesn't need this field.
        3. Authorization URL: `https://[YOUR HOME ASSISTANT URL:PORT]/auth/authorize`. (Replace `[YOUR HOME ASSISTANT URL:PORT]` with your values.)
        4. Token URL (replace with your actual URL): `https://[YOUR HOME ASSISTANT URL:PORT]/auth/token`. (Replace `[YOUR HOME ASSISTANT URL:PORT]` with your values.)
           Click `Next`, then `Next` again.
    6. In the `Configure your client` `Scopes` textbox, type `email` and click `Add scope`, then type `name` and click `Add scope` again.
    7. Do **NOT** check `Google to transmit clientID and secret via HTTP basic auth header`.
    8. Click `Next`, then click `Save`

    <img src='/images/integrations/google_assistant/accountlinking.png' alt='Screenshot: Account linking'>

3. Select the `Develop` tab at the top of the page, then in the upper right hand corner select the `Test` button to generate the draft version Test App. If you don't see this option, go to the `Test` tab instead, click on the `Settings` button in the top right below the header, and ensure `On device testing` is enabled (if it isn't, enable it).
4. Add the `google_assistant` integration configuration to your `configuration.yaml` file and restart Home Assistant following the [configuration guide](#configuration) below.
5. Add services in the Google Home App (Note that app versions may be slightly different.)
    1. Open the Google Home app and go to `Settings`.
    2. Click `Add...`, `+ Set up or add`, `+ Set up device`, and click `Have something already setup?`. You should have `[test] your app name` listed under 'Add new'. Selecting that should lead you to a browser to login your Home Assistant instance, then redirect back to a screen where you can set rooms and nicknames for your devices if you wish.

<div class='note'>

If you've added Home Assistant to your phone's home screen, you have to first remove it from home screen, otherwise, this HTML5 app will show up instead of a browser. Using it would prevent Home Assistant redirecting back to the Google Home app.

</div>

### Allow Other Users

If you want to allow other household users to control the devices:

1. Open the project you created in the [Actions on Google console](https://console.actions.google.com/).
2. Click `Test` on the top of the page, then click `Simulator` located to the page left, then click the three little dots (more) icon in the upper right corner of the console.
3. Click Manage user access. This redirects you to the Google Cloud Platform IAM permissions page.
4. Click ADD at the top of the page.
    1. Enter the email address of the user you want to add.
    2. Click Select a role and choose Project < Viewer.
    3. Click SAVE
    4. Copy and share the Actions project link (`https://console.actions.google.com/project/YOUR_PROJECT_ID/simulator`) with the new user.
5. Have the new user open the link with their own Google account, agree to the Terms of Service popup, then select "Start Testing", select VERSION - Draft in the dropdown, and click "Done".
6. Have the new user go to their `Google Assistant` app to add `[test] your app name` to their account.

### Enable Device Sync

If you want to support active reporting of state to Google's server (configuration option `report_state`) and synchronize Home Assistant devices with the Google Home app (`google_assistant.request_sync` service), you will need to create a service account. It is recommended to set up this configuration key as it also allows the usage of the following command, "Ok Google, sync my devices". Once you have set up this component, you will need to call this service (or command) each time you add a new device in Home Assistant that you wish to control via the Google Assistant integration. This allows you to update devices without unlinking and relinking an account (see [below](#troubleshooting)).

1. Service Account
    1. In the Google Cloud Platform Console, go to the [Create Service account key](https://console.cloud.google.com/apis/credentials/serviceaccountkey) page.
    2. At the top left of the page next to "Google Cloud Platform" logo, select your project created in the Actions on Google console. Confirm this by reviewing the project ID and it ensure it matches.
    3. From the Service account list, select New service account.
    4. In the Service account name field, enter a name.
    5. In the Service account ID field, enter an ID.
    6. From the Role list, select `Service Accounts` > `Service Account Token Creator`.
    7. For the Key type, select the JSON option.
    8. Click `Create`. A JSON file that contains your key downloads to your computer.
    9. Use the information in this file or the file directly to add to the `service_account` key in the configuration.
    10. Click `close`.
2. HomeGraph API
    1. Go to the [Google API Console](https://console.cloud.google.com/apis/api/homegraph.googleapis.com/overview).
    2. At the top left of the page next to "Google Cloud Platform" logo, select your project created in the Actions on Google console. Confirm this by reviewing the project ID and it ensure it matches.
    3. Click Enable HomeGraph API.
3. Try "OK Google, sync my devices" - the Google Home app should import your exposed Home Assistant devices and prompt you to assign them to rooms.

### YAML Configuration

Now add your setup to your `configuration.yaml` file, such as:

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
        channel_list:
          description: List of available channels (only for Channel Trait)
          required: false
          type: list
          keys:
            channel_name:
              description: Name of the channel
              required: true
              type: string
            channel_number:
              description: Numeric identifier for the channel
              required: true
              type: string
{% endconfiguration %}

### Available domains

Currently, the following domains are available to be used with Google Assistant, listed with their default types:

- alarm_control_panel (arm/disarm)
- camera (streaming, requires compatible camera)
- group (on/off)
- input_boolean (on/off)
- input_select (option/setting/mode/value)
- scene (on)
- script (on)
- switch (on/off)
- fan (on/off/speed)
- light (on/off/brightness/rgb color/color temp)
- lock 
- cover (on/off/set position)
- media_player (on/off/set volume (via set volume)/source (via set input source)/control playback)
- climate (temperature setting, hvac_mode)
- vacuum (dock/start/stop/pause)
- sensor (temperature setting for temperature sensors and humidity setting for humidity sensors)
- humidifier (humidity setting/on/off/mode)

<div class='note'>

Some of these devices may not display correctly in the Google Home app, such as media_player, however voice commands will still work.

</div>

### Secure Devices

Certain devices are considered secure, including anything in the `lock` domain, `alarm_control_panel` domain and `covers` with device types `door`, `garage` or `gate`.

By default these cannot be opened by Google Assistant unless a `secure_devices_pin` is set up. To allow opening, set the `secure_devices_pin` to something and you will be prompted to speak the pin when opening the device. Closing or locking these devices does not require a pin.

For the Alarm Control Panel if a code is set it must be the same as the `secure_devices_pin`. If `code_arm_required` is set to `false` the system will arm without prompting for the pin.

### Room/Area support

Entities that have not been explicitly assigned to rooms but have been placed in Home Assistant areas will return room hints to Google with the devices in those areas.

### Climate Operation Modes

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

The is no TV channel object in Home Assistant. To change channel by name with Google Assistant, you must provide a `channel_list` for your entity.

```yaml
# Example configuration.yaml entry
google_assistant:
  project_id: YOUR_PROJECT_ID
  service_account: !include SERVICE_ACCOUNT.JSON
  report_state: true
  exposed_domains:
    - media_player
  entity_config:
    media_player.living_room_tv:
      channel_list:
        - channel_name: "ABC"
          channel_number: 1
        - channel_name: "Fox"
          channel_number: 2
```

```yaml
# Example configuration.yaml entry with channel json config
google_assistant:
  project_id: YOUR_PROJECT_ID
  service_account: !include SERVICE_ACCOUNT.JSON
  report_state: true
  exposed_domains:
    - media_player
  entity_config:
    media_player.living_room_tv:
      channel_list: !include GOOGLE_ASSISTANT_CHANNEL_LIST.JSON
```

### Troubleshooting

#### 404 errors on request sync

Syncing may fail after a period of time, likely around 30 days, due to the fact that your Actions on Google app is technically in testing mode and has never been published. Eventually, it seems that the test expires. Control of devices will continue to work but syncing may not. If you say "Ok Google, sync my devices" and get the response "Unable to sync Home Assistant" (or whatever you named your project), this can usually be resolved by going back to your test app in the [Actions on Google console](https://console.actions.google.com/) and clicking `Simulator` under `TEST`. Regenerate the draft version Test App and try asking Google to sync your devices again. If regenerating the draft does not work, go back to the `Action` section and just hit the `enter` key for the URL to recreate the Preview.

The `request_sync` service requires that the initial sync from Google includes the `agent_user_id`. If not, the service will log an error that reads something like "Request contains an invalid argument". If this happens, then [unlink the account](https://support.google.com/googlenest/answer/7126338) from Home Control and relink.

The `request_sync` service may fail with a 404 if the `project_id` of the HomeGraph API differs from the `project_id` of the Actions SDK found in the preferences of your project on [Actions on Google console](https://console.actions.google.com). Resolve this by:

  1. Removing your project from the [Google Cloud API Console](https://console.cloud.google.com).
  2. Add a new project to the [Actions on Google console](https://console.actions.google.com) Here you get a new `project_id`.
  3. Run through the previously mentioned [Actions on Google console] setup instructions until the step to create a `service_account`.
  4. Once you begin to create a new `service_account` in the [Google Cloud API Console], ensure you select the project created in  [Actions on Google console] by verifying the `project_id`.  
  5. Enable HomeGraph API to the new project.

Verify that the Google Assistant is available on `https://[YOUR HOME ASSISTANT URL:PORT]/api/google_assistant` If it is working it should return `405: Method Not Allowed` when opened in a browser or via curl.

#### 403 errors on request sync

The `request_sync` service may fail with a 403 if the HomeGraph API is not enabled. Go to [Google API Console](https://console.cloud.google.com/apis/api/homegraph.googleapis.com/overview) and verify that HomeGraph API is enabled for your project.

#### 404 errors on report state

If you receive 404 errors linked to reporting state in your log, Home Assistant is reporting state for entities that were never synced to Google. Ask your Google Home to `Sync my devices` or run the service `google_assistant.request_sync`.

#### Error during linking: "Could not update the setting. Please check your connection"

Your fulfillment URL may be invalid or unreachable. Recheck the `Fulfillment URL` as specified in [Manual Setup](#manual-setup) and verify that it's publicly reachable.

#### NGINX

When using NGINX, ensure that your `proxy_pass` line *does not* have a trailing `/`, as this will result in errors. Your line should look like:

    proxy_pass http://localhost:8123;

### Unlink and relink

If you're having trouble with *Account linking failed* after you unlinked your service, try clearing the browser history and cache.

### Failed linking - Could not update the setting. Please check your connection

If you're having trouble linking your account, with the error message `Could not update the setting. Please check your connection` after logging into your Home Assistant instance, try setting `expose_by_default: false` then exposing a single simple device (light or switch preferably). It is also worth checking if any home ad blocker is disabled if you are having issues.
