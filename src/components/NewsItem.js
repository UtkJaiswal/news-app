import React, { Component } from "react";

export class NewsItem extends Component {
    
  render() {
    let {title,description,imageUrl,newsUrl} = this.props;
    return (
      <div className="my-3">
        <div className="card" >
          <img src={imageUrl?imageUrl:"https://cdn.pixabay.com/photo/2017/06/10/07/22/news-2389226_960_720.png"} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <a  rel="noreferrer"href={newsUrl} target="_blank" className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
