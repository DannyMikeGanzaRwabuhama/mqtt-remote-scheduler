import paho.mqtt.client as mqtt
import serial

# Set your serial port and baud rate
ser = serial.Serial('/dev/ttyACM0', 9600)  # Change 'COM4' to your Arduino's port

# Called when a message is received
def on_message(client, userdata, msg):
    command = msg.payload.decode().strip()
    print(f"Received MQTT: {command}")
    if command in ["ON", "OFF"]:
        ser.write((command + '\n').encode())  # Send to Arduino

# MQTT setup
client = mqtt.Client()
client.on_message = on_message
client.connect("157.173.101.159", 1883, 60)  # Replace with your broker IP if needed

client.subscribe("relay/controll")
client.loop_forever()
