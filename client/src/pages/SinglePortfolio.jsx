import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { config } from "../config";
import parse from "react-html-parser";
// import moment from "moment";
import "chartjs-adapter-moment";
import "./SingleProfile.css";

export function SinglePortFolio({ match }) {
  const [pf, setPf] = useState(null);
  const [navs, setNavs] = useState([]);
  const [navTime, setNavTime] = useState("1y");
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get("/api/getpfs");
        const data2 = await axios.get("/api/getnavs/" + navTime);
        const ourPf = data.data.filter(
          (pdf) => pdf.Id.toString() === match.params.id
        )[0];
        setPf(ourPf);
        setNavs(
          data2.data.filter((nav) => nav.productCode === ourPf.productCode)
        );
      } catch (error) {
        window.location.reload();
      }
    };
    getData();
  }, [match, navTime]);

  if (pf) {
    const getPercent = (data) => {
      if (data === "nav") {
        return Math.round(
          ((navs[navs.length - 1].navValue - navs[0].navValue) /
            navs[0].navValue) *
            100
        );
      } else {
        return Math.round(
          ((navs[navs.length - 1].BenchmarkNAV - navs[0].BenchmarkNAV) /
            navs[0].navValue) *
            100
        );
      }
    };
    return (
      <div className="">
        <header className="Header__header__1qRCL">
          <div className="Header__header-container__2v8Mg app-container">
            <div className="Header__header-left__1nDkK">
              <a className="Header__link-logo__2eERP" href="/">
                <img
                  className="Header__logo__2jKwz"
                  src="https://assets.smallcase.com/images/publishers/azh-Consultants/logo.png"
                  alt="AZH Consultants LLP"
                />
              </a>
            </div>
            <div className="Header__header-right__3MaaF">
              <p className="link font-medium ml8 flex">
                See FAQs
                <span className="Display__web__HdJg1">
                  <i className="Header__arrow__1XukL icon-chevron-right"></i>
                </span>
              </p>
              <span className="Display__web__HdJg1">Have any questions?</span>
            </div>
          </div>
        </header>
        <div className="grid-container relative">
          <section className="banner-colored SmallcaseBanner__banner__1d7Nk">
            <div className="flex-start flex-direction-column-on-mobile SmallcaseBanner__smallcase-banner__1GYyx">
              <div className="flex-apart-top SmallcaseBanner__info-container__k90Zi">
                <img
                  className="img SmallcaseBanner__smallcase-image__1AGlH"
                  src="https://assets.smallcase.com/images/smallcases/160/CDGMO_0003.png"
                  style={{ fontSize: "26.666666666666668px" }}
                  alt="Credent Small &amp; Mid Cap Winners"
                />
                <div className="SmallcaseBanner__title-section__2lvy4">
                  <h1 className="ellipsis SmallcaseBanner__name__2GboS font-medium mb8">
                    {pf.ModelName}
                  </h1>
                  <div className="SmallcaseBanner__description__2bFnQ text-15 lh-157 mb8 text-dark">
                    {pf.Description}
                  </div>
                  <div className="badge bg-success mb-2">{pf.RiskCategory}</div>
                  <div className="d-block d-md-flex justify-content-between">
                    <div className="mb-1">
                      <small>Min. Investment Amount - </small>
                      <small className="fw-bold">{pf.MinInvestAmt}</small>
                    </div>
                    <div className="mb-1">
                      <small>Benchmark - </small>
                      <small className="fw-bold">{pf.BenchmarkReturn}</small>
                    </div>
                    <div className="mb-1">
                      <small>Time Horizon - </small>
                      <small className="fw-bold">{pf.Duration}</small>
                    </div>
                    <div className="mb-1">
                      <small>Expected CAGR - </small>
                      <small className="fw-bold">{pf.AnnualisedReturn}</small>
                    </div>
                    <div className="mb-1">
                      <small>No. of Stocks - </small>
                      <small className="fw-bold">{pf.MinSIPAmt}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="description_section">
            <div className="mt-4 mx-3 mx-md-0">
              <h1 className="mb-0 fw-bold">Overview</h1>
              <hr style={{ height: "2px" }} className="mt-2" />
              <div className="row">
                <div className="col-12 col-md-9 mb-3">
                  <div className="row d-flex align-items-center">
                    <div className="col-12 col-md-8 overview-line">
                      {parse(config[pf.Id])}
                    </div>
                    <div className="col-12 col-md-4">
                      <p className="d-block fw-bold mb-1">Factsheet</p>
                      <p className="d-block fw-bold">
                        Download key points about this IAP
                      </p>
                      <button className="btn btn-lg mt-2 btn-outline-dark">
                        Download Factsheet
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-3">
                  <button
                    className="btn btn-dark mb-2"
                    style={{ width: "100%" }}
                  >
                    Invest Now
                  </button>
                  <small className="text-center">
                    Already Invested? <a href="/">Login to Top Up</a>
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="past_performance_section">
            <div className="mt-4">
              <h1 className="mb-0 fw-bold mx-3 mx-md-0">
                Past Performanc vs Nifty 100 Index
              </h1>
            </div>
            <div className="container mt-4">
              <h1 className="mb-0">Return Comparision</h1>
              <hr
                style={{
                  width: "5%",
                  height: "6px",
                  background: "#1D3750",
                  opacity: 1,
                }}
              />
            </div>
            {navs.length !== 0 && (
              <Fragment>
                <div className="d-flex flex-column flex-md-row justify-content-between mx-3 mx-md-3">
                  <div className="mb-3">
                    <h1>
                      {pf.ModelName} vs {navs && navs[0].BenchMarkName}
                    </h1>
                    <div className="mt-4 mb-2 fw-bold d-flex justify-content-between">
                      <div
                        style={{
                          borderBottom:
                            navTime === "3m" ? "3px solid black" : "none",
                          cursor: "pointer",
                        }}
                        onClick={() => setNavTime("3m")}
                      >
                        3M
                      </div>
                      <div onClick={() => setNavTime("1y")}>
                        <div
                          style={{
                            borderBottom:
                              navTime === "1y" ? "3px solid black" : "none",
                            cursor: "pointer",
                          }}
                        >
                          1Y
                        </div>
                      </div>
                      <div
                        style={{
                          borderBottom:
                            navTime === "3y" ? "3px solid black" : "none",
                          cursor: "pointer",
                        }}
                        onClick={() => setNavTime("3y")}
                      >
                        3Y
                      </div>
                      <div
                        style={{
                          borderBottom:
                            navTime === "5y" ? "3px solid black" : "none",
                          cursor: "pointer",
                        }}
                        onClick={() => setNavTime("5y")}
                      >
                        5Y
                      </div>
                      <div
                        style={{
                          borderBottom:
                            navTime === "max" ? "3px solid black" : "none",
                          cursor: "pointer",
                        }}
                        onClick={() => setNavTime("max")}
                      >
                        Max
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="text-center fw-bold mx-5 mb-2 px-2">
                      Rs. 1 Cr invested would be
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gridGap: "10px",
                      }}
                    >
                      <div
                        className="bd-highlight"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "auto 1fr",
                        }}
                      >
                        <div
                          style={{
                            borderRadius: "50%",
                            width: "10px",
                            height: "10px",
                            background: "rgb(50, 36, 57)",
                          }}
                          className="me-1"
                        ></div>
                        <div>
                          <div>{pf.ModelName}</div>
                          <div className="d-flex justify-content-between">
                            <div className="fw-bold">
                              Rs.{" "}
                              {(1 + 1 * (getPercent("nav") / 100)).toFixed(2)}{" "}
                              Cr
                            </div>
                            <div
                              style={{
                                color: "lightgreen",
                                fontWeight: "bold",
                              }}
                            >
                              {getPercent("nav")}%
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="bd-highlight"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "auto 1fr",
                        }}
                      >
                        <div
                          style={{
                            borderRadius: "50%",
                            width: "10px",
                            height: "10px",
                            background: "rgb(196, 196, 196)",
                          }}
                          className="me-1"
                        ></div>
                        <div>
                          <div>{navs[0] && navs[0].BenchMarkName}</div>
                          <div className="d-flex justify-content-between">
                            <div className="fw-bold">
                              Rs.{" "}
                              {(
                                1 +
                                1 * (getPercent("benchmark") / 100)
                              ).toFixed(2)}{" "}
                              Cr
                            </div>
                            <div
                              style={{
                                color: "lightgreen",
                                fontWeight: "bold",
                              }}
                            >
                              {getPercent("benchmark")}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mx-3">
                  <Line
                    options={{
                      elements: {
                        point: {
                          radius: 0,
                        },
                      },
                      plugins: {
                        legend: {
                          position: "top-right",
                        },
                      },
                      scales: {
                        x: {
                          type: "time",
                          time: {
                            unit:
                              navTime === "3y" ||
                              navTime === "5y" ||
                              navTime === "max"
                                ? "year"
                                : "month",
                          },
                        },
                      },
                    }}
                    data={{
                      // labels: ["2017", "2018", "2019", "2020", "2021"],
                      datasets: [
                        {
                          label: pf.ModelName,
                          data: navs.map((n) => ({
                            x: n.navDate,
                            y: n.navValue,
                          })),
                          backgroundColor: ["rgb(50, 36, 57)"],
                          borderColor: ["rgb(50, 36, 57)"],
                          borderWidth: 4,
                        },
                        {
                          label: navs && navs[0].BenchMarkName,
                          data: navs.map((n) => ({
                            x: n.navDate,
                            y: n.BenchmarkNAV,
                          })),
                          backgroundColor: ["rgb(196, 196, 196)"],
                          borderColor: ["rgb(196, 196, 196)"],
                          borderWidth: 4,
                        },
                      ],
                    }}
                  />
                </div>
              </Fragment>
            )}
            <small className="d-block mx-3 my-3">
              Note: Past performance graph includes changes due to rebalance,
              events like stock splits &amp; mergers. Also, past performance
              doesn't guarantee future returns
            </small>
            <div className="values mx-3">
              <h1 className="bg-dark text-white text-center mt-2 py-2">
                Value of INR 1 Crore Invested In
              </h1>
              <h1
                className="text-center py-2 d-flex flex-column flex-md-row justify-content-evenly"
                style={{ borderBottom: "1px solid #1D3750" }}
              >
                <div>NS Industry Leaders - Rs. 1.57 Crore</div>
                <div className="vsLine d-none d-md-block"></div>
                <div>Vs</div>
                <div className="vsLine d-none d-md-block"></div>
                <div>Nifty 100 Index - Rs. 1.55 Crore</div>
              </h1>
            </div>
          </div>
          <div className="port_alloc mx-3">
            <div className="mt-4">
              <h1 className="mb-0 fw-bold">Portfolio Allocation</h1>
              <div className="row">
                <div className="col-12 col-md-6">
                  <h1
                    className="text-center fw-bold py-2"
                    style={{ backgroundColor: "#F1F2F2" }}
                  >
                    Top 5 Holdings
                  </h1>
                  <Doughnut
                    width="100%"
                    data={{
                      labels:
                        pf && pf.modelCompositionData.map((p) => p.ScripName),
                      datasets: [
                        {
                          label: "My First Dataset",
                          data:
                            pf &&
                            pf.modelCompositionData.map((p) => p.Weightage),
                          backgroundColor: [
                            "#f5895f",
                            "#fbeea0ff",
                            "#705152",
                            "#f1ab78",
                            "#705152",
                            "#d0465d",
                          ],
                        },
                      ],
                    }}
                    options={{
                      aspectRatio: 2 / 1,
                      layout: {
                        padding: 20,
                      },
                      plugins: {
                        legend: {
                          position: "right",
                        },
                      },
                    }}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <h1
                    className="text-center fw-bold py-2"
                    style={{ backgroundColor: "#F1F2F2" }}
                  >
                    Top 5 Sectors
                  </h1>
                  <Doughnut
                    width="100%"
                    data={{
                      labels: pf && pf.TopFiveSector.map((s) => s.S_SECTOR),
                      datasets: [
                        {
                          label: "My First Dataset",
                          data: pf && pf.TopFiveSector.map((s) => s.weightage),
                          backgroundColor: [
                            "#f5895f",
                            "#fbeea0ff",
                            "#705152",
                            "#f1ab78",
                            "#705152",
                            "#d0465d",
                          ],
                        },
                      ],
                    }}
                    options={{
                      aspectRatio: 2 / 1,
                      layout: {
                        padding: 20,
                      },
                      plugins: {
                        legend: {
                          position: "right",
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <footer className="Footer__footer-wrapper__eC-ci">
            <div className="Footer__container__3dfAC app-container">
              <div className="Footer__nobroker-info__2N0Wq app-container">
                <div className="Footer__footer-left__2Wdi7">
                  <a className="Footer__mv16__2_8i_" href="/">
                    <img
                      src="https://assets.smallcase.com/images/publishers/azh-Consultants/logo.png"
                      className="Footer__footer-logo__1ByAg"
                      alt=""
                    />
                  </a>
                  <div className="Footer__desc__10s3I text-14 lh-157 Footer__mv16__2_8i_">
                    Advisor Zaroori Hai is a comprehensive platform for
                    individuals wanting to make informed and timely financial
                    decisions and connect with expert advisors from across the
                    country.
                  </div>
                </div>
                <div className="Footer__nobroker-social__2t1t3">
                  <div className="text-right mb32 Footer__social-icons__vP2dl Footer__mv16__2_8i_">
                    <a
                      href="https://www.facebook.com/AdvisorZarooriHai"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="icon-facebook text-24 Footer__social-icon__LdYTh"></i>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/advisorzaroorihai"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="icon-linkedin text-24 Footer__social-icon__LdYTh"></i>
                    </a>
                    <a
                      href="https://www.youtube.com/c/AdvisorZarooriHai/featured"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="icon-youtube text-24 Footer__social-icon__LdYTh"></i>
                    </a>
                    <a href="tel:9920056391" className="Display__mweb__3geYZ ">
                      <i className="icon-phone text-24 Footer__social-icon__LdYTh"></i>
                    </a>
                    <a
                      href="mailto:support@advisorzaroorihai.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="Display__mweb__3geYZ "
                    >
                      <i className="icon-mail text-24 Footer__social-icon__LdYTh"></i>
                    </a>
                  </div>
                  <span className="Display__web__HdJg1 ">
                    <div className="text-normal">
                      <p>
                        <a
                          className="Footer__support-link__1izck text-normal text-14"
                          href="tel:9920056391"
                        >
                          9920056391
                        </a>
                        <span className="Footer__divider__kJylR">|</span>
                        <a
                          className="Footer__support-link__1izck text-normal text-14"
                          href="mailto:support@advisorzaroorihai.com"
                        >
                          support@advisorzaroorihai.com
                        </a>
                      </p>
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div className="Footer__btm-container__3H6aD app-container Footer__p0__S7ID6">
              <div className="Footer__footer__2dyxG app-container">
                <span className="MoreInfo__footer-link__29_Dx text-normal text-12 MoreInfo__end__1Z9iT">
                  <span className="lh-138">More</span>
                  <i className="text-16 m14 icon-chevron-down"></i>
                  <div className="relative text-normal"></div>
                </span>
                <a
                  className="Footer__footer-link__1tqm3 text-normal text-12"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://advisorzaroorihai.com"
                >
                  advisorzaroorihai.com
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
