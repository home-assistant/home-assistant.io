---
title: "Amazon Alexa Smart Home Skill"
description: "Instructions on how to build Smart Home skill to connect Amazon Alexa with Home Assistant."
ha_category:
  - Voice
ha_release: "0.54"
ha_codeowners:
  - '@home-assistant/cloud'
  - '@ochlocracy'
  - '@jbouwh'
ha_domain: alexa
---

Amazon Alexa provides a Smart Home API for richer home automation control without requiring the user to say the skill name, such as:

- _"Alexa, turn off the light."_
- _"Alexa, set the thermostat to cool."_
- _"Alexa, is the garage door open?"_

It takes considerable effort to configure. Your Home Assistant instance must be accessible from the Internet, and you need to create an Amazon Developer account and an Amazon Web Services (AWS) account. An easier solution is to use [Home Assistant Cloud](/integrations/cloud/).

The [Emulated Hue integration][emulated-hue-integration] provides a simpler alternative to use utterances such as _"Alexa, turn on the kitchen light"_. However, it has some limitations since everything looks like a light bulb.

{% note %}

With [Home Assistant Cloud](/cloud/), you can connect your Home Assistant instance in a few simple clicks to Amazon Alexa. With Home Assistant Cloud you don't have to deal with dynamic DNS, SSL certificates or opening ports on your router. Just log in via the user interface and a secure connection with the cloud will be established. Home Assistant Cloud requires a paid subscription after a 30-day free trial.
<br/>
<br/>
For Home Assistant Cloud Users, documentation can be found [here](https://www.nabucasa.com/config/amazon_alexa/).

{% endnote %}

Steps to Integrate an Amazon Alexa Smart Home Skill with Home Assistant:

- [Requirements](#requirements)
- [Create an Amazon Alexa Smart Home Skill](#create-an-amazon-alexa-smart-home-skill)
- [Create an AWS Lambda Function](#create-an-aws-lambda-function)
  - [Create an IAM Role for Lambda](#create-an-iam-role-for-lambda)
  - [Add Code to the Lambda Function](#add-code-to-the-lambda-function)
  - [Test the Lambda Function](#test-the-lambda-function)
- [Configure the Smart Home Service Endpoint](#configure-the-smart-home-service-endpoint)
- [Account linking](#account-linking)
- [Alexa Smart Home Integration Configuration](#alexa-smart-home-integration-configuration)
- [Supported platforms](#supported-platforms)
  - [Alarm control panel](#alarm-control-panel)
    - [Arming](#arming)
    - [Disarming](#disarming)
  - [Alert, Automation, Group](#alert-automation-group)
  - [Binary sensor](#binary-sensor)
    - [Routines](#routines)
  - [Button, Input Button](#button-input-button)
    - [Routines](#routines-1)
    - [Doorbell announcement with binary\_sensor](#doorbell-announcement-with-binary_sensor)
    - [Presence Detection with Binary Sensor](#presence-detection-with-binary-sensor)
  - [Camera](#camera)
  - [Climate](#climate)
    - [Set Thermostat Temperature](#set-thermostat-temperature)
    - [Thermostat Mode](#thermostat-mode)
  - [Cover](#cover)
    - [Open/Close/Raise/Lower](#opencloseraiselower)
    - [Set Cover Position](#set-cover-position)
    - [Set Cover Tilt](#set-cover-tilt)
    - [Stop the Covers operation](#stop-the-covers-operation)
    - [Garage doors](#garage-doors)
  - [Event entities](#event-entities)
    - [Doorbell events](#doorbell-events)
  - [Fan](#fan)
    - [Fan speed](#fan-speed)
    - [Fan Preset Mode](#fan-preset-mode)
    - [Fan Direction](#fan-direction)
    - [Fan Oscillation](#fan-oscillation)
  - [Humidifier](#humidifier)
    - [Humidifier target humidity](#humidifier-target-humidity)
    - [Humidifier Mode](#humidifier-mode)
  - [Image Processing](#image-processing)
    - [Presence Detection Notification](#presence-detection-notification)
  - [Input Number and Number](#input-number-and-number)
  - [Light](#light)
    - [Brightness](#brightness)
    - [Color Temperature](#color-temperature)
    - [Color](#color)
  - [Lock](#lock)
    - [Unlocking](#unlocking)
  - [Media Player](#media-player)
    - [Change Channel](#change-channel)
    - [Speaker Volume](#speaker-volume)
    - [Equalizer Mode](#equalizer-mode)
    - [Inputs](#inputs)
    - [Playback State](#playback-state)
  - [Remote](#remote)
  - [Scene](#scene)
  - [Script](#script)
  - [Sensor](#sensor)
  - [Switch, Input Boolean](#switch-input-boolean)
    - [Routines](#routines-2)
  - [Timer](#timer)
  - [Vacuum](#vacuum)
  - [Valve](#valve)
    - [Open/close](#openclose)
    - [Set valve position](#set-valve-position)
    - [Stop the valve](#stop-the-valve)
  - [Water heater](#water-heater)
    - [Set target temperature](#set-target-temperature)
    - [Operation Mode](#operation-mode)
- [Troubleshooting](#troubleshooting)
- [Debugging](#debugging)

## Requirements

- The Alexa Smart Home API requires your Home Assistant instance to be accessible from the internet via HTTPS on port 443 using an SSL/TLS certificate. A self-signed certificate will not work, but a public trusted certificate or a certificate signed by [an Amazon approved certificate authority](https://ccadb-public.secure.force.com/mozilla/IncludedCACertificateReport) should work. Read more on [our blog](/blog/2015/12/13/setup-encryption-using-lets-encrypt/) about how to set up encryption for Home Assistant. When running Home Assistant, using the [Duck DNS](/addons/duckdns/) add-on is the easiest method.
- An Amazon Developer Account. Sign up [here](https://developer.amazon.com).
- An [Amazon Web Services (AWS)](https://aws.amazon.com/free/) account is required to host the Lambda function for your Alexa Smart Home Skill. [AWS Lambda](https://aws.amazon.com/lambda/pricing/) is free to use for up to 1-million requests and 1GB outbound data transfer per month.

## Create an Amazon Alexa Smart Home Skill

- Sign into the [Alexa Developer Console][alexa-dev-console], you can create your free account on the sign-in page. Note this *must* be created with the same Amazon account you use on your Alexa devices and app.
- Go to `Alexa Skills` page if you are not, then click the `Create Skill` button to start the process.
- Input `Skill name` as you like, then select your skill's `Default language`.
- Select `Smart Home` and `Provision your own`, then click `Create skill` button at top right corner.

<p class='img'>
  <img src='/images/integrations/alexa/create_a_new_skill.png' alt='Screenshot: Create Smart Home skill'>
</p>

- In next screen, make sure *v3* is selected in `Payload version` and take note of your `Skill ID`
- Now, you have created a skeleton of Smart Home skill. In the next step we will do some "real" developer work. Keep Alexa Developer Console open, we will need to change the skill configuration later.

## Create an AWS Lambda Function

We will write a small piece of code hosted as an AWS Lambda function that will redirect requests from the Alexa Smart Home skill to your Home Assistant instance, then the Alexa integration in Home Assistant will process the request and send back the response. The Lambda function will then deliver the response back to the Alexa Smart Home skill.

OK, let's go. You first need to sign in to your [AWS console](https://console.aws.amazon.com/), if you don't have an AWS account yet, you can create a new user [here](https://aws.amazon.com/free/) with 12-month free tier benefit. You don't need to worry about the cost if your account has already passed the first 12 months, as AWS provides up to 1 million Lambda requests, 1GB of outbound data and all inbound data for free, every month, for all users. See [Lambda pricing](https://aws.amazon.com/lambda/pricing/) for more details.

### Create an IAM Role for Lambda

The first thing you need to do after signing into the [AWS console](https://console.aws.amazon.com/) is to create an IAM Role for Lambda execution. AWS has very strict access control, so you have to specifically define and assign the required permissions.

- Click `Services` in the top navigation bar, expand the menu to display all AWS services, then under the `Security, Identity, & Compliance` section click `IAM` to navigate to the IAM console. Or you may use this [link](https://console.aws.amazon.com/iam/home)
- Click `Roles` in the left panel, then click `Create role`, select `AWS Service` -> `Lambda` in the first page of the wizard, then click `Next: Permissions`
- Select `AWSLambdaBasicExecutionRole` policy, then click `Next: Tags`. (Tips: you can use the search box to filter the policy)

<p class='img'>
  <img src='/images/integrations/alexa/create_iam_role_attach_permission.png' alt='Screenshot: Attach permission policy to IAM role'>
</p>

- Give your new role a name, such as `AWSLambdaBasicExecutionRole-SmartHome`, then click the `Create role` button at the bottom of the page. You should be able to find your new role in the roles list now.

### Add Code to the Lambda Function

Next you need create a Lambda function.

- Click `Services` in top navigation bar, expand the menu to display all AWS services, then under `Compute` section click `Lambda` to navigate to Lambda console. Or you may use this [link](https://console.aws.amazon.com/lambda/home)
**IMPORTANT - Alexa Skills are only supported in specific AWS regions.** Your current server location will be displayed in the top-right corner (for example, Ohio). Select an available server from the list below ([reference](https://developer.amazon.com/en-US/docs/alexa/smarthome/develop-smart-home-skills-in-multiple-languages.html#deploy)) based on your Amazon account's locale, not your physical location. **Alexa Lambda functions created in other regions will not work properly and may prevent account linking! For example, if your locale is set to English (US) and you live in California, you must use US East (N.Virginia), not US West (Oregon). While the setup process will complete with an incorrect region, the skill will not function, and there will be no clear error messages indicating the cause.**
  - **US East (N.Virginia)** region for English (US), English (CA) or Portuguese (BR) skills
  - **EU (Ireland)** region for English (UK), English (IN), German (DE), Spanish (ES) or French (FR) skills
  - **US West (Oregon)** region for Japanese and English (AU) skills.

- Click `Functions` in the left navigation bar, to display the list of your Lambda functions.
- Click `Create function`, select `Author from scratch`, then input a `Function name`.
- Select *Python 3.9*, *Python 3.8* or *Python 3.7* as `Runtime`.
- Expand the `Change default execution role` dropdown and make sure to select *Use an existing role* as `Execution role`, then select the role you just created from `Existing role` list.
- Click `Create function`, then you can configure the details of Lambda function.
- Expand the `Function overview` (if it isn't already expanded), then click `+ Add trigger` in the left part of the panel, then click `Alexa Smart Home` from the drop down list to add an Alexa Smart Home trigger to your Lambda function.
- You will then be prompted to input the `Skill ID` from the skill you created in previous step. (Tip: you may need switch back to Alexa Developer Console to copy the `Skill ID`.) Then click `Add`.
- Scroll down to `Code source`, then, if it isn't already open the `lambda_function.py`.
- Clear the example code, and copy the Python script from: [https://gist.github.com/matt2005/744b5ef548cc13d88d0569eea65f5e5b](https://gist.github.com/matt2005/744b5ef548cc13d88d0569eea65f5e5b) (modified code to support Alexa's proactive mode, see details below)
- Click the `Deploy` button to publish updated code.
- Navigate to the `Configuration` tab, then select `Environment variables`. You need to add 1 environment variable and, if needed, 3 optional variables. This is done by selecting `Edit` then adding the following:
  - *(required)* Key = BASE_URL, Value = your Home Assistant instance's Internet accessible URL. *Do not include the trailing `/`*.
  - *(optional)* Key = NOT_VERIFY_SSL, Value = *True*. You can set this to *True* to ignore SSL issues, for example if you don't have a valid SSL certificate or you are using a self-signed certificate.
  - *(optional)* Key = DEBUG, Value = *True*. Set this variable to log the debug message and to allow the LONG_LIVED_ACCESS_TOKEN
  - *(optional, not recommend)* Key = LONG_LIVED_ACCESS_TOKEN, Value = your Home Assistant Long-Lived Access Token. To avoid the use of a long-lived access token you will connect your Alexa Smart Home skill with your Home Assistant user account in the later steps, meaning you don't need to add it here. However, the access token you got from login flow is only valid for 30 minutes. It will be hard for you to test lambda function with the access token in test data. So for your convenience, you can remove the access token from the test data, [generate a long-lived access token][generate-long-lived-access-token] put here, then the function will fall back to read token from environment variables. (tips: You did not enable the security storage for your environment variables, so your token saved here is not that safe. You should only use it for debugging and testing purpose. You should remove and delete the long-lived access token after you finish the debugging.)

<p class='img'>
  <img src='/images/integrations/alexa/lambda_function_env_var.png' alt='Screenshot: Environment variables in Lambda function'>
</p>

- Now click the `Save` button in the bottom right hand corner.
- Next you need to copy the ARN displayed in the top of the page, which is the identity of this Lambda function. You will need this ARN to continue Alexa Smart Home skill configuration later.

### Test the Lambda Function

Now, you have created the Lambda function, but before you can test it, you have to set up the necessary aspects of your Home Assistant configuration. Put the following minimal configuration into your {% term "`configuration.yaml`" %} file. It will expose all of your supported devices and automations to Alexa. It is strongly recommended to check the [configuration section](#alexa-smart-home-integration-configuration) and setup control of which devices and entities are exposed.

```yaml
alexa:
  smart_home:
```

After your Home Assistant has restarted, go back to the `AWS Lambda Console`, you are going to do some tests.

- Navigate to the `Test` tab, then select `Create new event`
- Name your event, for example `Discovery`
- Enter the following data into the code box named `Event JSON`:

```json
{
  "directive": {
    "header": {
      "namespace": "Alexa.Discovery",
      "name": "Discover",
      "payloadVersion": "3",
      "messageId": "1bd5d003-31b9-476f-ad03-71d471922820"
    },
    "payload": {
      "scope": {
        "type": "BearerToken"
      }
    }
  }
}
```

- Click `Create` in the top right hand corner.

This test event is a `Discovery` directive, your Home Assistant instance will respond with a list of devices Alexa can interact with. Since this test data is lacking a `token` in `payload.scope`, and your Lambda function will read the `LONG_LIVED_ACCESS_TOKEN` from environment variable.

Click the `Test` button. If you don't have `LONG_LIVED_ACCESS_TOKEN` set, or you haven't enabled `DEBUG` you will get a `INVALID_AUTHORIZATION_CREDENTIAL` response as the execution result.

You can login to your Home Assistant and [generate a long-lived access token][generate-long-lived-access-token]. After you have entered your long-lived access token into the environment variable `LONG_LIVED_ACCESS_TOKEN` and set the `DEBUG` environment variable to `True`, do not forget to click the `Save` button before you `Test` again.

This time, you will get a list of your devices in the response. 🎉

## Configure the Smart Home Service Endpoint

Now remove the long-lived access token (if you want), copy the ARN of your Lambda function, then navigate back to the [Alexa Developer Console][alexa-dev-console]. You will finish the configuration of the Smart Home skill.

- Return to the [Alexa Developer Console][alexa-dev-console], and go to `Alexa Skills` page if you are not.
- Find the skill you just created, click `Edit` link in the `Actions` column.
- Click `SMART HOME` in the left navigation bar of build page.
- Fill in `Default endpoint` under `2. Smart Home service endpoint` using the `ARN` you copied from your Lambda function configuration.

## Account linking

Alexa needs to link your Amazon account to your Home Assistant account. Therefore Home Assistant can make sure only authenticated Alexa requests are able to access your home's devices. In order to link the account, you have to make sure your Home Assistant can be accessed from Internet.

- Return to the [Alexa Developer Console][alexa-dev-console], go to `Alexa Skills` page if you are not.
- Find the skill you just created, click `Edit` link in the `Actions` column.
- Click `ACCOUNT LINKING` in the left navigation bar of build page
- Do not turn on the "Allow users to link their account to your skill from within your application or website" switch. This will require a Redirect URI, which won't work.
- Input all information required. Assuming your Home Assistant can be accessed by `https://[YOUR HOME ASSISTANT URL][:PORT]`, where `PORT` is the TCP port. The port can be omitted if it is `443`. For Alexa account linking, by default, the standard port 443 is used by default. Use your firewall to forward this, if needed:
  - `Authorization URI`: `https://[YOUR HOME ASSISTANT URL][:PORT]/auth/authorize`
  - `Access Token URI`: `https://[YOUR HOME ASSISTANT URL][:PORT]/auth/token`

    Although it is possible to assign a different port, it is preferable to use port 443, so in that case make sure your firewall/proxy is forwarding via port 443.

    Read [more from the Alexa developer documentation](https://developer.amazon.com/en-US/docs/alexa/account-linking/requirements-account-linking.html) about requirements for account linking.

    {% note %}
    Despite the Alexa documentation's disclaimer, however, [Let's Encrypt](https://letsencrypt.org/) certificates are still accepted.
    {% endnote %}

{% important %}
You must use a valid/trusted SSL certificate for account linking to work.
Self signed certificates will not work, but you can use a free Let's Encrypt certificate.
{% endimportant %}

- `Client ID`:
  - `https://pitangui.amazon.com/` if you are in US or BR
  - `https://layla.amazon.com/` if you are in EU
  - `https://alexa.amazon.co.jp/` if you are in JP and AU (not verified yet)

    The trailing slash is important here.

- `Client Secret`: input anything you like, Home Assistant does not check this field
- `Your Authentication Scheme`: make sure you selected *Credentials in request body*. Home Assistant does not support *HTTP Basic*.
- `Scope`: Click `+ Add scope` and input `smart_home`, Home Assistant is not using it yet, we may use it in the future when we allow more fine-grained access control.
- You can leave `Domain List` and `Default Access Token Expiration Time` as empty.

<p class='img'>
  <img src='/images/integrations/alexa/account_linking.png' alt='Screenshot: Account Linking'>
</p>

- Click `Save` button in the top right corner.
- Next, you will use the Alexa Mobile App to link your account.
  - In the Alexa app, navigate to `More` -> `Skills & Games` -> `Your Skills` -> `Dev`
  - Click the Smart Home skill you just created.
  - Click `Enable to use`.
  - A new window will open to direct you to your Home Assistant's login screen.
  - After you successfully login, you will be redirected back to the Alexa app.
  - Alexa should automatically start discovering your devices now! This is indicated by a blue ring on your physical devices
  - If not, ask Alexa to `Discover Devices`
- Now, you can ask Alexa from your Echo or the Alexa App, _"Alexa, turn on bedroom light"_ 🎉

## Alexa Smart Home Integration Configuration

Example configuration:

```yaml
alexa:
  smart_home:
    locale: en-US
    endpoint: https://api.amazonalexa.com/v3/events
    client_id: YOUR_SKILL_CLIENT_ID
    client_secret: YOUR_SKILL_CLIENT_SECRET
    filter:
      include_entities:
        - light.kitchen
        - light.kitchen_left
      include_entity_globs:
        - binary_sensor.*_motion
      include_domains:
        - switch
      exclude_entities:
        - switch.outside
    entity_config:
      light.kitchen:
        name: "Custom Name for Alexa"
        description: "The light in the kitchen"
      switch.stairs:
        display_categories: LIGHT
```

{% configuration %}
alexa:
  description: Alexa configuration
  required: true
  type: map
  keys:
    smart_home:
      description: Alexa Smart Home configuration
      required: true
      type: map
      keys:
        locale:
          description: The locale of your Alexa devices. Supported locales are `de-DE`,  `en-AU`, `en-CA`, `en-GB`, `en-IN`, `en-US`, `es-ES`, `es-MX`, `es-US`,`fr-CA`, `fr-FR`, `hi-IN`, `it-IT`, `ja-JP`, `nl-NL`, and `pt-BR`. See [Alexa Locale](#alexa-locale) for additional information.
          required: false
          type: string
          default: en-US
        endpoint:
          description: >-
            To enable proactive events, you send a message to the Alexa event gateway, send it to the event endpoint that aligns with the geographic availability of your smart home skill. Following is the list of endpoints and the regions they cover. See [Proactive Events](#proactive-events) for more information.
             - North America: `https://api.amazonalexa.com/v3/events`
             - Europe: `https://api.eu.amazonalexa.com/v3/events`
             - Far East: `https://api.fe.amazonalexa.com/v3/events`
          required: false
          type: string
        client_id:
          description: See [Proactive Events](#proactive-events) for more information.
          required: false
          type: string
        client_secret:
          description: See [Proactive Events](#proactive-events) for more information.
          required: false
          type: string
        filter:
          description: Filter domains and entities for Alexa. ([Configure Filter](#configure-filter))
          type: map
          keys:
            include_domains:
              description: List of domains to include (e.g., `light`).
              required: false
              type: list
            exclude_domains:
              description: List of domains to exclude (e.g., `light`).
              required: false
              type: list
            include_entity_globs:
              description: Include all entities matching a listed pattern (e.g., `binary_sensor.*_motion`).
              required: false
              type: list
            exclude_entity_globs:
              description: Exclude all entities matching a listed pattern (e.g., `binary_sensor.*_motion`).
              required: false
              type: list
            include_entities:
              description: List of entities to include (e.g., `light.attic`).
              required: false
              type: list
            exclude_entities:
              description: List of entities to exclude (e.g., `light.attic`).
              required: false
              type: list
        entity_config:
          description: Configuration for specific entities. All subordinate keys are the corresponding entity ids or the domains, e.g., `alarm_control_panel.woowoo`.
          required: false
          type: map
          keys:
            '`<ENTITY_ID>`':
              description: Additional options for specific entities.
              required: false
              type: map
              keys:
                name:
                  description: Name of the entity to show in Amazon Alexa App.
                  required: false
                  type: string
                description:
                  description: Description of the entity to show in Amazon Alexa App.
                  required: false
                  type: string
                display_categories:
                  description: >-
                    Display category and iconography each entity is shown in the Alexa app. Separate each category with a comma. First category is primary. e.g., `MUSIC_SYSTEM,STREAMING_DEVICE,SPEAKER`. See [Alexa Display Categories](#alexa-display-categories) for a list of available categories.
                  required: false
                  type: string
{% endconfiguration %}

### Alexa locale <!-- omit in toc -->

The `locale` should match the location and language used for your Amazon echo devices.

The supported locales are:

- `de-DE`
- `en-AU`
- `en-CA`
- `en-GB`
- `en-IN`
- `en-US`
- `es-ES`
- `es-MX`
- `es-US`
- `fr-CA`
- `fr-FR`
- `hi-IN`
- `it-IT`
- `ja-JP`
- `nl-NL`
- `pt-BR`

See [List of Capability Interfaces and Supported Locales][alexa-supported-locales].

### Proactive events <!-- omit in toc -->

The `endpoint`, `client_id` and `client_secret` are optional, and are only required if you want to enable Alexa's proactive mode (i.e., "Send Alexa Events" enabled). Please note the following if you want to enable proactive mode:

- There are different endpoint URLs, depending on the region of your skill. Please check the available endpoints at <https://developer.amazon.com/docs/smarthome/send-events.html#endpoints>
- The `client_id` and `client_secret` are not the ones used by the skill that have been set up using "Login with Amazon" (in the [Alexa Developer Console][alexa-dev-console]: Build > Account Linking), but rather from the "Alexa Skill Messaging" (in the Alexa Developer Console: Build > Permissions > Alexa Skill Messaging). To get them, you need to enable the "Send Alexa Events" permission.
- If the "Send Alexa Events" permission was not enabled previously, you need to unlink and relink the skill using the Alexa App, or else Home Assistant will show the following error: "Token invalid and no refresh token available. Also, you need to restart your Home Assistant after each disabling/enabling the skill in Alexa."

### Configure filter <!-- omit in toc -->

By default, no entity will be excluded. To limit which entities are being exposed to Alexa, you can use the `filter` parameter. Keep in mind that only [supported platforms](#supported-platforms) can be added.

```yaml
# Example filter to include specified domains and exclude specified entities
alexa:
  smart_home:
    filter:
      include_domains:
        - alarm_control_panel
        - light
      include_entity_globs:
        - binary_sensor.*_occupancy
      exclude_entities:
        - light.kitchen_light
```

{% include common-tasks/filters.md %}

See the [troubleshooting](#troubleshooting) if you're experiencing issues setting up the integration.

### Alexa Display Categories <!-- omit in toc -->

Configure a display category to override the display category and iconography each entity is shown in the Alexa app. This makes it easier to find and monitor devices.

```yaml
light.kitchen_light:
  display_categories: LIGHT,SWITCH
```

{% note %}
Devices such as cameras, garage doors, and alarm control panels require specific display categories to provide all available features from Amazon Alexa. Overriding the default display category will limit features provided by Amazon Alexa.
{% endnote %}

See [Alexa Display Categories][alexa-display-categories] for a complete list

## Supported platforms

Home Assistant supports the following integrations through Alexa using a Smart Home Skill. For Home Assistant Cloud Users, documentation can be found [here](https://www.nabucasa.com/config/amazon_alexa/).

The following paragraphs explain the features of the platforms that are currently supported.

### Alarm control panel

Arm and disarm Alarm control panel entities. Ask Alexa for the state of the alarm control panel entity.

- _"Alexa, arm my home in away mode."_
- _"Alexa, arm my home."_
- _"Alexa, disarm my home."_
- _"Alexa, is my home armed?"_

#### Arming

The alarm control panel state must be in the `disarmed` state before arming. Alexa does not support switching from an armed state without first disarming, e.g., switching from `armed_home` to `armed_night`.

The alarm control panel state `armed_custom_bypass` isn't supported by Alexa and is treated as `armed_home`.

{% note %}
Alexa does not support arming with voice PIN at this time. Therefore if the alarm control panel requires a `code` for arming or the `code_arm_required` attribute is `true`, the entity will not be exposed during discovery.
The alarm control panel may default the `code_arm_required` attribute to `true` even if the platform does not support or require it. Use the [entity customization tool](/docs/configuration/customizing-devices/#customization-using-the-ui) to override `code_arm_required` to `false` and expose the alarm control panel during discovery.
{% endnote %}

#### Disarming

Users must opt-in to the disarm by voice feature in the Alexa App. Alexa will require a 4 digit voice personal identification number (PIN) for disarming. Configure a 4 digit PIN in the Alexa app, or use an existing 4 digit PIN code configured for the alarm control panel.

<p class='img'>
<a href='/images/integrations/alexa/alexa_app_security_system_pin.png' target='_blank'>
  <img height='460' src='/images/integrations/alexa/alexa_app_security_system_pin.png' alt='Screenshot: Alexa App Security System PIN'/></a>
</p>

To use the existing code configured for the alarm control panel the `code` must be 4 digits and the `code_format` attribute must be `number`. After discovery, the Alexa app will offer the ability to use the existing `code`, or create an additional 4 digit PIN to use with Alexa.

The existing code is never communicated to Alexa from Home Assistant. During disarming, Alexa will ask for a PIN. The PIN spoken to Alexa is relayed to Home Assistant and passed to the `alarm_control_panel.alarm_disarm` action. If the `alarm_control_panel.alarm_disarm` action fails for any reason, it is assumed the PIN was incorrect and reported to Alexa as an invalid PIN.

### Alert, Automation, Group

Turn on and off Alert, Automation, and Group entities as switches.

- _"Alexa, turn on the front door alert."_
- _"Alexa, turn off energy saving automations."_
- _"Alexa, Downstairs to on."_

### Binary sensor

Requires [Proactive Events](#proactive-events) enabled.

Binary Sensors with a [`device_class`](/integrations/binary_sensor/#device-class) attribute of `door` `garage_door` `opening` `window` `motion` `presense` are supported.

| `device_class` | Alexa Sensor Type |
| :------------: | :---------------: |
|     `door`     |      Contact      |
| `garage_door`  |      Contact      |
|   `opening`    |      Contact      |
|    `window`    |      Contact      |
|    `motion`    |      Motion       |
|   `presense`   |      Motion       |

Ask Alexa for the state of a contact sensor.

- _"Alexa, is the bedroom window open?"_

#### Routines

Requires [Proactive Events](#proactive-events) enabled.

Alexa Routines can be triggered with Binary Sensors exposed as contact or motion sensors.

Use the [Entity Customization Tool](/docs/configuration/customizing-devices/#customization-using-the-ui) to override the `device_class` attribute to expose a `binary_sensor` to Alexa.

### Button, Input Button

Activate Buttons and Input Buttons with the button name, or _"turn on"_ utterance. They will appear in the Alexa app as scenes.

- _"Alexa, Ring Phone."_
- _"Alexa, turn on Ring Phone."_

#### Routines

Requires [Proactive Events](#proactive-events) enabled.

Alexa Routines can be triggered when Buttons and Input Buttons are pressed.

In order to enable this, buttons will appear to have "presence detection" capability. This is what allows this functionality since Alexa does not support button type devices. To trigger a routine when a button is pressed, select the button in the when menu and then select the "Person" capability.

<p class='img'>
<a href='/images/integrations/alexa/alexa_app_button_trigger.png' target='_blank'>
  <img height='460' src='/images/integrations/alexa/alexa_app_button_trigger.png' alt='Screenshot: Alexa App Button Routine Trigger'/></a>
</p>

#### Doorbell announcement with binary_sensor

Requires [Proactive Events](#proactive-events) enabled.

Note that Home Assistant can support a doorbell natively with an `event` entity with `device_class` to `doorbell`

Configure a `binary_sensor` with `display_category` of `DOORBELL` in the [`entity_config`](#entity_config) to gain access to the doorbell notification settings in the Alexa App. Note that Home Assistant can support this natively with an `event` entity.

```yaml
alexa:
  smart_home:
    entity_config:
      binary_sensor.alexa_doorbell:
        name: "Front Door"
        description: "Doorbell Binary Sensor"
        display_categories: DOORBELL
```

Alexa will announce on all echo devices _"Someone is at the [entity name]"_ when a `binary_sensor` state changes from `off` to `on`.

See also [Event entities](#event-entities).

#### Presence Detection with Binary Sensor

Requires [Proactive Events](#proactive-events) enabled.

Configure a `binary_sensor` that has a `device_class` attribute of `motion` or `presence` and configure `display_category` to `CAMERA` in the [`entity_config`](#entity_config) to gain access the presence detected notification settings in the Alexa App.

```yaml
alexa:
  smart_home:
    entity_config:
      binary_sensor.driveway_presence:
        name: "Driveway"
        description: "Driveway Presence Sensor"
        display_categories: CAMERA
```

Alexa will announce on all echo devices _"Person detected at [entity name]"_.

{% important %}
Each Echo device will need the communication and Announcements setting enabled, and the Do Not Disturb feature turned off.
{% endimportant %}

 <p class='img'>
   <a href='/images/integrations/alexa/alexa_app_person_detection.png' target='_blank'>
   <img height='460' src='/images/integrations/alexa/alexa_app_person_detection.png' alt='Screenshot: Alexa App Person Detection Notification'/></a>
 </p>

[Image Processing](#image-processing) entities also support this notification.

### Camera

View a camera stream on an Amazon echo device.

- _"Alexa, show the front door camera."_

The [`stream`](/integrations/stream/) integration is required to stream cameras to Amazon echo devices.

The Amazon echo device will request the camera stream from Home Assistant. The Home Assistant URL must be accessible from the network the Amazon echo device is connected to and must support HTTPS on port 443 with a certificate signed by [an Amazon approved certificate authority](https://ccadb-public.secure.force.com/mozilla/IncludedCACertificateReport). These requirements can be satisfied with Home Assistant Cloud, or LetsEncrypt/DuckDNS.

Enable preload stream option for cameras used with echo devices to reduce response time, and prevent timing out before the 6 second limit.

### Climate

Single, double, and triple set-point thermostats are supported. The temperature value from the thermostat will also be exposed at a separate [temperature sensor](#sensor).

#### Set Thermostat Temperature

- _"Alexa, set thermostat to 20."_
- _"Alexa, set the AC to 75."_
- _"Alexa, make it warmer in here."_
- _"Alexa, make it cooler in here."_

#### Thermostat Mode

- _"Alexa, set living room thermostat to automatic."_

- `DRY` is shown in Alexa app as `DEHUMIDIFY`
- `ECO` is handled as a `preset` in Home Assistant, and will not display in the Alexa app.
- `FAN_ONLY` is not supported by the Alexa voice model and is shown as `OFF` in the Alexa App.

To change the thermostat mode, the exact utterance must be used:

- _"Alexa, set [entity name] to [mode utterance]."_

If the climate entity supports on/off, use _"turn on"_ and _"turn off"_ utterances with the entity name or the mode utterance.

- _"Alexa, turn on the [mode utterance]."_
- _"Alexa, turn off the [entity name]."_

Alexa supports the following utterances value for climate thermostat mode:

| HA Climate Mode | Alexa Mode Utterances   |
| --------------- | ----------------------- |
| `AUTO`          | _"auto"_, _"automatic"_ |
| `COOL`          | _"cool"_, _"cooling"_   |
| `HEAT`          | _"heat"_, _"heating"_   |
| `ECO`           | _"eco"_, _"economical"_ |
| `DRY`           | _"dry"_, _"dehumidify"_ |
| `OFF`           | _"off"_                 |

### Cover

Covers should be configured with the appropriate `device_class`.

Covers with a `device_class` of `blind`, `shade`, `curtin` are shown as an Interior Blind in the Alexa App and Covers with a `window`, `awning`, or `shutter` will show as an Exterior Blind.

Covers with the `device_class` of `garage` are shown as a [Garage Door](#garage-doors) and support the Open by Voice PIN feature.

Use the [Entity Customization Tool](/docs/configuration/customizing-devices/#customization-using-the-ui) to override the `device_class` attribute to correctly expose a `cover` to Alexa.

#### Open/Close/Raise/Lower

Home Assistant configures covers with semantics that provide _"raise"_, _"lower"_, _"open"_, _"close"_ utterances for covers. In addition to semantics _"turn on"_ / _"turn off"_ utterances will also work.

- _"Alexa, open the garage door."_
- _"Alexa, close the curtain."_
- _"Alexa, lower the shades."_
- _"Alexa, raise the roof!"_

Semantics are assigned based on the features supported by the cover. If the cover supports tilt functionality, the semantics _"open"_ and _"close"_ are assigned to the tilt functionality, and the semantics _"raise"_ and _"lower"_ are assigned to the position functionality.

If the cover does not support tilt, all semantics _"raise"_, _"lower"_, _"open"_, _"close"_ are assigned to the position functionality.

#### Set Cover Position

Covers that support a set position can be controlled using percentages.

- _"Alexa, set the [entity name] position to thirty percent."_
- _"Alexa, increase [entity name] position by ten percent."_
- _"Alexa, decrease [entity name] position by twenty percent."_

| Locale  | Friendly Name Synonyms    |
| ------- | ------------------------- |
| `en-US` | _"position"_, _"opening"_ |

Currently, Alexa only supports friendly name synonyms for the `en-US` locale.

#### Set Cover Tilt

Covers that support tilt position can be controlled using percentages.

- _"Alexa, set the [entity name] tilt to thirty percent."_
- _"Alexa, increase [entity name] tilt by ten percent."_
- _"Alexa, decrease [entity name] tilt by twenty percent."_

| Locale  | Friendly Name Synonyms             |
| ------- | ---------------------------------- |
| `en-US` | _"tilt"_, _"angle"_, _"direction"_ |

Currently, Alexa only supports friendly name synonyms for the `en-US` locale.

#### Stop the Covers operation

To stop the covers operation, say:

- _"Alexa, stop [entity name]."_

If your cover supports the `STOP` feature, this will stop the cover operation.
If your cover supports the `STOP_TILT` feature, this will stop the cover tilt operation.
If both features are enabled, both the cover and the cover tilt will be stopped.

#### Garage doors

Covers with a `device_class` of `garage` support the Open by Voice PIN feature in the Alexa app. Configure a 4 digit PIN code to open the garage door in the Alexa app.

<p class='img'>
<a href='/images/integrations/alexa/alexa_app_garage_door_pin.png' target='_blank'>
  <img height='460' src='/images/integrations/alexa/alexa_app_garage_door_pin.png' alt='Screenshot: Alexa App Garage Door Open by voice'/></a>
</p>

### Event entities

Requires [Proactive Events](#proactive-events) enabled.

#### Doorbell events

Home Assistant `event` entities can trigger a doorbell announcement in Alexa if the `device_class` of the `event` entity is set to `doorbell`.
Alexa will announce on all echo devices _"Someone is at the [entity name]"_ when an `event` entity has received an updated.

{% note %}
Each Amazon Echo device will need the communication and announcements setting enabled and the Do Not Disturb feature turned off.
{% endnote %}

<p class='img'>
<a href='/images/integrations/alexa/alexa_app_doorbell_announcement.png' target='_blank'>
  <img height='460' src='/images/integrations/alexa/alexa_app_doorbell_announcement.png' alt='Screenshot: Alexa App Doorbell Notification'/></a>
</p>

### Fan

Control fan speed, direction, and oscillation.

#### Fan speed

The fan device must support percentage based speeds with the `percentage` attribute.

- _"Alexa, set the fan speed to three."_
- _"Alexa, set the fan speed to fifty percent."_
- _"Alexa, set the fan power level to fifty percent."_
- _"Alexa, turn up the speed on the tower fan."_
- _"Alexa, set the air speed on the tower fan to maximum."_

#### Fan Preset Mode

The fan device must support the `preset_mode` attribute.

- _"Alexa, set the fan preset to eco."_
- _"Alexa, set the fan preset to smart."_
- _"Alexa, set the fan preset to auto."_

Currently, Alexa only supports `en-US` locale for preset modes.

#### Fan Direction

The fan device must support the `direction` attribute.

- _"Alexa, set the fan direction to forward."_
- _"Alexa, set the fan direction to reverse."_

#### Fan Oscillation

The fan device must support the `oscillating` attribute.

- _"Alexa, is oscillate on for the tower fan?"_
- _"Alexa, turn on swivel for the tower fan."_
- _"Alexa, turn on oscillation mode for the table fan."_

| Locale  | Friendly Name Synonyms                                                   |
| ------- | ------------------------------------------------------------------------ |
| `en-US` | _"oscillate"_, _"swivel"_, _"oscillation"_, _"spin"_, _"back and forth"_ |

Currently, Alexa only supports friendly name synonyms for the `en-US` locale.

### Humidifier

Control power, target humidity and mode.

#### Humidifier target humidity

- _"Alexa, set the [entity name] humidity to fifty percent."_

#### Humidifier Mode

The humidifier device must support the `mode` attribute.

- _"Alexa, set the [entity name] mode to eco."_

### Image Processing

Requires [Proactive Events](#proactive-events) enabled.

#### Presence Detection Notification

All `image_processing` entities support the presence detected notification settings in the Alexa App. Any state change will trigger the notification.

Alexa will announce on all echo devices _"Person detected at [entity name]"_.

 <p class='img'>
   <a href='/images/integrations/alexa/alexa_app_person_detection.png' target='_blank'>
   <img height='460' src='/images/integrations/alexa/alexa_app_person_detection.png' alt='Screenshot: Alexa App Person Detection Notification'/></a>
 </p>

{% note %}
Display category will default to `CAMERA` to enable presence detected notification settings in the Alexa App. Each Echo device will need the communication and Announcements setting enabled, and the Do Not Disturbed feature turned off.
{% endnote %}

### Input Number and Number

Control an `input_number` or `number` entity with Alexa. Configures Alexa with the `min`, `max`, `step`, and `unit_of_measurement` attributes for the entity.

- _"Alexa, set [entity name] to forty five [unit of measurement]."_
- _"Alexa, increase the [entity name] by two."_
- _"Alexa, set the [entity name] to maximum."_

The following table lists the possible friendly name synonyms available for a Input Number or Number with `min: -90, max: 90, step: 45, unit_of_measurement: degrees`.

| Fan Range | Friendly Name Synonyms                    |
| --------- | ----------------------------------------- |
| -90       | _"negative ninety"_, _"minimum"_, _"min"_ |
| -45       | _"negative forty five"_                   |
| 0         | _"zero"_                                  |
| 45        | _"forty five"_                            |
| 90        | _"ninety"_, _"maximum"_, _"max"_          |

The `unit_of_measurement` will be used to select a supported unit label from the [Global Alexa catalog](https://developer.amazon.com/en-US/docs/alexa/device-apis/resources-and-assets.html#global-alexa-catalog). If there is no match it will be assigned a preset controller.

The following units are supported: °C, °F, K, m, km, mi, yd, in, kg, g, oz, lb, L, ft³, m³, gal and %

### Light

Control lights with _"turn on"_ and _"turn off"_ utterances, adjust brightness, color, and temperature.

- _"Alexa, turn on the bathroom light."_
- _"Alexa, turn off the patio light."_

#### Brightness

Lights that support brightness can be adjusted with percentages ranging from 0 to 100 percent.

- _"Alexa, set the bedroom light to fifty percent."_
- _"Alexa, living room lights to one hundred percent."_

The _"dim"_ utterance will decrease the brightness of a light 25 percentage points.

- _"Alexa, dim the bathroom light."_

#### Color Temperature

Adjust lights that support color temperature using the following friendly names:

- _"Alexa, set the dining room softer."_
- _"Alexa, make the living room warmer."_
- _"Alexa, set the dining room cooler."_
- _"Alexa, make the living room light whiter."_
- _"Alexa, make the living room warm white."_
- _"Alexa, set the kitchen to daylight."_

The following table lists the possible friendly name synonyms available to lights that support color temperature.

| Color Temperature in Kelvin | Friendly Name Synonyms           |
| --------------------------- | -------------------------------- |
| 2200                        | _"warm"_, _"warm white"_         |
| 2700                        | _"incandescent"_, _"soft white"_ |
| 4000                        | _"white"_                        |
| 5500                        | _"daylight"_, _"daylight white"_ |
| 7000                        | _"cool"_, _"cool white"_         |

Use _"warmer"_, _"softer"_, _"cooler_, _"whiter"_ utterances to adjust color temperature by 50 `mired` (approximately 300-500 degree kelvin change).

- _"Alexa, set the dining room softer."_
- _"Alexa, make the living room warmer."_
- _"Alexa, set the dining room cooler."_
- _"Alexa, make the living room light whiter."_

#### Color

Set the light color using the CSS [basic color keywords](https://drafts.csswg.org/css-color-3/#html4) or [extended color keywords](https://drafts.csswg.org/css-color-3/#svg-color) as the friendly color name.

- _"Alexa, set the front porch light to blue."_
- _"Alexa, set the bedroom light to red."_
- _"Alexa, change the kitchen to the color crimson."_

### Lock

- _"Alexa, lock my front door."_
- _"Alexa, unlock the dungeon."_

#### Unlocking

To unlock, Alexa will require a 4 digit voice personal identification number (PIN) for unlocking. Configure a 4 digit PIN in the Alexa app to unlock locks.

### Media Player

#### Change Channel

- _"Alexa, change the channel to 200 on the Living Room TV."_
- _"Alexa, change the channel to PBS on the TV."_
- _"Alexa, next channel on the Living Room TV."_
- _"Alexa, channel up on the TV."_
- _"Alexa, channel down on the TV."_

#### Speaker Volume

- _"Alexa, set the volume of the speakers to 50."_
- _"Alexa, turn the volume down on the stereo by 20."_
- _"Alexa, turn the volume down on Living Room TV."_
- _"Alexa, mute speakers."_
- _"Alexa, unmute speakers."_
- _"Alexa, lower the volume on the stereo."_
- _"Alexa, volume up 20 on the speakers."_

#### Equalizer Mode

Supports changing the Media Player `sound_mode` from the preset `sound_mode_list`.

- _"Alexa, set mode to movie on the TV."_

Alexa only supports the following modes: `movie`, `music`, `night`, `sport`, `tv`.

#### Inputs

Supports changing the Media Player `source` from the preset `source_list`.

- _"Alexa, change the input to DVD on the Living Room TV."_

Home Assistant will attempt to translate the `media_player` `source_list` into a valid `source` name for Alexa. Alexa only supports the following input names:

`AUX 1`, `AUX 2`, `AUX 3`, `AUX 4`, `AUX 5`, `AUX 6`, `AUX 7`, `BLURAY`, `CABLE`, `CD`, `COAX 1`, `COAX 2`, `COMPOSITE 1`, `DVD`, `GAME`, `HD RADIO`, `HDMI 1`, `HDMI 2`, `HDMI 3`, `HDMI 4`, `HDMI 5`, `HDMI 6`, `HDMI 7`, `HDMI 8`, `HDMI 9`, `HDMI 10`, `HDMI ARC`, `INPUT 1`, `INPUT 2`, `INPUT 3`, `INPUT 4`, `INPUT 5`, `INPUT 6`, `INPUT 7`, `INPUT 8`, `INPUT 9`, `INPUT 10`, `IPOD`, `LINE 1`, `LINE 2`, `LINE 3`, `LINE 4`, `LINE 5`, `LINE 6`, `LINE 7`, `MEDIA PLAYER`, `OPTICAL 1`, `OPTICAL 2`, `PHONO`, `PLAYSTATION`, `PLAYSTATION 3`, `PLAYSTATION 4`, `SATELLITE`, `SMARTCAST`, `TUNER`, `TV`, `USB DAC`, `VIDEO 1`, `VIDEO 2`, `VIDEO 3`, `XBOX`

#### Playback State

Requires [Proactive Events](#proactive-events) enabled.

{% note %}
Intents to seek forwards (skip) or to rewind (go back) are not supported at the moment.
{% endnote %}

### Remote

Supports changing the Remote `activity` from the given `activity_list`

- _"Alexa, change the TV to PlayStation."_
- _"Alexa, change the input on the TV to PlayStation."_

{% note %}
Alexa does not allow the following words to be used as activity names:

`alarm`, `alarms`, `all alarms`, `away mode`, `bass`, `camera`, `date`, `date today`, `day`, `do not disturb`, `drop in`, `music`, `night light`, `notification`, `playing`, `sleep sounds`, `time`, `timer`, `today in music`, `treble`, `volume`, `way f. m.`
{% endnote %}

### Scene

Activate scenes with scene name, or _"turn on"_ utterance. Home Assistant does not support deactivate or _"turn off"_ for scenes at this time.

- _"Alexa, Party Time."_
- _"Alexa, turn on Party Time."_

### Script

Run script with script name, or _"turn on"_ utterance.  Deactivate a running script with _"turn off"_ utterance.

- _"Alexa, Party Time."_
- _"Alexa, turn on Party Time."_
- _"Alexa, turn off Party Time."_

### Sensor

Requires [Proactive Events](#proactive-events) enabled.

Only temperature sensors are configured at this time.

- _"Alexa, what's the temperature in the kitchen?"_
- _"Alexa, what's the upstairs temperature?"_

### Switch, Input Boolean

Support _"turn on"_ and _"turn off"_ utterances.

- _"Alexa, turn on the vacuum."_
- _"Alexa, turn off the lights."_

#### Routines

Requires [Proactive Events](#proactive-events) enabled.

Alexa Routines can be triggered when Switches and Input Booleans change state.

In order to enable this, Switches and Input Booleans will appear as contact sensors in the when menu of Alexa Routines. This is because Alexa does not support triggering routines from switch-type devices, only from contact and motion sensors. In this menu when you select a switch, `Open` corresponds to `on` and `Close` corresponds to `off`.

<p class='img'>
<a href='/images/integrations/alexa/alexa_app_switch_trigger.png' target='_blank'>
  <img height='460' src='/images/integrations/alexa/alexa_app_switch_trigger.png' alt='Screenshot: Alexa App Switch Routine Trigger'/></a>
</p>

### Timer

Start a timer with using the _"turn on"_ utterance.

- _"Alexa, turn on the laundry."_

Cancel a timer using the _"turn off"_ utterance.

- _"Alexa, turn off the laundry."_

Pause and Restart Timer entities in Home Assistant.

- _"Alexa, pause the microwave."_
- _"Alexa, hold the sous vide."_
- _"Alexa, restart the microwave."_

{% important %}
To avoid issues with Alexa's built-in timer functionality, the timer entity should not include the word "timer" in its friendly name.
{% endimportant %}

### Vacuum

Support _"turn on"_ and _"turn off"_ utterances. Pause and Resume

- _"Alexa, turn on the vacuum."_
- _"Alexa, pause the vacuum."_
- _"Alexa, restart the vacuum."_

### Valve

Valves are not supported natively within Alexa. So within Alexa, they are represented as a device of an unknown type. 

#### Open/close

Home Assistant configures valves with semantics that provide  _"open"_ and _"close"_ utterances.

- _"Alexa, open the water valve."_
- _"Alexa, close the gas valve."_

#### Set valve position

Valves that support a set position can be controlled using percentages.

- _"Alexa, set the [entity name] position to thirty percent."_
- _"Alexa, increase [entity name] position by ten percent."_
- _"Alexa, decrease [entity name] position by twenty percent."_

| Locale  | Friendly Name Synonyms    |
| ------- | ------------------------- |
| `en-US` | _"position"_, _"opening"_ |

Currently, Alexa only supports friendly name synonyms for the `en-US` locale.

#### Stop the valve

Valves that support `stop` closing or opening will have an extra toggle control that allows to stop the valve closing or opening operation.

### Water heater

Single, double, and triple set-point thermostats are supported. The temperature value from the thermostat will also be exposed at a separate [temperature sensor](#sensor).

#### Set target temperature

- _"Alexa, set the boiler's target temperature to 50."_

You can ask Alexa about the current temperature and current target temperature.

- _"Alexa, what is the boiler's target temperature?"_
- _"Alexa, what is the boiler's current temperature?"_

#### Operation Mode

The operation mode can be set from the UI. All Home Assistant operation modes can be set (English only).

- _"Alexa, set main boiler to eco."_

To change the water heater's mode, the exact utterance must be used:

- _"Alexa, set [entity name] to [mode utterance]."_

If the water heater entity supports on/off, use _"turn on"_ and _"turn off"_ utterances with the entity name or the mode utterance.

- _"Alexa, turn on the [mode utterance]."_
- _"Alexa, turn off the [entity name]."_

## Troubleshooting

### Binary Sensor not available in Routine Trigger <!-- omit in toc -->

Binary Sensors with a [`device_class`](/integrations/binary_sensor/#device-class) attribute of `door` `garage_door` `opening` `window` `motion` `presense` are supported.

Use the [Entity Customization Tool](/docs/configuration/customizing-devices/#customization-using-the-ui) to override the `device_class` attribute to expose a `binary_sensor` to Alexa.

### Token Invalid and no Refresh Token Available <!-- omit in toc -->

Disable and re-enable the skill using the Alexa App; then restart Home Assistant.

## Debugging

The Alexa integration will log additional information about state updates and other messages when the log level is set to `debug`. Add the relevant line below to the {% term "`configuration.yaml`" %}:

If using Alexa with an Alexa Smart Home Skill and Lambda function such as haaska:

```yaml
logger:
  default: info
  logs:
    homeassistant.components.alexa: debug
```

If using Home Assistant Cloud you also need to debug `hass_nubucasa.iot`:

```yaml
logger:
  default: info
  logs:
    homeassistant.components.alexa: debug
    hass_nabucasa.iot: debug
```

[alexa-dev-console]: https://developer.amazon.com/alexa/console/ask
[emulated-hue-integration]: /integrations/emulated_hue/
[generate-long-lived-access-token]: https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token
[alexa-display-categories]: https://developer.amazon.com/docs/alexa/device-apis/alexa-discovery.html#display-categories
[alexa-supported-locales]: https://developer.amazon.com/docs/alexa/device-apis/list-of-interfaces.html
