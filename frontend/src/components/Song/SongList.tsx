// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ISong } from '../../types';

// const SongList: React.FC = () => {
//   const [songs, setSongs] = useState<ISong[]>([]);

//   useEffect(() => {
//     const fetchSongs = async () => {
//       try {
//         const response = await axios.get('/api/v1/songs');
//         setSongs(response.data.data.songs);
//       } catch (error) {
//         console.error('Failed to fetch songs:', error);
//       }
//     };

//     fetchSongs();
//   }, []);

//   return (
//     <div>
//       {/* Render the list of songs */}
//       {songs.map((song) => (
//         <div key={song._id}>{song.title}</div>
//       ))}
//     </div>
//   );
// };

// export default SongList;
