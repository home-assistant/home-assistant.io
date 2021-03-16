---
title: Nest
description: Instructions on how to integrate Nest into Home Assistant.
ha_category:
  - Hub
  - Binary Sensor
  - Camera
  - Climate
  - Doorbell
  - Sensor
ha_iot_class: Cloud Push
ha_release: 0.7
ha_config_flow: true
ha_codeowners:
  - '@allenporter'
ha_domain: nest
ha_quality_scale: platinum
ha_dhcp: true
ha_platforms:
  - binary_sensor
  - camera
  - climate
  - sensor
---

The `nest` integration allows you to integrate your [Google Nest](https://store.google.com/us/category/connected_home?) devices in Home Assistant. This integration uses the [Smart Device Management](https://developers.google.com/nest/device-access/api) API and Google's Cloud Pubsub to efficiently listen for changes in device state or other events.

There is currently support for the following device types within Home Assistant:

- [Camera](#camera)
- [Climate](#climate)
- [Sensor](#sensor)

<div class='note'>
This integration supports two Nest APIs. The SDM API is the new primary API that accepts new users. The Legacy Works With Nest API is not accepting new users, but the documentation still exists at the bottom of the page so existing users can keep using it.
</div>

## Overview: Supported Devices

Home Assistant is integrated with the following devices through the SDM API:

- Thermostat Devices
  - Every thermostat is exposed as a `climate` entity
  - A Temperature `sensor` entity. Note: Additional Nest Temperature Sensors are not supported by the SDM API.
  - A Humidity `sensor` entity.
  - Example devices: All Google Nest Thermostat models
- Display, Camera, and Doorbell Devices
  - The camera live stream is available as a `camera` entity
  - Device Triggers for use in automations such as Person detected, Motion detected and Doorbell pressed
  - Example devices: All Google Nest Cam models, Google Nest Hello Video Doorbell, Google Nest Hub Max

You are in control of the information and capabilities exposed to Home Assistant. You can authorize a single device, multiple devices, or different levels of functionality such as motion events, live streams, for any particular device. The integration is flexible enough to adapt based on what you allow.

Others devices like Smoke and CO Alarms or Security systems are not currently
supported by the SDM API.

The full detailed instructions for account setup are available in the [Device Access Registration](https://developers.google.com/nest/device-access/registration) Quick Start Guide. The instructions below are included to make this complex setup process a bit easier to follow.

## Device Access Registration

For the first phase, you will turn on the API and create the necessary credentials to have Home Assistant talk to the Nest API.

1. First go to the [Device Access Registration](https://developers.google.com/nest/device-access/registration) page. Click on the button **Go to the Device Access Console**.
    ![Screenshot of Device Access Registration](/images/integrations/nest/device_access.png)

1. Check the box to "Accept the Terms of Service" and click **Continue to Payment** where you need to pay a fee (currently US$5).
    ![Screenshot of accepting terms](/images/integrations/nest/accept_terms.png)

    <div class='note'>
    It is currently not possible to share/be invited to a home with a G-Suite account. Make sure that you pay the fee with an account that has access to your devices.
    </div>

1. Now the "Device Access Console" should be visible. Click on **Create project**.
    ![Screenshot of creating a project](/images/integrations/nest/create_project.png)

1. Give your Device Access project a name and click **Next**.
    ![Screenshot of naming a project](/images/integrations/nest/project_name.png)

1. Next you will be asked for an *OAuth client ID*. It is a good idea to go create that now. Open a new tab to the [Google API Console](https://console.developers.google.com/apis/credentials).

1. If this is your first time here, you likely need to create a new Google API project. Click **Create Project** then **New
Project**. Note: This is a different type of project from the Device Access project you are also creating.
    ![Screenshot of APIs and Services Cloud Console with no existing project](/images/integrations/nest/api_project_needed.png)

1. Give your API Project a name then click **Create**. Note: You can ignore the *Project ID* here as Home Assistant does not need it.

1. Click *OAuth consent screen* and make sure you have that configured, otherwise you can do that now...
    ![Screenshot of OAuth consent screen creation](/images/integrations/nest/oauth_consent_create.png)

1. Select **External** (the only choice if you are not a G-Suite user) then click **Create**. While you are here, you may click the *Let us know what you think* to give Google's OAuth team any feedback about your experience configuring credentials for self-hosted software. They make regular improvements to this flow and appear to value feedback.

1. The *App Information* screen needs you to enter an **App name** and **User support email**, then enter your email again under **Developer contact email**. These are only shown while you later go through the OAuth flow to authorize Home Assistant to access your account. Click **Save and Continue**. Omit unnecessary information (e.g. logo) to avoid additional review by Google.

1. On the *Scopes* step click **Save and Continue**.

1. On the *Test Users* step, you need to add your Google Account (e.g., your @gmail.com address) to the list. Click *Save* on your test account then **Save and Continue** to finish the consent flow.
    ![Screenshot of OAuth consent screen test users](/images/integrations/nest/oauth_consent_test_users.png)

1. Navigate back to the *OAuth consent screen* and click **Publish App** to set the *Publishing status* is *In Production* and not *Testing*. The warning says your *app will be available to any user with a Google Account* which refers to the fields you entered on the *App Information* screen if someone finds the URL. This does not expose your Google Account or Nest data.
    ![Screenshot of OAuth consent screen production status](/images/integrations/nest/oauth_consent_production_status.png)

1. Navigate to the **Credentials** page and click **Create Credentials**.
    ![Screenshot of APIs and Services Cloud Console](/images/integrations/nest/create_credentials.png)

1. From the drop-down list select *OAuth client ID*.
    ![Screenshot of OAuth client ID selection](/images/integrations/nest/oauth_client_id.png)

1. Enter *Web Application* for the Application typex, since you will use this with Home Assistant.

1. Pick a name for your credential.

1. Add **Authorized redirect URIs** for your Home Assistant URL, including the OAuth callback path e.g., `https://<your_home_assistant_url>:<port>/auth/external/callback`. See [Troubleshooting](#troubleshooting) below for more details on the subtle requirements for what kinds of URLs work here.
    ![Screenshot of creating OAuth credentials](/images/integrations/nest/oauth_redirect_uri.png)

1. You should now be presented with an *OAuth client created* message. Take note of *Your Client ID* and *Your Client Secret* as these are needed for Home Assistant set up.
    ![Screenshot of OAuth Client ID and Client Secret](/images/integrations/nest/oauth_created.png)

1. Now head back to the *Device Access Console* tab and *Add your OAuth client ID* then click **Next**.
    ![Screenshot of Device Access Console OAuth client ID](/images/integrations/nest/device_access_oauth_client_id.png)

1. Enable Events by clicking on **Enable** and **Create project**.
    ![Screenshot of enabling events](/images/integrations/nest/enable_events.png)

1. Take note of the *Project ID* as you will need it later. At this point you have the `project_id`, `client_id` and `client_secret` configuration options needed for Home Assistant.

1. Go back to the [Google Cloud Console: API & Services](https://console.developers.google.com/apis/dashboard)

1. Click on **Enable APIs and Services**
    ![Screenshot of Cloud Console APIs and Services](/images/integrations/nest/enable_api.png)

1. Search for **Smart Device management** and enable the API.
    ![Screenshot of Search for SDM API](/images/integrations/nest/enable_sdm_api.png)

## Pub/Sub subscriber setup

The next phase is to enable the Pub/Sub API by creating a subscription that can keep Home Assistant informed of events or device changes in near real-time. See [Device Access: Events](https://developers.google.com/nest/device-access/api/events) for the full detailed instructions.

1. Visit [Enable the Cloud Pub/Sub API](https://console.developers.google.com/apis/library/pubsub.googleapis.com) in the Cloud Console and click **Enable**.

1. Go to the [Google Cloud Platform: Pub/Sub: Subscriptions](https://console.cloud.google.com/cloudpubsub/subscription/list) page and click **Create Subscription**.

1. You will need to pick a *Subscription ID*.
    ![Screenshot of creating a subscription](/images/integrations/nest/create_subscription.png)

1. The *Topic name* should match the topic name in your project in the [Device Access Console](https://console.nest.google.com/device-access/) and typically looks like `projects/sdm-prod/topics/EXAMPLE`. The SDM topic names do not show up by default so make sure to **Enter topic manually**.
    ![Screenshot of creating a topic](/images/integrations/nest/device_access_pubsub_topic.png)

1. Select **Pull** as the *Delivery Type*.

1. Lower the message retention duration to be something short (e.g., 10 minutes or under an hour) to avoid a large backlog of updates when Home Assistant is turned off.

1. Leave the rest of the defaults and click **Create**.

1. Once created, copy the *Subscription name* which you will want to hold on to as your `subscriber_id` for configuring Home Assistant. This typically looks like `projects/MY-CLOUD-ID/subscriptions/EXAMPLE`. Don't confuse *Subscription name* with *Topic name* since they look similar.

## Configuration

Congratulations, you now should have everything you need to configure Home Assistant. Edit your `configuration.yaml` file and populate a `nest` entry in the format of the example [Configuration](#configuration) below.

```yaml
# Example configuration.yaml entry
nest:
  client_id: CLIENT_ID
  client_secret: CLIENT_SECRET
  # "Project ID" in the Device Access Console
  project_id: PROJECT_ID
  # Provide the full path exactly as shown under "Subscription name" in Google Cloud Console
  subscriber_id: projects/project-label-22ee1/subscriptions/SUBSCRIBER_ID
```

{% configuration %}
client_id:
  description: Your Device Access or Nest developer client ID.
  required: true
  type: string
client_secret:
  description: Your Device Access or Nest developer client secret.
  required: true
  type: string
project_id:
  description: Your Device Access Project ID. This enables the SDM API.
  required: false
  type: string
subscriber_id:
  description: Full path for the Pub/sub Subscription ID used to receive events. This is required to use the SDM API. Enter this exactly as it appers under "Subscription name" in the [Pub/Sub console](https://console.cloud.google.com/cloudpubsub/subscription/list).
  type: string
  required: false
{% endconfiguration %}

## Device Setup

Once your developer account is set up and you have a valid `nest` entry in `configuration.yaml`, you need to connect devices with the following steps:

1. Using your externally accessible address from the Home Assistant front-end, navigate to **Configuration** then **Integrations**. Click **Add Integration** then locate 'Nest'.

1. You should get redirected to Google to choose an account. This should be the same developer account you configured above.

1. The *Google Nest permissions* screen will allow you to choose which devices to configure. You likely want to enable
everything, however, you can leave out any feature you do not wish to use with Home Assistant.

    ![Screenshot of Nest permissions authorization](/images/integrations/nest/oauth_approve.png)

1. You will get redirected back to another account selection page. See [Troubleshooting](#troubleshooting) below if you get a `redirect_uri_mismatch` error.

1. You may see a warning screen that says *Google hasn't verified this app* since you just set up an un-verified developer workflow. Click *Advanced* then *Go to your domain (unsafe)* to proceed.

    ![Screenshot OAuth warning](/images/integrations/nest/oauth_app_verification.png)

1. Then you will be asked to grant access to additional permissions. Click *Allow*.
    ![Screenshot 1 of granting permissions](/images/integrations/nest/oauth_grant1.png)
    ![Screenshot 2 of granting permissions](/images/integrations/nest/oauth_grant2.png)

1. Confirm you want to allow persistent access to Home Assistant.
    ![Screenshot of OAuth confirmation](/images/integrations/nest/oauth_confirm.png)

1. If all went well, you are ready to go!
    ![Screenshot of success](/images/integrations/nest/finished.png)


## Troubleshooting

- For general trouble with the SDM API OAuth authorization flow with Google, see [Troubleshooting](https://developers.google.com/nest/device-access/authorize#troubleshooting).

- Check **Configuration** then **Logs** to see if there are any error messages or misconfigurations then see the error messages below.

- *Reauthentication required often*: If you are frequently getting logged out, this means your authentication token was revoked by Google. This most likely reason is the *OAuth Consent Screen* is set to *Testing* by default which expires the token after 7 days. Follow the steps above to set it to *Production* to resolve this and reauthorize your integration one more time to get a new token. You may also see this as the error message *invalid_grant: Token has been expired or revoked*.  See [Google Identity: Refresh token expiration](https://developers.google.com/identity/protocols/oauth2#expiration) for more reasons on why your token may have expired. 

- *Thermostat does not appear or is unavailable* happens due to a bug where the SDM API does return the devices. A common fix get the API to work again is to:
    - Restart the Thermostat device. See [How to restart or reset a Nest thermostat](https://support.google.com/googlenest/answer/9247296) for more details.
    - In the official Nest app or on https://home.nest.com: Move the Thermostat to a different or fake/temporary room.
    - Reload the integration in Home Assistant:  Navigate to **Configuration** then **Integrations**, click `...` next to *Nest* and choose **Reload**.

- *No devices or entities are created* if the SDM API is not returning any devices for the authorized account. Double-check that GCP is configured correctly to [Enable the API](https://developers.google.com/nest/device-access/get-started#set_up_google_cloud_platform) and authorize at least one device in the OAuth setup flow. If you have trouble here, then you may want to walk through the Google instructions and issue commands directly against the API until you successfully get back the devices.

- *Error 400: redirect_uri_mismatch* means that your OAuth Client ID is not configured to match your Home Assistant URL.

    - To resolve this, copy and paste the redirect URI in the error message (`https://<your_home_assistant_url>:<port>/auth/external/callback`).

      ![Screenshot of success](/images/integrations/nest/redirect_uri_mismatch.png)

    - Go back to the [API Console](https://console.developers.google.com/apis/credentials) and select your *OAuth 2.0 Client ID*.
    - Add the URL to the list of *Authorized redirect URIs* and click **Save** and start the flow over.

      ![Screenshot of success](/images/integrations/nest/redirect_uris_fix.png)

- When configuring the OAuth Client ID redirect URI, you may see an error such as *must end with a public top-level
  domain (such as .com or .org)* or *must use a valid domain that is a valid top private domain*. This means that you
  may need to change the URL you use to access Home Assistant in order to access your devices.

    - A convienent solution is to use [Nabu Casa](https://www.nabucasa.com/)
    - There are subtle rules for what types of URLs are allowed, namely that they must use a publicly known hostname, though your Home Assistant ports do not need to be exposed to the internet.
    - You can use any publicly known hostname you own
    - As a hack, you can use hosts tricks to temporarily assign a public hostname to your Home Assistant IP address.

- *Error 403: access_denied* means that you need to visit the [OAuth Consent Screen](https://console.developers.google.com/apis/credentials/consent) and add your Google Account as a *Test User*.

- *Error: invalid_client no application name* means the [OAuth Consent Screen](https://console.developers.google.com/apis/credentials/consent) has not been fully configured for the project. Enter the required fields (App Name, Support Email, Developer Email) and leave everything else as default.

- *Subscriber error: Subscription misconfigured. Expected subscriber_id to match...* means that the `configuration.yaml` has an incorrect `subscriber_id` field. Re-enter the the *Subscription Name* which looks like `projects/project-label-22ee1/subscriptions/SUBSCRIBER_ID`. Make sure this is not the *Topic name*.

- *Subscriber error: Subscription misconfigured. Expected topic name to match ...* means that the topic name in the Google Cloud Console was entered incorrectly. The topic name comes from the Device Console and must start with `projects/sdm-prod/topics/`. It is easy to make the mistake of creating a new topic rather than manually entering the right topic name.

- *Not receiving updates* typically means a problem with the subscriber configuration. Changes for things like sensors or thermostat temperature set points should be instantly published to a topic and received by the Home Assistant susbcriber when everything is configured correctly.

- You can see stats about your subscriber in the [Cloud Console](https://console.cloud.google.com/cloudpubsub/subscription/list) which includes counts of messages published by your devices, and how many have been acknowledged by your Home Assistant subscriber. You can also `View Messages` to see examples of published. Many old unacknowledged messages indicate the subscriber is not receivng the messages and working properly or not connected at all. Double check the `subscriber_id` matches the `Subscription Name`

- To aid in diagnosing subscriber problems or camera stream issues it may help to turn up verbose logging by adding some or all of these to your `configuration.yaml` depending on where you are having trouble: 

```yaml

logger:
  default: info
  logs:
    homeassistant.components.nest: debug
    homeassistant.components.nest.climate_sdm: debug
    homeassistant.components.nest.camera_sdm: debug
    homeassistant.components.nest.sensor_sdm: debug
    google_nest_sdm: debug
    google_nest_sdm.device: debug
    google_nest_sdm.device_manager: debug
    google_nest_sdm.google_nest_subscriber: debug
    google_nest_sdm.event: debug
    google.cloud.pubsub_v1: debug
    google.cloud.pubsub_v1.subscriber._protocol.streaming_pull_manager: debug
```

## Camera

All Google Nest Cam models, Google Nest Hello Video Doorbell, Google Nest Hub Max expose a [CameraLiveStream](https://developers.google.com/nest/device-access/traits/device/camera-live-stream) via the SDM API, which returns a RTSP live stream which can be viewed from Home Assistant.

Given a camera named `Front Yard` then the camera is created with a name such as `camera.front_yard`.

## Climate

All Google Nest Thermostat models are exposed as a `climate` entity that use the [Thermostat Traits](https://developers.google.com/nest/device-access/traits/device/thermostat-hvac) in the SDM API. State changes to the thermostat are reported to Home Assistant through the Cloud Pubsub subscriber.

Given a thermostat named `Upstairs` then the climate entity is created with a name such as `climate.upstairs`

## Sensor

All Google Nest Thermostat models have traits exposed from the SDM API. The initial values of the sensors are fetched on startup, then updated regularly using the Cloud Pubsub subscriber. The following traits are supported with sensors:

- [Temperature](https://developers.google.com/nest/device-access/traits/device/temperature)
- [Humidity](https://developers.google.com/nest/device-access/traits/device/humidity)

Given a thermostat named `Upstairs` then sensors are created with names such as `sensor.upstairs_temperature` or `sensor.upstairs_humidity`.

## Automation and Device Triggers

The Nest integration makes [device triggers](/docs/automation/trigger/#device-triggers) available to enable automation
in Home Assistant. You should review the [Automating Home Assistant](/getting-started/automation/) getting started guide on automations or the [Automation](/docs/automation/) documentation for full details.

![Screenshot Device Triggers](/images/integrations/nest/device_triggers.png)

All Google Nest Cam models and the Google Nest Hello Video Doorbell support device triggers:

- **Motion detected**
- **Person detected**
- **Sound detected**
- **Doorbell pressed** *for Google Nest Hello Video Doorbell only*

The lower level Pub/Sub subscriber receives events in real time and internally fires `nest_event` events within Home Assistant:

| Device Trigger | Pub/Sub Event | `nest_event` |
| -------------- | ----- | ------------- |
| Motion detected | [CameraMotion](https://developers.google.com/nest/device-access/traits/device/camera-motion#events) | `motion_detected` |
| Person detected | [CameraPerson](https://developers.google.com/nest/device-access/traits/device/camera-person#events) | `person_detected` |
| Sound detected | [CameraSound](https://developers.google.com/nest/device-access/traits/device/camera-sound#events) | `sound_detected` |
| Doorbell pressed | [DoorbellChime](https://developers.google.com/nest/device-access/traits/device/doorbell-chime#events) | `doorbell_chime` |

### Example

This automation will trigger when a `nest_event` event type with a type of `camera_motion` is received from the specified `device_id`.

```yaml
alias: "motion alert"
trigger:
  - platform: event
    event_type: nest_event
    event_data:
      device_id: YOUR_DEVICE_ID
      type: camera_motion
action:
  - service: notify.mobile_app_pixel_2
    data:
      title: motion detected
      message: front door motion detected
      data:
        image: /api/camera_proxy/camera.front_door
```

The action in this section uses the [Android Companion App](https://companion.home-assistant.io/docs/notifications/notifications-basic/) and the camera proxy to send an notification with a snapshot from the camera.

# Legacy Works With Nest API

This section contains instructions for the Legacy [Works with Nest](https://developers.nest.com/) API.

<div class='note warning'>
New users are not currently able to set up a Works With Nest Developer account. The documentation is preserved here for existing users of the API.
</div>

<details>
<summary>Click here for documentation for the Legacy Works with Nest API</summary>

The Nest integration is the main integration to integrate all [Nest](https://nest.com/) related platforms. To connect Nest, you will have to [sign up for a developer account](https://developers.nest.com/products) and get a `client_id` and `client_secret`.


There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Camera](#camera)
- [Climate](#climate)
- [Sensor](#sensor)

### Setting up developer account


1. Visit [Nest Developers](https://developers.nest.com/), and sign in. Create an account if you don't have one already.
2. Fill in account details:
  * The "Company Information" can be anything. We recommend using your name.
3. Submit changes
4. Click "[Products](https://developers.nest.com/products)" at top of page.
5. Click "[Create New Product](https://developers.nest.com/products/new)"
6. Fill in details:
  * Product name must be unique. We recommend [email] - Home Assistant.
  * The description, users, URLs can all be anything you want.
  * Leave the "Redirect URI" Field blank
7. For permissions check every box and if it's an option select the read/write option. Note: there are important permissions under the "Other Permissions" category. If you are only adding a thermostat, do not just select the permissions under "Thermostat". You still need to check the boxes under "Other Permissions" in order to give you access to features like away mode, ETA, structure read/write, and postal code.
  * The description requires a specific format to be accepted.
    * Use "[Home Assistant] [Edit] [For Home Automation]" as the description as it is not super important.
8. Click "Create Product"
9. Once the new product page opens the "Product ID" and "Product Secret" are located on the right side. These will be used as `client_id` and `client_secret` below.
10. Add the Nest integration to your `configuration.yaml` and restart Home Assistant. Then, go to `Configuration > Integrations` and select `CONFIGURE` next to `Nest`. Click the link in the configurator pop up to log into your Nest account and complete the OAuth. Copy the resulting PIN code into the pop up.

Connecting to the Nest Developer API requires outbound port 9553 on your firewall. The configuration will fail if this is not accessible.

## Configuration

```yaml
# Example configuration.yaml entry
nest:
  client_id: CLIENT_ID
  client_secret: CLIENT_SECRET
```

```yaml
# Example configuration.yaml entry to show only devices at your vacation and primary homes
nest:
  client_id: CLIENT_ID
  client_secret: CLIENT_SECRET
  structure:
    - Vacation
    - Primary
```

{% configuration %}
client_id:
  description: Your Nest developer client ID.
  required: true
  type: string
client_secret:
  description: Your Nest developer client secret.
  required: true
  type: string
structure:
  description: The structure or structures you would like to include devices from. If not specified, this will include all structures in your Nest account.
  required: false
  type: list
{% endconfiguration %}

### Service `set_away_mode`

You can use the service `nest/set_away_mode` to set the structure(s) to "Home" or "Away".

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `away_mode` | no | String, must be `away` or `home`.
| `structure` | yes | String, will default to all configured Nest structures if not specified.

Examples:

```yaml
# Example script to set away, no structure specified so will execute for all
script:
  nest_set_away:
    sequence:
      - service: nest.set_away_mode
        data:
          away_mode: away
```

```yaml
# Example script to set home, structure specified
script:
  nest_set_home:
    sequence:
      - service: nest.set_away_mode
        data:
          away_mode: home
          structure:
            - Apartment
```

### Service `set_eta`

You can use the service `nest/set_eta` to set or update the estimated time of arrival window. Calling this service will automatically set the structure(s) to "Away". Structures must have an associated Nest thermostat in order to use ETA function.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `eta` | no | Time period, estimated time of arrival from now.
| `eta_window` | yes | Time period, estimated time of arrival window. Default is 1 minute.
| `trip_id` | yes | String, unique ID for the trip. Default is auto-generated using a timestamp. Using an existing `trip_id` will update that trip's ETA.
| `structure` | yes | String, will default to all configured Nest structures if not specified.

Examples:

```yaml
# Example script to set ETA, no structure specified so will execute for all
script:
  nest_set_eta:
    sequence:
      - service: nest.set_eta
        data:
          eta: 00:10:30
          trip_id: Leave Work
```

```yaml
# Example script to update ETA and specify window, structure specified
script:
  nest_update_eta:
    sequence:
      - service: nest.set_eta
        data:
          eta: 00:11:00
          eta_window: 00:05
          trip_id: Leave Work
          structure:
            - Apartment
```

### Service `cancel_eta`

You can use the service `nest/cancel_eta` to cancel an existing estimated time of arrival window. Structures must have an associated Nest thermostat in order to use ETA function.

| Service data attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `trip_id` | no | String, unique ID for the trip. Using an existing `trip_id` will update that trip's ETA.
| `structure` | yes | String, will default to all configured Nest structures if not specified.

Examples:

```yaml
# Example script to cancel ETA, no structure specified so will execute for all
script:
  nest_cancel_eta:
    sequence:
      - service: nest.cancel_eta
        data:
          trip_id: Leave Work
```

```yaml
# Example script to cancel ETA, structure specified
script:
  nest_cancel_eta:
    sequence:
      - service: nest.cancel_eta
        data:
          trip_id: Leave Work
          structure:
            - Apartment
```

### Troubleshooting

- For trouble with the SDM API OAuth authorization flow with Google, see [Troubleshooting](https://developers.google.com/nest/device-access/authorize#troubleshooting) which includes guidance for errors like `redirect_uri_mismatch` where Google needs to know about your external URL.

- If you're getting [rickrolled](https://www.youtube.com/watch?v=dQw4w9WgXcQ) by the Legacy API instead of being able to see your Nest cameras, you may not have set up your developer account's permissions correctly. Go back through and make sure you've selected read/write under every category that it's an option.

## Platforms

<div class='note'>

You must have the [Nest component](/integrations/nest/) configured to use the platforms below.

</div>

### Binary Sensor

The `nest` binary sensor platform lets you monitor various states of your [Nest](https://nest.com) devices.

<div class='note'>

You must have the [Nest component](/integrations/nest/) configured to use these sensors. The binary sensors will be setup if the `nest` integration is configured and the required configuration for the `nest binary sensor` is set.

</div>

#### Configuration

To enable binary sensors and customize which sensors are setup, you can extend the [Nest component](/integrations/nest/) configuration in your `configuration.yaml` file with the following settings:

```yaml
# Example configuration.yaml entry
nest:
  binary_sensors:
    monitored_conditions:
      - 'fan'
      - 'target'
```

By default all binary sensors for your available Nest devices will be monitored. Leave `monitored_conditions` blank to disable all binary sensors for the [Nest component](/integrations/nest/).

{% configuration %}
monitored_conditions:
  description: States to monitor.
  required: false
  type: list
{% endconfiguration %}

The following conditions are available by device:

- Nest Home:
  - away
- Nest Thermostat:
  - online
  - fan
  - is\_using\_emergency\_heat
  - is\_locked
  - has\_leaf
- Nest Protect:
  - online
- Nest Camera:
  - online
  - motion\_detected
  - person\_detected
  - sound\_detected

### Camera

The `nest` platform allows you to watch still frames from a video stream (not live stream) of your [Nest](https://nest.com/camera/meet-nest-cam/) camera in Home Assistant.

<div class='note'>

The Legacy API integration allows you to watch still frames from a video stream (not live stream). The Legacy API also supports the `camera.turn_on` and `camera.turn_off` services.

</div>

Nest Camera supports the `camera.turn_on` and `camera.turn_off` services since the 0.75 release.

### Climate

The `nest` climate platform lets you control a thermostat from [Nest](https://nest.com).

<div class='note'>
Please note due to limitations with the European Nest Thermostat E, integration with Home Assistant for that thermostat is not possible.
</div>

<p class='img'>
  <img src='/images/screenshots/nest-thermostat-card.png' />
</p>

### Sensor

The `nest` sensor platform lets you monitor sensors connected to your [Nest](https://nest.com) devices.

<div class='note'>

The sensors will be setup if the `nest` integration is configured and the required configuration for the `nest sensor` is set.

</div>

#### Configuration

To enable sensors and customize which sensors are setup, you can extend the [Nest component](/integrations/nest/) configuration in your `configuration.yaml` file with the following settings:

```yaml
# Example configuration.yaml entry
nest:
  sensors:
    monitored_conditions:
      - 'temperature'
      - 'target'
```

By default all sensors for your available Nest devices will be monitored. Leave `monitored_conditions` blank to disable all sensors for the [Nest component](/integrations/nest/).

{% configuration %}
monitored_conditions:
  description: States to monitor.
  required: false
  type: list
{% endconfiguration %}

The following conditions are available by device:

- Nest Home:
  - `eta`: Estimated time of arrival.
  - `security_state`: `ok` or `deter`. [Security State](#security-state). Only available when Nest Camera exists.
- Nest Thermostat:
  - `humidity`
  - `preset_mode`
  - `temperature`
  - `target`
  - `hvac_state`: The currently active state of the HVAC system, `heat`, `cool` or `off` (previously `heating`, `cooling` or `off`).
- Nest Protect:
  - `co_status`: `Ok`, `Warning` or `Emergency`
  - `smoke_status`: `Ok`, `Warning` or `Emergency`
  - `battery_health`: `Ok` or `Replace`
  - `color_status`: `gray`, `green`, `yellow` or `red`. Indicates device status by color in the Nest app UI. It is an aggregate condition for battery+smoke+CO states, and reflects the actual color indicators displayed in the Nest app.
- Nest Camera: none

### Security State

<div class='note warning'>

This feature is not designed to transform your Home Assistant into a security system, neither Home Assistant nor Nest are liable for damages,
or consequential damages of any character arising as a result of use this feature.

This feature does not depend on the [Nest Secure alarm system](https://nest.com/alarm-system/overview/) and is not a reflection of the status of that system,
nor does it react to state changes in that system.

</div>

<div class='note'>

This feature uses a new [Nest Security API](https://developers.nest.com/documentation/cloud/security-guide).
You may need to change your ["Product"](https://developers.nest.com/products) permission setting to include `Security State Read`.
After this permission change, you may need to re-authorize your client.

</div>

If a Nest Cam detects the presence of a person (see `person_detected` in [binary_sensor.nest](#binary-sensor) while the structure is in `away` mode (see `away` in [binary_sensor.nest](#binary-sensor), the structure enters `deter` mode.

A `deter` state is re-evaluated after several minutes and relaxed to `ok` if no further `person_detected` events have occurred.

The `security_state` automatically switches to `ok` when the structure state is `home`.

</details>
