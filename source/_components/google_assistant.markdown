---
layout: page
title: "Google Assistant"
description: "Setup for Google Assistant integration"
date: 2017-10-17 12:30
sidebar: true
comments: false
sharing: true
footer: true
logo: google-assistant.png
ha_category: Voice
featured: true
ha_release: 0.56
---

The `google_assistant` component allows you to control things via Google Assistant (on your mobile or tablet) or a Google Home device.

## {% linkable_title Automatic setup via Home Assistant Cloud %}

With [Home Assistant Cloud](/cloud/), you can connect your Home Assistant instance in a few simple clicks to Google Assistant. With Home Assistant Cloud you don't have to deal with dynamic DNS, SSL certificates or opening ports on your router. Just log in via the user interface and a secure connection with the cloud will be established. Home Assistant Cloud requires a paid subscription after a 30-day free trial.

## {% linkable_title Manual setup %}

The Google Assistant component requires a bit more setup than most due to the way Google requires Assistant Apps to be set up.

<p class='note warning'>
To use Google Assistant, your Home Assistant configuration has to be [externally accessible with a hostname and SSL certificate](/docs/configuration/remote/). If you haven't already configured that, you should do so before continuing.
</p>

## {% linkable_title Migrate to release 0.80 and above %}
<p class='note'>
If this is the first time setting up your Google Assistant integration, you can skip this section and continue with the [manual setup instructions](#first-time-setup) below.
</p>

Since release 0.80, the `Authorization Code` type of `OAuth` account linking is supported. To migrate your existing configuration from release 0.79 or below, you need:

1. Change your `Account linking` setting in [Actions on Google console](https://console.actions.google.com/), look for the `Advanced Options` in the bottom left of the sidebar.
    - Under `Create an Action`, under the build section, modify `Add fulfillment URL` to `https://[YOUR HOME ASSISTANT         URL:PORT]/api/google_assistant`, where `[YOUR HOME ASSISTANT URL:PORT]` is the domain / IP address and the port under which your Home Assistant instance is reachable.
    - Change `Linking type` to `OAuth` and `Authorization Code`.
    - In the `Client information` section:
        - Change `Client ID` to `https://oauth-redirect.googleusercontent.com/`, the trailing slash is important.
        - Input any string you like into `Client Secret`, Home Assistant doesn't need this field.
        - Change `Authorization URL` to `https://[YOUR HOME ASSISTANT URL:PORT]/auth/authorize` (replace with your actual URL).
        - Change `Token URL` to `https://[YOUR HOME ASSISTANT URL:PORT]/auth/token` (replace with your actual URL).
    - In the `Configure your client` section:
        - Do **NOT** check `Google to transmit clientID and secret via HTTP basic auth header`.
    - Click 'Save' at the top right corner, then click 'Test' to generate a new draft version of the Test App.
2. Change your `configuration.yaml` file:
    - Remove `client_id`, `access_token`, `agent_user_id` config from `google_assistant:` since they are no longer needed.
3. Restart Home Assistant, open the `Google Assistant` app on your mobile phone then go to `Settings > Home Control`, re-link `[test] your app name`.
4. A browser will be open and asking you to login to your Home Assistant instance, it will redirect back to `Google Assistant` app right afterward.

<p class='note'>
If you've added Home Assistant to the home screen, you have to first remove it from home screen, otherwise, this HTML5 app will show up instead of a browser. Using it would prevent Home Assistant to redirect back to the `Google Assistant` app.
</p>

## {% linkable_title First time setup %}

You need to create an API Key with the [Google Cloud API Console](https://console.cloud.google.com/apis/api/homegraph.googleapis.com/overview) which allows you to update devices without unlinking and relinking an account (see [below](#troubleshooting-the-request_sync-service)). If you don't provide one, the `google_assistant.request_sync` service is not exposed. It is recommended to set up this configuration key as it also allows the usage of the following command, "Ok Google, sync my devices". Once you have set up this component, you will need to call this service (or command) each time you add a new device that you wish to control via the Google Assistant integration.

1. Create a new project in the [Actions on Google console](https://console.actions.google.com/).
    1. Add/Import a project and give it a name.
    2. Click on the `Home Control` card, select the `Smart home` recommendation.
    3. Create an Action, under the build section. Add your Home Assistant URL: `https://[YOUR HOME ASSISTANT URL:PORT]/api/google_assistant`, replace the `[YOUR HOME ASSISTANT URL:PORT]` with the domain / IP address and the port under which your Home Assistant is reachable.
    4. Click `Done`. Then click on `Overview`, which will lead you back to the app details screen.
2. `Account linking` is required for your app to interact with Home Assistant. Set this up under the `Quick Setup` section.
    1. Leave it at the default `No, I only want to allow account creation on my website` and select Next.
    2. For the `Linking type` select `OAuth` and `Authorization Code`.
    3. Client ID: `https://oauth-redirect.googleusercontent.com/`, the trailing slash is important.
    4. Client Secret: Anything you like, Home Assistant doesn't need this field.
    5. Authorization URL (replace with your actual URL): `https://[YOUR HOME ASSISTANT URL:PORT]/auth/authorize`.
    6. Token URL (replace with your actual URL): `https://[YOUR HOME ASSISTANT URL:PORT]/auth/token`.
    7. Configure your client. Add scopes for `email` and `name`.
    8. Do **NOT** check `Google to transmit clientID and secret via HTTP basic auth header`.
    9. Testing instructions: Enter anything. It doesn't matter since you won't submit this app.

    <img src='/images/components/google_assistant/accountlinking.png' alt='Screenshot: Account linking'>

3. Back on the overview page. Click `Simulator` under `TEST`. It will create a new draft version Test App. You don't have to actually test, but you need to generate this draft version Test App.
4. If you haven't already added the component configuration to `configuration.yaml` file and restarted Home Assistant, you'll be unable to continue until you have.
5. Open the Google Assistant app and go into `Settings > Home Control`.
6. Click the `+` sign, and near the bottom, you should have `[test] your app name`. Selecting that should lead you to a browser to login your Home Assistant instance, then redirect back to a screen where you can set rooms for your devices or nicknames for your devices.
<p class='note'>
If you've added Home Assistant to the home screen, you have to first remove it from home screen, otherwise, this HTML5 app will show up instead of a browser. Using it would prevent Home Assistant to redirect back to the `Google Assistant` app.
</p>
7. If you want to allow other household users to control the devices:
    1. Go to the settings for the project you created in the [Actions on Google console](https://console.actions.google.com/).
    2. Click `Test -> Simulator`, then click `Share` icon in the right top corner. Follow the on-screen instruction:
        1. Add team members: Got to `Settings -> Permission`, click `Add`, type the new user's e-mail address and choose `Project -> Viewer` role.
        2. Copy and share the link with the new user.
        3. New user clicks the link with their own Google account, it will enable our draft test app under their account.
    3. Have the new user go to their `Google Assistant` app to add `[test] your app name` to their account.
8. If you want to use the `google_assistant.request_sync` service, to update devices without unlinking and relinking, in Home Assistant, then enable Homegraph API for your project:
    1. Go to the [Google API Console](https://console.cloud.google.com/apis/api/homegraph.googleapis.com/overview).
    2. Select your project and click Enable Homegraph API.
    3. Go to Credentials, which you can find on the left navigation bar under the key icon, and select API Key from Create Credentials.
    4. Note down the generated API Key and use this in the configuration.

## {% linkable_title Configuration %}

Now add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
google_assistant:
  project_id: YOUR_PROJECT_ID
  api_key: YOUR_API_KEY
  exposed_domains:
    - SWITCH
    - LIGHT
    - GROUP
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
api_key:
  description: Your API key.
  required: false
  type: string
expose_by_default:
  description: "Expose devices in all supported domains by default. If set to false, you need to either expose domains or add the expose configuration option to each entity in `entity_config` and set it to true."
  required: false
  default: True
  type: boolean
exposed_domains:
  description: List of entity domains to expose to Google Assistant.
  required: false
  type: list
entity_config:
  description: Entity specific configuration for Google Assistant
  required: false
  type: map
  keys:
    '`<ENTITY_ID>`':
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
        aliases:
          description: Aliases that can also be used to refer to this entity
          required: false
          type: list
        room:
          description: Allows for associating this device to a Room in Google Assistant.
          required: false
          type: string
{% endconfiguration %}

### {% linkable_title Available domains %}

Currently, the following domains are available to be used with Google Assistant, listed with their default types:

- group (on/off)
- input boolean (on/off)
- scene (on)
- script (on)
- switch (on/off)
- fan (on/off)
- light (on/off/brightness/rgb color/color temp)
- cover (on/off/set position (via set brightness))
- media_player (on/off/set volume (via set brightness))
- climate (temperature setting)

### {% linkable_title Troubleshooting the request_sync service %}

The request_sync service requires that the initial sync from Google includes the agent_user_id. If not, the service will log an error that reads something like "Request contains an invalid argument". If this happens, then [unlink the account](https://support.google.com/googlehome/answer/7506443) from Home Control and relink.

The request_sync service may fail with a 404 if the project_id of the Homegraph API differs from the project_id of the Actions SDK found in the preferences of your project on [Actions on Google console](https://console.actions.google.com). Resolve this by:

  1. Removing your project from the [Actions on Google console](https://console.actions.google.com).
  2. Add a new project to the [Google Cloud API Console](https://console.cloud.google.com). Here you get a new `project_id`.
  3. Enable Homegraph API to the new project.
  4. Generate a new API key.
  5. Again, create a new project in the [Actions on Google console](https://console.actions.google.com/). Described above. But at the step 'Build under the Actions SDK box' choose your newly created project. By this, they share the same `project_id`.

### {% linkable_title Troubleshooting with NGINX %}

When using NGINX, ensure that your `proxy_pass` line *does not* have a trailing `/`, as this will result in errors. Your line should look like:

    proxy_pass http://localhost:8123;

### {% linkable_title Unlink and relink %}

If you're having trouble with *Account linking failed* after you unlinked your service, try clearing the browser history and cache.
