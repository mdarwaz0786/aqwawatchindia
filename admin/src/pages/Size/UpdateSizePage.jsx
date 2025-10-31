import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormWrapper from "../../components/Form/FormWrapper";
import Input from "../../components/Input/Input";
import usePatch from "../../hooks/usePatch";
import useFetch from "../../hooks/useFetch";
import useFormValidation from "../../hooks/useFormValidation";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import apis from "../../apis/apis";

const UpdateSizePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { validToken } = useAuth();

  const { data } = useFetch(`${apis.size.getSingle}/${id}`, validToken);
  const { updateData, response, updateError, isUpdating } = usePatch(`${apis.size.update}/${id}`);

  const { errors, validate } = useFormValidation();

  const [form, setForm] = useState({
    name: "",
  });

  useEffect(() => {
    if (data?.success && data?.data) {
      const { name } = data.data;
      setForm({
        name: name || "",
      });
    };
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate(form, {
      name: { required: true, label: "Name" },
    });

    if (!isValid) return;

    const formData = {
      name: form.name,
    };

    await updateData(formData, validToken);
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("Updated successfully");
      navigate("/size/list");
    } else if (updateError) {
      toast.error(updateError);
    }
  }, [response, updateError, navigate]);

  return (
    <FormWrapper
      title="Update Color"
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
        placeholder="Enter Size Name"
      />
    </FormWrapper>
  );
};

export default UpdateSizePage;
