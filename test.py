from iRobotCreate2 import Robot
import time

bot = Robot()

bot.playNote ('A4', 100)

bot.setTurnSpeed(-50)

time.sleep(1)

bot.setTurnSpeed(0)

start_time = time.time()

while (time.time() - start_time) < 30:
  print ('Bumpers: ' + str(bot.getBumpers()) + 'Wall: ' + str(bot.getWallSensor()))
  
bot.close()
