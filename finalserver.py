from flask import *
from iRobotYHacks import Robot
import time
import json

app = Flask(__name__, static_url_path='')
app.TEMPLATES_AUTO_RELOAD = True

#init robot

bot = Robot()
bot.playNote('A4', 100)

@app.route ('/')
def root():
	print "got here"
 	return send_file('html.html')

@app.route('/forward/<vel>')
def forward(vel):
	bot.setForwardSpeed(int(vel))
	print "got to forward"
	return 'Forward, vel= ' + str(vel)

@app.route('/spin/<speed>')
def spin(speed):
	bot.setTurnSpeed(int(speed))
	return 'Spin, vel= ' + str(speed)

@app.route('/stop')
def stop():
	bot.setForwardSpeed(0)
	bot.setTurnSpeed (0)
	bot.setTurn (0,0)
	print "got to stop"
	return 'Stop'

@app.route('/turn/<vel>/<rad>')
def turn(vel, rad):
	bot.setTurn(int(vel),int(rad))
	print "got to turn"
	return 'turn, vel='+str(vel)+' rad='+str(rad)

@app.route('/getSensorData')
def getSensorData():
	data = bot.getSelectedSensorData()

	return json.dumps({'distance': data[0], 
						'angle': data[1] ,
						'cliffSensorLeft' : data[2], 
						'cliffSensorFrontLeft' : data[3],
						'cliffSensorFrontRight': data[4],
						'cliffSensorRight':data[5],
						'wallSensor':data[6],
						'leftWheelVelocity': data[7],
						'rightWheelVelocity': data[8],
						'leftEncoderCount':data[9],
						'rightEncoderCount': data[10],
						'lightBumpRight': data[11],
						'lightBumpFrontRight': data[12],
						'lightBumpCenterRight': data[13],
						'lightBumpCenterLeft':data[14],
						'lightFrontLeft': data[15],
						'lightBumpLeft':data[16],
						'lightBumper':data[17]})



if (__name__) == '__main__':
	app.run(debug=True)
