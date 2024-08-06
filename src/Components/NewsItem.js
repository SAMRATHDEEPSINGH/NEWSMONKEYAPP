import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title,description,imageUrl,newsurl,author,date,source}=this.props
        return (
            <div className='my-3'>
                <div className="card" >
                <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
                <span className=" bg-danger rounded-pill" style={{left:'90%',zIndex:'1'}}>{source}</span>
                </div>
                    <img src={imageUrl?imageUrl:"https://cdn.vox-cdn.com/thumbor/25Wb0oKSvNeyNiSYpiLNwQTIKG8=/0x0:2040x1360/1200x628/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/23447775/ahawkins_220504_5202_0022.jpg"} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-danger">By {author} on {new Date(date).toGMTString()}</small></p>
                            <a rel="noreferrer" href={newsurl}  target='_blank' className="btn btn-sm btn-dark">Read more</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
