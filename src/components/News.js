import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {
    country:"in",
    pageSize:9,
    category:"general"
  }

  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1,
      totalResults:0
    };
  }
  async componentDidMount() {
      this.updateNews();
  }
  updateNews=async()=>{
    this.props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9a1e91a593fb4fb3b673bb549df83a93&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
      let data = await fetch(url);
      this.props.setProgress(30)
      let parsedData = await data.json()
      this.props.setProgress(70);
      this.setState({
          articles:parsedData.articles,
          totalResults:parsedData.totalResults,
          loading:false
        })
        this.props.setProgress(100);
  }

  fetchData = async()=>{
    this.setState({page:this.state.page+1})
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9a1e91a593fb4fb3b673bb549df83a93&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
      let data = await fetch(url);
      let parsedData = await data.json()
      this.setState({
          articles:this.state.articles.concat(parsedData.articles),
          totalResults:parsedData.totalResults,
          loading:false
        })
  }

  
  render() {
    return (
      <div>
        <h1 className="text-center">News headlines</h1>
        {this.state.loading && <Spinner />} 
        
        <InfiniteScroll
        dataLength={this.state.articles.length} 
        next={this.fetchData}
        hasMore={this.state.articles.length!==this.state.totalResults}
        loader={<Spinner />}>
        <div className="container">
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
              return(
                  <div className="col-md-4" key={element.url}>
                      <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
                  </div>
              )
          })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-around">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrev}>Previous</button>
            <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNext}>Next</button>

        </div> */}
      </div>
    );
  }
}

export default News;


