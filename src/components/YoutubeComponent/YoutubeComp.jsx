import React from "react";
import "./YoutubeComp.css"

const YoutubeComp = (props) =>{
    return (
        <div className="youtube-wraper">
            <img className="youtube-thumbnail" src={props.img} alt="" />
            <p className="youtube-title">{props.title}</p>
            <p className="youtube-description">{props.view} ditonton</p>
            <p className="youtube-description">Web Programing UNPAS</p>
        </div>
    )
}

YoutubeComp.defaultProps = {
    view: "0 x",
    title: "Insert Judul",
    img: "https://i.ytimg.com/vi/c_fRtpQf4Oc/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDu6JE325f6a9McsUvlLCBQoNXQbg",
}

export default YoutubeComp;