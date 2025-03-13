# Dobiss Home Assistant Integration

**Version:** [Latest Release](https://github.com/koen-fermax/hass-dobiss-plugin/releases)  
**Activity:** [Commit History](https://github.com/koen-fermax/hass-dobiss-plugin/commits/main)  
**License:** [MIT License](https://github.com/koen-fermax/hass-dobiss-plugin/blob/main/LICENSE)  

**Original Author:** [kesteraernoudt](https://github.com/kesteraernoudt)  
**Maintainer:** [kobedemetser](https://github.com/kobedemetser)

**Community & Support:**  
- [Discord](https://discord.gg/Qa5fW2R)  
- [Home Assistant Forum](https://community.home-assistant.io/)  

## About

**This component will set up the following platforms coming from a [Dobiss](https://www.dobiss.com/en) NXT server.**

| Platform        | Description                                                      |
| --------------- | ---------------------------------------------------------------- |
| `binary_sensor` | Dobiss contacts - can be open or closed.                         |
| `sensor`        | Dobiss sensors: temperature and light sensors.                   |
| `switch`        | Dobiss switches - can be relais outputs, flags, scenario's, etc. |
| `light`         | Dobiss lights - dimmable or not.                                 |
| `climate`       | Dobiss climate control - if you have temperature zones.         |
| `cover`         | Dobiss covers - screens etc.                                     |


## Installation

1. In the HA UI go to "Configuration" -> "Integrations" click "+" and search for "Dobiss".


## Configuration is done in the UI

## Dependencies

This integration will use the [pydobiss](https://pypi.org/project/pydobiss/) Python library, which uses the native [Dobiss NXT API](http://support.dobiss.com/books/nl-dobiss-nxt/page/developer-api).

## Credits

This project was generated from [@oncleben31](https://github.com/oncleben31)'s [Home Assistant Custom Component Cookiecutter](https://github.com/oncleben31/cookiecutter-homeassistant-custom-component) template.

Code template was mainly taken from [@Ludeeus](https://github.com/ludeeus)'s [integration_blueprint](https://github.com/custom-components/integration_blueprint) template.