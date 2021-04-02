import AdminDashboard from "./../../admin panel/admin-dashboard/adminDashboard";
import dashboardRevenueTable from "./../../admin panel/admin-dashboard/dash-components/dashboard-revenue-table";
import DashboardPendingPublisherTable from "./../../admin panel/admin-dashboard/dash-components/dashboard-pending-publishers-table";
import DashboardPopularAds from "./../../admin panel/admin-dashboard/dash-components/dashboard-popular-ads";
import DashboardPendingAds from "./../../admin panel/admin-dashboard/dash-components/dashboard-pending-ads";
import AdminUsers from "./../../admin panel/admin-users/adminUsers";
import AdminMessage from "./../../admin panel/admin-message/adminMessage";
import AdminProfile from "./../../admin panel/admin-profile/adminProfile";
import UserDetail from "./../../admin panel/admin-users/userDetail";
import AdPublishers from "./../../admin panel/admin ads/adPublishers";
import publisherAdInsights from "./../../admin panel/admin ads/publisher ad insights/publisher-ad-insights";
import AdminAds from "./../../admin panel/admin ads/adminAds";
import AdPublisherDetail from "./../../admin panel/admin ads/adPublisherDetail";
import CreatePublisher from "./../../admin panel/admin ads/createPublisher";
import AdPackages from "./../../admin panel/admin-adPackages/adPackages";
import AdDetails from "./../../admin panel/ad details/adDetail";
import BankLinking from "./../../admin panel/bank-linking/banKLinking";
import EditBankDetail from "./../../admin panel/bank-linking/editBankDetail";
import AppUsage from "./../../admin panel/app-usage/appUsage";
import UserRatingsTable from "./../../admin panel/app-usage/app-usage-components/users-ratings-table";
import HeaderDetailsAppUsage from "./../../admin panel/app-usage/headerDetails";
import AdsInsights from "./../../admin panel/ads-insights/adsInsights";
import InsightsCVITable from "./../../admin panel/ads-insights/pages/insighsCVITable";
import ManageCategories from "./../../admin panel/admin categories/manageCategories";
import AdminEnquiries from "./../../admin panel/admin enquireis/adminEnquiries";
import CollectiveFeedback from "./../../admin panel/app-usage/app-usage-components/collectiveFeedback";
import IndividualAdInsight from "./../../admin panel/admin ads/individualAdInsight";
import PublisherExpiredAdInsights from "./../../admin panel/admin ads/publisher ad insights/publisherExpiredAdInsights";
import CreateUser from "./../../admin panel/admin-users/create-user/createUser";
import EditCreatedUser from "./../../admin panel/admin-users/create-user/editcreatedUser";
import EnquiryHistory from "./../../admin panel/admin enquireis/enquiryHistory";
import CreatePackageForm from "./../../admin panel/admin-adPackages/createPackageForm";
import EditPackageDetail from "./../../admin panel/admin-adPackages/editPackage";
import AdminNotifications from "./../../admin panel/admin-notifications/adminNotifications";

const AdminRoutes = [
  {
    path: "/en-admin/aDashboard",
    component: AdminDashboard,
  },
  {
    path: "/en-admin/dashboard-revenue",
    component: dashboardRevenueTable,
  },
  {
    path: "/en-admin/dashboard-pending-requests",
    component: DashboardPendingPublisherTable,
  },
  {
    path: "/en-admin/dashboard-popular-ads",
    component: DashboardPopularAds,
  },
  {
    path: "/en-admin/dashboard-pending-ads",
    component: DashboardPendingAds,
  },
  {
    path: "/en-admin/aUsers",
    component: AdminUsers,
  },
  {
    path: "/en-admin/aMessages",
    component: AdminMessage,
  },
  {
    path: "/en-admin/aProfile",
    component: AdminProfile,
  },
  {
    path: "/en-admin/user-Detail/:user_id",
    component: UserDetail,
  },
  {
    path: "/en-admin/publishers",
    component: AdPublishers,
  },
  {
    path: "/en-admin/publishers-ad-insights/:id/:name",
    component: publisherAdInsights,
  },
  {
    path: "/en-admin/user-Ad/:user_id/:user",
    component: AdminAds,
  },
  {
    path: "/en-admin/publisher-detail/:user_id",
    component: AdPublisherDetail,
  },
  {
    path: "/en-admin/register-publisher",
    component: CreatePublisher,
  },
  {
    path: "/en-admin/ad-packages",
    component: AdPackages,
  },
  {
    path: "/en-admin/ad-details",
    component: AdDetails,
  },
  {
    path: "/en-admin/bank-linking",
    component: BankLinking,
  },
  {
    path: "/en-admin/bank-linking/edit/:id",
    component: EditBankDetail,
  },
  {
    path: "/en-admin/app-usage",
    component: AppUsage,
  },
  {
    path: "/en-admin/app-usage-ratings/:rate",
    component: UserRatingsTable,
  },
  {
    path: "/en-admin/header-detail/:id",
    component: HeaderDetailsAppUsage,
  },
  {
    path: "/en-admin/ads-insights",
    component: AdsInsights,
  },
  {
    path: "/en-admin/ads-insights-cvi/:id",
    component: InsightsCVITable,
  },
  {
    path: "/en-admin/categories&subcategories",
    component: ManageCategories,
  },
  {
    path: "/en-admin/aEnquiries",
    component: AdminEnquiries,
  },
  {
    path: "/en-admin/aCollectiveFeedback",
    component: CollectiveFeedback,
  },
  {
    path: "/en-admin/individual-ad-insight/:id",
    component: IndividualAdInsight,
  },
  {
    path: "/en-admin/expired-ad-insight/:id",
    component: PublisherExpiredAdInsights,
  },
  {
    path: "/en-admin/create-user",
    component: CreateUser,
  },
  {
    path: "/en-admin/edit-created-user/:id",
    component: EditCreatedUser,
  },
  {
    path: "/en-admin/conversation-history/:id/:name",
    component: EnquiryHistory,
  },
  {
    path: "/en-admin/create-package",
    component: CreatePackageForm,
  },
  {
    path: "/en-admin/edit-package/:id",
    component: EditPackageDetail,
  },
  {
    path: "/en-admin/notifications",
    component: AdminNotifications,
  },
];

export default AdminRoutes;
