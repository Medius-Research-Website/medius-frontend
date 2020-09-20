import React from 'react';
import "./css_files/feedhead.scss";
function FeedHead(){//contain the title and the input box
    return(
        <div className="feed-head">
            <div className="feed-head__component-wrapper">
                <div className="feed-head__title">
                    {"What's New"}
                </div>
            </div>
            <div className="feed-head__component-wrapper">
                <div className="feed-head__input">
                    <input type="text" placeholder="got an investment idea? voice it!"/>{/*this one will be replaced later with properly implement*/}
                </div>
            </div>
        </div>
    )
}
export default FeedHead;