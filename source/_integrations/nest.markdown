---
title: Google Nest
description: Instructions on how to integrate Nest into Home Assistant.
ha_category:
  - Camera
  - Climate
  - Doorbell
  - Event
  - Hub
  - Media source
  - Sensor
ha_iot_class: Cloud Push
ha_release: 0.7
ha_config_flow: true
ha_codeowners:
  - '@allenporter'
ha_domain: nest
ha_dhcp: true
ha_platforms:
  - camera
  - climate
  - diagnostics
  - event
  - sensor
ha_integration_type: integration
---

The `nest` integration allows you to integrate a few [supported](https://developers.google.com/nest/device-access/supported-devices) Google [Nest](https://store.google.com/us/category/connected_home?) devices in Home Assistant. This integration uses the [Smart Device Management](https://developers.google.com/nest/device-access/api) API and Google's Cloud Pubsub to efficiently listen for changes in device state or other events. See [Supported Devices](https://developers.google.com/nest/device-access/supported-devices) for all devices supported by the SDM API.

There is currently support for the following device types within Home Assistant:

- [Climate](#climate)
- [Sensor](#sensor)
- [Camera](#camera)
- [Event](#event)

Cameras and doorbells use [Automation and device triggers](#automation-and-device-triggers) for events and a [media source](#media-source) for capturing media images on supported devices. Other device types like Smoke and CO Alarms or Security systems are not currently supported by the SDM API.

You are in control of the information and capabilities exposed to Home Assistant. You can authorize a single device, multiple devices, or different levels of functionality such as motion events, live streams, for any particular device. The integration is flexible enough to adapt based on what you allow.

# Prerequisites

- The Nest Device Access Console Pub/Sub setup process has changed as of January 23rd 2025. **Please make sure you are using the latest version of Home Assistant.**

- The Nest Smart Device Management (SDM) API **requires a US$5 fee**. Before buying, make sure your device is [supported](https://developers.google.com/nest/device-access/supported-devices).

## Configuration

To add the **Nest** integration to your Home Assistant, use this My Button:
{% my config_flow_start badge domain=page.ha_domain %}

  ![Screenshot of Setup prompt](/images/integrations/nest/setup_prompt.png)

{% details "Manual configuration steps" %}

1. Browse to your Home Assistant instance.
2. Go to **{% my integrations title="Settings > Devices & services" %}**.
3. In the bottom right corner, select the
  **{% my config_flow_start icon domain=page.ha_domain %}** button.
4. From the list, select **Nest** and follow the instructions on screen.

{% enddetails %}

The integration setup steps will walk you through the process of configuring a Google Cloud Project, Device Access Project, and finally link your account to Home Assistant. Make sure you are running the most recent version of Home Assistant.

{% details "Create and configure Cloud Project [Cloud Console]" %}

By the end of this section you will have a Cloud Project with the necessary APIs enabled

1. Go to the [Google Cloud Console](https://console.developers.google.com/apis/credentials).

2. If this is your first time here, you likely need to create a new Google Cloud project. Click **Create Project** then **New
Project**.
    ![Screenshot of APIs and Services Cloud Console with no existing project](/images/integrations/nest/api_project_needed.png)

3. Give your Cloud Project a name then click **Create**.

4. You will need to hold on to your *Cloud Project ID* to enable a subscription to receive updates from devices. Visit the [Cloud Console](https://console.cloud.google.com/home/dashboard) and copy the *Project ID* needed by Home Assistant.

    ![Screenshot of success](/images/integrations/nest/console_project_id.png)

5. Go to [APIs & Services > Library](https://console.cloud.google.com/apis/library) where you can enable APIs.

6. From the API Library search for [Smart Device management](https://console.cloud.google.com/apis/library/smartdevicemanagement.googleapis.com) and click **Enable**.

    ![Screenshot of Search for SDM API](/images/integrations/nest/enable_sdm_api.png)

7. From the API Library search for [Cloud Pub/Sub API](https://console.developers.google.com/apis/library/pubsub.googleapis.com) in the Cloud Console and click **Enable**.

You now have a cloud project ready for the next section to configure authentication with OAuth.

{% enddetails %}

{% details "Configure OAuth Consent screen [Cloud Console]" %}

By the end of this section you will have configured the OAuth Consent Screen, needed for giving Home Assistant access to
your cloud project.

1. Go to the [Google API Console](https://console.developers.google.com/apis/credentials).

2. Click [OAuth consent screen](https://console.cloud.google.com/apis/credentials/consent) and configure it.

3. Select **External** then click **Create**. While you are here, you may click the *Let us know what you think* to give Google's OAuth team any feedback about your experience configuring credentials for self-hosted software. They make regular improvements to this flow and appear to value feedback.
    ![Screenshot of OAuth consent screen creation](/images/integrations/nest/oauth_consent_create.png)

4. The *App Information* screen needs you to enter an **App name** and **User support email**, then enter your email again under **Developer contact email**. These are only shown while you later go through the OAuth flow to authorize Home Assistant to access your account. Click **Save and Continue**. Omit unnecessary information (e.g. logo) to avoid additional review by Google.

5. On the *Scopes* step click **Save and Continue**.

6. On the *Test Users* step, you need to add your Google Account (e.g., your @gmail.com address) to the list. Click *Save* on your test account then **Save and Continue** to finish the consent flow.
    ![Screenshot of OAuth consent screen test users](/images/integrations/nest/oauth_consent_test_users.png)

7. Navigate back to the *OAuth consent screen* and click **Publish App** to set the *Publishing status* is **In Production**.

    ![Screenshot of OAuth consent screen production status](/images/integrations/nest/oauth_consent_production_status.png)

8. The warning says your *app will be available to any user with a Google Account* which refers to the fields you entered on the *App Information* screen if someone finds the URL. This does not expose your Google Account or Nest data.

9. Make sure the status is not *Testing*, or you will get logged out every 7 days.

{% enddetails %}

{% details "Configure OAuth Application Credentials [Cloud Console]" %}

By the end of this section you will have the OAuth *Client ID* and *Client Secret* needed for Application Credentials setup.

The steps below use *Web Application Auth* with *My Home Assistant* to handle Google's strict URL validation rules like requiring SSL and a publicly resolvable redirect URL.

1. Navigate to the [Credentials](https://console.cloud.google.com/apis/credentials) page and click **Create Credentials**.
    ![Screenshot of APIs and Services Cloud Console](/images/integrations/nest/create_credentials.png)

2. From the drop-down list select *OAuth client ID*.
    ![Screenshot of OAuth client ID selection](/images/integrations/nest/oauth_client_id.png)

3. Enter *Web Application* for the Application type.

4. Pick a name for your credential.

5. Add **Authorized redirect URIs** end enter `https://my.home-assistant.io/redirect/oauth`

6. Click *Create* to create the credential.
    ![Screenshot of creating OAuth credentials](/images/integrations/nest/oauth_redirect_uri.png)

7. You should now be presented with an *OAuth client created* message.

    ![Screenshot of OAuth Client ID and Client Secret](/images/integrations/nest/oauth_created.png)

8. You now have *OAuth Client ID* and *OAuth Client Secret* needed by Home Assistant.  See [Application Credentials](/integrations/application_credentials) for more general detail about how Home Assistant manages credentials.

{% enddetails %}

{% details "Create a Device Access Project [Device Access Console]" %}

Now that you have authentication configured, you will create a Nest Device Access Project which *requires a US$5 fee*. Once completed, you will have a *Device Access Project ID*.

1. Go to the [Device Access Registration](https://developers.google.com/nest/device-access/registration) page. 

{% note %}
Read the warnings on the page before proceeding, including Google Account type limitations.
{% endnote %}

2. Select the button **[Go to the Device Access Console](https://console.nest.google.com/device-access/)**.
    ![Screenshot of Device Access Registration](/images/integrations/nest/device_access.png)

3. Check the box to "Accept the Terms of Service" and select **Continue to Payment** where you need to pay a fee (currently US$5).
    ![Screenshot of accepting terms](/images/integrations/nest/accept_terms.png)

4. Now the [Device Access Console](https://console.nest.google.com/device-access/project-list) should be visible. Select  **Create project**.

5. Give your Device Access project a name and select **Next**.
    ![Screenshot of naming a project](/images/integrations/nest/project_name.png)

6. Next you will be asked for an **OAuth client ID**  which you created in the previous step and select **Next**.
    ![Screenshot of Device Access Console OAuth client ID](/images/integrations/nest/device_access_oauth_client_id.png)

7. Leave **Enable Events** unchecked for now and **Create project**. You need a Pub/Sub topic
  (created in the next section) to enable events. This requires additional setup in the
  Google Cloud Pub/Sub console so we will skip that step for now then come back to it in
  the next section.

8. You now have a *Device Access Project ID* needed by Home Assistant.

{% enddetails %}

{% details "Enable events and Pub/Sub topic [Device Access & Cloud Console]" %}

The Nest Device Access Console Pub/Sub setup process has changed as of January 23rd 2025. **Please make sure you are using the latest version of Home Assistant.**.

This section describes how to configure your Device Access Project with a Pub/Sub topic
to publish events for devices in your home. Home Assistant and the Device Access Project must be configured to use the *Topic Name* otherwise you will not receive events.

If you previously set up events, then your Device Access Project may have already created a topic for you and you can use that topic name. For new projects, or if you disable events, you need to create the topic yourself following the instructions below.

1. Go to the [Pub/Sub Google Cloud Console](https://console.cloud.google.com/cloudpubsub/topic/list).

2. Select **Create Topic**.

3. Enter a **Topic ID** such as `home-assistant-nest`. You may leave the default settings.

  ![Screenshot of OAuth confirmation](/images/integrations/nest/cloud_pubsub_create_topic.png)

4. Select **Create** to create the topic.

5. You now have a **Topic Name** needed by the Device Access Console and Home Assistant. The full **Topic Name** that contains your Cloud Project ID and the **Topic ID** such as `projects/<cloud console id>/topics/home-assistant-nest`.

6. Next, you need to give the Device Access Console permission to publish to your Topic. From the Pub/Sub Topic page select **Add Principal**.

  ![Screenshot of OAuth confirmation](/images/integrations/nest/cloud_pubsub_add_principal.png)

7. In **New Principals** enter `sdm-publisher@googlegroups.com`

8. In **Select a Role** under **Pub/Sub** select **Pub/Sub Publisher** and **Create**.

  ![Screenshot of OAuth confirmation](/images/integrations/nest/cloud_pubsub_add_principal_role.png)

9. Next you can configure the Device Access Console to use this topic. Visit the [Device Access Console](https://console.nest.google.com/device-access/).

10. Select the Device Access Project you previously created. It should show the Pub/Sub topic
   as disabled. If there is an existing topic shown, then you may delete it and use
   the one you just created to avoid getting them mixed up.

  ![Screenshot of OAuth confirmation](/images/integrations/nest/device_access_topic_disabled.png)

11. Select *...* next to **Pub/Sub topic**, then **Enable events with PubSub topic**.

12. Enter the full Pub/Sub **Topic Name** and select **Add & Validate**. If you see an error, then
   review the previous steps again and configure the topic and permissions.

  ![Screenshot of OAuth confirmation](/images/integrations/nest/device_access_validate_pubsub.png)

13. You have successfully configured events and the Pub/Sub topic used by Home Assistant.

  ![Screenshot of OAuth confirmation](/images/integrations/nest/device_access_complete.png)

{% enddetails %}

{% details "Link Google Account" %}

In this section you will authorize Home Assistant to access your account by generating an *Authentication Token*.

See [Troubleshooting](#troubleshooting) below for steps to resolve the common misconfigurations that result in errors such as *Can't link...* or *Error 400* from Google.

1.  In Home Assistant, you should already be going through the setup flow. If not, go back and click the *My: Add Integration* button above to start the setup. The integration will ask you for all of the necessary integration configuration.

2.  Once all configuration information is entered in Home Assistant, a new tab opens, allowing you to choose a Google account. This should be the same developer account you configured above.

3. The *Google Nest permissions* screen will allow you to choose which devices to configure and lets you select devices from multiple homes. You likely want to enable everything, however, you can leave out any feature you do not wish to use with Home Assistant.

    ![Screenshot of Nest permissions authorization](/images/integrations/nest/oauth_approve.png)

4. You will get redirected to another account selection page.

5. You may see a warning screen that says *Google hasn't verified this app* since you just set up an un-verified developer workflow. Click *Continue* to proceed.

    ![Screenshot OAuth warning](/images/integrations/nest/oauth_app_verification.png)

6. Then you will be asked to grant access to additional permissions. Click *Allow*.
    ![Screenshot 1 of granting permissions](/images/integrations/nest/oauth_grant1.png)
    ![Screenshot 2 of granting permissions](/images/integrations/nest/oauth_grant2.png)

7. Confirm you want to allow persistent access to Home Assistant.
    ![Screenshot of OAuth confirmation](/images/integrations/nest/oauth_confirm.png)

8. You will now see a page hosted by *My Home Assistant* asking if you would like to *Link account to Home Assistant?* Click **Link Account** to continue.

9. If all went well, you will next configure events and Pub/Sub topic. Nest will attempt
   to automatically find a Pub/sub topic either created by the Device Access Console
   or manually by you.

     ![Screenshot of OAuth confirmation](/images/integrations/nest/config_flow_with_topic.png)

10.  If you instead see the error message *No eligible Pub/Sub topics found, please ensure Device Access Console has a Pub/Sub topic.* then follow the steps in the previous section to enable events and create a Pub/Sub topic in another browser tab. Once you have created and configured the topic, you may press on this screen **Submit** to refresh the list of topics and continue.

11. Home Assistant uses a *Subscription* to subscribe to device events published on the topic. You can select the subscription you created in the Device Access Console or the integration will automatically create one for you if you don't have one already.
     ![Screenshot of OAuth confirmation](/images/integrations/nest/config_flow_subscription.png)


12.  If all went well, you are ready to go!

    ![Screenshot of success](/images/integrations/nest/finished.png)

{% enddetails %}

## Climate

All Google Nest Thermostat models are exposed as a `climate` entity that use the [Thermostat Traits](https://developers.google.com/nest/device-access/traits/device/thermostat-hvac) in the SDM API. State changes to the thermostat are reported to Home Assistant through the Cloud Pubsub subscriber.

Given a thermostat named `Upstairs` then the climate entity is created with a name such as `climate.upstairs`

{% note %}

This feature is enabled by the following permissions:

- *Allow Home Assistant to access and control your thermostat*

{% endnote %}

## Sensor

All Google Nest Thermostat models have traits exposed from the SDM API. The initial values of the sensors are fetched on startup, then updated regularly using the Cloud Pubsub subscriber. The following traits are supported with sensors:

- [Temperature](https://developers.google.com/nest/device-access/traits/device/temperature)
- [Humidity](https://developers.google.com/nest/device-access/traits/device/humidity)

Given a thermostat named `Upstairs` then sensors are created with names such as `sensor.upstairs_temperature` or `sensor.upstairs_humidity`.

{% note %}

This feature is enabled by the following permissions:

- *Allow Home Assistant to access and control your thermostat*

{% endnote %}
{% note %}
Additional Nest Temperature Sensors are not supported by the SDM API.  The Temperature reported by the API will be pulled from whichever device is currently configured as the Active Sensor, which can be adjusted via manual selection or the schedule offered in the Nest App.
{% endnote %}


## Camera

Home Assistant supports all SDM API features. However, every Camera or Doorbell device has a different set of built-in capabilities. A Camera device has one of the following live stream types:

- **RTSP**: These devices have an HLS stream served by the Home Assistant Core. These cameras support server-side `camera` actions like stream recording or image preview. See [Low Latency HLS](/integrations/stream#ll-hls) as a great option to enable to reduce stream latency.
- **WebRTC**: These devices support direct browser to camera communication and a super low latency stream. A [Picture Glance Card](/dashboards/picture-glance/) can show the live stream in the grid with the *Camera View* set to `live` (not recommended for battery-powered cameras). `camera` actions like stream recording are *not supported*.

Given a camera named `Front Yard`, then the camera is created with a name such as `camera.front_yard`.

{% note %}

This feature is enabled by the following permissions:

- *Allow Home Assistant to see and display your camera’s livestream*
- *Other permissions in the Nest or Google Home apps*.

{% endnote %}

All cameras also expose event entities for automation. Some camera models also
support capturing media (snapshots or clips) through device triggers. The table below summarizes the [supported SDM API features](https://developers.google.com/nest/device-access/supported-devices) for each device.

| Device                                                                           |    Live stream    |         Event entities / triggers          | Media source<br> for triggers |
| -------------------------------------------------------------------------------- | :---------------: | :--------------------------------: | :------------------------------------: |
| Nest Cam (indoor, wired)<br>Nest Cam (outdoor, battery)                          |      WebRTC       |          Motion<br>Person          |                  N/A                   |
| Nest Cam Indoor<br>Nest Cam IQ Indoor<br>Nest Cam IQ Outdoor<br>Nest Cam Outdoor | RTSP<br>Recording |     Motion<br>Person<br>Sound      |             Snapshot (jpg)             |
| Nest Cam with floodlight                                                         |      WebRTC       |          Motion<br>Person          |                  N/A                   |
| Nest Doorbell (battery)                                                          |      WebRTC       |     Motion<br>Person<br>Chime      |        Clip Preview (mp4, gif)         |
| Nest Doorbell (wired, 1st gen)                                                   | RTSP<br>Recording | Motion<br>Person<br>Sound<br>Chime |             Snapshot (jpg)             |
| Nest Doorbell (wired, 2nd gen)                                                   |      WebRTC       |     Motion<br>Person<br>Chime      |        Clip Preview (mp4, gif)         |
| Nest Hub Max                                                                     | RTSP<br>Recording |   Motion<br>Person<br>Sound<br>    |             Snapshot (jpg)             |


## Event

All doorbells and cameras support event entities. See the [Event](https://www.home-assistant.io/integrations/event/) integration documentation for more about how to use event entities in automations.

There are two classes of event entities that are available based on the above camera features:

- `motion` for cameras that support any of the event types `camera_motion`, `camera_person`, or `camera_sound`
- `doorbell` for all cameras that are doorbells and support `doorbell_chime` events

Nest event entities are updated immediately when an event message is received
without waiting for any media to be fetched. See Device Triggers for media support.

## Device Triggers

The Nest integration provides [device triggers](/docs/automation/trigger/#device-triggers) to enable automation in Home Assistant. You should review the [Automating Home Assistant](/getting-started/automation/) getting started guide on automations or the [Automation](/docs/automation/) documentation for full details.

Device triggers will wait to fire after any media associated with the event is downloaded. Use an
event entity for immediate notifications without media.

{% my automations badge %}

![Screenshot Device Triggers](/images/integrations/nest/device_triggers.png)

{% details "Example Device Trigger / Event payload" %}

This is an example of what the `nest_event` payload looks like for a Device Trigger that you can use to power automations.

```json
{
    "event_type": "nest_event",
    "data": {
        "device_id": "EXAMPLE_DEVICE_ID",
        "type": "doorbell_chime",
        "timestamp": "2022-01-26T04:56:54.031000+00:00",
        "nest_event_id": "EXAMPLE_EVENT_ID",
        "attachment": {
          "image": "/api/nest/event_media/DEVICE_ID/EVENT_ID/thumbnail",
          "video": "/api/nest/event_media/DEVICE_ID/EVENT_ID",
        }
        "zones": ["Zone 1"],
    },
}
```

- `device_id`: The Home Assistant device identifier for the camera
- `nest_event_id`: is an opaque identifier that identifies the event.
- `attachment`: May be present if the device supports snapshots or clips and depends on the device's capabilities. This is a URL where media can be fetched from the media source.
- `zones`: Zones triggering the event if available. Zones are configured in the Google Home App, though not supported by all cameras. Events in the area outside of a named zone will be an empty zone name.

{% enddetails %}

Continue reading below to *Media Source Attachments* to see how to use media with notification actions.

{% note %}

This feature is enabled by the following permissions:

- *Allow Home Assistant to know when there's a camera event*
- *Allow Home Assistant to know when there's a doorbell event*
- *Other permissions and notification settings in the Nest or Google Home apps*.
{% endnote %}

## Google Home App Notification Settings

The Google Home App Notifications settings control not only which notifications are sent to your phone,
but also what gets published to the Pub/Sub feed.

For example, if you enable *Away-only notifications*, Home Assistant will only receive events when your phone is away from home.

Another thing that may not be intuitive, is that seeing the event in your device history does not mean it was published to the feed.
However, if you are getting push notifications, the settings are likely working.

Note: The exact settings and effect they have on the feed may vary by camera model or app version.


If you are still not getting notifications, you can read this [troubleshooting guide from Google]<!-- textlint-disable -->
(https://support.google.com/googlenest/answer/9230439#zippy=%2Cyour-camera-detected-something-but-you-didnt-get-a-camera-alert)
<!-- textlint-enable -->

{% details "Google Home App Notification Settings" %}

| Google Home App Setting  |                                  Notes                                  |
| ------------------------ | :---------------------------------------------------------------------: |
| Notifications: Push      |            Required for any detection event to be published             |
| Notifications: Away-Only | Events will only be published when a user is detected as away from home |
| Seen: Motion             |              Required for `Motion` events to be published               |
| Seen: Person             |              Required for `Person` events to be published               |

![Screenshot of Google Home App Notification Settings](/images/integrations/nest/google_home_notification_settings.png)

{% enddetails %}

## Media source

The Nest [media source](/integrations/media_source) platform allows you to browse clips for recent camera events. Home Assistant is not intended to be a Network Video Recorder (NVR) platform, however, basic support for capturing recent events is supported.

The table above describes which devices support image snapshots or 10-frame mp4 video clips.

### Media Attachments

The Media Source APIs can be used in [Companion App Attachments](https://companion.home-assistant.io/docs/notifications/notification-attachments) for Notifications as actions for Device Triggers above like *Doorbell Pressed*. You will need to be familiar with both the Media Sources supported for your camera, as well as the media capabilities of the companion apps.

- `/api/nest/event_media/DEVICE_ID/EVENT_ID`: Media for the event, which supports image snapshots (jpg) or clip previews (mp4) depending on the camera type.

- `/api/nest/event_media/DEVICE_ID/EVENT_ID/thumbnail`: A thumbnail preview of the media, which supports image snapshots (jpg) or clip previews (gif) depending on the camera type.

You can use the Nest Device Trigger payload fields `attachment.image` or `attachment.video`in an [automation](/getting-started/automation/) to send a notification from an [actions](/getting-started/automation-action/) as shown in the examples below.

{% details "Example Action: Clip Preview (mp4) attachment for Android or iOS" %}

Example for cameras that support Clip Previews used with iOS which can render video in notifications.

{% raw %}

```yaml
action: notify.mobile_app_iphone
data:
  message: Doorbell Pressed
  title: Someone pressed the doorbell
  data:
    image: "{{ trigger.event.data.attachment.image }}"
    video: "{{ trigger.event.data.attachment.video }}"
```

{% endraw %}

{% enddetails %}

{% details "Example Action: Clip Preview thumbnail (gif) for Android or iOS" %}

Example for cameras that support Clip Previews, but transcoded to an animated gif (Android does not render video notifications).

{% raw %}

```yaml
action: notify.mobile_app_android
data:
  message: Doorbell Pressed
  title: Someone pressed the doorbell
  data:
    image: "{{ trigger.event.data.attachment.image }}"
```

{% endraw %}

{% enddetails %}

{% details "Example Action: Snapshot (jpg) attachment for Android or iOS" %}

Example for cameras that support Snapshot (jpg) on either Android or iOS.

{% raw %}

```yaml
action: notify.mobile_app
data:
  message: Doorbell Pressed
  title: Someone pressed the doorbell
  data:
    image: "{{ trigger.event.data.attachment.image }}"
```

{% endraw %}

{% enddetails %}

{% note %}

This feature is enabled by the following permissions:

- *Based on the events you've selected to share from this device, allow Home Assistant to access camera video clips*
- *Based on the events you've selected to share from this device, allow Home Assistant to access camera snapshots*
- *Other permissions in the Nest or Google Home apps*.

{% endnote %}

## Troubleshooting

- *No access to partner information* "Information could not be retrieved" error message during the setup wizard means that the Google Account used is not able to access the Home. Please ensure that you have successfully migrated your Nest Account to a Google Account using the Google Nest App. Additionally, if your home has multiple members, please note that the individual who initially set up the home must complete the migration of their Nest Account to a Google Account before you can establish a connection with Home Assistant.

- You can add or remove devices and permissions granted to Home Assistant in the Nest [Partner Connections Manager](https://nestservices.google.com/partnerconnections). Reload the Nest integration to make new devices available. See the [SDM API Troubleshooting](https://developers.google.com/nest/device-access/authorize#modify_account_permissions) documentation for more details.

- *Error 400: redirect_uri_mismatch* means that your OAuth Client ID is not configured to match the *My Home Assistant* callback URL. Home Assistant's redirect URL behavior may have changed since you initially set this up!

{% details "Details about resolving redirect_uri_mismatch" %}

- This should show the redirect URI `https://my.home-assistant.io/redirect/oauth` in the error message. If the error message has a different URL, then you are running an older version of Home Assistant need to upgrade or manually disabled My Home Assistant (see below).

  ![Screenshot of success](/images/integrations/nest/redirect_uri_mismatch.png)

- Go back to the [API Console](https://console.developers.google.com/apis/credentials) and select your *OAuth 2.0 Client ID*.
- Add the URL `https://my.home-assistant.io/redirect/oauth` to the list of *Authorized redirect URIs* and click **Save** and start the flow over.

  ![Screenshot of success](/images/integrations/nest/redirect_uris_fix.png)

{% enddetails %}

{% details "I have manually disabled My Home Assistant" %}

Google applies strict [Redirect URI validation rules](https://developers.google.com/identity/protocols/oauth2/web-server#uri-validation) to keep your login credentials secure. In practice, this means that you must access Home Assistant *over SSL* and a *public top-level domain*. See the documentation on [Securing](/docs/configuration/securing/) and note that you don't actually need to enable remote access.

If you don't have [My Home Assistant](/integrations/my) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the redirect URI
instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

{% enddetails %}

- *Something went wrong: Please contact the developer of this app if the issue persists*: This 
typically means you are using the wrong type of credential or have credentials
mixed up between accounts. Make sure the credential in the [Google Cloud Console](https://console.developers.google.com/apis/credentials) is a *Web Application* credential following the instructions above. If you have multiple Google accounts logged into the current browser session, Google may default to the first logged in account while switching between pages. To avoid this, log out of other accounts or use a private/incognito browser window with only the desired Google account logged in.

- *Something went wrong, please try again in a few minutes*: According to Google's [Partner Connections Manager Error Reference](https://developers.google.com/nest/device-access/reference/errors/pcm), this error covers all other undocumented internal errors within Partner Connections. One of the issues that cause this error is synchronization problems between the Nest and Google Home apps. Confirm that your Nest device is visible within both apps under the same Home. If it is missing within Google Home, create a new dummy home on the Nest app, which triggers the synchronization process. (This is the workaround recommended by the Google support team). The dummy entry can be deleted once the Nest device is visible within the Google Home app.

- *Can’t link to [Project Name]: Please contact [Project Name] if the issue persists*: This typically means that the *OAuth Client ID* used is mismatched

{% details "Resolving mismatched OAuth Client ID" %}

The *OAuth Client ID* used must be consistent, so check these:

- [Google Cloud Console](https://console.cloud.google.com/apis/credentials) - See instructions above to create new Web Auth OAuth Credentials if needed
- [Device Access Project](https://console.nest.google.com/device-access/project-list) - The OAuth Client ID for your Device Access Project must refer to the Web Auth OAuth Client ID in the Google Cloud Console
- Make sure you are using the same Google Account in the Device Access Console and Google Cloud Console e.g. double-check the photo and account name in the top right of the screen
- [Application Credentials](/integrations/application_credentials/) - Home Assistant needs to be configured with the same credentials. Delete any existing entries if they do not match, then either manually enter or re-enter as part of the setup.

  ![Screenshot of success](/images/integrations/nest/application_credentials.png)


{% enddetails %}

- *Reauthentication required often*: If you are getting logged out every 7 days, this means an OAuth Consent Screen misconfiguration or your authentication token was revoked by Google for some other reason.

{% details "Details about reauthentication issues" %}

- This most likely reason is the *OAuth Consent Screen* is set to *Testing* by default which expires the token after 7 days.
- Follow the steps above to set it to *Production* to resolve this and reauthorize your integration one more time to get a new token.
- You may also see this as the error message *invalid_grant: Token has been expired or revoked*.
- See [Google Identity: Refresh token expiration](https://developers.google.com/identity/protocols/oauth2#expiration) for more reasons on why your token may have expired.

{% enddetails %}

- Check **Settings** -> **System** -> **Logs** to see if there are any error messages or misconfigurations then see the error messages below.

- *Thermostat does not appear or is unavailable* happens due to a bug where the SDM API does return the devices. A common fix get the API to work again is to:

{% details "How to restart thermostat" %}

- Restart the Thermostat device. See [How to restart or reset a Nest thermostat](https://support.google.com/googlenest/answer/9247296) for more details.
- In the official Nest app or on https://home.nest.com: Move the Thermostat to a different or fake/temporary room.
- Reload the integration in Home Assistant:  Navigate to **Configuration** then **Devices & services**, click `...` next to *Nest* and choose **Reload**.

{% enddetails %}

- *No devices or entities are created* if the SDM API is not returning any devices for the authorized account. Double-check that GCP is configured correctly to [Enable the API](https://developers.google.com/nest/device-access/get-started#set_up_google_cloud_platform) and authorize at least one device in the OAuth setup flow. If you have trouble here, then you may want to walk through the Google instructions and issue commands directly against the API until you successfully get back the devices.

- *Error 403: access_denied* means that you need to visit the [OAuth Consent Screen](https://console.developers.google.com/apis/credentials/consent) and add your Google Account as a *Test User*.

- *Error: invalid_client no application name* means the [OAuth Consent Screen](https://console.developers.google.com/apis/credentials/consent) has not been fully configured for the project. Enter the required fields (App Name, Support Email, Developer Email) and leave everything else as default.

- *Not receiving updates* typically means a problem with the subscriber configuration. Make sure to check the logs for any error messages. Changes for things like sensors or thermostat temperature set points should be instantly published to a topic and received by the Home Assistant subscriber when everything is configured correctly.

- You can see stats about your subscriber in the [Cloud Console](https://console.cloud.google.com/cloudpubsub/subscription/list) which includes counts of messages published by your devices, and how many have been acknowledged by your Home Assistant subscriber. You can also `View Messages` to see examples of published. Many old unacknowledged messages indicate the subscriber is not receiving the messages and working properly or not connected at all.

- To aid in diagnosing subscriber problems or camera stream issues it may help to turn up verbose logging by adding some or all of these to your {% term "`configuration.yaml`" %} depending on where you are having trouble:

```yaml

logger:
  default: info
  logs:
    homeassistant.components.nest: debug
    homeassistant.components.nest.climate_sdm: debug
    homeassistant.components.nest.camera_sdm: debug
    homeassistant.components.nest.sensor_sdm: debug
    homeassistant.helpers.config_entry_flow: debug
    homeassistant.helpers.config_entry_oauth2_flow: debug
    google_nest_sdm: debug
    google_nest_sdm.device: debug
    google_nest_sdm.device_manager: debug
    google_nest_sdm.google_nest_subscriber: debug
    google_nest_sdm.event: debug
```

- *Not receiving camera motion and person events*: assuming the integration is correctly configured (for example, the oauth and SDM API are set up correctly, you can see camera streams, and permissions are correctly set in [Partner Connections Manager](https://nestservices.google.com/partnerconnections)): If you are then still not seeing events, it's possible you need to adjust the Google Home App settings. Refer to the [Google Home App Notification Settings](#google-home-app-notification-settings) for details.

- **Configuration error: Failed to create subscriber `subscription/name` was not found** - By default, Google pub/sub subscriptions will be deleted after 31 days of inactivity ([reference](https://cloud.google.com/knowledge/kb/pub-sub-subscriptions-disappeared-without-any-deletion-logs-000004170)). If this happens, then the integration will fail, and you will see the preceding log line in your Home Assistant logs. If that is the case, then:

  1. Go to the [Device Access Console](https://console.nest.google.com/device-access/project-list) and re-enable the Pub/Sub Topic.
  2. The Nest integration may need to be recreated to pick up the new Pub/Sub topic.
  3. (Optional) To prevent future expirations, go to your [Google Cloud Console Pub/Sub subscription page](https://console.cloud.google.com/cloudpubsub/subscription/list) and edit the Pub/Sub subscription created by Nest to not expire by default.
