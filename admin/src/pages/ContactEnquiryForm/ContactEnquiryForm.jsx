import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apis from "../../apis/apis";
import useFetch from "../../hooks/useFetch";
import useCreate from "../../hooks/useCreate";
import FormWrapper from "../../components/Form/FormWrapper";
import useFormValidation from "../../hooks/useFormValidation";
import Input from "../../components/Input/Input";
import Select from "../../components/Input/Select";
import { useAuth } from "../../context/auth.context";

const initialState = {
  title: "",
  name: 1,
  email: 0,
  mobile: 1,
  subject: 0,
  message: 0,
  service: 0,
  country: 0,
  state: 0,
  city: 0,
  zip: 0,
  address: 0,
};

const ContactEnquiryFormPage = () => {
  const navigate = useNavigate();
  const { validToken } = useAuth();
  const [formData, setFormData] = useState(initialState);

  const { data: fetchedData } = useFetch(apis.contactEnquiryForm.getSingle, validToken);

  const {
    postData,
    response: createResponse,
    postError,
  } = useCreate(apis.contactEnquiryForm.create);

  const { errors, validate } = useFormValidation();

  useEffect(() => {
    if (fetchedData?.data) {
      const {
        title,
        name,
        email,
        mobile,
        subject,
        message,
        service,
        country,
        state,
        city,
        zip,
        address,
      } = fetchedData.data;

      setFormData({
        title: title || "",
        name: name || 1,
        email: email || 0,
        mobile: mobile || 1,
        subject: subject || 0,
        message: message || 0,
        service: service || 0,
        country: country || 0,
        state: state || 0,
        city: city || 0,
        zip: zip || 0,
        address: address || 0,
      });
    }
  }, [fetchedData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate(formData, {
      title: { required: true, label: "Title" },
      name: { required: true, label: "Name" },
      mobile: { required: true, label: "Mobile" },
    });

    if (!isValid) return;

    const form = {
      title: formData.title,
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      subject: formData.subject,
      message: formData.message,
      service: formData.service,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      zip: formData.zip,
      address: formData.address,
    };

    await postData(form, validToken);
  };

  useEffect(() => {
    if (createResponse?.success) {
      toast.success("Saved successfully");
      navigate("/");
    } else if (postError) {
      toast.error(postError);
    }
  }, [createResponse, postError, navigate]);

  const options = [
    { value: 0, label: "No" },
    { value: 1, label: "Yes" }
  ];

  return (
    <FormWrapper
      title="Contact Enquiry Form"
      onSubmit={handleSubmit}
    >
      <Input
        label="Title"
        name="title"
        value={formData.title}
        required
        error={errors.title}
        onChange={handleChange}
        width="col-md-4"
        placeholder="Enter title"
      />

      <Select
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        options={options}
        optionKey="value"
        optionValue="label"
        error={errors.name}
        width="col-md-4"
        placeholder="Select"
        required
      />

      <Select
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        options={options}
        optionKey="value"
        optionValue="label"
        error={errors.email}
        width="col-md-4"
        placeholder="Select"
      />

      <Select
        label="Mobile"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        options={options}
        optionKey="value"
        optionValue="label"
        error={errors.mobile}
        width="col-md-4"
        placeholder="Select"
        required
      />

      <Select
        label="Subject"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        options={options}
        optionKey="value"
        optionValue="label"
        error={errors.subject}
        width="col-md-4"
        placeholder="Select"
      />

      <Select
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        options={options}
        optionKey="value"
        optionValue="label"
        error={errors.message}
        width="col-md-4"
        placeholder="Select"
      />

      <Select
        label="Service"
        name="service"
        value={formData.service}
        onChange={handleChange}
        options={options}
        optionKey="value"
        optionValue="label"
        error={errors.service}
        width="col-md-4"
        placeholder="Select"
      />

      <Select
        label="Country"
        name="country"
        value={formData.country}
        onChange={handleChange}
        options={options}
        optionKey="value"
        optionValue="label"
        error={errors.country}
        width="col-md-4"
        placeholder="Select"
      />

      <Select
        label="State"
        name="state"
        value={formData.state}
        onChange={handleChange}
        options={options}
        optionKey="value"
        optionValue="label"
        error={errors.state}
        width="col-md-4"
        placeholder="Select"
      />

      <Select
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        options={options}
        optionKey="value"
        optionValue="label"
        error={errors.city}
        width="col-md-4"
        placeholder="Select"
      />

      <Select
        label="Zip"
        name="zip"
        value={formData.zip}
        onChange={handleChange}
        options={options}
        optionKey="value"
        optionValue="label"
        error={errors.zip}
        width="col-md-4"
        placeholder="Select"
      />

      <Select
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        options={options}
        optionKey="value"
        optionValue="label"
        error={errors.address}
        width="col-md-4"
        placeholder="Select"
      />
    </FormWrapper>
  );
};

export default ContactEnquiryFormPage;
