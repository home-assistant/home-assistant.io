
The `gocr` image processing platform allows you to have a sensor with the text value from a source image. [`gocr`](http://jocr.sourceforge.net/) is used to extract the text which is observed by a [camera](/components/camera/).

`gocr` needs to be available on your system. Check the installation instruction below:

```bash
$ sudo dnf -y install gocr # Fedora
$ sudo apt install gocr # Ubuntu
$ brew install gocr # macOS
```
For a docker managed version of Homeassistant, here is how to get a homeassistant Docker image that has gocr installed:

First, create the following Dockerfile:

```
FROM homeassistant/home-assistant

RUN wget http://www-e.uni-magdeburg.de/jschulen/ocr/gocr-0.52.tar.gz -O gocr.tar.gz
RUN tar -zxvf gocr.tar.gz

RUN bash gocr-0.52/configure
RUN make -C gocr-0.52 install
RUN rm -R gocr*
```

Once you have the Dockerfile, run the following command to create the Docker image (this can take some time):

`docker build . -t homeassistant.`

You can than run this image with the following command:

`docker run -d --name="home-assistant-cluster" --restart unless-stopped -v /srv/homeautomation/hass-config:/config -v /etc/localtime:/etc/localtime:ro --net=host homeassistantimage`

You now have a Docker managed homeassistant with GOCR compiled. You can use this component with it.


To enable the OCR of any text in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
image_processing:
  - platform: gocr
    source:
      - entity_id: camera.text_on_a_picture
```

{% configuration %}
gocr_bin:
  description: The path to the command line tool `gocr`. Set it if you use a different name for the executable or if it is not in the `$PATH` variable.
  required: false
  default: gocr
  type: string
x_position:
  description: X coordinate of the upper left corner of the area to crop.
  required: false
  default: 0
  type: integer
y_position:
  description: Y coordinate of the upper left corner of the area to crop.
  required: false
  default: 0
  type: integer
height:
  description: Height of the area to crop.
  required: false
  default: 0
  type: integer
width:
  description: Width of the area to crop.
  required: false
  default: 0
  type: integer
rotate:
  description: Rotation of the image.
  required: false
  default: 0
  type: integer
threshold:
  description: Threshold for the difference between the digits and the background.
  required: false
  default: 0
  type: integer
chars:
  description: String containing all accepted characters to output as result of the recognition.
  required: false
  default: ''
  type: string
negate:
  description: "`True` if you want the image to be inverted before recognition. The process works better if the text is black on white."
  required: false
  default: false
  type: boolean
unrecognized:
  description: String to output for any unrecognized characters.
  required: false
  default: "'_'"
  type: string
extra_arguments:
  description: "Other arguments to use. Like `-m 2`, `-p database`, etc. See [`manpage`](https://linux.die.net/man/1/gocr)."
  required: false
  type: string
source:
  description: List of image sources.
  required: true
  type: list
  keys:
    entity_id:
      description: A camera entity id to get picture from.
      required: true
      type: string
    name:
      description: This parameter allows you to override the name of your `image_processing` entity.
      required: false
      type: string
{% endconfiguration %}
### {% linkable_title Setup process %}
It's suggested that the first attempt to determine the needed parameters is using `gocr` directly. You may use imagemagik to crop the file.
This may require a couple of iterations to get the result
```bash
$ convert /tmp/snap.jpg -crop 96x32+1+6 /tmp/sample.jpg && gocr /tmp/sample.jpg -m 2 -p /etc/homeassistant/gocr/db/ -m 256 | tr '_' '.' | sed 's/ *//g'
```
This would lead to the following entry for the `configuration.yaml` file:
```yaml
camera:
  - platform: local_file
    file_path: /tmp/snap.jpg
    name: livingroom
image_processing:
  - platform: gocr
    name: livingroom_temperature_ocr
    source:
      - entity_id: camera.livingroom
    x_position: 1
    y_position: 6
    width: 96
    height: 32
    unrecognized: .
    extra_arguments: "-m 2 -p /etc/homeassistant/gocr/db/ -m 256"
```
With the help of a [template sensor](/components/sensor.template/), the value can be shown as badge.
{% raw %}
```yaml
sensor :
  - platform: template
    sensors:
      livingroom_temperature_ocr:
        device_class: temperature
        unit_of_measurement: "°C"
        value_template: "{{ states('image_processing.livingroom_temperature_ocr') | float }}"
```
{% endraw %}
