/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import useCreate from "../../hooks/useCreate";
import useFetch from "../../hooks/useFetch";
import useFormValidation from "../../hooks/useFormValidation";
import Input from "../../components/Input/Input";
import Select from "../../components/Input/Select";
import FormWrapper from "../../components/Form/FormWrapper";
import apis, { API_BASE_URL } from "../../apis/apis";
import Image from "../../components/Input/Image";
import TextArea from "../../components/Input/TextArea";

const ContactusFormPage = () => {
  const navigate = useNavigate();
  const { validToken } = useAuth();

  const { data } = useFetch(apis.contactus.get, validToken);
  const { postData, response, postError } = useCreate(apis.contactus.create);
  const { errors, validate } = useFormValidation();

  const [form, setForm] = useState({
    primaryMobile: "",
    secondaryMobile: "",
    primaryEmail: "",
    secondaryEmail: "",
    location: "",
    mapLink: "",
    image: null,
    facebookLink: "",
    instagramLink: "",
    linkdinLink: "",
    twitterLink: "",
    status: "true",
  });

  useEffect(() => {
    if (data?.data) {
      const doc = data.data;
      setForm({
        primaryMobile: doc?.primaryMobile || "",
        secondaryMobile: doc?.secondaryMobile || "",
        primaryEmail: doc?.primaryEmail || "",
        secondaryEmail: doc?.secondaryEmail || "",
        location: doc?.location || "",
        mapLink: doc?.mapLink || "",
        twitterLink: doc?.twitterLink || "",
        linkdinLink: doc?.linkdinLink || "",
        instagramLink: doc?.instagramLink || "",
        facebookLink: doc?.facebookLink || "",
        image: doc?.image ? `${API_BASE_URL}/${doc?.image}` : null,
        status: doc?.status ? "true" : "false",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file) => {
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate(form, {
      primaryMobile: { required: true, label: "Primary Mobile" },
      primaryEmail: { required: true, label: "Primary Email" },
      location: { required: true, label: "Location" },
      mapLink: { required: true, label: "Map Link" },
      image: { required: !data?.data, label: "Image" },
    });

    if (!isValid) return;

    const formData = new FormData();

    formData.append("primaryMobile", form.primaryMobile);
    formData.append("secondaryMobile", form.secondaryMobile);
    formData.append("primaryEmail", form.primaryEmail);
    formData.append("secondaryEmail", form.secondaryEmail);
    formData.append("location", form.location);
    formData.append("mapLink", form.mapLink);
    formData.append("twitterLink", form.twitterLink);
    formData.append("linkdinLink", form.linkdinLink);
    formData.append("instagramLink", form.instagramLink);
    formData.append("facebookLink", form.facebookLink);
    formData.append("status", form.status);

    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    await postData(formData, validToken);
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("Saved successfully");
      navigate("/");
    } else if (postError) {
      toast.error(postError);
    }
  }, [response, postError]);

  return (
    <FormWrapper title="Conact Us" onSubmit={handleSubmit}>
      <Select
        label="Status"
        name="status"
        value={form.status}
        onChange={(value) => setForm((prev) => ({ ...prev, status: value }))}
        width="col-md-6"
        options={[
          { value: "true", label: "Show" },
          { value: "false", label: "Hide" },
        ]}
        optionKey="value"
        optionValue="label"
      />

      <Input
        label="Primary Mobile"
        name="primaryMobile"
        value={form.primaryMobile}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter primary mobile"
        error={errors.primaryMobile}
        required
      />

      <Input
        label="Secondary Mobile"
        name="secondaryMobile"
        value={form.secondaryMobile}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter secondary mobile"
      />

      <Input
        label="Primary Email"
        name="primaryEmail"
        value={form.primaryEmail}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter primary email"
        error={errors.primaryEmail}
        required
      />

      <Input
        label="Secondary Email"
        name="secondaryEmail"
        value={form.secondaryEmail}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter secondary email"
      />

      <Input
        label="Map Link"
        name="mapLink"
        value={form.mapLink}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter map link"
        error={errors.mapLink}
        required
      />

      <Image
        label="Image"
        name="image"
        value={form.image}
        onChange={handleImageChange}
        width="col-md-12"
        required
        error={errors.image}
      />

      <TextArea
        label="Location"
        name="location"
        value={form.location}
        onChange={handleChange}
        required
        width="col-md-12"
        rows={2}
        error={errors.location}
      />

      <h5 className="text-center mb-4 mt-5">Social Media Profile Link</h5>

      <Input
        label="Facebook Profile Link"
        name="facebookLink"
        value={form.facebookLink}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter Facebook profile/page link"
      />

      <Input
        label="Instagram Profile Link"
        name="instagramLink"
        value={form.instagramLink}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter Instagram profile link"
      />

      <Input
        label="LinkedIn Profile Link"
        name="linkdinLink"
        value={form.linkdinLink}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter LinkedIn profile link"
      />

      <Input
        label="Twitter (X) Profile Link"
        name="twitterLink"
        value={form.twitterLink}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter Twitter / X profile link"
      />
    </FormWrapper>
  );
};

export default ContactusFormPage;
