import React from 'react';
import './Zone.css';

function Zone(props) {
  const { filteredList } = props;

  return (
    <div className="scroll-list">
      {filteredList.map((item, index) => (
        <div key={index} className="list-item">
          <a href={`${item.title}/${item._id}`} className="item-link">
            <div className="item-image">
              <img src={item.image_url} alt={item.map} />
            </div>
          </a>
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
