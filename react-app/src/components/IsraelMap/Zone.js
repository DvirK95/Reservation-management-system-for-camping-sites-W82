import React from 'react';
import './Zone.css';
import { Link } from 'react-router-dom';
function Zone(props) {
  const { filteredList } = props;

  return (
    <div className="scroll-list">
      {filteredList.map((item, index) => (
        <div key={index} className="list-item">
          <Link
            to={`${item.title.replace(/ /g, '-')}/${item._id}`}
            className="item-link"
          >
            <div className="item-image">
              <img src={item.image_url} alt={item.map} />
            </div>
          </Link>
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
