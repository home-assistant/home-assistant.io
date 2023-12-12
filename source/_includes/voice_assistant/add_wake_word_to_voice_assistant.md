## Adding a Wake Word to your Voice Assistant

1. Install the openWakeWord add-on:
   - Follow steps 1-3 of the procedure on [enabling a wake word](/voice_control/install_wake_word_add_on). 
2. Go to {% my voice_assistants title="**Settings** > **Voice assistants**" %} and select **Add assistant**.
3. Give your assistant a name, for example the wake word you are going to use.
4. Select the language you are going to use to speak to Home Assistant.
   - If the **Text-to-speech** and **Speech-to-text** sections do not provide language selectors, this means you do not have an Assist pipeline set up.
   - Set up [Home Assistant Cloud](https://www.nabucasa.com) or a manually configured [Assist pipeline](/voice_control/voice_remote_local_assistant).
5. Under **Text-to-speech**, select the language and voice you want Home Assistant to use when speaking to you.
6. To define the wake word engine, under **Wake word**, select **openWakeWord**.
   - Then, select **ok nabu**.
   - If you created a new assistant, select **Create**.
   - If you edited an existing assistant, select **Update**.
   - **Result**: You now have a voice assistant that listens to a wake word.
7. For the first run, it is recommended to use **ok nabu**, just to test the setup.
   - Once you have it all set up, you can [create your own wake words](/voice_control/create_wake_word/).
