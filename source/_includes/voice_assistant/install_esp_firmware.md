{% capture product_name %}{{ include.name | default: page.product_name }}{% endcapture %}

2. Connect the {{ product_name }} to your computer.
   - In the pop-up window, view the available ports.
   - Plug the USB-C cable into the {{ product_name }} and connect it to your computer.
   - In the pop-up window, there should now appear a new entry. Select this USB serial port and select **Connect**.
     - Depending on your computer, the entry might look different.
   ![Select USB port](/images/assist/esp32-atom-flash-select-port.png)
   - If no new port shows, your system may be missing a driver. Close the pop-up window.
     - In the dialog, select the CH342 driver, install it, then **Try again**.
   ![Open My link](/images/assist/esp32-atom-flash-no-port.png)
3. Select **Install Voice Assistant**, then **Install**.
     - Follow the instructions provided by the installation wizard.
     - Add the {{ product_name }} to your Wi-Fi:
       - When prompted, select your network from the list and enter the credentials to your 2.4&nbsp;GHz Wi-Fi network.
       - Select **Connect**.
       - The {{ product_name }} now joined your network. Select **Add to Home Assistant**.
4. This opens the **My** link to Home Assistant.
   - If you have not used My Home Assistant before, you will need to configure it. If your Home Assistant URL is not accessible on `http://homeassistant.local:8123`, replace it with the URL to your Home Assistant instance.
   - Open the link.
   ![Open My link](/images/assist/esp32-atom-flash-06.png)
5. Select **OK**. 
   
   ![Set up ESPHome](/images/assist/esp32-atom-flash-07.png)
6. If, at this stage, a dialog opens, prompting you to enter the connection settings of your ESPHome node, it means there is already a configuration set up for that ESPHome device.
   - Close the dialog and perform the procedure on [deleting the {{ product_name }} configuration from ESPHome]({{ config_link }}).
   - Restart Home Assistant.
   - Then, under {% my integrations title="**Settings** > **Devices & Services**" %}, your {{ product_name }} should be discovered.
7. To add the newly discovered device, select the {{ product_name }} from the list.
   - Add your {{ product_name }} to a room and select **Finish**.
8. You should now see the **ESPHome** integration.
   ![New ESPHome device discovered](/images/assist/m5stack-atom-echo-discovered-33.png)

