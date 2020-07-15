import PropTypes from 'prop-types';
import React from 'react';
import { useDrop } from 'react-dnd';
import * as ItemTypes from '../../../constants/itemTypes';

export default function LayersInitializer(props) {
  const [{ isOver }, drop] = useDrop({
    accept: Object.keys(ItemTypes),
    drop: (_, monitor) => (
      props.initializeLayer(monitor.getItemType())
    ),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  });
  return (
    <div ref={drop} className="editor_drop_section">
      <p className="editor_drop_overlay_text">
        Drop here
      </p>
      {isOver && (
        <div className="editor_drop_overlay" />
      )}
    </div>
  );
}

LayersInitializer.propTypes = {
  initializeLayer: PropTypes.func.isRequired,
};
