import time
import json
import random
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

# TODO: Replace with your service account key file path
cred_path = "serviceAccountKey.json"
try:
    cred = credentials.Certificate(cred_path)
    # Note: databaseURL is required for Realtime Database
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://gps-tracking-app-default-rtdb.firebaseio.com/' # Replace with user's DB URL
    })
    print("Firebase Admin SDK initialized successfully.")
except Exception as e:
    print(f"Error initializing Firebase: {e}")
    print("Please ensure serviceAccountKey.json is present and valid.")
    # We will simulate valid execution for testing purposes if init fails
    # return

def generate_location(lat, lon):
    # Simulate small movement
    lat += random.uniform(-0.0001, 0.0001)
    lon += random.uniform(-0.0001, 0.0001)
    return lat, lon

def main():
    print("Starting Location Producer...")
    
    # Starting coordinates (e.g., San Francisco)
    lat = 37.7749
    lon = -122.4194

    ref = None
    try:
        ref = db.reference('locations')
    except:
        pass

    while True:
        lat, lon = generate_location(lat, lon)
        
        data = {
            'latitude': lat,
            'longitude': lon,
            'timestamp': time.time()
        }
        
        print(f"Updating location: {data}")
        
        if ref:
            try:
                # We use set to update the latest location, or push to keep history.
                # For real-time tracking of "current" location, set() on a specific ID is better, 
                # or set() on a specific keys.
                # Let's say we track one device "device_1"
                ref.child('device_1').set(data)
            except Exception as e:
                print(f"Failed to push to Firebase: {e}")
        
        time.sleep(2)

if __name__ == "__main__":
    main()
