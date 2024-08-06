import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';




export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        console.log("Hello");
        this.state = {
            // articles: this.articles,
            articles: [],
            loadng: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(50);
        console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100);

    }
    async componentDidMount() {
        // console.log("cdm")
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data=await fetch(url);
        // let parsedData=await data.json();
        // console.log(parsedData);
        // this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
        this.updateNews();
    }

    handleNextClick = async () => {
        // console.log("next");
        // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
        // console.log("cdm")
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data=await fetch(url);
        // let parsedData=await data.json();
        // console.log(parsedData);
        // this.setState({
        //     page:this.state.page+1,
        //     articles:parsedData.articles,
        //     loading:false

        // })
        // }
        this.setState({ page: this.state.page + 1 })
        this.updateNews();
    }
    handlePreviousClick = async () => {

        // console.log("cdm")
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data=await fetch(url);
        // let parsedData=await data.json();
        // console.log(parsedData);
        // this.setState({articles:parsedData.articles})
        // this.setState({
        //     page:this.state.page-1,
        //     articles:parsedData.articles,
        //     loading:false

        // })
        this.setState({ page: this.state.page - 1 })
        this.updateNews();

    }

    fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({ page: this.state.page + 1 });
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false
        })
    };


    render() {
        console.log("render")
        return (
            <>
                <h2 className='text-center' style={{ margin: '35px 0px',marginTop:'90px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={this.state.loading && <Spinner/>}
                    >
                    <div className="container">
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 96) : ""} imageUrl={element.urlToImage} newsurl={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt ? element.publishedAt : ""} source={element.source.name ? element.source.name : "Unknown"} />
                            </div>
                        })}

                    </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page<=1} className="btn btn-dark mx-3" onClick={this.handlePreviousClick}> &larr; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                    </div> */}
            </>
        )
    }
}

export default News

