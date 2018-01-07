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

The Google Assistant component requires a bit more setup than most due to the way Google requires Assistant Apps to be set up.

<p class='note'>
To use Google Assistant your Home Assistant configuration has to be externally accessible, with a hostname and SSL certificate. If you haven't already configured that you should do so before continuing.
</p>

To enable this, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
google_assistant:
  project_id: someproject-2d0b8
  client_id: [long URL safe random string]
  access_token: [a different long URL safe random string]
  agent_user_id: [a string to identify user]
  api_key: [an API Key generated for the Google Actions project]
  exposed_domains:
    - switch
    - light
    - group
```

Configuration variables:

- **expose_by_default** (*Optional*): Expose devices in all supported domains by default.
- **project_id** (*Required*): Project ID from the Google Developer console (looks like `words-2ab12`)
- **client_id** (*Required*): A long random URL safe string (no spaces or special characters) that will be used for Implicit OAuth.
- **access_token** (*Required*): Another different long random URL safe string.
- **agent_user_id** (*Optional*): A string to identify the user, e.g., email address. If not provided, the component will generate one.
- **api_key** (*Optional*): An API Key generated for the project from [Google Console](https://console.cloud.google.com/apis/api/homegraph.googleapis.com/overview) which allows you to update devices without unlinking and relinking an account (see setup below). If not provided then the request_sync service is not exposed.
- **exposed_domains** (*Optional*): An array of Home Assistant domains to expose to Google Assistant. Options include:
    - `switch`
    - `light`
    - `cover`
    - `media_player`
    - `group`
    - `fan`
    - `scene`
    - `script`
    - `climate`

It's very important that you use very long strings for `client_id` and `access_token`. Those are essentially the credentials to your Home Assistant instance. You can generate them with the following command:

```bash
$ cat /dev/urandom | fold -w 120 | head -n 1 | base64 -w 0 | tr -dc '0-9A-Za-z' | cut -c -80
```

If you're not using Linux, you can use sites such as [this one](https://www.browserling.com/tools/random-string) to generate a random string (containing mixed case letters and numbers) of up to 80 characters.


You can also customize your devices similar to other components by adding keys to entities:

```yaml
homeassistant:
  customize:
    master_bedroom_light:
      google_assistant: true
      google_assistant_name: bedroom light
    bedroom_blinds:
      aliases:
        - bedroom shades
        - bedroom covers
    hallway_ceiling_switch:
      google_assistant: true
      google_assistant_type: light
```

Entity Customization Keys:

- **google_assistant**: True exposes entity, false will hide it.
- **google_assistant_name**: Can be used to override the primary name of an entity. By default the `friendly_name` of an entity is used.
- **google_assistant_type**: Can be used to override the domain/type of an entity. For example a switch can be treated as a light
- **aliases**: Provides "nicknames" to Google Assistant. These function as alternate names for an entity that Assistant will understand when spoken.

### {% linkable_title Setup %}

1. Download the [gactions CLI](https://developers.google.com/actions/tools/gactions-cli) (you'll use this later) - you can download and run this anywhere and on any machine, just remember where you put it for later (and don't forget to run `chmod +x gactions`to make it executable on mac or linux)
2. Create a new file named `project.json` (in the same directory you downloaded `gactions` to) and replace the `[YOUR HOME ASSISTANT URL]` below with the URL you use to access Home Assistant.
   Note: This must be an HTTPS URL to work.

```json
{
  "actions": [{
    "name": "actions.devices",
    "deviceControl": {
    },
    "fulfillment": {
      "conversationName": "automation"
    }
  }],
  "conversations": {
    "automation" :
    {
      "name": "automation",
      "url": "https://[YOUR HOME ASSISTANT URL]/api/google_assistant"
    }
  }
}
```

3. Create a new project in the [developer console](https://console.actions.google.com/).
	1. Add/Import project
	2. Go to Build under the Actions SDK box
	3. Copy the command that looks like:
	`gactions update --action_package PACKAGE_NAME --project doctest-2d0b8`
4. Replace `PACKAGE_NAME` with `project.json` and run that command in a console from the same directory you saved `project.json` in (you'll need to put `./` before `gactions` so that it reads `./gactions` if you're running it on Linux or Windows). It should output a URL like `https://console.actions.google.com/project/doctest-2d0b8/overview` - go there.
5. You'll need to fill out most of the information on that page, but none of it really matters since you won't be addressing the App directly, only through the Smart Home functionality built into Google Assistant.
6. The final item on that page `Account linking` is required for your app to interact with Home Assistant.
	1. Grant type: `Implicit`
	2. Client ID: The `client_id` from your Home Assistant configuration above
	3. Authorization URL (replace with your actual URL): `https://[YOUR HOME ASSISTANT URL]/api/google_assistant/auth`. If you have set `api_password:` add this password to the URL `https://[YOUR HOME ASSISTANT URL]/api/google_assistant/auth?api_password=[YOUR API PASSWORD]`)
	4. Configure your client. Add scopes for `email` and `name`.
	5. Testing instructions: Enter anything. It doesn't matter since you won't submit this app.
7. Back on the main app draft page. Click `Test Draft`. That will take you to the simulator (which won't work so just close that window).
8. If you haven't already added the component configuration to `configuration.yaml` and restarted Home Assistant, you'll be unable to continue until you have.
8. Open the Google Assistant app and go into `Settings > Home Control`
9. Click the `+` sign, and near the bottom, you should have `[test] your app name`. Selecting that should lead to you the screen where you can set rooms for your devices or nicknames for your devices.
10. If you want to allow other houshold users to control the devices:
	1. Go to the developer console using address from point 4.
	2. Under the gear icon, click `Permissions`
	3. Click `Add`, type the new user's e-mail address and choose `Project -> Editor` role
	4. Have the new user go to [developer console](https://console.actions.google.com/) and repeat steps starting from point 7.
11. If you want to use the `google_assistant.request_sync` service in Home Assistant, then enable Homegraph API for your project:
	1. Go to the [cloud console](https://console.cloud.google.com/apis/api/homegraph.googleapis.com/overview)
	2. Select your project and click Enable Homegraph API
	3. Go to Credentials and select API Key from Create Credentials
	4. Note down the generated API Key and use this in the configuration

*Note:* The request_sync service requires that the initial sync from Google includes the agent_user_id. If not, the service will log an error that reads something like "Request contains an invalid argument". If this happens, then [unlink the account](https://support.google.com/googlehome/answer/7506443?hl=en-GB) from Home Control and relink. 

*Note:* The request_sync service may fail with a 404 if the project_id of the Homegraph API differs from the project_id of the Actions SDK found in the preferences of your project on [developer console](https://console.actions.google.com). Resolve this by:
	1. Removing your project on the [developer console](https://console.actions.google.com).
	2. Add a new project in the [cloud console](https://console.cloud.google.com). Here you get a new project_id.
	3. Enable Homegraph API to the new project.
	4. Generete a new API key.
	5. Again create a new project in the [developer console](https://console.actions.google.com/). Described above. But at the step 'Build under the Actions SDK box' choose your newly created project. By this they share the same project_id.
