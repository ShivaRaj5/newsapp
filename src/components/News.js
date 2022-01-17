import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
   const [articles,setArticles]=useState([]);
   const [loading,setLoading]=useState(true);
   const [page,setPage]=useState(1);
   const [totalResults,setTotalResults]=useState(0);
    const capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    useEffect(async () => {
        document.title=`${capitalizeFirstLetter(props.category)} News`
        props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30)
        let parsedData = await data.json();
        props.setProgress(70)
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
        
    }, [])
    const fetchMoreData =async () => {
         const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pagesize=${props.pageSize}`
         setPage(page+1)
         let data = await fetch(url);
         let parsedData = await data.json();
         console.log(parsedData)
         setArticles(articles.concat(parsedData.articles))
         setTotalResults(parsedData.totalResults)
      };
        return (
            <div>
                <h1 className="text-center" style={{marginTop: '60px'}}>Top Headlines - {capitalizeFirstLetter(props.category)}</h1>
                {/* {loading && <Spinner/>} */}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles!==totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element) => {
                                return <div key={element.url} className="col-md-4 my-2">
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        )
}

News.defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default News
