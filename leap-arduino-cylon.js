/*
  This script allows for simultaneous movement of two servos under no load.
  With a series of really rapid hand movements, the servos occasionally stall and the program quits.
  Running a separate, appropriate power supply for the servos instead of relying on Arduino power should help.
  I wired a separate 5v, 2a power supply to my breadboard for the two servos and it works fine. (Again, the
  servos are under no load.)
*/

// TO DO
/*
 - check if frame.hands.length > 1
 - hand_left = frame.hands().leftmost()
 - hand_right = frame.hands().rightmost()

 - else if frame.hands.length === 1
 - hand_right = frame.hands[0];

 - else: angles set to 90
*/

var Cylon = require('cylon');
 
var hand;
var yaw = 0;        // hand rotating left/right rotates servo1 and servo3 back and forth
var pitch = 0;      // hand rotating forwards (downward) and backwards (upward) rotates servo2 and servo4 back and forth
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
          if (frame.hands.length > 0) {
          hand = frame.hands[0];
          yaw = hand.yaw() * (180/Math.PI);
          yaw = Math.floor(yaw + 90);
          pitch = hand.pitch() * (180/Math.PI);
          pitch = Math.floor(pitch + 90);
   
          if (yaw > -1 && yaw < 181) { my.servo1.angle(yaw); my.servo3.angle(yaw); }
          //if (pitch > -1 && pitch < 181) { my.servo2.angle(180 - pitch); my.servo4.angle(pitch); }
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