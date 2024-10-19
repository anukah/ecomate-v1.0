# Ecomate 🌿

![EcoMate Overview](read-me-images/1.png)
![How to Use](read-me-images/2.png)
![Design and Development](read-me-images/3.png)

A handheld, Arduino-based IoT vehicle emission tester. It monitors CO and HC levels. Data is processed and transmitted to a mobile app built with Expo for real-time tracking. Ecomate provides a portable solution for emission testing, promoting cleaner and safer environments and vehicle health.

## Features

- **Real-Time Monitoring**: Measures CO and HC levels using MQ9 and MQ2 sensors.
- **Temperature Tracking**: Uses the LM35 sensor to monitor temperature changes.
- **Mobile App Integration**: Data is transmitted to an Expo-based mobile app for real-time monitoring.
- **Portable Design**: Compact and easy-to-use device, ideal for on-the-go emission testing.

## Hardware Components

- Arduino Board (e.g., Arduino Uno)
- ESP32 Wi-Fi Module
- MQ9 Sensor (CO detection)
- MQ2 Sensor (HC detection)
- LM35 Sensor (Temperature measurement)
- Breadboard, Wires, and Resistors

## Software Requirements

- Arduino IDE
- Expo CLI (for mobile app development)
- Node.js (for Expo setup)
- Mobile device (for Expo app testing using ExpoGo)

## Installation

### Arduino Setup

1. **Connect the Sensors**: Follow the wiring diagram to connect MQ9, MQ2, and LM35 sensors to the Arduino board.
2. **Upload Code**: Use the Arduino IDE to upload the `ecomate.ino` file to the Arduino board.
3. **Verify Connections**: Ensure all sensors are properly connected and the Arduino board is powered on.

### Mobile App Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/anukah/ecomate.git
   cd ecomate/mobile-app
   ```
2. **Install Dependencies**
    ```bash
   npm install
   ```
3. **Run the Expo App**
    ```bash
   npm install
   ```
4. **Test on Mobile:** 
    Use the Expo Go app on your mobile device to scan the QR code and view real-time data.

### Usage

