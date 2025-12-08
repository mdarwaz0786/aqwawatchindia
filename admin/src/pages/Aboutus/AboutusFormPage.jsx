/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import useFetch from "../../hooks/useFetch";
import useCreate from "../../hooks/useCreate";
import useFormValidation from "../../hooks/useFormValidation";
import Input from "../../components/Input/Input";
import TextArea from "../../components/Input/TextArea";
import Select from "../../components/Input/Select";
import Image from "../../components/Input/Image";
import FormWrapper from "../../components/Form/FormWrapper";
import apis, { API_BASE_URL } from "../../apis/apis";

const AboutUsFormPage = () => {
  const navigate = useNavigate();
  const { validToken } = useAuth();

  const { data } = useFetch(apis.aboutus.get, validToken);
  const { postData, response, postError } = useCreate(apis.aboutus.create);
  const { errors, validate } = useFormValidation();

  const [form, setForm] = useState({
    description: "",
    contact: "",
    experience: "",
    name: "",
    shortInfo: "",
    image: null,
    happyCustomer: 0,
    expertTeam: 0,
    awardWinning: 0,
    averageRating: 0,
    status: "true",
  });

  useEffect(() => {
    if (data?.data) {
      const doc = data.data;
      setForm({
        description: doc?.description || "",
        contact: doc?.contact || "",
        experience: doc?.experience || "",
        name: doc?.name || "",
        shortInfo: doc?.shortInfo || "",
        image: doc?.image ? `${API_BASE_URL}/${doc?.image}` : null,
        happyCustomer: doc?.happyCustomer || 0,
        expertTeam: doc?.expertTeam || 0,
        awardWinning: doc?.awardWinning || 0,
        averageRating: doc?.averageRating || 0,
        status: doc?.status?.toString() || "true",
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate(form, {
      description: { required: true, label: "Description" },
      contact: { required: true, label: "Contact" },
      experience: { required: true, label: "Experience" },
      name: { required: true, label: "Name" },
      shortInfo: { required: true, label: "Short Info" },
      image: { required: true, label: "Image" },
    });

    if (!isValid) return;

    const payload = new FormData();
    payload.append("description", form.description);
    payload.append("contact", form.contact);
    payload.append("experience", form.experience);
    payload.append("name", form.name);
    payload.append("shortInfo", form.shortInfo);
    payload.append("happyCustomer", form.happyCustomer);
    payload.append("expertTeam", form.expertTeam);
    payload.append("awardWinning", form.awardWinning);
    payload.append("averageRating", form.averageRating);
    payload.append("status", form.status);
    if (form.image && typeof form.image !== "string") {
      payload.append("image", form.image);
    }

    await postData(payload, validToken);
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
    <FormWrapper title="About Us" onSubmit={handleSubmit}>
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
        label="Person Name"
        name="name"
        type="text"
        value={form.name}
        onChange={handleInputChange}
        width="col-md-6"
        required
        error={errors.name}
      />

      <Input
        label="Person Short Info"
        name="shortInfo"
        type="text"
        value={form.shortInfo}
        onChange={handleInputChange}
        width="col-md-6"
        required
        error={errors.shortInfo}
      />

      <Input
        label="Experience (Years)"
        name="experience"
        type="text"
        value={form.experience}
        onChange={handleInputChange}
        width="col-md-6"
        required
        error={errors.experience}
      />

      <Image
        label="Image"
        name="image"
        value={form.image}
        onChange={(file) => setForm((prev) => ({ ...prev, image: file }))}
        width="col-md-12"
        required
        error={errors.image}
      />

      <Input
        label="Happy Customers"
        name="happyCustomer"
        type="number"
        value={form.happyCustomer}
        onChange={handleInputChange}
        width="col-md-3"
      />

      <Input
        label="Expert Team"
        name="expertTeam"
        type="number"
        value={form.expertTeam}
        onChange={handleInputChange}
        width="col-md-3"
      />

      <Input
        label="Award Winning"
        name="awardWinning"
        type="number"
        value={form.awardWinning}
        onChange={handleInputChange}
        width="col-md-3"
      />

      <Input
        label="Average Rating"
        name="averageRating"
        type="number"
        value={form.averageRating}
        onChange={handleInputChange}
        width="col-md-3"
      />

      <TextArea
        label="Contact Detail"
        name="contact"
        value={form.contact}
        onChange={handleInputChange}
        required
        width="col-md-12"
        rows={5}
        error={errors.contact}
      />

      <TextArea
        label="About Us Description"
        name="description"
        value={form.description}
        onChange={handleInputChange}
        required
        error={errors.description}
        width="col-md-12"
        rows={10}
      />

    </FormWrapper>
  );
};

export default AboutUsFormPage;
