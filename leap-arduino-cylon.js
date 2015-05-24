/*
  This script allows for controlling four servos, one pair for each hand, using the Leap Motion controller
  via CylonJs. Enter the right hand into the LeapMotion field first, then the left hand, to consistently
  map right hand to the right_hand variable and the left hand to the left_hand variable.

  Run a separate, appropriate power supply for the servos instead of relying on Arduino power.
  I wired a separate 5v, 2a power supply to my breadboard for four micros servos under no load and 
  it works reliably with constant, rapid hand movement & no stalls.
*/

var Cylon = require('cylon');
 
var right_hand, left_hand;
var right_yaw = 0, left_yaw = 0;        // hand rotating left/right rotates servo1 and servo3 back and forth
var right_pitch = 0, left_pitch = 0;    // hand rotating forwards (downward) and backwards (upward) rotates servo2 and servo4 back and forth
var now;
 
Cylon.robot({
  connections: [{ name: 'leapmotion', adaptor: 'leapmotion', port: '127.0.0.1:6437'},
    {name: 'arduino', adaptor: 'firmata', port: '/dev/tty.usbmodemfa141'}],
  devices: [{ name: 'leapmotion', driver: 'leapmotion', connection: 'leapmotion'},
    {name: 'servo1', driver: 'servo', pin: 5, connection: 'arduino'},
    {name: 'servo2', driver: 'servo', pin: 6, connection: 'arduino'},
    {name: 'servo3', driver: 'servo', pin: 9, connection: 'arduino'},
    {name: 'servo4', driver: 'servo', pin: 10, connection: 'arduino'}],
  work: function(my) {
    var time = Date.now();
 
    my.leapmotion.on('frame', function(frame) {
      // Limit to 100hz to help prevent servo stall
      now = Date.now();
      if (now >= time + 10) {
        time = now;
        if (frame.hands.length === 2) {
          right_hand = frame.hands[0];
          left_hand = frame.hands[1];

          right_yaw = radiansToAdjustedDegrees(right_hand.yaw());
          right_pitch = radiansToAdjustedDegrees(right_hand.pitch());
          left_yaw = radiansToAdjustedDegrees(left_hand.yaw());
          left_pitch = radiansToAdjustedDegrees(left_hand.pitch());

          if (right_yaw > -1 && right_yaw < 181) { my.servo1.angle(right_yaw); }
          if (right_pitch > -1 && right_pitch < 181) { my.servo2.angle(right_pitch); }
          if (left_yaw > -1 && left_yaw < 181) { my.servo3.angle(left_yaw); }
          // angle is reversed on my fourth servo for some reason
          if (left_pitch > -1 && left_pitch < 181) { my.servo4.angle(180 - left_pitch); }
        } else {
          my.servo1.angle(90);
          my.servo2.angle(90);
          my.servo3.angle(90);
          my.servo4.angle(90);
        } 
      }
    });
  }
}).start();

function radiansToAdjustedDegrees(radians) {
  // take radian reading and return degree value adjusted for our desired range/midpoint of servo range
  degrees = radians * (180/Math.PI);
  degrees = Math.floor(degrees + 90);
  return degrees;
}