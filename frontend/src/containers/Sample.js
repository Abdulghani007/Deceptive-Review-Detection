import React from 'react';


const Sample = () => {
        return (
            <div className="row">
                <div className="col-md-3 col-lg-3">
                    <div class="card bg-premium-dark text-light mb-5">
                        <div class="card-body">
                            <div class="d-flex align-items-start">
                                <div class="fw-bold">
                                    <small class="text-white-50 d-block mb-1 text-uppercase">Naive Bayes Accuracy</small>
                                    <span class="fs-3 mt-1">586,356</span>
                                </div>
                                <div class="ms-auto">
                                    <div class="bg-white text-center text-success d-50 rounded-circle">
                                        <i class="far fa-chart-bar fa-lg"></i>    
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3">
                                <span class="text-white-50">Training &amp; Testing Accuracy</span>     
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
                 
        );
};

export default Sample;
