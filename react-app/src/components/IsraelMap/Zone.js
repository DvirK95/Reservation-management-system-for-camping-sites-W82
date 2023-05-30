import React from 'react';

import './Zone.css';

function Zone(props) {
  const { filteredList, onClick } = props; 

  return (
    <div className="scroll-list">
      {filteredList.map((item, index) => (
        <div key={index} className="list-item" >
            <div 
              className="item-link"
              onClick={() => {onClick(item.xAxis, item.yAxis, item._id)}}
            >
            <div className="item-image">
              <img src={item.image_url} alt={item.map} />
            </div>
            </div>
          <div className="item-details">
            {item.title}
            <p className="text">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Zone;
