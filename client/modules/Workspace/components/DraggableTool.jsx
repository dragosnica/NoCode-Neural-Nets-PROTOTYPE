import PropTypes from 'prop-types';
import React from 'react';
import { useDrag } from 'react-dnd';
import {
  Stage, Group, Layer, Circle, Arrow, Text, Image
} from 'react-konva';
import * as ItemColors from '../../../constants/itemColors';

export default function DraggableTool({ showCopyIcon, itemType }) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: itemType },
    options: {
      dropEffect: showCopyIcon ? 'copy' : 'move'
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      opacity: monitor.isDragging() ? 0.5 : 1
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
        paddingLeft: 10,
        paddingRight: 10
      }}
    >
      <h4>
        {itemType}
      </h4>
      <Stage width={100} height={40}>
        <Layer y={0}>
          <Circle
            x={50}
            y={20}
            width={30}
            height={30}
            fill={ItemColors[itemType]}
            stroke="#000"
            strokeWidth={1}
          />
        </Layer>
      </Stage>
    </div>
  );
}

DraggableTool.propTypes = {
  showCopyIcon: PropTypes.bool.isRequired,
  itemType: PropTypes.string.isRequired
};
