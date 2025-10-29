import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormWrapper from "../../components/Form/FormWrapper";
import Input from "../../components/Input/Input";
import Image from "../../components/Input/Image";
import usePatch from "../../hooks/usePatch";
import useFetch from "../../hooks/useFetch";
import useFormValidation from "../../hooks/useFormValidation";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import apis, { API_BASE_URL } from "../../apis/apis";

const UpdateBrandPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { validToken } = useAuth();

  const { data } = useFetch(`${apis.brand.getSingle}/${id}`, validToken);

  const { updateData, response, updateError, isUpdating } = usePatch(`${apis.brand.update}/${id}`);
  const { errors, validate } = useFormValidation();

  const [form, setForm] = useState({
    name: "",
    logo: null,
  });

  useEffect(() => {
    if (data?.success && data?.data) {
      const { name, logo } = data.data;
      setForm({
        name: name || "",
        logo: logo ? `${API_BASE_URL}/${logo}` : null,
      });
    }
  }, [data]);

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
    if (form.logo && typeof form.logo !== "string") formData.append("logo", form.logo);

    await updateData(formData, validToken, true);
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("Updated successfully");
      navigate("/brand/list");
    } else if (updateError) {
      toast.error(updateError);
    }
  }, [response, updateError, navigate]);

  return (
    <FormWrapper
      title="Update Brand"
      onSubmit={handleSubmit}
      buttonLabel={isUpdating ? "Updating..." : "Update"}
    >
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
        error={errors.logo}
        width="col-md-12"
        placeholder="logo"
      />
    </FormWrapper>
  );
};

export default UpdateBrandPage;
