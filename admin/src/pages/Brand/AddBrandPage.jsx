import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../../components/Form/FormWrapper";
import Input from "../../components/Input/Input";
import Image from "../../components/Input/Image";
import useCreate from "../../hooks/useCreate";
import useFormValidation from "../../hooks/useFormValidation";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import apis from "../../apis/apis";

const AddBrandPage = () => {
  const navigate = useNavigate();
  const { validToken } = useAuth();
  const { postData, response, postError } = useCreate(apis.brand.create);
  const { errors, validate } = useFormValidation();

  const [form, setForm] = useState({
    name: "",
    logo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file, field) => {
    setForm((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate(form, {
      name: { required: true, label: "name" },
    });

    if (!isValid) return;

    const formData = new FormData();
    formData.append("name", form.name);
    if (form.logo) formData.append("logo", form.logo);

    await postData(formData, validToken, true);
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("Created successfully");
      navigate("/brand/list");
    } else if (postError) {
      toast.error(postError);
    };
  }, [response, postError, navigate]);

  return (
    <FormWrapper title="Add New Brand" onSubmit={handleSubmit}>
      <Input
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        error={errors.name}
        width="col-md-12"
        placeholder="Enter Name"
      />

      <Image
        label="Logo"
        name="logo"
        value={form.logo}
        onChange={(file) => handleFileChange(file, "logo")}
        required
        error={errors.logo}
        width="col-md-12"
        placeholder="logo"
      />
    </FormWrapper>
  );
};

export default AddBrandPage;
