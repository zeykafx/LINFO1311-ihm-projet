import React, { useState } from 'react';
import "./Slide1.css";

import MoviesViewer from "../../components/clientViewers/MoviesViewer.js";

import icon_facebook from '../../icons/facebook.png';
import icon_instagram from '../../icons/instagram.png';
import icon_twitter from '../../icons/twitter.png';

function Slide1({}) {

    const text = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam";
    const [isFullTextVisible, setIsFullTextVisible] = useState(false);


    return (
        <div className="RowsContainer">
            <div className="textContainer">
                <h1>Alia Bhatt</h1>
                <div className="subText">
                    <h3>Actress</h3>
                    <div className='socialsContainer'>
                        <a href="facebook.com" className='social'>
                            <img src={icon_facebook}></img>
                        </a>
                        <a href="instagram.com" className='social'>
                            <img src={icon_instagram}></img>
                        </a>
                        <a href="twitter.com" className='social'>
                            <img src={icon_twitter}></img>
                        </a>
                    </div>
                </div>
                <p>
                    { isFullTextVisible 
                    ?
                    <>
                    {text + " "}
                    <span className='textAction' onClick={() => setIsFullTextVisible(false)}>Read less</span>
                    </>
                    : 
                    <>
                        {text.slice(0,175) + "... "}
                        <span className='textAction' onClick={() => setIsFullTextVisible(true)}>Read more</span>
                    </>
                    }
                </p>
            </div>
            <MoviesViewer
                maxNumberOfMovies={5}
            />
        </div>
    )

}
export default Slide1;