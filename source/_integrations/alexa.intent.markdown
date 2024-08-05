---
title: "Amazon Alexa Custom Skill"
description: "Instructions on how to build your Alexa/Amazon Echo custom commands to connect with Home Assistant."
ha_category:
  - Voice
ha_release: "0.10"
ha_domain: alexa
related:
  - docs: /docs/configuration/
    title: Configuration file
---

## I want to build custom commands to use with Echo

The built-in Alexa integration allows you to integrate Home Assistant into Alexa/Amazon Echo. This integration will allow you to query information and perform actions within Home Assistant by using your voice. Home Assistant offers no built-in sentences but offers a framework for you to define your own.

<lite-youtube videoid="1Ke3mtWd_cQ" videotitle="Home Assistant integration for Amazon Echo" posterquality="maxresdefault"></lite-youtube>

### Requirements

- Amazon Developer Account. You can sign on [here](https://developer.amazon.com).
- An [AWS account](https://aws.amazon.com/free/) is needed if you want to use the Alexa Custom Skill API. Part of your Alexa Custom Skill will be hosted on [AWS Lambda](https://aws.amazon.com/lambda/pricing/). However, you don't need to worry about the cost, as AWS Lambda allows for free to use up to 1 million requests and 1GB outbound data transfer per month.
- The Alexa Custom Skill API also needs your Home Assistant instance to be accessible from the internet via HTTPS on port 443 using a certificate signed by [an Amazon approved certificate authority](https://ccadb-public.secure.force.com/mozilla/IncludedCACertificateReport). This is so account linking can take place. Read more on [our blog](/blog/2015/12/13/setup-encryption-using-lets-encrypt/) about how to set up encryption for Home Assistant. When running Home Assistant OS or Supervised, using the [Duck DNS](/addons/duckdns/) add-on is the easiest method.

### Create Your Amazon Alexa Custom Skill

- Log in to the [Amazon developer console][amazon-dev-console]
- Click the Alexa button at the top of the console
- Click the blue "Create Skill" button in the top right
  - Model to add: Custom
  - Name: HomeAssistantIntentsSkill (or whatever you want to call this skill)
  - Method to host: Provision your own

You can use this [specially sized Home Assistant logo][large-icon] as the large icon and [this one][small-icon] as the small one.

### Create Your Lambda Function

The Alexa Custom skill will trigger a AWS Lambda function to process the request, we will write a small piece of code hosted as a Lambda function to basically redirect the request to your Home Assistant instance, then the Alexa integration in Home Assistant will process the request and send back the response. Your Lambda function will deliver the response back to Alexa.

OK, let's go. You first need sign in your [AWS console](https://console.aws.amazon.com/), if you don't have an AWS account yet, you can create a new user [here](https://aws.amazon.com/free/) with 12-month free tier benefit. You don't need to worry about the cost if your account has already passed the first 12 months, AWS provides up to 1 million Lambda requests, 1GB of outbound data and unlimited inbound data for free every month for all users. See [Lambda pricing](https://aws.amazon.com/lambda/pricing/) for details.

#### Create an IAM Role for Lambda

The first thing you need to do after you sign in to the [AWS console](https://console.aws.amazon.com/) is to create an IAM Role for Lambda execution. AWS has very strict access control, you have to explicitly define and assign the permissions.

- Click `Service` in top navigation bar, expand the menu to display all AWS services, click `IAM` under `Security, Identity, & Compliance` section to navigate to IAM console. Or you may use this [link](https://console.aws.amazon.com/iam/home)
- Click `Roles` in the left panel, then click `Create role`, select `AWS Service` -> `Lambda` in the first page of the wizard, then click `Next: Permissions`
- Select `AWSLambdaBasicExecutionRole` policy, then click `Next: Tags`. (Tips: you can use the search box to filter the policy)

<p class='img'>
  <img src='/images/integrations/alexa/create_iam_role_attach_permission.png' alt='Screenshot: Attach permission policy to IAM role'>
</p>

- You can skip `Add tags` page, click `Next: Review`.
- Give your new role a name, such as `AWSLambdaBasicExecutionRole-Intents`, then click `Create role` button. You should be able to find your new role in the roles list now.

#### Create a Lambda function and add code

Next you need to create a Lambda function.

- Click `Service` in top navigation bar, expand the menu to display all AWS services, click `Lambda` under `Compute` section to navigate to the Lambda console. Or you may use this [link](https://console.aws.amazon.com/lambda/home)
- **IMPORTANT** Your current region will be displayed in the top right corner. Make sure you select the right region based on your Amazon account's country:
  - **US East (N.Virginia)** region for English (US) or English (CA) skills
  - **EU (Ireland)** region for English (UK), English (IN), German (DE), Spanish (ES) or French (FR) skills
  - **US West (Oregon)** region for Japanese and English (AU) skills.
- Click `Functions` in the left navigation bar, display list of your Lambda functions.
- Click `Create function`, select `Author from scratch`, then input a `Function name`.
- Select *Python 3.* as `Runtime` (Python 3.9 was available at this time).
- Select *Use an existing role* as `Execution role`, then select the role you just created from the `Existing role` list.
- Click `Create function`, then you can configure the details of the Lambda function.
- Under the `Configuration` tab, expand `Designer`, then click on `+ Add trigger` in the left part of the panel and select `Alexa Skills Kit` from the dropdown list to add an Alexa Skills Kit trigger to your Lambda function.
- Scroll down a little bit, you need to input the `Skill ID` from the skill you created in the previous step. (You may need to switch back to the Alexa Developer Console to copy the `Skill ID`).
- Click your Lambda Function icon in the middle of the diagram and scroll down, you will see a `Function code` window.
- Clear the example code and copy the Python script from this [GitHub Gist](https://gist.github.com/lpomfrey/97381cf4316553b03622c665ae3a47da).
- Click the `Deploy` button of the `Function code` window.
- Scroll down again and pick the `Configuration' tab, select it and on the left you will now find `Environment variables`, click on `Edit` button and add the following environment variables as needed:
  - BASE_URL *(required)*: your Home Assistant instance's Internet accessible URL with port if needed. *Do not include the trailing `/`*.
  - NOT_VERIFY_SSL *(optional)*: set to *True* to ignore the SSL issue, if you don't have a valid SSL certificate or you are using self-signed certificate.
  - DEBUG *(optional)*: set to *True* to log debugging messages.
  - LONG_LIVED_ACCESS_TOKEN *(optional, not recommended)*: you will connect your Alexa Custom skill with your Home Assistant user account in the later steps, so that you don't need to use long-lived access token here. However, the access token you got from login flow is only valid for 30 minutes. It will be hard for you to test lambda function with the access token in test data. So for your convenience, you can remove the access token from the test data, [generate a long-lived access token][generate-long-lived-access-token] to put here, then the function will fall back to reading the token from environment variables. (tips: You did not enable the security storage for your environment variables, so your token saved here is not that safe. You should only use it for debugging and testing purpose. You should remove and delete the long-lived access token after you finish the debugging.)
- Save your environmental variables by clicking the `Save` button.
- Next, copy the ARN displayed at the top of the page, which is the identity of this Lambda function.
  - Go back to your Alexa skill and go to the Custom->Endpoint menu option on the left.
  - Paste the ARN value in the "Default Region". Note: you will not be able to do this until you have completed the step above adding the Alexa Skills Kit trigger (done in the previous step) to the AWS Lambda Function.

### Account linking

Alexa can link your Amazon account to your Home Assistant account. Therefore Home Assistant can make sure only authenticated Alexa requests are actioned. In order to link the account, you have to make sure your Home Assistant instance can be accessed from the Internet.

- Log in to the [Amazon developer console][amazon-dev-console]
- Go to the `Alexa Skills` page.
- Find the skill you just created and click `Edit` in the `Actions` column.
- Click `ACCOUNT LINKING` in the left navigation bar of the build page
- Input all information required. Assuming your Home Assistant can be accessed by `https://[YOUR HOME ASSISTANT URL:PORT]`
  - `Authorization URI`: `https://[YOUR HOME ASSISTANT URL]/auth/authorize`
  - `Access Token URI`: `https://[YOUR HOME ASSISTANT URL]/auth/token`
    - Note: you must use a valid/trusted SSL Certificate and port 443 for account linking to work
  - `Client ID`:
    - `https://pitangui.amazon.com/` if you are in US
    - `https://layla.amazon.com/` if you are in EU
    - `https://alexa.amazon.co.jp/` if you are in JP or AU

    The trailing slash is important here.

  - `Client Secret`: input anything you like, Home Assistant does not check this field
  - `Client Authentication Scheme`: make sure you selected *Credentials in request body*. Home Assistant does not support *HTTP Basic*.
  - `Scope`: input `intent`. Home Assistant doesn't use this yet, we may use it in the future when we allow more fine-grained access control.
- You can leave `Domain List` and `Default Access Token Expiration Time` as empty.

<p class='img'>
  <img src='/images/integrations/alexa/account_linking.png' alt='Screenshot: Account Linking'>
</p>

- Click `Save` button in the top right corner.
- Next, you will use the Alexa Mobile App or [Alexa web-based app](http://alexa.amazon.com/) to link your account.
  - Open the Alexa app, navigate to `Skills` -> `Your Skills` -> `Dev Skills`
  - Click the Custom skill you just created.
  - Click `Enable`.
  - A new window will open to direct you to your Home Assistant's login screen.
  - After you successfully login, you will be redirected back to Alexa app.

### Configuring your Amazon Alexa skill

Alexa works based on intents. Each intent has a name and variable slots. For example, a `LocateIntent` with a slot that contains a `User`. Example intent schema:

```json
{
  "intents": [
    {
      "intent": "LocateIntent",
      "slots": [
      {
          "name": "User",
          "type": "AMAZON.US_FIRST_NAME"
        }]
    },
    {
      "intent": "WhereAreWeIntent",
      "slots": []
    }
  ]
}
```

To bind these intents to sentences said by users you define utterances. Example utterances can look like this:

```text
LocateIntent Where is {User}
LocateIntent Where's {User}
LocateIntent Where {User} is
LocateIntent Where did {User} go

WhereAreWeIntent where we are
```

This means that we can now ask Alexa things like:

- Alexa, ask Home Assistant where Paul is
- Alexa, ask Home Assistant where we are

## Configuring Home Assistant

When activated, the Alexa integration will have Home Assistant's native intent support handle the incoming intents. If you want to run actions based on intents, use the [`intent_script`](/integrations/intent_script) integration.

To enable Alexa, add the following entry to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
alexa:
```

### Working With Scenes

One of the most useful applications of Alexa integrations is to call scenes directly. This is easily achieved with some simple setup on the Home Assistant side and by letting Alexa know which scenes you want to run.

First, we will configure Alexa. In the Amazon Interaction module add this to the intent schema:

```json
{
  "intent": "ActivateSceneIntent",
  "slots":
  [
    {
      "name" : "Scene",
      "type" : "Scenes"
    }
  ]
}
```

Then create a custom slot type called `Scenes` listing every scene you want to control:

<p class='img'>
<img src='/images/integrations/alexa/scene_slot.png' />
Custom slot type for scene support.
</p>

The names must exactly match the scene names (minus underscores - Amazon discards them anyway and we later map them back in with the template).

In the new Alexa Skills Kit, you can also create synonyms for slot type values, which can be used in place of the base value in utterances. Synonyms will be replaced with their associated slot value in the intent request sent to the Alexa API endpoint, but only if there are not multiple synonym matches. Otherwise, the value of the synonym that was spoken will be used.

If you want to use the `Optional ID` field next to or instead of the Synonym value, you can simply append "_Id" at the end of the template variable e.g. `Scene_Id`.

<p class='img'>
<img src='/images/integrations/alexa/scene_slot_synonyms.png' />
Custom slot values with synonyms.
</p>

Add a sample utterance:

```text
ActivateSceneIntent activate {Scene}
```

Then add the intent to your `intent_script` section in your HA configuration file:

{% raw %}

```yaml
intent_script:
  ActivateSceneIntent:
    action:
      action: scene.turn_on
      target:
        entity_id: scene.{{ Scene | replace(" ", "_") }}
      data:
        id: {{ Scene_Id }}
    speech:
      type: plain
      text: OK
```

{% endraw %}

Here we are using [templates] to take the name we gave to Alexa e.g., `downstairs on` and replace the space with an underscore so it becomes `downstairs_on` as Home Assistant expects.

Now say `Alexa ask Home Assistant to activate <some scene>` and Alexa will activate that scene for you.

### Adding scripts

We can easily extend the above idea to work with scripts as well. As before, add an intent for scripts:

```json
{
  "intent": "RunScriptIntent",
  "slots":
  [
    {
      "name" : "Script",
      "type" : "Scripts"
    }
  ]
}
```

Create a custom slot type called `Scripts` listing every script you want to run:

<p class='img'>
<img src='/images/integrations/alexa/script_slot.png' />
Custom slot type for script support.
</p>

Add a sample utterance:

```text
RunScriptIntent run {Script}
```

Then add the intent to your intent_script section in your HA configuration file:

{% raw %}

```yaml
intent_script:
  RunScriptIntent:
    action:
      action: script.turn_on
      target:
        entity_id: script.{{ Script | replace(" ", "_") }}
    speech:
      type: plain
      text: OK
```

{% endraw %}

Now say `Alexa ask Home Assistant to run <some script>` and Alexa will run that script for you.

### Support for Launch Requests

There may be times when you want to respond to a launch request initiated from a command such as "Alexa, Red Alert!".

To start, you need to get the skill id:

- Log into [Amazon developer console][amazon-dev-console]
- Click the Alexa button at the top of the console
- Click the Alexa Skills Kit Get Started button
  - Locate the skill for which you would like Launch Request support
  - Click the "View Skill ID" link and copy the ID

The configuration is the same as an intent with the exception being you will use your skill ID instead of the intent name.

```yaml
intent_script:
  amzn1.ask.skill.08888888-7777-6666-5555-444444444444:
    action:
      action: script.turn_on
      target:
        entity_id: script.red_alert
    speech:
      type: plain
      text: OK
```

### Support for Session Ended Requests

There may be times when you want to act to a session ended request initiated from a lack of voice response.

To start, you need to get the skill id:

- Log into [Amazon developer console][amazon-dev-console]
- Click the Alexa button at the top of the console
- Click the Alexa Skills Kit Get Started button
  - Locate the skill for which you would like Launch Request support
  - Click the "View Skill ID" link and copy the ID

The configuration is the same as an intent with the exception being you will use your skill ID instead of the intent name.

```yaml
intent_script:
  amzn1.ask.skill.08888888-7777-6666-5555-444444444444:
    speech:
      text: It is late already. Do I turn off lights ?
    reprompt:
      text: Do I turn off lights ?
  AMAZON.YesIntent:
    speech:
      text: Done. Good night!
    action:
      action: switch.turn_off
      target:
        entity_id:
          - switch.room1
          - switch.room2
  AMAZON.NoIntent:
    speech:
      text: Alright
  amzn1.ask.skill.08888888-7777-6666-5555-444444444444.SessionEndedRequest:
    action:
      action: switch.turn_off
      target:
        entity_id:
          - switch.room1
          - switch.room2
```

## Giving Alexa Some Personality

In the examples above, we told Alexa to say `OK` when she successfully completed the task. This is effective but a little dull! We can again use [templates] to spice things up a little.

First create a file called `alexa_confirm.yaml` with something like the following in it (go on, be creative!):

{% raw %}

```text
>
  {{ [
    "OK",
    "Sure",
    "If you insist",
    "Done",
    "No worries",
    "I can do that",
    "Leave it to me",
    "Consider it done",
    "As you wish",
    "By your command",
    "Affirmative",
    "Yes oh revered one",
    "I will",
    "As you decree, so shall it be",
    "No Problem"
  ] | random }}
```

{% endraw %}

Then, wherever you would put some simple text for a response like `OK`, replace it with a reference to the file so that:

```yaml
text: OK
```

becomes:

```yaml
text: !include alexa_confirm.yaml
```

Alexa will now respond with a random phrase each time. You can use the include for as many different intents as you like so you only need to create the list once.

## Workaround for having to say the skill's name

Sometimes, you want to run script or scene intents without using the skill's name. For example, 'Alexa `<some script>`' instead of 'Alexa ask Home Assistant to run `<some script>`' because it is shorter.

You can do this by using Alexa routines. 
1. Configure a routine in the Alexa app that responds to the command you want to use:
   -  For example, 'Alexa, turn on the dryer'. 
2.  Make sure this routine includes a customized action that contains the full phrase you configured in your skill:
     - For example, 'Alexa, ask Home Assistant to run the dryer on script'.

[amazon-dev-console]: https://developer.amazon.com
[large-icon]: /images/integrations/alexa/alexa-512x512.png
[small-icon]: /images/integrations/alexa/alexa-108x108.png
[templates]: /docs/configuration/templating/
[generate-long-lived-access-token]: https://developers.home-assistant.io/docs/auth_api/#long-lived-access-token
