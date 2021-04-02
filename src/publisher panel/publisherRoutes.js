import AdsRegisterForm from "./ad request form/adsRegisterForm";
import PublisherAdDetail from "./publisher ad detail/publisherAdDetail";
import PublisherProfile from "./publisher profile/publisherProfile";
import PublisherAccounts from "./publisher account/publisherAccounts";
import PublisherDashboard from "./publisher dashboard/publisherDashboard";
import PubisherPanelAdInsights from "./publisher ad insights/publisher-panel-ad-insights";
import ManageAdPackages from "./manage packages/manage-ad-packages";
import AdvertiserInAppNotification from "./in app notification/advertiserInAppNotification";
const publisherRoutes = [
  {
    path: "/en-publisher/ads-form",
    component: AdsRegisterForm,
  },
  {
    path: "/en-publisher/advertisement-details",
    component: PublisherAdDetail,
  },
  {
    path: "/en-publisher/publisher-profile",
    component: PublisherProfile,
  },
  {
    path: "/en-publisher/publisher-account",
    component: PublisherAccounts,
  },
  {
    path: "/en-publisher/pDashboard",
    component: PublisherDashboard,
  },
  {
    path: "/en-publisher/manage-packages",
    component: ManageAdPackages,
  },
  {
    path: "/en-publisher/publisher-ad-insight",
    component: PubisherPanelAdInsights,
  },
  {
    path: "/en-publisher/aNotifications",
    component: AdvertiserInAppNotification,
  },
];
export default publisherRoutes;
