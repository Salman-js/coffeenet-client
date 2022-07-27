import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNav from './components/topNav';
import MainLanding from './pages/mainLanding';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MainDrawer from './components/drawer';
import DashboardAdmin from './pages/admin/dashboardAdmin';
import ActiveAccountsContainer from './pages/admin/activeAccountsContainer';
import PendingAccountsContainer from './pages/admin/pendingAccountsContainer';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <TopNav />
          <div className='dashboard-container-main flex flex-row w-full h-full'>
            <MainDrawer />
            <Routes>
              <Route exact path='/' element={<MainLanding />} />
              <Route
                exact
                path='/dashboard-admin'
                element={<DashboardAdmin />}
              />
              <Route
                exact
                path='/active-accounts'
                element={<ActiveAccountsContainer />}
              />
              <Route
                exact
                path='/pending-accounts'
                element={<PendingAccountsContainer />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
