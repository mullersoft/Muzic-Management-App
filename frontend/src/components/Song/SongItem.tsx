// // src/components/Song/SongItem.tsx

// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../store/store';
// import { fetchSongByIdThunk, selectCurrentSong, selectSongStatus, selectSongError } from '../../features/songs/songSlice';

// const SongItem: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const dispatch: AppDispatch = useDispatch();
//   const currentSong = useSelector(selectCurrentSong);
//   const status = useSelector(selectSongStatus);
//   const error = useSelector(selectSongError);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchSongByIdThunk(id));
//     }
//   }, [dispatch, id]);

//   if (status === 'loading') return <div>Loading...</div>;
//   if (status === 'failed') return <div>{error || 'An error occurred'}</div>;

//   return (
//     <div>
//       {currentSong ? (
//         <div>
//           <h1>{currentSong.title}</h1>
//           <p>{currentSong.artist}</p>
//           {/* Other song details */}
//         </div>
//       ) : (
//         <div>No song found</div>
//       )}
//     </div>
//   );
// };

// export default SongItem;
