import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNav from './components/topNav';
import MainLanding from './pages/mainLanding';
import { Provider } from 'react-redux';
import { store } from './store/store';
import MainDrawer from './components/drawer';
import DashboardAdmin from './pages/admin/dashboardAdmin';
import ActiveAccountsContainer from './pages/admin/activeAccountsContainer';
import PendingAccountsContainer from './pages/admin/pendingAccountsContainer';
import DashboardUser from './pages/user/dashboardUser';
import SamplesUser from './pages/user/samplesUser';
import OfficeMatsUser from './pages/user/officeMatsUser';
import SitesUser from './pages/user/sitesUser';
import PcrUser from './pages/user/pcrsUser';
import SamplesAdmin from './pages/admin/samplesAdmin';
import OfficeMatsAdmin from './pages/admin/officeMatsAdmin';
import SitesAdmin from './pages/admin/sitesAdmin';
import PendingPcr from './pages/admin/pendingPcr';
import ApprovedPcr from './pages/admin/approvedPcr';
import CuppingAdmin from './pages/admin/cuppingAdmin';
import Invoices from './pages/docManager/invoices';
import InvoicesList from './pages/docManager/invoicesList';
import ShipmentInstructions from './pages/docManager/shipmentInstructions';
import ShippingInstructionsList from './pages/docManager/shippingInstructionsList';
import NewPackingList from './pages/docManager/newPackingList';
import PackingLists from './pages/docManager/packingLists';
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
              <Route exact path='/dashboard' element={<DashboardUser />} />
              <Route exact path='/user-samples' element={<SamplesUser />} />
              <Route exact path='/user-om' element={<OfficeMatsUser />} />
              <Route exact path='/user-sites' element={<SitesUser />} />
              <Route exact path='/user-pcr' element={<PcrUser />} />
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
              <Route exact path='/admin-samples' element={<SamplesAdmin />} />
              <Route exact path='/admin-om' element={<OfficeMatsAdmin />} />
              <Route exact path='/admin-sites' element={<SitesAdmin />} />
              <Route exact path='/pending-pcr' element={<PendingPcr />} />
              <Route exact path='/approved-pcr' element={<ApprovedPcr />} />
              <Route exact path='/admin-cupping' element={<CuppingAdmin />} />
              <Route exact path='/invoices' element={<InvoicesList />} />
              <Route exact path='/new-invoice' element={<Invoices />} />
              <Route
                exact
                path='/shipping-instructions'
                element={<ShippingInstructionsList />}
              />
              <Route
                exact
                path='/new-shipping'
                element={<ShipmentInstructions />}
              />
              <Route exact path='/packing-lists' element={<PackingLists />} />
              <Route
                exact
                path='/new-packing-list'
                element={<NewPackingList />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
