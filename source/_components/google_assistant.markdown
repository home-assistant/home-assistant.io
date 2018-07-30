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

<p class='note'>
  Use [Home Assistant Cloud](/cloud/) to integrate with Google Assistant without any effort.
</p>

The `google_assistant` component allows you to control things via Google Assistant (on your mobile or tablet) or a Google Home device.

The Google Assistant component requires a bit more setup than most due to the way Google requires Assistant Apps to be set up.

<p class='note'>
To use Google Assistant, your Home Assistant configuration has to be externally accessible with a hostname and SSL certificate. If you haven't already configured that, you should do so before continuing.
</p>

## {% linkable_title Configuration %}

To enable this, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
google_assistant:
  project_id: someproject-2d0b8
  client_id: [long URL safe random string]
  access_token: [a different long URL safe random string]
  agent_user_id: [a string to identify user]
  api_key: [a Homegraph API Key generated for the Google Actions project]
  exposed_domains:
    - switch
    - light
    - group
  entity_config:
    switch.kitchen:
      name: Custom Name for Google Assistant
      aliases:
        - bright lights
        - entry lights
    light.living_room:
      expose: false
      room: living room
```

Configuration variables:

{% configuration %}

project_id:
  description: Project ID from the Google Developer console (looks like `words-2ab12`)
  required: true
  type: string
client_id:
  description: A long random URL safe string (no spaces or special characters) that will be used for Implicit OAuth (example `aBcDeFgHiJkLmNoP`)
  required: true
  type: string
access_token:
  description: Another different long random URL safe string  (example `aBcDeFgHiJkLmNoP`)
  required: true
  type: string
agent_user_id:
  description: A string to identify the user, e.g., email address. If not provided, the component will generate one.
  required: false
  type: string
api_key:
  description: An API Key generated for the project from [Google Console](https://console.cloud.google.com/apis/api/homegraph.googleapis.com/overview) which allows you to update devices without unlinking and relinking an account (see step 9 below). If not provided then the `google_assistant.request_sync` service is not exposed.  It is recommended to set up this configuration key as it also allows the usage of the following command, "Ok Google, sync my devices".  Once you have setup this component you will need to call this service (or command) each time you add a new device that you wish to control via the Google Assistant integration.
  required: false
  type: string
expose_by_default:
  description: Expose devices in all supported domains by default. If set to `false`, you need to either expose domains or add the expose configuration option to each entity in entity_config and set it to `true`.
  required: false
  default: true
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

It's very important that you use very long strings for `client_id` and `access_token`. Those are essentially the credentials to your Home Assistant instance. You can generate them with the following command:

```bash
$ cat /dev/urandom | fold -w 120 | head -n 1 | base64 -w 0 | tr -dc '0-9A-Za-z' | cut -c -80
```

If you're not using Linux, you can use sites such as [this one](https://www.browserling.com/tools/random-string) to generate a random string (containing mixed case letters and numbers) of up to 80 characters.

### {% linkable_title Setup %}

1. Create a new project in the [developer console](https://console.actions.google.com/).  
  a. Add/Import project, give it a name    
  b. Click on `Home Control` card, select the `Smart home` recommendation  
  c. Create an Action, under the build section. Add in your home assistant url: `https://[YOUR HOME ASSISTANT URL:PORT]/api/google_assistant`, replace the `[YOUR HOME ASSISTANT URL:PORT]` with the domain / ip address and the port under which your Home Assistant is reachable.  If you have set `api_password:` add this password to the URL - eg `https://[YOUR HOME ASSISTANT URL:PORT]/api/google_assistant?api_password=[YOUR API PASSWORD]`)  
  d. Click `Done`. Then click on `Overview`, which will lead you back to the app details screen.  
2. `Account linking` is required for your app to interact with Home Assistant.  Set this up under the `Quick Setup` section
	a. Leave it at the default `No, I only want to allow account creation on my website` and select Next  
	b. For the `Linking type` select `OAuth` and `Implicit`  
	c. Client ID: The `client_id` from your Home Assistant configuration above  
	d. Authorization URL (replace with your actual URL): `https://[YOUR HOME ASSISTANT URL:PORT]/api/google_assistant/auth`. If you have set `api_password:` add this password to the URL `https://[YOUR HOME ASSISTANT URL:PORT]/api/google_assistant/auth?api_password=[YOUR API PASSWORD]`)  
	e. Configure your client. Add scopes for `email` and `name`.  
	f. Testing instructions: Enter anything. It doesn't matter since you won't submit this app.
3. Back on the overview page. Click `Simulator` under `TEST` - you don't have to actually test .
4. If you haven't already added the component configuration to `configuration.yaml` and restarted Home Assistant, you'll be unable to continue until you have.
5. Open the Google Assistant app and go into `Settings > Home Control`
6. Click the `+` sign, and near the bottom, you should have `[test] your app name`. Selecting that should lead you the screen where you can set rooms for your devices or nicknames for your devices.
7. If you want to allow other household users to control the devices:  
	a. Go to the settings for the project you created in point 1 in the developer console.  
	b. Under the gear icon, click `Permissions`  
	c. Click `Add`, type the new user's e-mail address and choose `Project -> Editor` role  
	d. Have the new user go to [developer console](https://console.actions.google.com/) and repeat steps starting from point 4
8. If you want to use the `google_assistant.request_sync` service, to update devices without unlinking and relinking, in Home Assistant, then enable Homegraph API for your project:  
	a. Go to the [cloud console](https://console.cloud.google.com/apis/api/homegraph.googleapis.com/overview)  
	b. Select your project and click Enable Homegraph API  
	c. Go to Credentials, which you can find on the left navigation bar under the key icon, and select API Key from Create Credentials  
	d. Note down the generated API Key and use this in the configuration

### {% linkable_title Troubleshooting the request_sync service %}

The request_sync service requires that the initial sync from Google includes the agent_user_id. If not, the service will log an error that reads something like "Request contains an invalid argument". If this happens, then [unlink the account](https://support.google.com/googlehome/answer/7506443?hl=en-GB) from Home Control and relink.

The request_sync service may fail with a 404 if the project_id of the Homegraph API differs from the project_id of the Actions SDK found in the preferences of your project on [developer console](https://console.actions.google.com). Resolve this by:

  1. Removing your project from the [developer console](https://console.actions.google.com).
  2. Add a new project to the [cloud console](https://console.cloud.google.com). Here you get a new `project_id`.
  3. Enable Homegraph API to the new project.
  4. Generate a new API key.
  5. Again, create a new project in the [developer console](https://console.actions.google.com/). Described above. But at the step 'Build under the Actions SDK box' choose your newly created project. By this, they share the same `project_id`.

### {% linkable_title Troubleshooting with NGINX %}

When using NGINX, ensure that your `proxy_pass` line *does not* have a trailing `/`, as this will result in errors. Your line should look like:

    proxy_pass http://localhost:8123;
