import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableSong } from './DraggableSong';

export const DnDSongOrder = ({ songs, onReorder }) => {
  const moveSong = (dragIndex, hoverIndex) => {
    const dragSong = songs[dragIndex];
    const newSongs = [...songs];
    newSongs.splice(dragIndex, 1);
    newSongs.splice(hoverIndex, 0, dragSong);
    onReorder(newSongs);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {songs.map((song, index) => (
        <DraggableSong
          key={`song--${song.id}`}
          song={song}
          index={index}
          moveSong={moveSong}
        />
      ))}
    </DndProvider>
  );
};
