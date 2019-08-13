import React, { useCallback, useRef } from 'react'
import editable from '../hoc/Editable'
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './dragTypes';

const Task = ({ key, value, listID, id, moveTask }) => {
  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.id
      const hoverIndex = id
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse posit
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveTask(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
    }
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.TASK, id, key },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })
  const EditTitle = editable('div')
  drag(drop(ref))
  return (
    <div className="task"
      style={{ opacity: isDragging ? 0.4 : 1, padding: '6px 8px 2px', backgroundColor: 'rgb(255,255,255)', boxShadow: 'rgba(9, 30, 66, 0.25) 1px 1px 0px', margin: '8px', borderRadius: '3px' }}
      key={id}
      ref={ref}
    >
      <EditTitle
        value={value}
        listID={listID}
        taskID={id}
      />
      {/* <button onClick={() => this.onDelete(task.id)} style={{ width: '30px' }}>...</button> */}
    </div>
  )
}

export default Task;