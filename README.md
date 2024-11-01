# Ecomate 🌿

A handheld, Arduino-based IoT vehicle emission tester. It monitors CO and HC levels. Data is processed and transmitted to a mobile app built with Expo for real-time tracking using an ESP32 Wi-Fi module. Ecomate provides a portable solution for emission testing, promoting cleaner and safer environments and vehicle health.

![EcoMate Overview](read-me-images/1.png)

## Features

- **Real-Time Monitoring**: Measures CO and HC levels using MQ7 and MQ2 sensors.
- **Temperature Tracking**: Uses the LM35 sensor to monitor temperature changes.
- **Wireless Communication**: Uses an ESP32 Wi-Fi module to transmit data to the mobile app.
- **Mobile App Integration**: Data is displayed in an Expo-based mobile app for real-time monitoring.
- **Portable Design**: Compact and easy-to-use device, ideal for on-the-go emission testing.

## How to Use

- **Connect**: Attach the device to the vehicle's exhaust pipe and power it through the car's lighter socket.
- **Login & Scan**: Open the EcoMate mobile app, log in to your account, and press the scan button.
- **Receive Report**: Get a detailed report on your vehicle’s emission status directly on your mobile app.

## Potential Uses

- **Household Device**: Monitor and measure vehicle emissions at home, ensuring a healthier environment and prolonging vehicle lifespan.
- **Law Enforcement**: A tool for officers to monitor vehicle emissions in real-time.

![Potential Uses](read-me-images/2.png)

## Hardware Components

- Arduino Board (e.g., Arduino Uno)
- ESP32 Wi-Fi Module
- MQ7 Sensor (CO detection)
- MQ2 Sensor (HC detection)
- LM35 Sensor (Temperature measurement)
- Breadboard, Wires, and Resistors

## Design and Development

![Design and Development](read-me-images/3.png)

- **Power Consumption**: 5V
- **Test Duration**: 30 seconds per test
- **Cost**: Approximately LKR 4000
- **Increasing Accuracy**: Using two gas sensors with high sensitivity, extended sampling time for better average readings, and calibration in known gas concentrations.

## App Interface

<table>
  <tr>
    <th>Login Page</th>
    <th>Test Page</th>
    <th>Testing Page</th>
  </tr>
  <tr>
    <td><img src="read-me-images/app-interface/login.PNG" alt="Login" width="200"></td>
    <td><img src="read-me-images/app-interface/test.PNG" alt="Test" width="200"></td>
    <td><img src="read-me-images/app-interface/testing.PNG" alt="Testing" width="200"></td>
  </tr>
  <tr>
    <th>Detailed from History</th>
    <th>Test History</th>
    <th>Report Page</th>
  </tr>
  <tr>
    <td><img src="read-me-images/app-interface/report.PNG" alt="Report" width="200"></td>
    <td><img src="read-me-images/app-interface/detailed-from-history.PNG" alt="Detailed from History" width="200"></td>
    <td><img src="read-me-images/app-interface/test-history.PNG" alt="Test History" width="200"></td>
  </tr>
</table>

## Software Requirements

- Arduino IDE
- Expo CLI (for mobile app development)
- Node.js (for Expo setup)
- Expo Go (for testing the mobile app)
- Mobile device (for Expo app testing)

## Installation

### Arduino Setup

1. **Connect the Sensors**: Follow the wiring diagram to connect MQ7, MQ2, LM35 sensors, and ESP32 module to the Arduino board.
2. **Upload Code**: Use the Arduino IDE to upload the `ecomate.ino` file to the Arduino board.
3. **Verify Connections**: Ensure all sensors and the ESP32 module are properly connected and the Arduino board is powered on.

### Mobile App Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/anukah/ecomate-v1.0.git
   cd ecomate/mobile-app
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Run the Expo App**
   ```bash
   npx expo start
   ```
4. **Test on Mobile**
   Use the Expo Go app on your mobile device to scan the QR code and view real-time data.

### Usage

1. Power on the Arduino device to start monitoring.
2. The ESP32 module sends data to the mobile app wirelessly.
3. Open the mobile app using Expo Go to view CO and HC levels, as well as temperature data.
4. The app provides a real-time view of emissions, helping ensure vehicle compliance with emission standards.
  
