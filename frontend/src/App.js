import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './containers/Login';
import Register from './containers/Register';
import Home  from './containers/Home';
import Layout from './hocs/Layout';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './containers/Dashboard';
import AdminDashboard from './containers/AdminDasboard';
import PosFeatures from './containers/PosFeatures';
import NegFeatures from './containers/NegFeatures';
import NeuFeatures from './containers/NeuFeatures';
import SentimentCount from './containers/SentimentCount';
import DeceptiveCount from './containers/DeceptiveCount';
import TSentimentCount from './containers/TSentimentCount';
import TDeceptiveCount from './containers/TDeceptiveCount';
import TPosFeatures from './containers/TPosFeatures';
import TNeuFeatures from './containers/TNeuFeatures';
import TNegFeatures from './containers/TNegFeatures';
import NBDAccuracy from './containers/NBDAccuracy';
import SVMDAccuracy from './containers/SVMDAccuracy';
import RFDAccuracy from './containers/RFDAccuracy';
import AccuracyComparison from './containers/AccuracyComparison';
import UserReviews from './containers/UserReviews';
import AccuracyMetrices from './containers/AccuracyMetrices';
import UserReviewAnalysis from './containers/UserReviewAnalysis';

const App = () => {
  return (
    <Provider store = {store}>
      <Router>
        <Layout>
          <Route exact path="/" component = {Home} />
          <Route exact path="/login" component = {Login} />
          <Route exact path="/register" component = {Register} />
          <Route exact path="/dashboard" component = { Dashboard } />
          <Route exact path="/admindashboard" component = {AdminDashboard} />
          <Route exact path="/pos_features" component = {PosFeatures} /> 
          <Route exact path="/neu_features" component = {NeuFeatures} /> 
          <Route exact path="/neg_features" component = {NegFeatures} /> 
          <Route exact path="/sentiment_count" component = {SentimentCount} /> 
          <Route exact path="/deceptive_count" component = {DeceptiveCount} /> 
          <Route exact path="/t_pos_features" component = {TPosFeatures} /> 
          <Route exact path="/t_neu_features" component = {TNeuFeatures} /> 
          <Route exact path="/t_neg_features" component = {TNegFeatures} /> 
          <Route exact path="/t_sentiment_count" component = {TSentimentCount} />
          <Route exact path="/t_deceptive_count" component = {TDeceptiveCount} />
          <Route exact path="/nbd_accuracy" component = {NBDAccuracy} />
          <Route exact path="/rfd_accuracy" component = {RFDAccuracy} />
          <Route exact path="/svmd_accuracy" component = {SVMDAccuracy} />
          <Route exact path='/accuracy_comparison' component ={AccuracyComparison} />
          <Route exact path='/users' component = {UserReviews} />
          <Route exact path='/accuracy_metrices' component={AccuracyMetrices} />
          <Route exact path='/review_analysis' component={UserReviewAnalysis} />
        </Layout>
      </Router>
    </Provider> 
  );
}

export default App;