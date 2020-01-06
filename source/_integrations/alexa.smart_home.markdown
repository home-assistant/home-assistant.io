---
title: "Amazon Alexa Smart Home Skill"
description: "Instructions on how to build Smart Home skill to connect Amazon Alexa with Home Assistant."
logo: amazon-alexa.png
ha_category:
  - Voice
ha_release: "0.54"
---

## Amazon Alexa Smart Home

While the Skills API described above allows for arbitrary intents, all
utterances must begin with "Alexa, tell $invocation_name ..."

The [Emulated Hue integration][emulated-hue-component] provides a simpler
interface such as, "Alexa, turn on the kitchen light". However, it has some
limitations since everything looks like a light bulb.

Amazon provides a Smart Home API for richer home automation control. It takes
considerable effort to configure. The easy solution is to use
[Home Assistant Cloud](/integrations/cloud/).

However, config Amazon Alexa Smart Home Skill is not an easy job, you have to allow
your Home Assistant accessible from Internet, and you need to create Amazon Developer
account and an Amazon Web Service account. 

<div class='note'>

With [Home Assistant Cloud](/cloud/), you can connect your Home Assistant instance in a few simple clicks to Amazon Alexa. With Home Assistant Cloud you don't have to deal with dynamic DNS, SSL certificates or opening ports on your router. Just log in via the user interface and a secure connection with the cloud will be established. Home Assistant Cloud requires a paid subscription after a 30-day free trial.
<br/>
<br/>
For Home Assistant Cloud Users, documentation can be found [here](https://www.nabucasa.com/config/amazon_alexa/).

</div>

### Requirements

- Amazon Developer Account. You can sign on [here](https://developer.amazon.com).
- An [AWS account](https://aws.amazon.com/free/) is need if you want to use Smart Home Skill API. Part of your Smart Home Skill will be hosted on [AWS Lambda](https://aws.amazon.com/lambda/pricing/). However you don't need worry the cost, AWS Lambda allow free to use up to 1 millions requests and 1GB outbound data transfer per month.
- The Smart Home API also needs your Home Assistant instance to be accessible from the internet via HTTPS on port 443 using a certificate signed by [an Amazon approved certificate authority](https://ccadb-public.secure.force.com/mozilla/IncludedCACertificateReport), this is so account linking can take place. Read more on [our blog](/blog/2015/12/13/setup-encryption-using-lets-encrypt/) about how to set up encryption for Home Assistant. When running Hass.io using the [Duck DNS](/addons/duckdns/) add-on is the easiest method.

### Create Your Amazon Alexa Smart Home Skill

- Sign in [Alexa Developer Console][alexa-dev-console], you can create your free account on the sign in page.
- Go to `Alexa Skills` page if you are not, click `Create Skill` button to start the process.
- Input `Skill name` as you like, select your skill's `Default language`.
- Select `Smart Home` and `Provision your own`, then click `Create skill` button at top right corner.

<p class='img'>
  <img src='/images/integrations/alexa/create_a_new_skill.png' alt='Screenshot: Create Smart Home skill'>
</p>

- In next screen, make sure *v3* is selected in `Payload version`.
- Now, you have created a skeleton of Smart Home skill. Next step we will do some "real" developer work. You can keep Alex Developer Console opened, we need change the skill configuration later.

### Create Your Lambda Function

Alexa Smart Home skill will trigger a AWS Lambda function to process the request, we will write a small piece of code hosted as an Lambda function basically redirect the request to your Home Assistant instance, then Alexa integration integration in Home Assistant will process the request and send back the response. Your Lambda function will delivery the response back to Alexa.

<div class='info'>

There already are some great tutorials and solutions in our community to achieve same goal "Create your Alexa Smart Home Skill to connect Home Assistant", for example: [Haaska](https://github.com/mike-grant/haaska/wiki).

You can follow this document or others, but you cannot mixed-match different solutions since they may have different design.

Amazon also provided a [step-by-step guide](https://developer.amazon.com/docs/smarthome/steps-to-build-a-smart-home-skill.html) to create a Smart Home Skill, however you have to adapt its sample code to match Home Assistant API.

</div>

OK, let's go. You first need sign in your [AWS console](https://console.aws.amazon.com/), if you don't have an AWS account yet, you can create a new user [here](https://aws.amazon.com/free/) with 12-month free tire benefit. You don't need worry the cost if your account already pass the first 12 months, AWS provides up to 1 million Lambda request, 1GB outbound data and all inbound data for free, every month, all users. See [Lambda pricing](https://aws.amazon.com/lambda/pricing/) for details.

#### Create an IAM Role for Lambda 

First thing you need to do after sing in [AWS console](https://console.aws.amazon.com/) is to create an IAM Role for Lambda execution. AWS has very strict access control, you have to specific define and assign the permissions.

- Click `Service` in top navigation bar, expand the menu to display all AWS services, click `IAM` under `Security, Identity, & Compliance` section to navigate to IAM console. Or you may use this [link](https://console.aws.amazon.com/iam/home)
- Click `Roles` in the left panel, then click `Create role`, select `AWS Service` -> `Lambda` in the first page of the wizard, then click `Next: Permissions`
- Select `AWSLambdaBasicExecutionRole` policy, then click `Next: Tags`. (Tips: you can use the search box to filter the policy)

<p class='img'>
  <img src='/images/integrations/alexa/create_iam_role_attach_permission.png' alt='Screenshot: Attach permission policy to IAM role'>
</p>

- You can skip `Add tags` page, click `Next: Review`.
- Give your new role a name, such as `AWSLambdaBasicExecutionRole-SmartHome`, then click `Create role` button. You should be able to find your new role in the roles list now.

#### Create a Lambda function and add code

Next you need create a Lambda function.

- Click `Service` in top navigation bar, expand the menu to display all AWS services, click `Lambda` under `Compute` section to navigate to Lambda console. Or you may use this [link](https://console.aws.amazon.com/lambda/home)
- **IMPORTANT** Your current region will be displayed on the top right corner, make sure you select right region base on your Amazon account's country:
  * **US East (N.Virginia)** region for English (US) or English (CA) skills
  * **EU (Ireland)** region for English (UK), English (IN), German (DE), Spanish (ES) or French (FR) skills
  * **US West (Oregon)** region for Japanese and English (AU) skills. 
- Click `Functions` in the left navigation bar, display list of your Lambda functions.
- Click `Create function`, select `Author from scratch`, then input a `Function name`.
- Select *Python 3.6* or *Python 3.7* as `Runtime`.
- Make sure select *Use an existing role* as `Execution role`, then select the role you just created from `Existing role` list.
- Click `Create function`, then you can config detail of Lambda function.
- Under `Configuration` tab, expand `Designer`, then click `Alexa Smart Home` in the left part of the panel to add a Alexa Smart Home trigger to your Lambda function.
- Scroll down little bit, you need input the `Skill ID` from the skill you created in previous step. (tips: you may need switch back to Alexa Developer Console to copy the `Skill ID`.
- Click your Lambda Function icon in the middle of the diagram, scroll down you will see a `Function code` window.
- Clear the example code, copy the Python script from: [https://gist.github.com/matt2005/744b5ef548cc13d88d0569eea65f5e5b](https://gist.github.com/matt2005/744b5ef548cc13d88d0569eea65f5e5b) (modified code to support Alexa's proactive mode, see details below)
- Scroll down a little bit, you will find `Environment variables`, you need add 4 environment variables:
  * BASE_URL *(required)*: your Home Assistant instance's Internet accessible URL with port if needed. *Do not include the trailing `/`*.
  * NOT_VERIFY_SSL *(optional)*: you can set it to *True* to ignore the SSL issue, if you don't have a valid SSL certificate or you are using self-signed certificate.
  * DEBUG *(optional)*: set to *True* to log the debug message
  * LONG_LIVED_ACCESS_TOKEN *(optional, not recommend)*: you will connect your Alexa Smart Home skill with your Home Assistant user account in the later steps, so that you don't need to use long-lived access token here. However, the access token you got from login flow is only valid for 30 minutes. It will be hard for you to test lambda function with the access token in test data. So for your convinces, you can remove the access token from the test data, [generate a long-lived access token][generate-long-lived-access-token] put here, then the function will fall back to read token from environment variables. (tips: You did not enable the security storage for your environment variables, so your token saved here is not that safe. You should only use it for debugging and testing purpose. You should remove and delete the long-lived access token after you finish the debugging.) 

<p class='img'>
  <img src='/images/integrations/alexa/lambda_function_env_var.png' alt='Screenshot: Environment variables in Lambda function'>
</p>

- Now scroll up to the top, click `Save` button.
- You need copy the ARN displayed in the top of the page, which is the identify of this Lambda function. You will need this ARN to continue Alexa Smart Home skill configuration later.

#### Test the Lambda function

Now, you have created the Lambda function, before you can test it, you have to set up your Home Assistant. Put following minimal configuration to your configuration.yaml, it will exposures all of your supported device and automation to Alexa. Check the [configuration section](#alexa-component-configuration) if you want more control of the exposure. 

```yaml
alexa:
  smart_home:
```

After your Home Assistant restarted, back to `AWS Lambda Console`, you are going to do some tests.

On the top of your Lambda function configuration page, there is a `Test` button, click the drop down button at left of `Test` button, click `Configure test events`, you can `Create new test event` using following data:

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

This test event is a `Discovery` directive, Home Assistant will response with a list of your devices Alexa can interact with. This test data is lack of `token` in `payload.scope`, your Lambda function will read the `LONG_LIVED_ACCESS_TOKEN` from environment variable.

Click `Test` button. If you don't have `LONG_LIVED_ACCESS_TOKEN`, you will get a `INVALID_AUTHORIZATION_CREDENTIAL` response as the execution result.

Now, you can login to your Home Assistant and [generate a long-lived access token][generate-long-lived-access-token]. After you put your long-lived access token to the `Environment variable`, do not forget click `Save` button before you `Test` again.

This time, you will get a list of your devices as the response. 🎉 

### Config the Smart Home Service Endpoint

Now removed the long-lived access token if you want, copied the ARN of your Lambda function, then back to [Alexa Developer Console][alexa-dev-console]. You will finish the configuration of the Smart Home skill.

- Sign in [Alexa Developer Console][alexa-dev-console], go to `Alexa Skills` page if you are not.
- Find the skill you just created, click `Edit` link in the `Actions` column.
- Click `SMART HOME` in the left navigation bar of build page.
- Fill in `Default endpoint` under `2. Smart Home service endpoint` using the `ARN` you copied from your Lambda function configuration.

### Account Linking

Alexa can link your Amazon account to your Home Assistant account. Therefore Home Assistant can make sure only authenticated Alexa request be able to access your home's devices. In order to link the account, you have to make sure your Home Assistant can be accessed from Internet.

- Sign in [Alexa Developer Console][alexa-dev-console], go to `Alexa Skills` page if you are not.
- Find the skill you just created, click `Edit` link in the `Actions` column.
- Click `ACCOUNT LINKING` in the left navigation bar of build page
- Input all information required. Assuming your Home Assistant can be accessed by https://[YOUR HOME ASSISTANT URL:PORT]
  * `Authorization URI`: https://[YOUR HOME ASSISTANT URL]/auth/authorize
  * `Access Token URI`: https://[YOUR HOME ASSISTANT URL]/auth/token
    - Note: you must use a valid/trusted SSL Certificate and port 443 for account linking to work
  * `Client ID`:
    - https://pitangui.amazon.com/ if you are in US
    - https://layla.amazon.com/ if you are in EU
    - https://alexa.amazon.co.jp/ if you are in JP and AU (not verified yet)
    
    The trailing slash is important here.

  * `Client Secret`: input anything you like, Home Assistant does not check this field
  * `Client Authentication Scheme`: make sure you selected *Credentials in request body*. Home Assistant does not support *HTTP Basic*.
  * `Scope`: input `smart_home`, Home Assistant is not using it yet, we may use it in the future when we allow more fine-grained access control.
- You can leave `Domain List` and `Default Access Token Expiration Time` as empty.

<p class='img'>
  <img src='/images/integrations/alexa/account_linking.png' alt='Screenshot: Account Linking'>
</p>

- Click `Save` button in the top right corner.
- Next, you will use Alexa Mobile App or [Alexa web-based app](#alexa-web-based-app) to link your account.
  * Open the Alexa app, navigate to `Skills` -> `Your Skills` -> `Dev Skills`
  * Click the Smart Home skill you just created.
  * Click `Enable`.
  * A new window will open to direct you to your Home Assistant's login screen.
  * After you success login, you will be redirected back to Alexa app.
  * You can discovery your devices now. 
- Now, you can ask your Echo or in Alexa App, *turn on bedroom* 🎉 

### Alexa Component Configuration

Example configuration:

```yaml
alexa:
  smart_home:
    locale: en-US
    endpoint: https://api.amazonalexa.com/v3/events
    client_id: !secret alexa_client_id
    client_secret: !secret alexa_client_secret
    filter:
      include_entities:
        - light.kitchen
        - light.kitchen_left
      include_domains:
        - switch
      exclude_entities:
        - switch.outside
    entity_config:
      light.kitchen:
        name: Custom Name for Alexa
        description: The light in the kitchen
      switch.stairs:
        display_categories: LIGHT
```

Set the `locale` to the locale of your Alexa devices. Supported locales are: `de-DE`,  `en-AU`, `en-CA`, `en-GB`, `en-IN`, `en-US`, `es-ES`, `es-MX`, `fr-CA`, `fr-FR`, `it-IT`, `ja-JP`. Default is `en-US`.

The `endpoint`, `client_id` and `client_secret` are optional, and are only required if you want to enable Alexa's proactive mode (i.e. "Send Alexa Events" enabled). Please note the following if you want to enable proactive mode:

- There are different endpoint URLs, depending on the region of your skill. Please check the available endpoints at <https://developer.amazon.com/docs/smarthome/send-events-to-the-alexa-event-gateway.html#endpoints>
- The `client_id` and `client_secret` are not the ones used by the skill that have been set up using "Login with Amazon" (in the [Alexa Developer Console][amazon-dev-console]: Build > Account Linking), but rather from the "Alexa Skill Messaging" (in the Alexa Developer Console: Build > Permissions > Alexa Skill Messaging). To get them, you need to enable the "Send Alexa Events" permission.
- If the "Send Alexa Events" permission was not enabled previously, you need to unlink and relink the skill using the Alexa App, or else Home Assistant will show the following error: "Token invalid and no refresh token available. Also, you need to restart your Home Assistant after each disabling/enabling the skill in Alexa."

### Alexa web-based app

The following is a list of regions and the corresponding URL for the web-based Alexa app:

* United States: <https://alexa.amazon.com>
* United Kingdom: <https://alexa.amazon.co.uk>
* Germany: <https://alexa.amazon.de>
* Japan: <https://alexa.amazon.co.jp>
* Canada: <https://alexa.amazon.ca>
* Australia: <https://alexa.amazon.com.au>
* India: <https://alexa.amazon.in>
* Spain: <https://alexa.amazon.es>

[alexa-dev-console]: https://developer.amazon.com/alexa/console/ask
[emulated-hue-component]: /integrations/emulated_hue/
[generate-long-lived-access-token]: https://developers.home-assistant.io/docs/en/auth_api.html#long-lived-access-token
