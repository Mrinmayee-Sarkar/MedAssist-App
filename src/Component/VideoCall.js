import React, { useEffect, useRef, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const VideoCall = ({ channel }) => {
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [remoteVideoTracks, setRemoteVideoTracks] = useState([]);
  
  const client = useRef(null);

  useEffect(() => {
    // Initialize Agora SDK
    client.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

    // Set up local video track
    AgoraRTC.createMicrophoneAndCameraTracks().then(([microphoneTrack, cameraTrack]) => {
      setLocalVideoTrack(cameraTrack);

      // Join a channel
      if (client.current.connectionState !== 'CONNECTING' && client.current.connectionState !== 'CONNECTED') {
        client.current
          .join('99f9c449aec04327bf1a39ee6c8c8591', channel, null, null)
          .then(() => {
            // Publish local video track
            client.current.publish([cameraTrack]);

            // Subscribe to remote video tracks
            client.current.on('user-published', (user, mediaType, publication) => {
              if (mediaType === 'video') {
                client.current.subscribe(user, 'video').then((videoTrack) => {
                  setRemoteVideoTracks((prevTracks) => [...prevTracks, videoTrack]);
                });
              }
            });

            // Handle user leaving the channel
            client.current.on('user-unpublished', (user, mediaType) => {
              if (mediaType === 'video') {
                setRemoteVideoTracks((prevTracks) =>
                  prevTracks.filter((track) => track.getUserId() !== user.uid)
                );
              }
            });
          })
          .catch((error) => {
            console.error('Error joining the channel:', error);
          });
      }
    });


    // Cleanup on component unmount
    return () => {
      console.log('Cleaning up Agora client and tracks');

      // Stop local video track
      localVideoTrack && localVideoTrack.stop();

      // Leave the channel
      client.current &&
        client.current
          .leave()
          .then(() => {
            console.log('Left the channel');
          })
          .catch((err) => {
            console.error('Error leaving the channel:', err);
          });
    };
  }, [channel]);

 

  return (
    <div>
      <div>
        {/* Render local video track */}
        {localVideoTrack && <video ref={(node) => node && localVideoTrack.play(node)} />}
      </div>
      <div>
        {/* Render remote video tracks */}
        {remoteVideoTracks.map((track) => (
          <video key={track.getId()} ref={(node) => node && track.play(node)} />
        ))}
      </div>
    </div>
  );
};

export default VideoCall;
