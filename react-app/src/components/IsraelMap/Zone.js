import React from "react";
import './Zone.css';


function Zone(props) {
  const { filteredList } = props;

  return (
    <div className="scroll-list">
      {filteredList.map((item, index) => (
        <div key={index} className="list-item">
          <a href={item.link} className="item-link">
            <div className="item-image">
              <img src={item.image} alt={item.title} />
            </div>
          </a>
          <div className="item-details">
            {item.title}
            <p className="text">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Zone;