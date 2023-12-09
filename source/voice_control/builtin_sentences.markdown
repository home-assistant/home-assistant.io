---
title: "Assist - default sentences"
---

Home Assistant comes with [built-in sentences](https://github.com/home-assistant/intents/tree/main/sentences) contributed by the community for [dozens of languages](https://developers.home-assistant.io/docs/voice/intent-recognition/supported-languages).

These sentences allow you, for example, to:

- **Turn entities on and off**
    - *"turn on the living room light"*
    - *"turn off ceiling fan"*
    - *"turn on the TV"*
    - *"lock all the doors"*
    - *"open the main door"*
- **Open and close covers**
    - *"Close the garage door"*
    - *"Open kitchen window"*
- **Set the brightness and color of lights**
    - *"Change kitchen lights brightness to 50%"*
    - *"Set bed light to green"*
- **Ask about the weather**
    - *"What is the weather"*
    - Struggling with this one? Check the [troubleshooting section](/voice_control/troubleshooting/).
- **Add items to a list**
    - *"Add bread to my shopping list"*
    - *"Add decorating christmas tree to my december chores list"*
- **Get information about a state**
  - *"What is the amount of energy from solar production?"*
  - *"what is the heat pump co2 sensor's co2 level?"*
  - *"what is the battery level of my phone?"*
- **Run a script**
    - *"Run stealth mode script"*
- **Activate a scene**
    - *"Activate dinner scence"*
    - *"Turn kitchen dinner scene on"*
- **Inquire about people (that have device tracking activated in Home Assistant)**
    - *"How many people are in the kitchen"*
    - *"Who is in the garage"*
    - *"Where is Anne"*
- **Abort wake word**
    - *"Nevermind"*: If you triggered the wake word by mistake and want to stop Home Assistant from listening

The sentences only work, if the {% term entities %} are available and are named exactly the way you call them. Check the [troubleshooting section](/voice_control/troubleshooting/) to see common errors when asking for the weather forecast.

In addition to individual {% term entities %}, commands can target **areas**:

- *"turn on all lights in the living room"*
- *"open windows in the kitchen"*
- *"change office brightness to 50%"*
- *"set bedroom lights to green"*

Entity [aliases](/voice_control/aliases) are also matched so that multiple names can be used, even in different languages.

You can extend the [built-in sentences](https://github.com/home-assistant/intents/tree/main/sentences) or [add your own](/voice_control/custom_sentences) to trigger any action in Home Assistant.

## View existing sentences

The list of supported sentences is constantly being updated for each language. There are so many possible sentences that they cannot be all listed here. To find out what works in your language, follow these steps.

**Note**: If the voice assistant doesn't understand you, you may need to rephrase your sentence a bit. Or check if the {% term entity %} or {% term area %} name is correct for your environment.

1. Take a look at the test sentences:
    - On GitHub, in the [tests](https://github.com/home-assistant/intents/tree/main/sentences) folder, open the subfolder for your language.
    - Look through the test files to see the example sentences that have been tested.
    - The second part of the file name shows the {% term intent %}, the first part shows the {% term domain %}. For some {% term domains %}, such as covers, fans, and light, there are specific sentences.
        The other {% term domains %} are covered by the generic *homeassistant_*.

        ![Example of a folder of assistant sentence test files](/images/assist/intents-test-files.png)
        
    - The screenshot below shows sentences used to test the command to turn on the lights. Note that *Living room* here is just a place holder.
        It could be any {% term area %} that you have in your home.

        ![Example of a set of test sentences](/images/assist/assist-test-file-light-turn-on.png)

2. View the sentence definition for the tests:
    - On GitHub, in the [tests](https://github.com/home-assistant/intents/tree/main/tests) folder, open the subfolder for your language.
    - Open the file of interest.

        ![Sentences definition for turning on the light](/images/assist/assist-sentence-definition-01.png)

        - () mean alternative elements.
        - [] mean optional elements.
        - <> mean an expansion rule. The view these rules, search for `expansion_rules` in the [_common.yaml](https://github.com/home-assistant/intents/blob/main/sentences/en/_common.yaml) file.
        - The syntax is explained in detail in the [template sentence syntax documentation](https://developers.home-assistant.io/docs/voice/intent-recognition/template-sentence-syntax/).
3. View the [sentence definition](https://github.com/home-assistant/intents/tree/main/sentences) for your language.
4. View the [response definition](https://github.com/home-assistant/intents/tree/main/responses)

## Related topics

- [Create aliases](/voice_control/aliases/)
- [Create your own sentences](/voice_control/custom_sentences/)
- [Built-in sentence definitions](https://github.com/home-assistant/intents/tree/main/sentences)
- [Built-in response definitions](https://github.com/home-assistant/intents/tree/main/responses)
- [Template sentence syntax documentation](https://developers.home-assistant.io/docs/voice/intent-recognition/template-sentence-syntax/)
- [Sentence test cases](https://github.com/home-assistant/intents/tree/main/sentences)
- [Sentence troubleshooting](/voice_control/troubleshooting/)
