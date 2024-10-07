// src/Musics.jsx
import React, { useEffect, useState } from 'react';

const token = 'BQBa_3TGCIkbV7a27r-SlpKr7S5hXr4hxnVN8_RbE3UEV3PNaspFZVP7YhHg1n4UZcHQubaapnHJstd31QFP4ja6X0YXdg4qee5EqJHaOMPa1mrbZAeWtRfJokblxWegqWoKMnXxkeBoliF-FfV5xw3LS_zlDnj8A4CXpL9aH00Nz8Ek1VHr32Z6L_csJ-qM8J62OJyVR6cVmjqsNhAUlXR9E7DJvXJtrh4mzKyPK37kbbQzINPKNUOSx21VSvlQkSKthhJ_1FLWxTj1x0-mVULWnYlnskeU';

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method,
    body: body ? JSON.stringify(body) : null,
  });
  return await res.json();
}

async function getTopTracks() {
  return (await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET')).items;
}

const Musics = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const fetchTracks = async () => {
      const topTracks = await getTopTracks();
      setTracks(topTracks);
    };

    fetchTracks();
  }, []);

  return (
    <div>
      <h1>My Top Tracks</h1>
      <ul className='text-white'>
        {tracks.map(({ name, artists }, index) => (
          <li key={index}>
            {name} by {artists.map(artist => artist.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Musics;
