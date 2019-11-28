import React from 'react'
import { createUseStyles } from 'react-jss'
import { useSelector } from 'react-redux'
import { Circle } from 'better-react-spinkit'
import { getEvents, isEventsReady, getEventsError } from '../selectors'
import { ReactComponent as TitleIcon } from '../icons/vivid-angle-top-left.svg'
import theme from '../style/theme'
import Event from './Event'

const WrappEvents = ({ classes, title, children }) => (
  <div className={classes.container}>
    {title}
    {children}
  </div>
)

const Events = () => {
  const classes = useStyles()
  const ready = useSelector(isEventsReady)
  const events = useSelector(getEvents)
  const error = useSelector(getEventsError)

  if (error) {
    return (
      <WrappEvents classes={classes}>
        <div className={classes.errorMessage}>
          Oops! Something went wrong!
        </div>
      </WrappEvents>
    )
  }
  return (
    <WrappEvents
      classes={classes}
      title={
        <h3 className={classes.title}>
          <TitleIcon className={classes.titleIcon} />
          {`Results: ${events.length} Events Found`}
        </h3>
      }
    >
      {!ready && <div className={classes.centerScreen}>  <Circle size={40} /> </div>}
      {ready && (
        <div className={classes.tilesWrapper}>
          <div className={classes.tiles}>
            {events.map(event => <Event key={event.id} className={classes.tile} content={event} />)}
          </div>
        </div>
      )}
    </WrappEvents>
  )
}

const useStyles = createUseStyles({
  title: {
    paddingLeft: 20,
    position: 'relative'
  },
  titleIcon: {
    position: 'absolute',
    left: 0,
    top: 5,
    width: 11,
    height: 11,
    fill: 'currentColor'
  },
  tilesWrapper: {
    margin: [0, 'auto'],
    maxWidth: theme.maxTileWidth,
    '@media (min-width: 768px)': {
      maxWidth: theme.maxTileWidth * 2 + theme.gutter
    },
    '@media (min-width: 1200px)': {
      maxWidth: theme.maxTileWidth * 3 + theme.gutter * 2
    }
  },
  tiles: {
    '@media (min-width: 768px)': {
      marginLeft: -theme.gutter / 2,
      marginRight: -theme.gutter / 2,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start'
    }
  },

  tile: {
    margin: [0, 'auto', theme.gutter],
    maxWidth: theme.maxTileWidth,
    '@media (min-width: 768px)': {
      marginLeft: theme.gutter / 2,
      marginRight: theme.gutter / 2,
      width: `calc(50% - ${theme.gutter}px)`
    },
    '@media (min-width: 1200px)': {
      width: `calc(${100 / 3}% - ${theme.gutter}px)`
    }
  },

  centerScreen: {
    position: 'fixed',
    top: '50%',
    left: '50%'
  },

  errorMessage: {
    backgroundColor: '#ff7272',
    color: '#fff',
    padding: '1em'
  }
}, { name: 'Events' })

export default Events
