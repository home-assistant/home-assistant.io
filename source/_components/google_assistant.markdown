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

# Google Assistant Docs
The Google Assistant component requires a bit more setup than most due to the way Google requires Assistant Apps to be set up.

### {% linkable_title Configuration %}

```yaml
# Example configuration.yaml entry
google_assistant:
  project_id: someproject-2d0b8
  client_id: [long URL safe random string]
  access_token: [a different long URL safe random string]
  exposed_domains:
    - switch
    - light
    - group
```

*Note:* It's very important that you use very long strings for `client_id` and `access_token`. Those are essentially the credentials to your Home Assistant instance. You can generate them with the following command:

`cat /dev/urandom|fold -w 120|head -n 1|base64 -w 0|tr -dc '0-9A-Za-z'|cut -c -80`

*Configuration Variables:*
* *expose_by_default* (Optional): Expose devices in all supported domains by default.
* *project_id* (Required): Project ID from the Google Developer console (looks like `words-2ab12`)
* *client_id* (Required): A long random URL safe string (no spaces or special characters) that will be used for Implicit OAuth.
* *access_token* (Required): Another different long random URL safe string.
* *exposed_domains* (Optional): An array of Home Assistant domains to expose to Google Assistant. Options include:
    - `switch`
    - `light`
    - `cover`
    - `media_player`
    - `group`
    - `fan`
    - `scene`
    - `script`

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
```

*Entity Customization Keys:*
* *google_assistant*: True exposes entity, false will hide it
* *google_assistant_name*: Can be used to override the primary name of an entity. By default the `friendly_name` of an entity is used.
* *aliases*: Provides "nicknames" to Google Assistant. These function as alternate names for an entity that Assistant will understand when spoken.

### {% linkable_title Setup %}

1. Install the [gactions CLI](https://developers.google.com/actions/tools/gactions-cli) (you'll use this later) - you can download this anywhere, just remember where you put it for later (and don't forget to run `chmod +x gactions`)
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
4. Replace `PACKAGE_NAME` with `project.json` and run that command from the same directory you saved `project.json` in (you'll need to put `./` before `gactions` so that it reads `./gactions`). It should output a URL like `https://console.actions.google.com/project/doctest-2d0b8/overview` - go there.
5. You'll need to fill out most of the information on that page, but none of it really matters since you won't be addressing the App directly, only through the Smart Home functionality built into Google Assistant.
6. The final item on that page `Account linking` is required for your app to interact with Home Assistant.
	1. Grant type: `Implicit`
	2. Client ID: Should be the same as `client_id` from your hass config above
	3. Authorization URL (replace with your actual URL): `https://[YOUR HOME ASSISTANT URL]/api/google_assistant/auth`
	4. Configure your client. Add scopes for `email` and `name`
	5. Testing instructions: doesn't matter since you won't submit this app
7. Back on the main app draft page. Click `Test Draft`. That will take you to the simulator (which won't work) so just close that window.
8. Open the Google Assistant app and go into `Settings > Home Control`
9. Click the `+` sign, and near the bottom, you should have `[test] your app name`. Selecting that should lead to you the screen where you can set rooms for your devices or nicknames for your devices.
10. If you want to allow other houshold users to control the devices:
	1. Go to the developer console using address from point 4.
	2. Under the gear icon, click `Permissions`
	3. Click `Add`, type the new user's e-mail address and choose `Project -> Editor` role
	4. Have the new user go to [developer console](https://console.actions.google.com/) and repeat steps starting from point 7.
