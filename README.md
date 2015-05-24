# leap-arduino-cylon
This script allows for controlling four servos, one pair for each hand, using the Leap Motion controller via CylonJs. Enter the right hand into the LeapMotion field first, then the left hand, to consistently map right hand to the right_hand variable and the left hand to the left_hand variable.

Run a separate, appropriate power supply for the servos instead of relying on Arduino power. I wired a separate 5v, 2a power supply to my breadboard for four micros servos under no load and it works consistently with consistent, rapid hand movement & no stalls.
