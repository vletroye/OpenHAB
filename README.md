# About this repository
This repository contain developments done around the [OpenHab](https://www.openhab.org) initially installed on my Synology as explained [here](https://www.beatificabytes.be/install-openhab-2-on-synology) and running now on a RPI 4 as explained [here](https://www.beatificabytes.be/install-java-8-sdk-and-openhab-2-on-raspberry-pi-desktop-for-rpi-4)

## "Widgets"
It contains json files exported from HABPanel with the Custom Widgets I have created for my own purpose.
Documentation about those Custom Widgets will be made available in the Wiki.

Those json files can be imported in your own openHAB's HABPanel.

## "Html"
It contains a folder "vletroye" with all the artefacts I need to customize my openHab, such as images and controllers.

The folder "vletroye" is intended to be copied in openHab's folder /conf/html. Ex.:
* if openHab was installed on a Synology: under \\<YourNas>\\SmartHome\openHAB\conf\html\vletroye\...
* if openHab was installed on a RPI: under /etc/openhab2/html/vletroye/... or \\<YourNas>\\openHAB2-conf\conf\html\vletroye\...
