import React from "react";
import { useState, useEffect } from "react";
import BreadCrumb from "../../components/banner/breadcrumb";
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import { Country, State } from "country-state-city";
function Contact() {

  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState([]);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = values => console.log(values);

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
  return (
    <div>
      <BreadCrumb name="Contact Us" />
      <div class="container">
        <div class="page-header">
          <h1>Contact Us</h1>
        </div>

        <div class="row">
          <div class="col-sm-8">
            <p class="lead">
              Submit a question or comment to LoadDispatch&reg; support.
            </p>
          </div>

          <div class="col-sm-4">
            <address>
              <strong>LoadDispatch</strong>
              <br />
              52A Ikorodu Road Jibowu,Lagos.
              <br />
              Nigeria
            </address>

            <p>
              <a href="tel:">
                <i class="fa fa-phone"></i>
              </a>
              <br />
            </p>
          </div>
        </div>

        <hr />

        <form action="/contact-us/submit" id="contact-form" method="post">
          <div class="row">
            <div class="col-sm-4">
             

              <div class="form-group ">
                <label for="name">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  required="required"
                  name="name"
                  id="name"
                  maxlength="64"
                />
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors"></div>
              </div>

              <div class="form-group has-feedback">
                <label for="company_name">Company Name</label>
                <input
                  type="text"
                  class="form-control"
                  required="required"
                  name="CompanyName"
                  id="CompanyName"
                  maxlength="64"
                />
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors"></div>
              </div>
            </div>

            <div class="col-sm-4">
              <div class="form-group has-feedback">
                <label for="email">Email</label>
                <input
                  type="text"
                  class="form-control email"
                  name="Email"
                  id="Email"
                  maxlength="50"
                  data-phoneoremail="true"
                email/>
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors"></div>
              </div>

             

              <div class="form-group has-feedback">
                <label for="phone">Phone</label>
                <input
                  type="text"
                  class="form-control"
                  name="phone"
                  id="phone"
                  maxlength="20"
                  data-phoneoremail="true"
                />
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors"></div>
              </div>
            </div>

            <div class="col-sm-4">
              <div class="form-group has-feedback">
                <label for="timezone">Country</label>
                <select
                          name="Country"
                          class="form-control"
                          {...register("Country", {
                            required: "Select Country",
                          })}
                          onChange={selectCountry}
                       required >
                          <option value="">Select Country</option>
                          {countries.map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors"></div>
              </div>

             

              <div class="form-group has-feedback">
                <label for="State">State</label>
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
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <span class="help-block with-errors"></span>
              </div>
            </div>
          </div>

          <hr />

          <div class="row">
            <div class="col-sm-4">
              <div class="form-group has-feedback">
                <label for="nature_of_question">Nature of Question</label>
                <select
                  id="nature_of_question"
                  name="nature_of_question"
                  class="form-control"
                  required="required"
                >
                  <option value="">--Select One--</option>
                  <option value="app_status">
                    Status of Application (3-5 business days to process)
                  </option>
                  <option value="billing">
                    LoadDispatch Billing + Billing Address Change
                  </option>
                  <option value="classifieds_and_resources">
                    Classifieds and Resources
                  </option>
                  <option value="doc_packet">Document Packet</option>
                  <option value="logon_expired">
                    Logon Trouble - Account Expired
                  </option>
                  <option value="logon_password">
                    Logon Trouble - Password Does Not Work
                  </option>
                  <option value="other">Other</option>
                  <option value="other_trouble">
                    Other Trouble Using LoadDispatch.com
                  </option>
                  <option value="suggestions">
                    Suggestions for LoadDispatch.com
                  </option>
                </select>
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors"></div>
              </div>
            </div>

            <div class="col-sm-4">
              <div
                class="form-group has-feedback jsRatingQuestion"
                style={{ display: "none" }}
              >
                <label>
                  <strong>Reason</strong>
                </label>
                <select
                  id="reason"
                  name="reason"
                  class="form-control"
                  required="required"
                >
                  <option data-company-required="0" value="">
                    --Select One--
                  </option>
                  <option data-company-required="0" value="How to Submit">
                    How to Submit
                  </option>
                  <option
                    data-company-required="0"
                    value="How to Dispute or Escalate"
                  >
                    How to Dispute or Escalate
                  </option>
                  <option
                    data-company-required="1"
                    value="Rating Status Update"
                  >
                    Rating Status Update
                  </option>
                  <option
                    data-company-required="1"
                    value="Determination or Decision"
                  >
                    Determination or Decision
                  </option>
                </select>
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors"></div>
              </div>
            </div>

            <div class="col-sm-4">
              <div
                class="form-group has-feedback jsRatingQuestion rating-against-form-group"
                style={{ display: "none" }}
              >
                <label for="rating_against">
                  <span
                    class="text-danger small"
                    id="ratingAgainstRequiredIndicator"
                    style={{ display: "none" }}
                  >
                    *{" "}
                  </span>
                  <strong>Rating Against</strong>
                </label>
                <div class="input-group" id="spLightbox">
                  <div class="input-group-addon sp-lightbox">
                    <span
                      class="glyphicon glyphicon-search"
                      aria-hidden="true"
                    ></span>
                  </div>
                  <input
                    type="text"
                    class="form-control sp-lightbox"
                    id="rating_against_visible"
                    name="rating_against_visible"
                    maxlength="64"
                    value=""
                    readonly
                    data-ratingagainst="true"
                  />
                  <div
                    class="input-group-addon"
                    id="clearRatingAgainst"
                    style={{ display: "none" }}
                  >
                    <span
                      class="glyphicon glyphicon-remove"
                      aria-hidden="true"
                    ></span>
                  </div>
                </div>
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors error-rating-against"></div>
                <input type="hidden" id="againstId" name="againstId" value="" />
                <input
                  type="hidden"
                  id="rating_against"
                  name="rating_against"
                  value=""
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-4">
              <div
                class="form-group has-feedback jsRatingQuestion"
                style={{ display: "none" }}
              >
                <label for="order_id">Order ID</label>
                <input
                  type="text"
                  class="form-control"
                  name="order_id"
                  id="order_id"
                  maxlength="20"
                  value=""
                />
                <span
                  class="glyphicon form-control-feedback"
                  aria-hidden="true"
                ></span>
                <div class="help-block with-errors"></div>
              </div>
            </div>
          </div>

          <div class="form-group has-feedback">
            <label for="question">
              <strong>Question/Comment</strong>
            </label>
            <textarea
              rows="6"
              class="form-control"
              name="question"
              id="question"
              cols="40"
              required
            ></textarea>
            <span
              class="glyphicon form-control-feedback"
              aria-hidden="true"
            ></span>
            <div class="help-block with-errors"></div>
          </div>

          <input
            type="submit"
            class="btn btn-primary"
            name="submit"
            id="jsSubmitContactUs"
            value="Send Question or Comment"
          />
          <input
            type="hidden"
            id="CSRFToken"
            name="CSRFToken"
            value="49ec8e6ac446c5f187ed8a9525b9a313798bfafd880fd403f8737c9a7488633e"
          />
        </form>

        <hr />

        <div class="modal fade" id="company-search" style={{ display: "none" }}>
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span area-hidden="true">&times;</span>
                </button>

                <h3>Select Company</h3>
              </div>
              <div class="modal-body"></div>
              <div class="modal-footer">
                <button
                  type="button"
                  data-dismiss="modal"
                  class="btn btn-default"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
