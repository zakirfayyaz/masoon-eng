import React, { Component } from "react";
import termsList from "./termsList";

class TermsAndConditions extends Component {
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
              <div class="col-md-12 col-sm-12 col-12 text-left"></div>
            </div>
          </div>
        </div>

        <div
          id="privacyWrapper"
          class="container"
          style={{ paddingLeft: "5px", paddingRight: "5px" }}
        >
          <div class="privacy-container" style={{ marginBottom: "30px" }}>
            <h2 class="main-heading text-dark">Terms of Service</h2>
            <div class="privacyContent">
              <div class="d-flex justify-content-between privacy-head">
                <div class="privacyHeader">
                  <p style={{ fontSize: "16px" }}>
                    These Terms of Service (“Agreement”) set forth the terms and
                    conditions that apply to your access and use of the MASOON
                    website, mobile app, content, products, and related services
                    (collectively the “MASOON Service(s)” or “Services”).
                    “Masoon” or “we” or “us”). As used in this Agreement, the
                    term "Site" includes all MASOON Services websites, pages
                    that are associated with or within each website and all
                    devices, applications or services that Masoon operates or
                    offers that link to this Agreement. By accepting
                    electronically (for example, clicking “I Agree”),
                    installing, accessing or using the Services, you agree to be
                    <a
                      className="text-primary"
                      href="/privacy-policy"
                      style={{ fontWeight: "500" }}
                    >
                      {" "}
                      <u> Masoon Privacy Statement</u>
                    </a>
                    , as they may be amended from time to time in the future. If
                    you do not agree to this Agreement, then you may not use the
                    Services.
                  </p>
                  <p>
                    <ol>
                      {termsList.map((item) => (
                        <li style={{ fontSize: "16px" }}>{item}</li>
                      ))}
                    </ol>
                  </p>
                </div>
              </div>

              <div class="privacy-content-container">
                <section>
                  <h5>1. Accepting the Terms</h5>
                  <p style={{ fontSize: "16px" }}>
                    By accessing or using the MASOON Services information,
                    tools, features, software and/or functionality, including
                    content, updates, and any new releases, you agree to be
                    bound by this Agreement, whether you access or use the
                    Services as a visitor (which means that you simply browse
                    the Services without registering or creating an account), or
                    a customer (which means that you have created or registered
                    for an account with us). If you wish to become a customer or
                    want to make use of the Services, you must read and confirm
                    your acceptance of this Agreement.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    You may not use any of the Services and you may not accept
                    this Agreement if you are not legally authorized to accept
                    and be bound by these terms or are not at least 18 years of
                    age to form a binding contract with Masoon.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Before you continue, you should print or save a copy of this
                    Agreement for your records
                  </p>
                </section>

                <section>
                  <h5 class="policy-info-ques">
                    2. Privacy and Use of Your Personal Information
                  </h5>

                  <p style={{ fontSize: "16px" }}>
                    You can view the
                    <a
                      className="text-primary"
                      href="/privacy-policy"
                      style={{ fontWeight: "500" }}
                    >
                      {" "}
                      <u> Masoon Privacy Statement</u>
                    </a>{" "}
                    here and on the Site for the Services. You agree to the
                    applicable Masoon Privacy Statement, and any changes
                    published by Masoon. You agree that Masoon may use and
                    maintain your data according to the Masoon’s Privacy
                    Statement, as part of the Services. You give Masoon
                    permission to combine information you enter or upload for
                    the Services with that of other users of the Services and/or
                    other Masoon services. For example, this means that Masoon
                    may use your and other users’ non-identifiable, aggregated
                    data to improve the Services or to design promotions. Masoon
                    may access or store personal information in multiple
                    countries, including countries outside of your own country
                    to the extent permitted by applicable law.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    By providing a telephone number in connection with the
                    Services, you verify that you are the current subscriber or
                    owner of that number. In addition, you expressly agree that
                    Masoon and its affiliates may contact you by telephone or
                    text message (including through the use of artificial
                    voices, prerecorded voice messages, and/or autodialed calls
                    and text messages) to the telephone number you provide or to
                    any number provided to us on your behalf, for various
                    purposes including verifying your identity, providing you
                    with important notices regarding your account or use of the
                    Services, fulfilling yours requests, or letting you know
                    about promotions or Masoon services we think we may be of
                    interest to you. Your consent to receive automated calls and
                    texts is completely voluntary, and you may opt out any time.
                    You acknowledge that if you do not opt out, we may contact
                    you even if your number is listed on a do-not-call list or
                    if you cancel your account or terminate your relationship
                    with us. You do not have to agree to receive promotional
                    calls or texts as a condition of purchasing any goods or
                    services.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    You understand and agree, for any text messages sent to you
                    in connection with the Services, that: (a) message frequency
                    may vary, (b) message and data rates may apply, and Masoon
                    is not responsible for these charges, (c) you may reply HELP
                    for information, (d) you can reply STOP to opt out at any
                    time (though if you do, you agree to receive a single
                    message confirming your opt-out), and (e) neither Masoon nor
                    mobile carriers involved in the text messaging are liable
                    for delayed or undelivered messages. To opt out of automated
                    voice calls, you must provide us with written notice
                    revoking your consent by contacting us as described in our
                    Privacy Statement, and including your full name, mailing
                    address, account number, and the specific phone number(s)
                    you wish to opt out of such calls.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    You also acknowledge and agree that your telephone calls to
                    or from Masoon or its affiliates may be monitored and
                    recorded. You must notify us immediately of any breach of
                    security or unauthorized use of your telephone. Although we
                    will not be liable for losses caused by any unauthorized use
                    of your telephone, you may be liable for our losses due to
                    such unauthorized use.
                  </p>
                </section>

                <section>
                  <h5>3. Description of the Services </h5>

                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    The MASOON Service is a personal finance information
                    management service that allows you to consolidate and track
                    your financial information. The MASOON Service is provided
                    to you by Masoon without charge (it is free) and is meant to
                    provide you with your information to allow you to organize
                    and manage your finances.
                  </p>

                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    The Services may also present you information relating to
                    third party products or services (“Masoon Offers”) that you
                    may be interested in as well as provide you general tips,
                    recommendations and educational material.
                  </p>
                </section>

                <section>
                  <h5>4. Account Information from Third Party Sites</h5>

                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    Users may direct Masoon to retrieve their own information
                    maintained online by third-parties with which they have
                    customer relationships, maintain accounts or engage in
                    financial transactions (“Account Information”). Masoon works
                    with one or more online service providers to access this
                    Account Information. Masoon does not review the Account
                    Information for accuracy, legality or non-infringement.
                    Masoon is not responsible for the Account Information or
                    products and services offered by or on third-party sites.
                  </p>

                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    Masoon cannot always foresee or anticipate technical or
                    other difficulties which may result in failure to obtain
                    data or loss of data, and personalization settings, or from
                    device operating environment malfunctions or other service
                    interruptions. Masoon cannot assume responsibility for the
                    timeliness, accuracy, deletion, non-delivery or failure to
                    store any user data, communications or personalization
                    settings. For example, when displayed through the Services,
                    Account Information is only as fresh as the time shown,
                    which reflects when the information is obtained from such
                    sites. Such information may be more up-to-date when obtained
                    directly from the relevant sites. You can refresh your
                    Account Information through the Services, in the manner
                    prescribed in the associated instructions.
                  </p>
                </section>
                <section>
                  <h5>5. Masoon Offers and Third-Party Links</h5>

                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    The Services may include sponsored links from advertisers.
                    The Services may display Masoon Offers that may be custom
                    matched to you based on information stored in the Services,
                    queries made through the Services or other information. We
                    may disclose when a particular Masoon Offer is sponsored or
                    otherwise provided by a third party.
                  </p>

                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    In connection with Masoon Offers, the Services will provide
                    links to other websites belonging to Masoon advertisers and
                    other third parties. Masoon Offers are provided to you as a
                    convenience. Masoon does not endorse, warrant or guarantee
                    the products or services available through the Masoon Offers
                    (or any other third-party products or services advertised on
                    or linked from our site), whether or not sponsored. Masoon
                    is not an agent or broker or otherwise responsible for the
                    activities or policies of those websites. Masoon does not
                    guarantee that the loan, investment, plan or other service
                    terms, rates or rewards offered by any particular advertiser
                    or other third party on the Sites are actually the terms
                    that may be offered to you if you pursue the offer or that
                    they are the best terms or lowest rates available in the
                    market. Information in the Masoon Offers are provided by the
                    third parties, and any offer is subject to the third
                    parties’ review of your information. Masoon may receive
                    compensation from third parties which may impact the
                    placement and availability of the Masoon Offers.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    If you elect to use or purchase services from third parties,
                    you are subject to their terms and conditions and privacy
                    policy.
                  </p>
                </section>
                <section>
                  <h5>
                    6. Your Registration Information and Electronic
                    Communications
                  </h5>

                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    In order to allow you to use the Services, you will need to
                    sign up for an account with Masoon. We may verify your
                    identity. You authorize us to make any inquiries we consider
                    necessary to validate your identity. These inquiries may
                    include asking you for further information, requiring you to
                    provide your full address, your date of birth and/or
                    requiring you to take steps to confirm ownership of your
                    email address or financial instruments. If you do not
                    provide this information or Masoon cannot verify your
                    identity, we can refuse to allow you to use the Services.
                  </p>

                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    You agree and understand that you are responsible for
                    maintaining the confidentiality of your password which,
                    together with your Login-ID, allows you to access the Sites.
                    That Login-ID and password, together with any mobile number
                    or other information you provide form your “Registration
                    Information.” By providing us with your e-mail address, you
                    consent to receive all required notices and information.
                    Electronic communications may be posted on the Services site
                    and/or delivered to your e-mail address that we have on file
                    for you. It is your responsibility to provide us with your
                    complete, accurate contact information, or promptly update
                    us in the event you change your information or ownership of
                    your telephone number or other information changes. If we
                    discover that any information provided in connection with
                    your account is false or inaccurate, we may suspend or
                    terminate your account at any time. If you use the MASOON
                    Live Services, you understand and agree that a MASOON
                    Financial Expert may make certain changes to your account or
                    your information as described below. Notices will be
                    provided in HTML (or, if your system does not support HTML,
                    in plain-text) in the text of the e-mail or through a link
                    to the appropriate page on our site, accessible through any
                    standard, commercially available internet browser.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    You may print a copy of any electronic communications and
                    retain it for your records. We reserve the right to
                    terminate or change how we provide electronic communications
                    and will provide you with appropriate notice in accordance
                    with applicable law in Saudi Arabia.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    If you become aware of any unauthorized use of your
                    Registration or Account Information for the Services, you
                    agree to notify Masoon immediately at the email address -
                    <a
                      href="mailto:security@Masoon-app.com"
                      className="text-primary"
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      security@Masoon-app.com
                    </a>
                    .
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    If you believe that your Registration or Account Information
                    or device that you use to access the Services has been lost
                    or stolen, or that someone is using your account without
                    your permission, you must notify us immediately.
                  </p>
                </section>
                <section>
                  <h5>7. Your Use of the Services</h5>

                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    Your right to access and use the Sites and the Services is
                    personal to you and is not transferable by you to any other
                    person or entity. You are only entitled to access and use
                    the Sites and Services for lawful purposes. Accurate records
                    enable Masoon to provide the Services to you. You must
                    provide true, accurate, current and complete information
                    about your accounts maintained at other websites, as
                    requested in our “add account” setup forms, and you may not
                    misrepresent your Registration and Account Information. In
                    order for the Services to function effectively, you must
                    also keep your Registration and Account Information up to
                    date and accurate. If you do not do this, the accuracy and
                    effectiveness of the Services will be affected. You
                    represent that you are a legal owner of, and that you are
                    authorized to provide us with, all Registration and Account
                    Information and other information necessary to facilitate
                    your use of the Services.
                  </p>

                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    Your access and use of the Services may be interrupted from
                    time to time for any of several reasons, including, without
                    limitation, the malfunction of device operating environment
                    or other equipment, periodic updating, maintenance or repair
                    of the Services or other actions that Masoon, in its sole
                    discretion, may elect to take. In no event will Masoon be
                    liable to any party for any loss, cost, or damage that
                    results from any scheduled or unscheduled downtime or use of
                    a rooted or jailbroken mobile device.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    Your sole and exclusive remedy for any failure or
                    non-performance of the Services, including any associated
                    software or other materials supplied in connection with such
                    services, will be for Masoon to use commercially reasonable
                    efforts to effectuate an adjustment or repair of the
                    applicable service.
                  </p>
                </section>
                <section>
                  <h5>8. Use with Your Mobile Device</h5>

                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    Use of these Services may be available through a compatible
                    mobile device, Internet and/or network access and may
                    require software. You agree that you are solely responsible
                    for these requirements, including any applicable changes,
                    updates and fees as well as the terms of your agreement with
                    your mobile device and telecommunications provider. MASOON
                    MAKES NO WARRANTIES OR REPRESENTATIONS OF ANY KIND, EXPRESS,
                    STATUTORY OR IMPLIED AS TO: (i) THE AVAILABILITY OF
                    TELECOMMUNICATION SERVICES FROM YOUR PROVIDER AND ACCESS TO
                    THE SERVICES AT ANY TIME OR FROM ANY LOCATION; (ii) ANY
                    LOSS, DAMAGE, OR OTHER SECURITY INTRUSION OF THE
                    TELECOMMUNICATION SERVICES; (iii) ANY LOSS, DAMAGE, OR OTHER
                    SECURITY INTRUSION FROM THE USE OF ROOTKIT MOBILE DEVICE OR
                    YOUR DEVICE OPERATING ENVIRONMENT; AND (iv) ANY DISCLOSURE
                    OF INFORMATION TO THIRD PARTIES OR FAILURE TO TRANSMIT ANY
                    DATA, COMMUNICATIONS OR SETTINGS CONNECTED WITH THE
                    SERVICES.
                  </p>
                </section>
                <section>
                  <h5>9. Online and Mobile Alerts</h5>

                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    Masoon may from time to time provide automatic alerts and
                    voluntary account-related alerts. Automatic alerts may be
                    sent to you following certain changes to your account or
                    information, such as a change in your Registration
                    Information.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    Voluntary account alerts may be turned on by default as part
                    of the Services. They may then be customized, deactivated or
                    reactivated by you. These alerts allow you to choose alert
                    messages for your accounts. Masoon may add new alerts from
                    time to time, or cease to provide certain alerts at any time
                    upon its sole discretion. Each alert has different options
                    available, and you may be asked to select from among these
                    options upon activation of your alerts service.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    You understand and agree that any alerts provided to you
                    through the Services may be delayed or prevented by a
                    variety of factors. Masoon may make commercially reasonable
                    efforts to provide alerts in a timely manner with accurate
                    information, but cannot guarantee the delivery, timeliness,
                    or accuracy of the content of any alert. Masoon will not be
                    liable for any delays, failure to deliver, or misdirected
                    delivery of any alert; for any errors in the content of an
                    alert; or for any actions taken or not taken by you or any
                    third party in reliance on an alert.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    Electronic alerts will be sent to the email address or
                    mobile number you have provided for the Services. If your
                    email address or your mobile number changes, you are
                    responsible for informing us of that change. Alerts may also
                    be sent to a mobile device that accepts text messages.
                    Changes to your email address and mobile number will apply
                    to all of your alerts.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    {" "}
                    Because alerts are not encrypted, we will never include your
                    passcode. However, alerts may include your Login ID and some
                    information about your accounts. Depending upon which alerts
                    you select, information such as an account balance or the
                    due date for your credit card payment may be included.
                    Anyone with access to your email will be able to view the
                    content of these alerts. At any time, you may disable future
                    alerts.
                  </p>
                </section>
                <section>
                  <h5>10. Rights You Grant to Us</h5>

                  <p style={{ fontSize: "16px" }}>
                    By submitting information, data, passwords, usernames, PINs,
                    other log-in information, materials and other content to
                    Masoon through the Services, you are licensing that content
                    to Masoon for the purpose of providing the Services. Masoon
                    may use and store the content in accordance with this
                    Agreement and our Privacy Statement. You represent that you
                    are entitled to submit it to Masoon for use for this
                    purpose, without any obligation by Masoon to pay any fees or
                    be subject to any restrictions or limitations. By using the
                    Services, you expressly authorize Masoon to access your
                    Account Information maintained by identified third parties,
                    on your behalf as your agent, and you expressly authorize
                    such third parties to disclose your information to us. When
                    you use the “Add Accounts” feature of the Services, you will
                    be directly connected to the website for the third party you
                    have identified. Masoon will submit information including
                    usernames and passwords that you provide to log into the
                    Site. You hereby authorize and permit Masoon to use and
                    store information submitted by you to accomplish the
                    foregoing and to configure the Services so that it is
                    compatible with the third party sites for which you submit
                    your information. For purposes of this Agreement and solely
                    to provide the Account Information to you as part of the
                    Services, you grant Masoon a limited power of attorney, and
                    appoint Masoon as your attorney-in-fact and agent, to access
                    third party sites, retrieve and use your information with
                    the full power and authority to do and perform each thing
                    necessary in connection with such activities, as you could
                    do in person. YOU ACKNOWLEDGE AND AGREE THAT WHEN MASOON IS
                    ACCESSING AND RETRIEVING ACCOUNT INFORMATION FROM THIRD
                    PARTY SITES, MASOON IS ACTING AS YOUR AGENT, AND NOT AS THE
                    AGENT OF OR ON BEHALF OF THE THIRD PARTY THAT OPERATES THE
                    THIRD PARTY SITE. You understand and agree that the Services
                    are not sponsored or endorsed by any third parties
                    accessible through the Services. Masoon is not responsible
                    for any payment processing errors or fees or other
                    Services-related issues, including those issues that may
                    arise from inaccurate account information.
                  </p>
                </section>
                <section>
                  <h5>11. Masoon’s Intellectual Property Rights</h5>

                  <p style={{ fontSize: "16px" }}>
                    The contents of the Services, including its “look and feel”
                    (e.g., text, graphics, images, logos and button icons),
                    photographs, editorial content, notices, software (including
                    html-based computer programs) and other material are
                    protected under applicable copyright, trademark laws in
                    Saudi Arabia. The contents of the Services belong or are
                    licensed to Masoon or its software or content suppliers.
                    Masoon grants you the right to view and use the Services
                    subject to these terms. You may download or print a copy of
                    information for the Services for your personal, internal and
                    non-commercial use only. Any distribution, reprint or
                    electronic reproduction of any content from the Services in
                    whole or in part for any other purpose is expressly
                    prohibited without our prior written consent. You agree not
                    to use, nor permit any third party to use, the Site or the
                    Services or content in a manner that violates any applicable
                    law, regulation or this Agreement.
                  </p>
                </section>
                <section>
                  <h5>12. Access and Interference</h5>

                  <p style={{ fontSize: "16px" }}>
                    You agree that you will not:
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    <ul>
                      <li>
                        Use any robot, spider, scraper, deep link or other
                        similar automated data gathering or extraction tools,
                        program, algorithm or methodology to access, acquire,
                        copy or monitor the Services or any portion of the
                        Services, without Masoon’s express written consent,
                        which may be withheld in Masoon’s sole discretion;{" "}
                      </li>
                      <li>
                        Use or attempt to use any engine, software, tool, agent,
                        or other device or mechanism (including without
                        limitation browsers, spiders, robots, avatars or
                        intelligent agents) to navigate or search the services,
                        other than the search engines and search agents
                        available through the Services and other than generally
                        available third-party web browsers (such as Microsoft
                        Internet Explorer or Safari);{" "}
                      </li>
                      <li>
                        Post or transmit any file which contains viruses, worms,
                        Trojan horses or any other contaminating or destructive
                        features, such as rootkits, key loggers, bots or that
                        otherwise interfere with the proper working of the
                        Services;{" "}
                      </li>
                      <li>
                        Attempt to decipher, decompile, disassemble, or
                        reverse-engineer any of the software comprising or in
                        any way making up a part of the Services; or{" "}
                      </li>
                      <li>
                        Attempt to gain unauthorized access to any portion of
                        the Services.{" "}
                      </li>
                    </ul>
                  </p>
                </section>
                <section>
                  <h5>13. Rules for Posting</h5>

                  <p style={{ fontSize: "16px" }}>
                    As part of the Services, Masoon may allow you to post
                    content on bulletin boards, blogs and at various other
                    publicly available locations on the Sites. These forums may
                    be hosted by Masoon or by one of our third party service
                    providers on Masoon’s behalf. You agree in posting content
                    to follow certain rules.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    <ul>
                      <li>
                        You are responsible for all content you submit, upload,
                        post or store through the Services.
                      </li>
                      <li>
                        You are responsible for all materials ("Content")
                        uploaded, posted or stored through your use of the
                        Services. You grant Masoon a worldwide, royalty-free,
                        non-exclusive license to host and use any Content
                        provided through your use of the Services. Archive your
                        Content frequently. You are responsible for any lost or
                        unrecoverable Content. You must provide all required and
                        appropriate warnings, information and disclosures.
                        Masoon is not responsible for the Content or data you
                        submit through the Services. By submitting content to
                        us, you represent that you have all necessary rights and
                        hereby grant us a perpetual, worldwide, non-exclusive,
                        royalty-free, sublicenseable and transferable license to
                        use, reproduce, distribute, prepare derivative works of,
                        modify, display, and perform all or any portion of the
                        content in connection with Services and our business,
                        including without limitation for promoting and
                        redistributing part or all of the site (and derivative
                        works thereof) in any media formats and through any
                        media channels. You also hereby grant each user a
                        non-exclusive license to access your posted content
                        through the Sites, and to use, reproduce, distribute,
                        prepare derivative works of, display and perform such
                        content as permitted through the functionality of the
                        Services and under this Agreement.
                      </li>
                      <li>
                        You agree not to use, nor permit any third party to use,
                        the Services to a) post or transmit any message which is
                        libelous or defamatory, or which discloses private or
                        personal matters concerning any person; b)post or
                        transmit any message, data, image or program that is
                        indecent, obscene, pornographic, harassing, threatening,
                        abusive, hateful, racially or ethnically offensive; that
                        encourages conduct that would be considered a criminal
                        offense, give rise to civil liability or violate any
                        law; or that is otherwise inappropriate; c)post or
                        transmit any message, data, image or program that would
                        violate the property rights of others, including
                        unauthorized copyrighted text, images or programs, trade
                        secrets or other confidential proprietary information,
                        and trademarks or service marks used in an infringing
                        fashion; or d) interfere with other users’ use of the
                        Service, including, without limitation, disrupting the
                        normal flow of dialogue in an interactive area of the
                        Sites, deleting or revising any content posted by
                        another person or entity, or taking any action that
                        imposes a disproportionate burden on the Service
                        infrastructure or that negatively affects the
                        availability of the Service to others.
                      </li>
                      <li>
                        Except where expressly permitted, you may not post or
                        transmit charity requests; petitions for signatures;
                        franchises, distributorship, sales representative agency
                        arrangements, or other business opportunities (including
                        offers of employment or contracting arrangements); club
                        memberships; chain letters; or letters relating to
                        pyramid schemes. You may not post or transmit any
                        advertising, promotional materials or any other
                        solicitation of other users to use goods or services
                        except in those areas (e.g., a classified bulletin
                        board) that are designated for such purpose.
                      </li>
                      <li>
                        You agree that any employment or other relationship you
                        form or attempt to form with an employer, employee, or
                        contractor whom you contact through areas of the Sites
                        that may be designated for that purpose is between you
                        and that employer, employee, or contractor alone, and
                        not with us.
                      </li>
                      <li>
                        You may not copy or use personal identifying or business
                        contact information about other users without their
                        permission. Unsolicited e-mails, mailings, telephone
                        calls, or other communications to individuals or
                        companies whose contact details you obtain through the
                        Services are prohibited.
                      </li>
                      <li>
                        You agree that we may use any content, feedback,
                        suggestions, or ideas you post in any way, including in
                        future modifications of the Service, other products or
                        services, advertising or marketing materials. You grant
                        us a perpetual, worldwide, fully transferable,
                        sublicensable, non-revocable, fully paid-up, royalty
                        free license to use the content and feedback you provide
                        to us in any way.
                      </li>
                    </ul>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    The Services may include a community forum or other social
                    features to exchange information with other users of the
                    Services and the public. Masoon does not support and is not
                    responsible for the content in these community forums.
                    Please use respect when you interact with other users. Do
                    not reveal information that you do not want to make public.
                    Users may post hypertext links to content of third parties
                    for which Masoon is not responsible.
                  </p>
                </section>
                <section>
                  <h5>14. Social media sites</h5>

                  <p style={{ fontSize: "16px" }}>
                    Masoon may provide experiences on social media and other
                    platforms such as Facebook®, Twitter® and LinkedIn® that
                    enable online sharing and collaboration among users of those
                    sites. Any content you post, such as pictures, information,
                    opinions, or any Personal Information that you make
                    available to other participants on these social platforms,
                    is subject to the terms of service and privacy policies of
                    those platforms. Please refer to those platforms to better
                    understand your rights and obligations with regard to such
                    content.
                  </p>
                </section>
                <section>
                  <h5>15. Disclaimer of Representations and Warranties</h5>

                  <p style={{ fontSize: "16px" }}>
                    THE SITES, SERVICES AND ADD-ON SERVICES (COLLECTIVELY
                    “SERVICES”), INFORMATION, DATA, FEATURES, AND ALL CONTENT
                    AND ALL SERVICES AND PRODUCTS ASSOCIATED WITH THE SERVICES
                    OR PROVIDED THROUGH THE SERVICES (WHETHER OR NOT SPONSORED)
                    ARE PROVIDED TO YOU ON AN “AS-IS” AND “AS AVAILABLE” BASIS.
                    MASOON, ITS AFFILIATES, AND ITS THIRD PARTY PROVIDERS,
                    LICENSORS, DISTRIBUTORS OR SUPPLIERS (COLLECTIVELY,
                    "SUPPLIERS") MAKE NO REPRESENTATIONS OR WARRANTIES OF ANY
                    KIND, EXPRESS OR IMPLIED, AS TO THE CONTENT OR OPERATION OF
                    THE SITE OR OF THE SERVICES. YOU EXPRESSLY AGREE THAT YOUR
                    USE OF THE SERVICES IS AT YOUR SOLE RISK.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    NEITHER MASOON OR ITS SUPPLIERS MAKE ANY REPRESENTATIONS,
                    WARRANTIES OR GUARANTEES, EXPRESS OR IMPLIED, REGARDING THE
                    ACCURACY, RELIABILITY OR COMPLETENESS OF THE CONTENT ON THE
                    SITES OR OF THE SERVICES (WHETHER OR NOT SPONSORED), AND
                    EXPRESSLY DISCLAIMS ANY WARRANTIES OF NON-INFRINGEMENT OR
                    FITNESS FOR A PARTICULAR PURPOSE. NEITHER MASOON OR ITS
                    SUPPLIERS MAKE ANY REPRESENTATION, WARRANTY OR GUARANTEE
                    THAT THE CONTENT THAT MAY BE AVAILABLE THROUGH THE SERVICES
                    IS FREE OF INFECTION FROM ANY VIRUSES OR OTHER CODE OR ROOT
                    KITS OR COMPUTER PROGRAMMING ROUTINES THAT CONTAIN
                    CONTAMINATING OR DESTRUCTIVE PROPERTIES OR THAT ARE INTENDED
                    TO DAMAGE, SURREPTITIOUSLY INTERCEPT OR EXPROPRIATE ANY
                    SYSTEM, DEVICE OPERATING ENVIRONMENT, DATA OR PERSONAL
                    INFORMATION.
                  </p>
                </section>
                <section>
                  <h5>
                    16. Financial Information is not Financial Planning, Broker
                    or Tax Advice
                  </h5>

                  <p style={{ fontSize: "16px" }}>
                    THE SERVICES ARE NOT INTENDED TO PROVIDE LEGAL, TAX OR
                    INVESTMENT/RETIREMENT PLANNING ADVICE OR INTENDED TO SERVE
                    AS TAX PREPARATION SERVICES. The Services are intended only
                    to assist you in your budgeting and decision-making and is
                    broad in scope. Your personal financial situation is unique,
                    and any information and advice obtained through the Service
                    may not be appropriate for your situation. Accordingly,
                    before making any final decisions or implementing any
                    financial strategy, you should consider obtaining additional
                    information and advice from your accountant or other
                    certified financial advisers who are fully aware of your
                    individual circumstances.
                  </p>
                </section>
                <section>
                  <h5>17. Limitations on Masoon’s Liability</h5>

                  <p style={{ fontSize: "16px" }}>
                    MASOON SHALL IN NO EVENT BE RESPONSIBLE OR LIABLE TO YOU OR
                    TO ANY THIRD PARTY, IN CASE OF USER’S MISUSE OR BREACH TO
                    THIS AGREEMENT.
                  </p>
                </section>
                <section>
                  <h5>18. Your Indemnification of Masoon</h5>

                  <p style={{ fontSize: "16px" }}>
                    You shall defend, indemnify and hold harmless Masoon and its
                    officers, directors, shareholders, and employees, from and
                    against all claims, suits, proceedings, losses, liabilities,
                    and expenses (including reasonable attorneys’ fees), whether
                    in tort, contract, or otherwise, that arise out of or
                    relate, including but not limited to attorney’s fees, in
                    whole or in part arising out of or attributable to any
                    breach of this Agreement or any activity by you in relation
                    to the Sites or your use of the Services, including add-on
                    Services and/or device operating environment.
                  </p>
                </section>
                <section>
                  <h5>19. Ending your relationship with MASOON-APP.COM</h5>

                  <p style={{ fontSize: "16px" }}>
                    This Agreement will continue to apply until terminated by
                    either you or Masoon (or any Masoon affiliate/subsidiary) as
                    set out below. If you want to terminate this legal agreement
                    for the Services and close your account, you can uninstall
                    MASOON from your mobile devices and this will delete all
                    your personal data.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Masoon may at any time, terminate its legal agreement with
                    you and access to the Services:
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    <ol style={{ listStyleType: "upper-alpha" }}>
                      <li>
                        If you have breached any provision of this Agreement (or
                        have acted in a manner which clearly shows that you do
                        not intend to, or are unable to comply with the
                        provisions of this Agreement);
                      </li>
                      <li>
                        if Masoon in its sole discretion believes it is required
                        to do so by law (for example, where the provision of the
                        Service to you is, or becomes, unlawful);
                      </li>
                      <li>
                        For any reason and at any time with or without notice to
                        you; or
                      </li>
                      <li>
                        Immediately upon notice to the e-mail address provided
                        by you as part of your Registration Information.
                      </li>
                    </ol>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    You acknowledge and agree that Masoon may immediately
                    deactivate or delete your account and all related
                    information and files in your account and/or prohibit any
                    further access to all files and the Services by you.
                    Further, you agree that Masoon will not be liable to you or
                    any third party for any termination of your access to the
                    Services.
                  </p>
                </section>
                <section>
                  <h5>20. Modifications</h5>

                  <p style={{ fontSize: "16px" }}>
                    Masoon reserves the right at any time and from time to time
                    to modify or discontinue, temporarily or permanently, the
                    Sites or Services, including add-on Services with or without
                    notice. Masoon reserves the right to change the Services,
                    including fees as may be applicable, in our sole discretion
                    and from time to time. In such event, if you are a paid user
                    to add-on subscription Services, Masoon will provide notice
                    to you. If you do not agree to the changes after receiving a
                    notice of the change to the Services, you may stop using the
                    Services. Your use of the Services, after you are notified
                    of any change(s) will constitute your agreement to such
                    change(s). You agree that Masoon will not be liable to you
                    or to any third party for any modification, suspensions, or
                    discontinuance of the Services.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Masoon may modify this Agreement from time to time. Any and
                    all changes to this Agreement may be provided to you by
                    electronic means (i.e., via email or by posting the
                    information on the Sites). In addition, the Agreement will
                    always indicate the date it was last revised. You are deemed
                    to accept and agree to be bound by any changes to the
                    Agreement when you use the Services after those changes are
                    posted.
                  </p>
                </section>
                <section>
                  <h5>21. Governing Law and Forum for Disputes</h5>

                  <p style={{ fontSize: "16px" }}>
                    This agreement and any future disputes are subject to Saudi
                    law only.
                  </p>
                </section>
                <section>
                  <h5>
                    22. Allegations of Copyright and Trademark Infringements
                  </h5>

                  <p style={{ fontSize: "16px" }}>
                    Masoon respects the intellectual property rights of others
                    and Masoon asks that users of the Site and Services do the
                    same. If you believe that your intellectual property is
                    being used on the Site in a way that constitutes copyright
                    infringement, please provide our Designated Agent (set forth
                    below) the following information:
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    <ul>
                      <li>
                        A physical or electronic signature of a person
                        authorized to act on behalf of the owner of an exclusive
                        right that is allegedly infringed.
                      </li>
                      <li>
                        Identification of the copyrighted work claimed to have
                        been infringed, or, if multiple copyrighted works at a
                        single online site are covered by a single notification,
                        a representative list of such works at that site.
                      </li>
                      <li>
                        Identification of the material that is claimed to be
                        infringing or to be the subject of infringing activity
                        and that is to be removed or access to which is to be
                        disabled, and information reasonably sufficient to
                        permit the service provider to locate the material.
                      </li>
                      <li>
                        Information reasonably sufficient to permit the service
                        provider to contact the complaining party, such as an
                        address, telephone number, and, if available, an
                        electronic mail address at which the complaining party
                        may be contacted.
                      </li>
                      <li>
                        A statement that the complaining party has a good faith
                        belief that use of the material in the manner complained
                        of is not authorized by the copyright owner, its agent,
                        or the law.
                      </li>
                      <li>
                        A statement that the information in the notification is
                        accurate, and under penalty of perjury, that the
                        complaining party is authorized to act on behalf of the
                        owner of an exclusive right that is allegedly infringed.
                      </li>
                    </ul>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    The information specified above must be sent to Masoon’s
                    Designated Agent, whose contact information is as follows:
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Masoon Inc.
                    <br></br>
                    Attention: HQ-Electro Designated Agent
                    <br></br> Anas Ibn Malik Rd, Alyasmin
                    <br></br> Riyadh 13326
                    <br></br>Email:{" "}
                    <a
                      className="text-primary"
                      href="mailto:info@HQ-electro.com"
                    >
                      info@HQ-electro.com
                    </a>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Please note that Copyright Acts may impose liability for
                    damages on any person who knowingly sends meritless notices
                    of infringement. Please do not make false claims.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Any information or correspondence that you provide to Masoon
                    may be shared with third parties, including the person who
                    provided Masoon with the allegedly infringing material.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    Upon receipt of a bona fide infringement notification by the
                    Designated Agent, it is Masoon’s policy to remove or disable
                    access to the infringing material, notify the user that it
                    has removed or disabled access to the material, and, for
                    repeat offenders, to terminate such user's access to the
                    service.
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    If you believe that your content should not have been
                    removed for alleged copyright infringement, you may send
                    Masoon’s Designated Agent a written counter-notice with the
                    following information:
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    <ul style={{ fontSize: "16px" }}>
                      <li>
                        Identification of the copyrighted work that was removed,
                        and the location on the Site where it would have been
                        found prior to its removal;
                      </li>
                      <li>
                        A statement, under penalty of perjury, that you have a
                        good faith belief that the content was removed as a
                        result of a mistake or misidentification; and
                      </li>
                      <li>
                        Your physical or electronic signature, together with
                        your contact information (address, telephone number and,
                        if available, email address).
                      </li>
                    </ul>
                  </p>
                  <p style={{ fontSize: "16px" }}>
                    If a counter-notice is received by the Designated Agent, we
                    may send a copy of the counter-notice to the original
                    complaining party informing that person that it may replace
                    the removed material or cease disabling it in 10 business
                    days. Unless the copyright owner files an action seeking a
                    court order against the user, the removed material may be
                    replaced or access to it restored in 10 to 14 business days
                    or more after receipt of the counter-notice, at our
                    discretion.
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

export default TermsAndConditions;
