// Use Your Wi-Fi Credentials and Properly connect the Pins
#include <WiFi.h>
#include <math.h>

// Define sensor pins
const int mq2Pin = A0;  // MQ-2 sensor pin
const int mq9Pin = A1;  // MQ-9 sensor pin
const int lm35Pin = A2; // LM35 sensor pin

// Constants
const float Vcc = 5.0;   // Supply voltage
const float RL = 10.0;   // Load resistance in kΩ

// Calibration values for clean air, not properly calibrated
const float R0_MQ2 = 10.0;  // MQ-2 sensor resistance in clean air
const float R0_MQ9 = 10.0;  // MQ-9 sensor resistance in clean air

// Wi-Fi credentials
const char* ssid = "your_SSID";
const char* password = "your_PASSWORD";
const char* server = "http://yourserver.com/endpoint";

// Number of readings
const int numReadings = 100;

// Function to calculate the sensor resistance (RS)
float calculateRS(int analogPin) {
    int analogValue = analogRead(analogPin);
    float Vout = (analogValue / 1024.0) * Vcc;
    float RS = (Vcc * RL / Vout) - RL;
    return RS;
}

// Function to calculate ppm for MQ-2
float calculatePPM_MQ2(float RS_R0) {
    // Use the characteristic curve formula for MQ-2
    float ppm = pow(10, ((log10(RS_R0) - 0.602) / -0.27)); // Example equation
    return ppm;
}

// Function to calculate ppm for MQ-9
float calculatePPM_MQ9(float RS_R0) {
    // Use the characteristic curve formula for MQ-9
    float ppm = pow(10, ((log10(RS_R0) - 0.672) / -0.34)); // Example equation
    return ppm;
}

void setup() {
    Serial.begin(9600);    // Start serial communication with Serial monitor

    // Connect to Wi-Fi
    WiFi.begin(ssid, password);
    Serial.print("Connecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("\nConnected to Wi-Fi");
}

void loop() {
    // Variables to store sensor readings
    long mq2Total = 0;
    long mq9Total = 0;
    long lm35Total = 0;

    // Collect 100 readings from each sensor
    for (int i = 0; i < numReadings; i++) {
        mq2Total += analogRead(mq2Pin);
        mq9Total += analogRead(mq9Pin);
        lm35Total += analogRead(lm35Pin);
        delay(10);  // Small delay between readings
    }

    // Calculate the average values
    float mq2Average = mq2Total / numReadings;
    float mq9Average = mq9Total / numReadings;
    float lm35Average = lm35Total / numReadings;

    // Calculate sensor resistance (RS) values
    float RS_MQ2 = calculateRS(mq2Pin);
    float RS_MQ9 = calculateRS(mq9Pin);

    // Calculate RS/R0
    float RS_R0_MQ2 = RS_MQ2 / R0_MQ2;
    float RS_R0_MQ9 = RS_MQ9 / R0_MQ9;

    // Calculate ppm values
    float coPpm = calculatePPM_MQ9(RS_R0_MQ9);  // CO from MQ-9
    float hcPpm = calculatePPM_MQ2(RS_R0_MQ2);  // HC from MQ-2

    // Convert LM35 reading to temperature in Celsius
    float tempC = (lm35Average * 5.0 * 100.0) / 1024.0;

    // Create the data string
    String dataString = "co_ppm=" + String(coPpm) + "&hc_ppm=" + String(hcPpm) + "&temperature=" + String(tempC);

    // Send the data to the server
    if (WiFi.status() == WL_CONNECTED) {
        WiFiClient client;
        if (client.connect(server, 80)) {
            client.println("POST /endpoint HTTP/1.1");
            client.println("Host: yourserver.com");
            client.println("Content-Type: application/x-www-form-urlencoded");
            client.print("Content-Length: ");
            client.println(dataString.length());
            client.println();
            client.print(dataString);
            client.stop();
            Serial.println("Data sent to server: " + dataString);
        } else {
            Serial.println("Connection to server failed.");
        }
    } else {
        Serial.println("Wi-Fi not connected.");
    }

    // Wait before the next measurement
    delay(1000);
}
