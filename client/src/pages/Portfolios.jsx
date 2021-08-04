/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

export function Portfolios() {
  const [pfs, setPfs] = useState([]);
  const [navs, setNavs] = useState([]);
  const [isPastPer, setIsPastPer] = useState([false, false, false, false]);
  const [navTime, setNavTime] = useState("1y");

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get("/api/getpfs");
        setPfs([data.data[2], data.data[3], data.data[0], data.data[1]]);
      } catch (error) {}
    };
    getData();
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const data2 = await axios.get("/api/getnavs/" + navTime);
        setNavs(data2.data);
      } catch (error) {}
    };
    getData();
  }, [navTime]);

  const showRiskCategory = (rc) => {
    switch (rc) {
      case "Conservative":
        return <span style={{ color: "lightgreen" }}>{rc}</span>;
      case "Moderate":
        return <span style={{ color: "orange" }}>{rc}</span>;
      case "Aggressive":
        return <span style={{ color: "red" }}>{rc}</span>;
      default:
        break;
    }
  };
  const getPercent = (data, navs) => {
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
                src="https://assets.smallcase.com/images/publishers/azh-Consultants/logo.png"
                className="Header__logo__2jKwz"
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
      <div className="Hero__head-content-container__1JJFw app-container">
        <div className="Hero__head-content-img-holder__2jhLe">
          <div className="Hero__image-container__2m6Ec">
            <img
              src="assets/images/hero-img.png"
              className="Hero__head-content-img__2WPUU"
              alt=""
            />
          </div>
        </div>
        <div className="Hero__head-content-title-holder__3l0cG">
          <h1 className="Hero__head-content-title__11NgI mt8 font-semibold">
            Built on a Legacy, Research, Observation and Knowledge
          </h1>
          <div className="Hero__head-content-desc__tSe3O text-18">
            <p>
              NS Investment Portfolios are research-backed thematic baskets
              designed to provide professional competency while retaining the
              flexibility of direct ownership of stocks, for long-term wealth
              creation.
            </p>
          </div>
        </div>
      </div>
      <div className="ListView__list__1eAMS">
        <div className="ListView__head__11oAg mb32">
          <h2 className="ListView__header__2l7Gs display mb32">
            Pick Your NS Advisory Portfolio
          </h2>
        </div>
        <div className="ListView__content__v-pde">
          {pfs.length !== 0 &&
            pfs.map((pf, i) => (
              <div className="relative mb24 full-width-on-mobile" key={pf.Id}>
                <div className="CardView__riskContainer__RKXM9">
                  <div className="Risk__label-risk-container__1MNl2 Risk__high__mTNQe">
                    <span className="Risk__label-risk__title__3hrJs font-medium text-12">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                  </div>
                </div>
                <div
                  className="CardView__container__3PIVt"
                  style={{
                    userSelect: "none",
                    height: "min-content",
                    minWidth: "min-content",
                    transition: "height 0.3s ease-out 0s",
                  }}
                >
                  <div className="card-container relative">
                    <div className="CardView__card-details__2NrDe">
                      <div className="details-container">
                        <div className="NameHolder__name-container__1rnV8">
                          <img
                            className="
                          img
                          NameHolder__image-container-large__3aN46
                          img
                          NameHolder__image-desktop__22zbz
                        "
                            src={pf.ImageURL}
                            alt="images"
                            style={{ fontSize: "33.3333px" }}
                          />
                          <div>
                            <a
                              className="
                            link
                            NameHolder__desc-title__3tqmC
                            font-medium
                            ellipsi
                            text-16
                          "
                              href={"/" + pf.Id}
                            >
                              {pf.ModelName}
                            </a>
                            <p className="lh-157">{pf.Description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="CardView__stat-container__2Pufe">
                        <div className="Statbox__statbox__3rmgd Statistics__stats__3JzSp">
                          <div style={{ flex: "0 0 33%", textAlign: "left" }}>
                            <div className="Statbox__title__3RBy7 font-regular text-light">
                              1 Yr Return
                            </div>
                            <div className="Statbox__value__2vZLj text-green font-medium">
                              {pf.AnnualisedReturn}
                            </div>
                          </div>
                          <div style={{ flex: "0 0 33%", textAlign: "left" }}>
                            <div className="Statbox__title__3RBy7 font-regular text-light">
                              Min. Investment
                            </div>
                            <div
                              className="
                            Statbox__value__2vZLj
                            text-dark
                            font-medium
                            stat-value-text
                          "
                            >
                              {pf.MinInvestAmt}
                            </div>
                          </div>
                          <div style={{ flex: "0 0 33%", textAlign: "left" }}>
                            <div className="Statbox__title__3RBy7 font-regular text-light">
                              Risk Profile
                            </div>
                            <div
                              className="
                            Statbox__value__2vZLj
                            font-medium
                            text-dark
                            stat-value-text
                          "
                            >
                              {showRiskCategory(pf.RiskCategory)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="CardView__action-holder__2BZvX">
                      <div className="CardView__btn-container__10y_V">
                        <button
                          className="
                        CardView__action-btn__2EVRv
                        btn btn-primary-green
                        full-width-on-mobile
                      "
                          type="button"
                        >
                          Invest Now
                        </button>
                        <div
                          className="
                        text-center
                        pointer
                        CardView__already-subscribed__3VaXD
                        text-13
                      "
                        >
                          <p className="text-13">
                            Already Invested?
                            <span className="link font-medium">
                              Login to top up
                            </span>
                          </p>
                        </div>
                      </div>
                      <a
                        className="CardView__comp-btn__2Yhfm font-medium text-13 link"
                        onClick={(e) =>
                          setIsPastPer((s) => {
                            return s.map((v, idx) => {
                              return i === idx ? !v : v;
                            });
                          })
                        }
                      >
                        See past performance
                        <i className="icon-chevron-down CardView__icon-align__3IFYj"></i>
                      </a>
                    </div>
                  </div>
                  {isPastPer[i] === true && navs.length !== 0 && (
                    <Fragment>
                      <div className="d-flex justify-content-between pt-4">
                        <div>
                          <h1>
                            {pf.ModelName} vs{" "}
                            {navs.filter(
                              (nav) => nav.productCode === pf.productCode
                            ) &&
                              navs.filter(
                                (nav) => nav.productCode === pf.productCode
                              )[0].BenchMarkName}
                          </h1>
                          <div className="mt-4 mb-2 fw-bold d-flex justify-content-between">
                            <div
                              style={{
                                borderBottom:
                                  navTime[i] === "3m"
                                    ? "3px solid black"
                                    : "none",
                                cursor: "pointer",
                              }}
                              onClick={() => setNavTime("3m")}
                            >
                              3M
                            </div>
                            <div onClick={() => setNavTime((n) => "1y")}>
                              <div
                                style={{
                                  borderBottom:
                                    navTime === "1y"
                                      ? "3px solid black"
                                      : "none",
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
                                  navTime === "max"
                                    ? "3px solid black"
                                    : "none",
                                cursor: "pointer",
                              }}
                              onClick={() => setNavTime("max")}
                            >
                              Max
                            </div>
                          </div>
                        </div>
                        <div>
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
                                    {(
                                      1 +
                                      1 *
                                        (getPercent(
                                          "nav",
                                          navs.filter(
                                            (nav) =>
                                              nav.productCode === pf.productCode
                                          )
                                        ) /
                                          100)
                                    ).toFixed(2)}{" "}
                                    Cr
                                  </div>
                                  <div
                                    style={{
                                      color: "lightgreen",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {getPercent(
                                      "nav",
                                      navs.filter(
                                        (nav) =>
                                          nav.productCode === pf.productCode
                                      )
                                    )}
                                    %
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
                                <div>
                                  {navs.filter(
                                    (nav) => nav.productCode === pf.productCode
                                  )[0] &&
                                    navs.filter(
                                      (nav) =>
                                        nav.productCode === pf.productCode
                                    )[0].BenchMarkName}
                                </div>
                                <div className="d-flex justify-content-between">
                                  <div className="fw-bold">
                                    Rs.{" "}
                                    {(
                                      1 +
                                      1 *
                                        (getPercent(
                                          "benchmark",
                                          navs.filter(
                                            (nav) =>
                                              nav.productCode === pf.productCode
                                          )
                                        ) /
                                          100)
                                    ).toFixed(2)}{" "}
                                    Cr
                                  </div>
                                  <div
                                    style={{
                                      color: "lightgreen",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {getPercent(
                                      "benchmark",
                                      navs.filter(
                                        (nav) =>
                                          nav.productCode === pf.productCode
                                      )
                                    )}
                                    %
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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
                              data: navs
                                .filter(
                                  (nav) => nav.productCode === pf.productCode
                                )
                                .map((n) => ({
                                  x: n.navDate,
                                  y: n.navValue,
                                })),
                              backgroundColor: ["rgb(50, 36, 57)"],
                              borderColor: ["rgb(50, 36, 57)"],
                              borderWidth: 4,
                            },
                            {
                              label: navs && navs[0].BenchMarkName,
                              data: navs
                                .filter(
                                  (nav) => nav.productCode === pf.productCode
                                )
                                .map((n) => ({
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
                    </Fragment>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
