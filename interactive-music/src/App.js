import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TRACKS } from './queries/queries.js';
import { Howl } from 'howler';

const App = () => {
  const { loading, error, data } = useQuery(GET_TRACKS);
  const [playingTracks, setPlayingTracks] = useState({});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const toggleTrack = (track) => {
    const isPlaying = playingTracks[track.id];
    if (isPlaying) {
      playingTracks[track.id].stop();
      setPlayingTracks({ ...playingTracks, [track.id]: null });
    } else {
      const sound = new Howl({ src: [track.url] });
      sound.play();
      setPlayingTracks({ ...playingTracks, [track.id]: sound });
    }
  };

  return (
    <div>
      {data.tracks.map(track => (
        <div key={track.id}>
          <button onClick={() => toggleTrack(track)}>
            {playingTracks[track.id] ? `Stop ${track.name}` : `Play ${track.name}`}
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
