#define RELAY_PIN 7
void setup() {
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW); // Start OFF
  Serial.begin(9600);
}
void loop() {
  if (Serial.available()) {
    String command = Serial.readStringUntil('\n');
    command.trim();

    if (command == "OFF") {
      digitalWrite(RELAY_PIN, HIGH);
    } else if (command == "ON") {
      digitalWrite(RELAY_PIN, LOW);
    }
  }
}