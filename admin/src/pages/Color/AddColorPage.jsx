import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../../components/Form/FormWrapper";
import Input from "../../components/Input/Input";
import useCreate from "../../hooks/useCreate";
import useFormValidation from "../../hooks/useFormValidation";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import apis from "../../apis/apis";

const AddColorPage = () => {
  const navigate = useNavigate();
  const { validToken } = useAuth();
  const { postData, response, postError } = useCreate(apis.color.create);
  const { errors, validate } = useFormValidation();

  const [form, setForm] = useState({
    name: "",
    colorCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate(form, {
      name: { required: true, label: "Name" },
      colorCode: { required: true, label: "Color Code" },
    });

    if (!isValid) return;

    const formData = {
      name: form.name,
      colorCode: form.colorCode,
    };

    await postData(formData, validToken);
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("Created successfully");
      navigate("/color/list");
    } else if (postError) {
      toast.error(postError);
    }
  }, [response, postError, navigate]);

  return (
    <FormWrapper title="Add New Color" onSubmit={handleSubmit}>
      <Input
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
        error={errors.name}
        width="col-md-12"
        placeholder="Enter Color Name"
      />

      <Input
        label="Color Code"
        name="colorCode"
        type="color"
        value={form.colorCode}
        onChange={handleChange}
        required
        error={errors.colorCode}
        width="col-md-12"
        placeholder="#FFFFFF or rgb(255, 255, 255)"
      />
    </FormWrapper>
  );
};

export default AddColorPage;
