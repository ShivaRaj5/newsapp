import React from 'react'
// efcef553cb024ef1aa49b37810e9f076
const NewsItem=(props)=> {
        let {title,description,imageUrl,newsUrl,author,date,source}=props;
        return (
            <div>
                <div className="card">
                    <div>
                    <span className="badge rounded-pill bg-danger" style={{display:"flex",position:"absolute",justifyContent:"flex-end",right:"0px"}}>{source}</span>
                    </div>
                    <img src={imageUrl?imageUrl:"https://www.bollyinside.com/wp-content/uploads/2021/10/Amazon-wants-to-turn-your-cell-phone-into-a-satellite.png"} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text">By {author?author:"Unknown"} on {new Date(date).toUTCString()}</p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
}

export default NewsItem
