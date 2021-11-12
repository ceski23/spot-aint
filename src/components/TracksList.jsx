import s from './TracksList.module.scss';
import propTypes from 'prop-types';
import { ReactComponent as ClockIcon } from 'assets/icons/clock.svg';
import { Track } from './Track';
import clsx from 'clsx';
import { useMemo } from 'react';

export const TracksList = ({
  className, tracks, isLoading, offset, limit, changeOffset, total, onTrackClick
}) => {
  const currentPage = useMemo(() => (offset / limit) + 1, [offset, limit]);

  const handleChangePage = (idx) => {
    if (idx >= 0 && idx <= Math.ceil(total / limit) - 1) {
      changeOffset(idx * limit);
    }
  }

  return (
    <div className={clsx(className, s.container)}>
      <div className={s.header}>
        <span className={s.center}>#</span>
        <span>Tytuł</span>
        <span>Album</span>
        <span>Data dodania</span>
        <span className={s.center}><ClockIcon className={s.clockIcon} /></span>
      </div>

      {isLoading && (
        <div className={s.loadingContainer}>
          <p className={s.loading}>Ładowanie...</p>
        </div>
      )}

      <div className={s.tracks}>
        {tracks.length > 0 && tracks.map((item, index) => (
          <Track
            track={item.track}
            key={item.track.id}
            index={index + offset}
            dateAdded={item.added_at}
            onClick={() => onTrackClick(item.track)}
          />
        ))}
      </div>

      {!isLoading && (
        <div className={s.pagination}>
          <button
            type='button'
            className={s.page}
            onClick={() => handleChangePage(currentPage - 2)}
          >
            {"<"}
          </button>

          {Array.from({ length: Math.ceil(total / limit) }).map((_, idx) => (
            <button
              key={idx}
              type='button'
              className={clsx(s.page, { [s.current]: idx+1 === currentPage })}
              onClick={() => handleChangePage(idx)}
            >
              {idx + 1}
            </button>
          ))}

          <button
            type='button'
            className={s.page}
            onClick={() => handleChangePage(currentPage)}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  )
}

TracksList.propTypes = {
  className: propTypes.string,
  tracks: propTypes.array.isRequired,
  isLoading: propTypes.bool,
  limit: propTypes.number.isRequired,
  total: propTypes.number.isRequired,
  offset: propTypes.number.isRequired,
  changeOffset: propTypes.func.isRequired,
  onTrackClick: propTypes.func.isRequired
}