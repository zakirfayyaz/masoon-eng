import React, { Component } from "react";

class PrivacyPolicy extends Component {
  state = {};
  render() {
    return (
      <body cz-shortcut-listen="true">
        <div id="headerWrapper">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12 col-sm-12 col-12 text-center mb-5">
                <a href="index.html" class="navbar-brand-privacy">
                  <img
                    src="assets/img/masoonlogo.png"
                    style={{ height: "100px", width: "100px" }}
                    class="img-fluid"
                    alt="logo"
                  />
                </a>
              </div>
              {/* <div class="col-md-12 col-sm-12 col-12 text-center">
                <h2 class="main-heading text-dark">
                  How We Protect Customers Information?
                </h2>
              </div> */}
            </div>
          </div>
        </div>

        <div
          id="privacyWrapper"
          class="container"
          style={{ paddingLeft: "5px", paddingRight: "5px" }}
        >
          <div class="privacy-container" style={{ marginBottom: "30px" }}>
            <div class="privacyContent">
              <div class="d-flex justify-content-between privacy-head">
                <div class="privacyHeader">
                  <h1>Masoon Privacy Statement</h1>
                  <p style={{ fontSize: "16px" }}>
                    Last Updated: February 14, 2021
                  </p>
                </div>
              </div>

              <div class="privacy-content-container">
                <section>
                  <h4>Introduction and overview</h4>
                  <p style={{ fontSize: "16px" }}>
                    Masoon leverages technology responsibly to power prosperity
                    around the kingdom, and we believe that everyone has a right
                    to privacy. At Masoon, we view privacy as a key part of the
                    value that we deliver to our customers.
                  </p>
                </section>

                <h4 class="policy-info-ques">
                  Scope of this Privacy Statement and our role
                </h4>

                <section>
                  {/* <h5>Media</h5> */}

                  <p style={{ fontSize: "16px" }}>
                    As a financial services and technology company, we’re
                    providing this Privacy Statement to explain how we collect,
                    use, and share information when you interact with us and our
                    offerings, services and experiences. This Privacy Statement
                    describes our privacy practices when we process personal
                    information as necessary to manage, run and improve our
                    business.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    The personal information that we receive about you depends
                    on the context of your interactions with Masoon, how you
                    configure your account and the choices that you make,
                    including your privacy settings. Personal information that
                    you provide may also depend upon what services or
                    experiences you use, your location and applicable law.
                  </p>
                </section>

                <section>
                  {/* <h5> Cookies </h5> */}
                  <p style={{ fontSize: "16px" }}>
                    <ul>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          Creating an account:
                        </span>{" "}
                        We collect information when you create an account,
                        interact with the Masoon Platform or activate a
                        subscription. Personal information may include your
                        contact information (such as your name, address, phone
                        number and email), profile photo, billing information
                        (your payment information), usernames and credentials.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          Identification information:
                        </span>{" "}
                        We collect information to verify your identity,
                        including your name and government-issued identification
                        details.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          Customer support, product research, training and
                          feedback:
                        </span>{" "}
                        We may collect personal information when you reach out
                        to us for support, give us feedback, participate in
                        optional surveys, product research or training and you
                        choose to share.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          Social and community content.
                        </span>{" "}
                        We receive content you post on our social media pages
                        and our community pages:
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          Device information:
                        </span>{" "}
                        We may collect information about your device such as
                        Internet Protocol (“IP”) addresses, log information,
                        error messages, device type, and unique device
                        identifiers. For example, we may collect IP addresses
                        from you as part of our sign in and security features.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          Third-party service content:
                        </span>{" "}
                        We receive information about you when you sign into a
                        third-party service with your account or when you
                        connect your account to a third-party service. For
                        example, you may choose to connect your account with
                        your bank accounts. To sync your financial account
                        information, we must access your financial account
                        information.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          Usage information:
                        </span>{" "}
                        We may collect usage information such as the pages you
                        viewed, the features you use, your browser type and
                        details about any links with which you interact.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          Location information:
                        </span>{" "}
                        Certain features in the Masoon Platform may collect your
                        precise location information, device motion information,
                        or both, if you grant permission to do so in your device
                        settings. For example, if you use our time-tracking
                        service.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          Expert advice:
                        </span>{" "}
                        The Masoon Platform provides many opportunities for you
                        to connect with live experts, including, for example,
                        accountants or tax preparers. When you interact with
                        these experts, we may receive information about the
                        questions you ask, the details of your accounts and the
                        guidance provided to you.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          Camera and contacts:
                        </span>{" "}
                        Certain features may have access to your camera and
                        contacts if you grant permission in your device
                        settings.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          Information from cookies and other technologies:
                        </span>{" "}
                        Masoon may use commonly used tools such as cookies, web
                        beacons, pixels, local shared objects and similar
                        technologies (collectively "cookies") to collect
                        information about you (“Cookie Information”) so we can
                        provide the experiences you request, recognize your
                        visit, track your interactions, and improve your and
                        other customers' experience. You have control over some
                        of the information we collect from Cookies and how we
                        use it.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          Information stored locally:
                        </span>{" "}
                        Some of our web-enabled desktop services and offerings
                        synchronize with the information on your computer. In
                        doing so, we may collect information such as device
                        information, product usage, and error reports. We may
                        also store personal information locally on your device.
                      </li>
                    </ul>
                  </p>
                </section>

                <section>
                  <h4> How we share your information</h4>

                  <p style={{ fontSize: "16px" }}>
                    We may share your information in the following
                    circumstances:
                  </p>

                  <p style={{ fontSize: "16px" }}>
                    <ul>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          With your consent:
                        </span>{" "}
                        Except for as outlined below, we only share your
                        information with third parties when you have directed us
                        to do so.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          When you connect with a Masoon Platform partner:
                        </span>{" "}
                        You may be provided with offers, products, and services
                        from third-party companies who integrate with our Masoon
                        Platform (“Platform Partner”). If you choose to interact
                        with a Platform Partner, apply for their services or
                        offerings or otherwise link or sync your account to a
                        Platform Partner’s product or service, you consent and
                        direct Masoon to share your information, including
                        personal information, to the Platform Partner providing
                        the service or offering. For example, when we send your
                        personal information to partners in order to generate
                        offers for you to review, when we send your application
                        information directly to our partners, or when we send
                        you to the partner’s site for you to provide the
                        information directly to them. In some cases, if you
                        click through to go to a Platform Partner’s site, you
                        will automatically be sending your personal information
                        to that Platform Partner. When this happens, you will
                        still have to submit your application on the Platform
                        Partner’s site. Remember that any information you
                        provide to a Platform Partner, whether through us or on
                        your own, will be subject to their privacy practices and
                        terms and conditions.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          When you connect to your social media account:
                        </span>{" "}
                        Some of our features enable you to connect to a social
                        media account or share information on social media
                        platforms, like Facebook and Twitter. Any information
                        you choose to share on social media may potentially be
                        visible to a global audience and will be subject to the
                        social media provider's privacy policies (not this
                        Privacy Statement). You should take care only to share
                        information on social media that you are comfortable
                        sharing.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          For research:
                        </span>{" "}
                        With appropriate controls, we may share information with
                        third-parties, such as academic institutions, government
                        and non-profit organizations, for research purposes or
                        to publish academic or policy-related materials. We only
                        share information in a way that would not allow any
                        individual to be identified.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          For joint features, sales, promotions and events:
                        </span>{" "}
                        We may share your information with third-party’s
                        companies who are jointly providing features, sales
                        initiatives, promotions or events with us.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          With financial services providers:
                        </span>{" "}
                        We may share personal Information with collection
                        agencies, credit bureaus and loan service providers, and
                        payment card association members. We may also share your
                        personal information with other companies, lawyers,
                        credit bureaus, agents, government agencies, and card
                        associations in connection with issues related to fraud,
                        credit, defaults, or debt collection.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          When you publicly post the information:
                        </span>{" "}
                        We may provide opportunities for you to publicly post
                        reviews, questions, comments, suggestions or other
                        content, which may include personal information, such as
                        your name or user name. Anything you share in a public
                        forum is public, and you should think carefully before
                        you decide to share.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          With service providers or agents:
                        </span>{" "}
                        We share personal information with our service providers
                        or agents who provide services on our behalf for the
                        purposes described in this Privacy Statement. Service
                        providers or agents are required to implement reasonable
                        privacy and information protection controls to maintain
                        the privacy and security of information provided to them
                        consistent with the privacy practices outlined in this
                        Statement. Service providers or agents may include
                        companies that assist us with our advertising, marketing
                        and sales efforts, help us with our technology offerings
                        (such as a hosting, security or anti-fraud providers)
                        and help us run our business.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          For mergers and acquisitions:
                        </span>{" "}
                        If we are involved with a merger, asset sale, financing,
                        liquidation, bankruptcy, or the acquisition of all or
                        part of our business to another company, we may share
                        your information with that company and its advisors
                        before and after the transaction date.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          No sale of personal information to third parties:
                        </span>{" "}
                        We do not and will not sell personal information to
                        third parties. We do share personal information with
                        third parties for the business purposes described in
                        this Statement.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          With our affiliates and subsidiaries and your right to
                          limit information sharing:
                        </span>{" "}
                        We may share your information with our affiliates and
                        subsidiaries for everyday business purposes as described
                        in this Statement, including for marketing purposes.
                        Certain laws may provide you with the right to limit our
                        information sharing activities in certain circumstances.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          Cookies and other tracking technologies:
                        </span>{" "}
                        You can find information on changing your browser
                        settings to opt-out of cookies in your browser settings.
                        If you disable some or all of the cookies the service,
                        or parts of the service may not work.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          For advertising and analytics:
                        </span>{" "}
                        Masoon may use advertising networks and other providers
                        to display advertising on our Masoon Platform or to
                        manage our advertising on other sites. Our advertising
                        partners may place cookies on unaffiliated websites in
                        order to serve advertisements that may be relevant to
                        you based on your browsing activities and interests and
                        determine the effectiveness of such advertisements.
                      </li>
                      <li style={{ color: "#515365", paddingBottom: "5px" }}>
                        <span
                          className="text-dark"
                          style={{ fontWeight: "bold" }}
                        >
                          For legal reasons:
                        </span>{" "}
                        We may share your information with third-parties for
                        legal reasons without your consent, and as permitted by
                        law.
                      </li>
                    </ul>
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}

export default PrivacyPolicy;
