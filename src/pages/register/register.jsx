import axios from "axios";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
//import { yupResolver } from 'react-hook-form-resolvers';
import * as Yup from "yup";

import { useStateMachine } from "little-state-machine";
import { Country, State } from "country-state-city";

import BreadCrumb from "../../components/banner/breadcrumb";
import updateAction from "../../context/updateAction";
import { API_URL } from "../../constants";
import { getError } from "../../utils/error";

function Register() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [formStep, setFormStep] = useState(0);
  const { actions, state } = useStateMachine({ updateAction });

  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState([]);
  const [value, setValue] = useState("");
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    FullName: Yup.string().required("Fullname is required"),
    Phone: Yup.string()
      .required("Phone is required")
      .min(6, "Email must be at least 6 characters")
      .max(20, "Email must not exceed 20 characters"),
    Email: Yup.string().required("Email is required").email("Email is invalid"),
    Password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    ConfirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("Password"), null], "Confirm Password does not match"),
    acceptTerms: Yup.bool().oneOf([true], "Accept Terms is required"),
  });

  useEffect(() => {
    setCountries((countries) => (countries = Country.getAllCountries()));
  }, []);

  const selectCountry = async (e) => {
    setCountry((country) => e.target.value);

    setRegion(
      (region) =>
        // (region = JSON.stringify(State.getStatesOfCountry(e.target.value)))
        (region = State.getStatesOfCountry(e.target.value))
    );
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const password = useRef({});
  password.current = watch("password", "");

  const completeFormStep = () => {
    setFormStep((currentStep) => currentStep + 1);
  };
  const goBack = () => {
    setFormStep((currentStep) => currentStep - 1);
  };

  function onChange(event) {
    setValue(event.target.value);
    // console.log("value:", value);
  }

  // Messages
  const required = "This field is required";
  const maxLength = "Your input exceed maximum length";

  // Error Component
  const errorMessage = (error) => {
    return (
      <p class="invalid-feedback" style={{ color: "red" }}>
        {error}
      </p>
    );
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
    // console.log("State:", state.companyUser);

    try {
      await axios.post(`${API_URL}auth/signup`, state.companyUser);
      history.push("/login");
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
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

                      <div className="form-group col-sm-4">
                        <select
                          name="CompanyType"
                          class="form-control"
                          id="CompanyType"
                          {...register("CompanyType", {
                            required: "Please describe your business",
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

                        {errors.CompanyType &&
                          errors.CompanyType.type === "required" &&
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
                          name="CompanyAddress"
                          {...register("CompanyAddress", {
                            required: true,
                          })}
                        />
                        {errors.CompanyAddress &&
                          errors.CompanyAddress.type === "required" &&
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
                        <select
                          name="Country"
                          class="form-control"
                          {...register("Country", {
                            required: "Select Country",
                          })}
                          onChange={selectCountry}
                        >
                          <option value="">Select Country</option>
                          {countries.map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                        </select>

                        {errors.Country &&
                          errors.Country.type === "required" &&
                          errorMessage(required)}
                      </div>

                      <div className="form-group col-sm-4">
                        <select
                          name="Region"
                          class="form-control"
                          id="Region"
                          {...register("Region", {
                            required: true,
                          })}
                        >
                          <option value=""> Select Region/State </option>
                          {region.map((item) => (
                            <option value={item.isoCode}>{item.name}</option>
                          ))}
                        </select>
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
                        {errorMessage(errors2.FullName?.message)}
                      </div>
                      <div className="form-group col-sm-4">
                        <input
                          className="form-control"
                          type="tel"
                          placeholder="Mobile number"
                          name="Phone"
                          {...register2("Phone")}
                        />
                        {errorMessage(errors2.Phone?.message)}
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
                        {errorMessage(errors2.Email?.message)}
                      </div>
                      <div className="form-group col-sm-4">
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Password"
                          ref={password}
                          name="Password"
                          {...register2("Password")}
                        />
                        {errorMessage(errors2.Password?.message)}
                      </div>
                      <div className="form-group col-sm-4">
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Confirm Password"
                          name="ConfirmPassword"
                          {...register2("ConfirmPassword")}
                        />
                        {errorMessage(errors2.confirmPassword?.message)}
                      </div>
                      {/* onChange=
                      {(e) => {
                        const value = e.target.value;
                        if (value !== password)
                          return clearError("confirmPassword");
                        setError(
                          "confirmPassword",
                          "notMatch",
                          "passwords not mutch"
                        );
                      }} */}
                      <div className="form-group col-sm-12">
                        <textarea
                          className="form-control"
                          type="text"
                          placeholder="Address"
                          name="Address"
                          {...register2("Address")}
                        />
                      </div>
                      <div className="form-group col-sm-4 ">
                        <label
                          htmlFor="acceptTerms"
                          className="form-check-label"
                        >
                          I have read and agree to the Terms
                        </label>
                        <input
                          name="acceptTerms"
                          type="checkbox"
                          className="form-control"
                          {...register("acceptTerms")}
                        />

                        {errorMessage(errors2.acceptTerms?.message)}
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
                      <div className="col-sm-12">
                        <div className="form-group row.center ">
                          <input
                            className="btn btn-primary  "
                            type="button"
                            value="Back"
                            onClick={goBack}
                          />
                          <input
                            className="btn btn-primary  "
                            type="submit"
                            value="Finish"
                          />{" "}
                        </div>
                      </div>
                    </section>
                  </form>
                )}

                {formStep === 2 && (
                  <form onSubmit={handleSubmit2(onFinish)}>
                    <section id="Subscription">
                      <h3>Subscription Information</h3>
                      <hr />

                      <div class="col-md-6 col-xs-12">
                        <h3>Important Notice!</h3>
                        <p>
                          Hello {state.companyUser.FullName}
                          <a href="/contact">contact us</a>Thanks for your
                          interest in our service.You have a so that we can
                          verify your information and expedite your application.
                        </p>
                      </div>
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
                        {errorMessage(errors2.FullName?.message)}
                      </div>
                      <div className="form-group col-sm-4">
                        <input
                          className="form-control"
                          type="tel"
                          placeholder="Mobile number"
                          name="Phone"
                          {...register2("Phone")}
                        />
                        {errorMessage(errors2.Phone?.message)}
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
                        {errorMessage(errors2.Email?.message)}
                      </div>
                      <div className="form-group col-sm-4">
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Password"
                          ref={password}
                          name="Password"
                          {...register2("Password")}
                        />
                        {errorMessage(errors2.Password?.message)}
                      </div>
                      <div className="form-group col-sm-4">
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Confirm Password"
                          name="ConfirmPassword"
                          {...register2("ConfirmPassword")}
                        />
                        {errorMessage(errors2.confirmPassword?.message)}
                      </div>
                      {/* onChange=
                      {(e) => {
                        const value = e.target.value;
                        if (value !== password)
                          return clearError("confirmPassword");
                        setError(
                          "confirmPassword",
                          "notMatch",
                          "passwords not mutch"
                        );
                      }} */}
                      <div className="form-group col-sm-12">
                        <textarea
                          className="form-control"
                          type="text"
                          placeholder="Address"
                          name="Address"
                          {...register2("Address")}
                        />
                      </div>
                      <div className="form-group col-sm-4 ">
                        <label
                          htmlFor="acceptTerms"
                          className="form-check-label"
                        >
                          I have read and agree to the Terms
                        </label>
                        <input
                          name="acceptTerms"
                          type="checkbox"
                          className="form-control"
                          {...register("acceptTerms")}
                        />

                        {errorMessage(errors2.acceptTerms?.message)}
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
                      <div className="col-sm-12">
                        <div className="form-group row.center ">
                          <input
                            className="btn btn-primary  "
                            type="button"
                            value="Back"
                            onClick={goBack}
                          />
                          <input
                            className="btn btn-primary  "
                            type="submit"
                            value="Finish"
                          />{" "}
                        </div>
                      </div>
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
