
3. Connect the device to your computer.
     * In the popup window, view the available ports.
     * Plug the USB cable into the device and connect it to your computer.
     * In the pop-up window, there should now appear a new entry. Select this USB serial port and select **Connect**.
         * Depending on your computer, the entry might look different.
     ![Select USB port](/images/assist/esp32-atom-flash-select-port.png)
     * If no new port shows, your system may be missing a driver. Close the pop-up window.
         * In the dialog, select the CH342 driver, install it, then **Try again**.
     ![Open My link](/images/assist/esp32-atom-flash-no-port.png)
1. Select your device, then **Install**.
     * Follow the instructions provided by the installation wizard.
     * Add the device to your Wi-Fi:
     * When prompted, select your network from the list and enter the credentials to your 2.4&nbsp;GHz Wi-Fi network.
     * Select **Connect**.
     * The device now joined your network. Select **Add to Home Assistant**.
1. This opens the **My** link to Home Assistant. 
   * If you have not used My Home Assistant before, you will need to configure it. If your Home Assistant URL is not accessible on `http://homeassistant.local:8123`, replace it with the URL to your Home Assistant instance.
   * Open the link.
   ![Open My link](/images/assist/esp32-atom-flash-06.png)
1. Select **OK**. 
   
   ![Set up ESPHome](/images/assist/esp32-atom-flash-07.png)
1. To add the newly discovered device, select the device from the list.
   * Add your device to a room and select **Finish**. 
1. You should now see a new integration.

   ![Device discovered](/images/assist/m5stack-atom-echo-discovered-03.png)
   * Your device is connected to Home Assistant over Wi-Fi. You can now move it to any place in your home with a USB power supply. 