import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth.context";
import apis from "../../apis/apis";
import useFetch from "../../hooks/useFetch";
import useCreate from "../../hooks/useCreate";
import usePatch from "../../hooks/usePatch";
import FormWrapper from "../../components/Form/FormWrapper";
import useFormValidation from "../../hooks/useFormValidation";
import Input from "../../components/Input/Input";

const initialState = {
  name: "",
};

const ServiceFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { validToken } = useAuth();
  const [formData, setFormData] = useState(initialState);

  const { data: fetchedData } = useFetch(
    isEdit ? `${apis.service.getSingle}/${id}` : null,
    validToken
  );

  const {
    postData,
    response: createResponse,
    postError,
  } = useCreate(apis.service.create);

  const {
    updateData,
    response: updateResponse,
    updateError,
  } = usePatch(isEdit ? `${apis.service.update}/${id}` : null);

  const { errors, validate } = useFormValidation();

  useEffect(() => {
    if (isEdit && fetchedData?.data) {
      const { name } = fetchedData.data;

      setFormData({
        name: name || "",
      });
    }
  }, [fetchedData, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate(formData, {
      name: { required: true, label: "name" },
    });

    if (!isValid) return;

    const form = {
      name: formData.name
    };

    if (isEdit) {
      await updateData(form, validToken);
    } else {
      await postData(form, validToken);
    }
  };

  useEffect(() => {
    if (createResponse?.success) {
      toast.success("Created successfully");
      navigate("/service/list");
    } else if (postError) {
      toast.error(postError);
    }
  }, [createResponse, postError, navigate]);

  useEffect(() => {
    if (updateResponse?.success) {
      toast.success("Updated successfully");
      navigate("/service/list");
    } else if (updateError) {
      toast.error(updateError);
    }
  }, [updateResponse, updateError, navigate]);

  return (
    <FormWrapper
      title={isEdit ? "Update Service" : "Add Service"}
      onSubmit={handleSubmit}
    >
      <Input
        label="Name"
        name="name"
        value={formData.name}
        required
        error={errors.name}
        onChange={handleChange}
        width="col-md-12"
        placeholder="Enter name"
      />
    </FormWrapper>
  );
};

export default ServiceFormPage;
