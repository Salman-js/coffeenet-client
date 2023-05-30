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
import Invoices from './pages/docManager/Create/invoices';
import InvoicesList from './pages/docManager/View/invoicesList';
import ShipmentInstructions from './pages/docManager/Create/shipmentInstructions';
import ShippingInstructionsList from './pages/docManager/View/shippingInstructionsList';
import NewPackingList from './pages/docManager/Create/newPackingList';
import PackingLists from './pages/docManager/View/packingLists';
import NewWayBill from './pages/docManager/Create/newWayBill';
import WayBills from './pages/docManager/View/wayBills';
import NewInlandTransportCertificate from './pages/docManager/Create/newInlandTransportCertificate';
import InlandTransportCertificates from './pages/docManager/View/inlandTransportCertificates';
import AddCupping from './pages/admin/addCupping';
import NewShippersDecleration from './pages/docManager/Create/newShippersDecleration';
import ShippingDeclerations from './pages/docManager/View/shippingDeclerations';
import NewWeightNote from './pages/docManager/Create/newWeightNote';
import WeightNotes from './pages/docManager/View/weightNotes';
import UpdateInvoice from './pages/docManager/Update/updateInvoice';
import UpdateWeightNote from './pages/docManager/Update/updateWeightNotes';
import UpdateWayBill from './pages/docManager/Update/updateWaybills';
import ExpenseMain from './pages/financer/Create/expenseMain';
import UpdatePackingList from './pages/docManager/Update/updatePackList';
import UpdateShipmentInstructions from './pages/docManager/Update/updateShipIns';
import UpdateShipDec from './pages/docManager/Update/updateShipDec';
import UpdateInlTrCert from './pages/docManager/Update/updateInlTrCer';
import ExpensesList from './pages/financer/View/expensesList';
import CostMain from './pages/financer/Create/costMain';
import PurchasesList from './pages/financer/View/purchasesList';
import WarehouseMain from './pages/warehouser/warehouseMain';
import WarehouseList from './pages/warehouser/warehouseList';
import InventoryMain from './pages/financer/Create/inventoryMain';
import InventoryList from './pages/financer/View/inventoryList';
import AssetMain from './pages/financer/Create/assetMain';
import AssetList from './pages/financer/View/assetList';
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
              <Route exact path='/new-cupping' element={<AddCupping />} />
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
              <Route exact path='/way-bills' element={<WayBills />} />
              <Route exact path='/new-way-bill' element={<NewWayBill />} />
              <Route
                exact
                path='/certificates'
                element={<InlandTransportCertificates />}
              />
              <Route
                exact
                path='/new-cert'
                element={<NewInlandTransportCertificate />}
              />
              <Route
                exact
                path='/shipper-declerations'
                element={<ShippingDeclerations />}
              />
              <Route
                exact
                path='/new-shippers-dec'
                element={<NewShippersDecleration />}
              />
              <Route exact path='/weight-notes' element={<WeightNotes />} />
              <Route
                exact
                path='/new-weight-note'
                element={<NewWeightNote />}
              />
              <Route exact path='/expenses' element={<ExpensesList />} />
              <Route exact path='/purchases' element={<PurchasesList />} />
              <Route exact path='/inventory' element={<InventoryList />} />
              <Route exact path='/asset' element={<AssetList />} />
              <Route exact path='/new-expense' element={<ExpenseMain />} />
              <Route exact path='/new-cost' element={<CostMain />} />
              <Route exact path='/new-inventory' element={<InventoryMain />} />
              <Route exact path='/new-asset' element={<AssetMain />} />
              <Route exact path='/update-inv/:id' element={<UpdateInvoice />} />
              <Route
                exact
                path='/update-wn/:id'
                element={<UpdateWeightNote />}
              />
              <Route exact path='/update-wb/:id' element={<UpdateWayBill />} />
              <Route
                exact
                path='/update-pl/:id'
                element={<UpdatePackingList />}
              />
              <Route
                exact
                path='/update-si/:id'
                element={<UpdateShipmentInstructions />}
              />
              <Route exact path='/update-sd/:id' element={<UpdateShipDec />} />
              <Route
                exact
                path='/update-tc/:id'
                element={<UpdateInlTrCert />}
              />
              <Route exact path='/warehouse-new' element={<WarehouseMain />} />
              <Route exact path='/warehouse' element={<WarehouseList />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
