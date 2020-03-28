import React, {useState, useEffect} from 'react';
import {
        Accuracy, 
        requestPermissionsAsync, 
        watchPositionAsync 
} from 'expo-location';

export default (shouldTrack, callback) => {
    const [error, setError] = useState(null);
     
    useEffect(() => {
          let suscriber;
          const starWatching = async () => {
        try {       
            await requestPermissionsAsync();
            suscriber = await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10
            },
                callback
            ); 
        } catch (error) {
            setError(error);
        }
     };

        if(shouldTrack) {
            starWatching();
        } else {
            if (suscriber) {
                suscriber.remove();
            }
            suscriber = null;
        }
        
        return () => {
            if(suscriber) {
                suscriber.remove();
            }
        };
    }, [shouldTrack, callback]);

    return [error];
};
