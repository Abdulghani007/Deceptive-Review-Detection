import React from 'react';

const Features = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <div>
                        <h1>{props.headingText}</h1>
                    </div>
                    <div>
                        <img className="training_features" src={props.imageSrc + '?nocache=' + Date.now()}></img>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;