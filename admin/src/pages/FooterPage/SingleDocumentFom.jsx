/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import useCreate from "../../hooks/useCreate";
import useFormValidation from "../../hooks/useFormValidation";
import useFetch from "../../hooks/useFetch";
import Input from "../../components/Input/Input";
import TextEditor from "../../components/Input/TextEditor";
import Select from "../../components/Input/Select";
import FormWrapper from "../../components/Form/FormWrapper";

const SingleDocumentForm = ({ title, api }) => {
  const { validToken } = useAuth();
  const navigate = useNavigate();

  const { data } = useFetch(api.get, validToken);
  const { postData, response, postError } = useCreate(api.create);
  const { errors, validate } = useFormValidation();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "true",
  });

  useEffect(() => {
    if (data?.data) {
      const doc = data.data;
      setForm({
        title: doc?.title || "",
        description: doc?.description || "",
        status: doc?.status || "true",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate(form, {
      description: { required: true, label: "Description" },
    });

    if (!isValid) return;

    const payload = {
      title: form.title,
      description: form.description,
      status: form.status,
    };

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
    <FormWrapper title={title} onSubmit={handleSubmit}>
      <Input
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter title"
      />
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
      <TextEditor
        label="Description"
        name="description"
        value={form.description}
        onChange={(value) => setForm((prev) => ({ ...prev, description: value }))}
        required
        error={errors.description}
        height={350}
      />
    </FormWrapper>
  );
};

export default SingleDocumentForm;
