import React, { Component } from "react";
import EmailVerified from "./email confirmation/emailConfirmed";
import { Route, BrowserRouter as Router } from "react-router-dom";
import SignIn from "./login/signin";
import SignUp from "./login/signup";
import AccessDenied from "./AccessDenied/accessDenied";
import EnaMain from "./user panel/Layout Components/enaMain";
import history from "./history";
import Verification_Screen from "./login/verification_screen";
import ForgotEmail from "./login/forgotEmail";
import PublisherLayout from "./publisher panel/publisherLayout";
import LoginRoute from "./Auth-Routes/loginRoute";
import PublisherSignUp from "./login/publisherSignUp";
import SessionTimeout from "./AccessDenied/sessionTimeout";
import PrivacyPolicy from "./Privacy policy/privacyPolicy";
import TermsAndConditions from "./Terms and conditions/termsAndConditions";
import "datatables.net-dt/js/dataTables.dataTables";
import PasswordReset from "./login/password-reset";
import ChangingLanguage from "./Changing Language Page/change-Language";
class App extends Component {
  async componentDidMount() {
    // const playerId = await window.OneSignal.getUserId();
    // console.log("Hello", playerId);
    localStorage.setItem("lang", "en");
    localStorage.setItem("language", "en");
  }
  render() {
    return (
      <div className="App">
        {/* <Router history={history}> */}
        <Router history={history} basename={"/"}>
          <LoginRoute exact path="/" component={SignIn} />{" "}
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
          <Route
            exact
            path="/terms-conditions"
            component={TermsAndConditions}
          />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/session-expired" component={SessionTimeout} />
          <Route exact path="/publisher-signup" component={PublisherSignUp} />
          <Route
            exact
            path="/verification/:type/:id/:token"
            component={Verification_Screen}
          />
          <Route exact path="/forgot-email" component={ForgotEmail} />
          <Route
            path="/changing-language/:role/:token/:lang"
            component={ChangingLanguage}
          />
          <Route path="/404" component={AccessDenied} />
          <Route exact path="/confirmation/:id" component={EmailVerified} />
          <Route exact path="/resetpassword/:id" component={ForgotEmail} />
          <Route exact path="/passwordreset" component={PasswordReset} />
          {/*Admin Routes*/}
          <Route path="/en-admin" component={EnaMain} />
          {/*English Publisher*/}
          <Route path="/en-publisher" component={PublisherLayout} />
        </Router>
      </div>
    );
  }
}

export default App;
