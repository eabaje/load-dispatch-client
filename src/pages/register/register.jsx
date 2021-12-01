import axios from "axios";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import Select from "react-select";
import countryList from "react-select-country-list";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { useStateMachine } from "little-state-machine";
import csc from "country-state-city";

import BreadCrumb from "../../components/banner/breadcrumb";
import updateAction from "../../context/updateAction";
//import BreadCrumb from "../../components/banner/breadcrumb";

function Register() {
  const [formStep, setFormStep] = useState(0);
  const { actions, state } = useStateMachine({ updateAction });

  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [value, setValue] = useState("");
  const history = useHistory();

  const countries = csc.getAllCountries();
  console.log("countries:", countries);
  const states = csc.getStatesOfCountry(country);

  const selectCountry = (val) => {
    setCountry((country) => val);
    console.log("Country:", country);
  };

  const selectRegion = (val) => {
    setRegion((region) => val);
    console.log("Region:", region);
  };

  useEffect(() => {}, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const completeFormStep = () => {
    setFormStep((currentStep) => currentStep + 1);
  };

  // const emailRef = useRef();
  // const passwordRef = useRef();
  // const usernameRef = useRef();
  // const companyRef = useRef();
  // const rolesRef = useRef();
  // const lastnameRef = useRef();

  const rolesRef = useRef();
  const CountryRef = useRef();
  const RegionRef = useRef();

  function onChange(event) {
    setValue(event.target.value);
    console.log("value:", value);
  }

  function ongetStates(event) {
    console.log("value:", value);
  }

  // Messages
  const required = "This field is required";
  const maxLength = "Your input exceed maximum length";

  // Error Component
  const errorMessage = (error) => {
    return <div className="invalid-feedback">{error}</div>;
  };

  const onSubmit = (data) => {
    actions.updateAction(data);
    completeFormStep();
    // props.history.push("./step2");
  };

  const onFinish = async (data) => {
    // e.preventDefault();
    actions.updateAction(data);
    // setPassword(passwordRef.current.value);
    // setUsername(usernameRef.current.value);
    try {
      await axios.post("auth/register", data);
      history.push("/login");
    } catch (err) {}
  };
  return (
    <div>
      <BreadCrumb name="Register" />
      <section id="history" class="space-top">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 history-block">
              <h2>Sign Up Now</h2>
              <p>
                New users can enjoy LoadDispatch for 90-days at no-charge. After
                that, you hereby authorize LoadDispatch to charge you
                automatically every month until you cancel your subscription.
                After your application is accepted, we will contact you with a
                password. All fields marked with * are required..
              </p>

              <p>
                While LoadDispatch® is not a shipping company, we connect you to
                over 13,000 carriers ready to transport your vehicle. In
                addition, we provide access to U.S. DOT license information,
                insurance information and ratings for carriers as well as an
                online dispatching system to make dispatching faster and easier.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="about" class="space bg-color">
        <div class="container">
          <div class="row">
            <div class="col-md-6 col-xs-12">
              <h3>Pricing Information</h3>
              <ul>
                <li>
                  Use LoadDispatch<sup>&reg;</sup> for <strong>90-days</strong>{" "}
                  at no-charge.
                </li>
                <li>
                  After 90-days, you can continue to use. Plans start as low as
                  <strong>
                    <span id="startingPrice">$89.95</span>/month
                  </strong>{" "}
                  plus tax for Shippers.
                </li>
                <li>
                  Carriers can get premium access for{" "}
                  <b>
                    <span id="unlimitedPrice">$115.95</span>/month
                  </b>{" "}
                  plus tax.
                </li>
                <li>
                  There is no obligation to continue membership and you will not
                  be charged until you sign up.
                </li>
              </ul>
            </div>
            <div class="col-md-6 col-xs-12">
              <h3>Important Notice!</h3>
              <p>
                If you have previously had an account, please{" "}
                <a href="/contact-us">contact us</a> so that we can verify your
                information and expedite your application.
              </p>
            </div>
          </div>
          <div></div>
          <div class="row">
            <div class="col-sm-12 about-block">
              <div className="col-sm-12">
                {formStep === 0 && (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <section id="Company">
                      <h3>Tell us about your company</h3>
                      <hr />
                      <h4>
                        You selected {value} - {country} - {region}
                      </h4>
                      <div className="form-group col-sm-4">
                        <select
                          name="CompanyType"
                          class="form-control"
                          id="CompanyType"
                          {...register("CompanyType", {
                            required: true,
                          })}
                          onChange={onChange}
                        >
                          <option value="">
                            {" "}
                            Please describe your business{" "}
                          </option>
                          <option value="carrier">Carrier </option>
                          <option value="shipper">Auction</option>
                          <option value="carrier">Corp. Relocation</option>
                          <option value="broker">Broker</option>
                          <option value="broker">Rental Agency</option>
                          <option value="shipper">Salvage</option>
                          <option value="broker">Dealer</option>
                          <option value="shipper">Manufacturer</option>
                          <option value="shipper">Import/Export</option>
                        </select>

                        {errors.Username &&
                          errors.Username.type === "required" &&
                          errorMessage(required)}
                        <input
                          id="Role"
                          name="Role"
                          type="hidden"
                          value={value}
                          // ref={rolesRef}
                          {...register("Role")}
                        />
                      </div>
                      <div className="form-group col-sm-4">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Company Name"
                          name="CompanyName"
                          {...register("CompanyName", {
                            required: true,
                            maxLength: 50,
                          })}
                        />
                        {errors.CompanyName &&
                          errors.CompanyName.type === "required" &&
                          errorMessage(required)}
                        {errors.CompanyName &&
                          errors.CompanyName.type === "maxLength" &&
                          errorMessage(maxLength)}
                      </div>

                      <div className="form-group col-sm-4">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Company Address"
                          name="Address"
                          {...register("Address", {
                            required: true,
                          })}
                        />
                        {errors.Address &&
                          errors.Address.type === "required" &&
                          errorMessage(required)}
                      </div>
                      <div className="form-group col-sm-4">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Company Email"
                          name="ContactEmail"
                          {...register("ContactEmail", {
                            required: true,
                            pattern: /^\S+@\S+$/i,
                          })}
                        />
                        {errors.ContactEmail &&
                          errors.ContactEmail.type === "required" &&
                          errorMessage(required)}
                      </div>
                      <div className="form-group col-sm-4">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Contact Phone"
                          name="ContactPhone"
                          {...register("ContactPhone", {
                            required: true,
                          })}
                        />
                        {errors.ContactPhone &&
                          errors.ContactPhone.type === "required" &&
                          errorMessage(required)}
                      </div>
                      <div className="form-group col-sm-4">
                        {/* <select
                          name="Country"
                          class="form-control"
                          id="Country"
                          {...register("Country", {
                            required: true,
                          })}
                          onChange={selectCountry}
                        >
                          <option value=""> Select Country </option>
                          {countries.map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                        </select>

                        {errors.Country &&
                          errors.Country.type === "required" &&
                          errorMessage(required)} */}

                        {/* <CountryDropdown
                          value={country}
                          classes="form-control"
                          name="CountryDDL"
                          onChange={(val) => selectCountry(val)}
                        /> */}

                        <input
                          name="Country"
                          type="text"
                          defaultValue={country}
                          // value={country}
                          //  ref={CountryRef}
                          {...register("Country")}
                        />
                      </div>

                      <div className="form-group col-sm-4">
                        {/* <select
                          name="Region"
                          class="form-control"
                          id="Region"
                          {...register("Region", {
                            required: true,
                          })}
                        >
                          <option value=""> Select Country </option>
                          {states.map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                        </select> */}
                        {/* <RegionDropdown
                          value={region}
                          country={country}
                          classes="form-control"
                          name="RegionDDl"
                          onChange={(val) => selectRegion(val)}
                        /> */}

                        <input
                          name="Region"
                          type="text"
                          defaultValue={region}
                          //  ref={RegionRef}
                          {...register("Region")}
                        />
                      </div>

                      <div className="form-group col-sm-4">
                        <input
                          className="form-control"
                          type="url"
                          placeholder="Website"
                          name="Website"
                          {...register("Website")}
                        />
                      </div>
                      <div className="col-sm-12">
                        <div className="form-group row.center ">
                          <input
                            className="btn btn-primary  "
                            type="submit"
                            value="Continue"
                          />
                        </div>
                      </div>
                    </section>
                  </form>
                )}

                {formStep === 1 && (
                  <form onSubmit={handleSubmit2(onFinish)}>
                    <section id="Personal">
                      <h3>Contact Information</h3>
                      <hr />
                      <div className="form-group col-sm-4">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Full Name"
                          name="FullName"
                          {...register2("FullName", {
                            required: true,
                          })}
                        />
                        {errors.Name &&
                          errors.Name.type === "required" &&
                          errorMessage(required)}
                        {errors.Name &&
                          errors.Name.type === "maxLength" &&
                          errorMessage(maxLength)}
                      </div>
                      <div className="form-group col-sm-4">
                        <input
                          className="form-control"
                          type="tel"
                          placeholder="Mobile number"
                          name="Phone"
                          {...register2("Phone", { maxLength: 12 })}
                        />
                        {errors.MobileNumber &&
                          errors.MobileNumber.type === "maxLength" &&
                          errorMessage(maxLength)}
                      </div>
                      <div className="form-group col-sm-4">
                        <input
                          className="form-control"
                          type="email"
                          placeholder="Email"
                          name="Email"
                          {...register2("Email", {
                            required: true,
                            pattern: /^\S+@\S+$/i,
                          })}
                        />
                        {errors.Email &&
                          errors.Email.type === "required" &&
                          errorMessage(required)}
                      </div>

                      {/* <div className="form-group col-sm-4">
                        <input
                          className="form-control"
                          type="datetime"

                          placeholder="Date of Birth"
                          name="DateofBirth"
                          {...register("DateofBirth", {
                            pattern:
                              /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/i,
                          })}
                        />
                        {errors.DateofBirth &&
                          errorMessage(
                            "Please use the following format MM/DD/YYYY"
                          )}
                      </div> */}
                    </section>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="action">
        <div class="container">
          <div class="row">
            <div class="col-sm-9 action-block">
              <h2 class="title">do you need Carrier to lift your cargo?</h2>
            </div>
            <div class="col-sm-3 action-block text-right ">
              <a
                href="/register"
                class="sppb-btn sppb-btn-default sppb-btn-right"
              >
                Sign UP
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
