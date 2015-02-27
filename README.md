# leap-arduino-cylon
Using Leap Motion to rotate servos on Arduino via CylonJS


A script I've been working on to rotate servos on an Arduino with Leap Motion hand movement, wired up through CylonJS.

This script allows for simultaneous movement of two servos under no load. With a series of really rapid hand movements, the servos occasionally stall and the program quits. In the circuit I was using, I was relying on the Arduino's power supply. I believe a separate, appropriate power supply (5v/2a ?) for the servos instead of relying on the Arduino power should help.
