import React, {useState} from 'react';

const ButtonCard = (props) => {
    return (
        <div className="col-md-4 col-lg-4">
            <form className="m-3" name={props.Name} onSubmit={props.onSubmit}>
                <button type="submit" name={props.Name} className='btn text-start w-100'>
                    <div className={"card " + props.bgColor + " text-light mb-5"}>
                        <div className="card-body">
                            <div className="d-flex align-items-start">
                                <div className="fw-bold">
                                    <small className="text-white-50 d-block mb-1 text-uppercase">{props.value}</small>
                                    <span className="fs-3 mt-1">{props.count}</span>
                                </div>
                                <div className="ms-auto">
                                    <div className={"bg-white text-center " + props.iconColor + " d-50 rounded-circle"}>
                                        <i className={props.iconName}></i>    
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3">
                                <span className="text-white-50">{props.text}</span>     
                            </div>
                        </div>
                    </div> 
                
                </button>
            </form>
        </div>
    );
};

export default ButtonCard;