import s from './Track.module.scss';
import propTypes from 'prop-types';
import clsx from 'clsx';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { pl } from 'date-fns/locale';

export const Track = ({ className, track, index, dateAdded, onClick }) => {
  return (
    <div className={clsx(className, s.container)} onClick={onClick}>
      <p className={s.index}>{index + 1}</p>
      
      <div className={s.title}>
        <img src={track.album.images[0].url} alt={track.name} className={s.cover} />
        <p className={s.name}>{track.name}</p>
        <p className={s.artists}>{track.artists.map(artist => artist.name).join(', ')}</p>
      </div>
      
      <div className={s.album}>{track.album.name}</div>
      
      <p className={s.added}>
        {formatDistanceToNowStrict(new Date(dateAdded), {
          addSuffix: true,
          locale: pl
        })}
      </p>
      
      <p className={s.duration}>
        {format(new Date(track.duration_ms), 'mm:ss')}
      </p>
    </div>
  )
}

Track.propTypes = {
  className: propTypes.string,
  track: propTypes.object.isRequired,
  index: propTypes.number.isRequired,
  dateAdded: propTypes.string.isRequired,
  onClick: propTypes.func
}