import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth.context";
import apis from "../../../apis/apis";
import useFetch from "../../../hooks/useFetch";
import useCreate from "../../../hooks/useCreate";
import usePatch from "../../../hooks/usePatch";
import FormWrapper from "../../../components/Form/FormWrapper";
import useFormValidation from "../../../hooks/useFormValidation";
import Input from "../../../components/Input/Input";
import TextArea from "../../../components/Input/TextArea";

const initialState = {
  userName: "",
  rating: "",
  description: "",
};

const TestimonialFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { validToken } = useAuth();
  const [formData, setFormData] = useState(initialState);

  const { data: fetchedData } = useFetch(
    isEdit ? `${apis.testimonial.getSingle}/${id}` : null,
    validToken
  );

  const {
    postData,
    response: createResponse,
    postError,
  } = useCreate(apis.testimonial.create);

  const {
    updateData,
    response: updateResponse,
    updateError,
  } = usePatch(isEdit ? `${apis.testimonial.update}/${id}` : null);

  const { errors, validate } = useFormValidation();

  useEffect(() => {
    if (isEdit && fetchedData?.data) {
      const {
        userName,
        rating,
        description,
      } = fetchedData.data;

      setFormData({
        userName: userName || "",
        rating: rating || "",
        description: description || "",
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
      userName: { required: true, label: "user name" },
    });

    if (!isValid) return;

    const form = {
      userName: formData.userName || "",
      rating: formData.rating || "",
      description: formData.description || "",
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
      navigate("/testimonial/list");
    } else if (postError) {
      toast.error(postError);
    }
  }, [createResponse, postError, navigate]);

  useEffect(() => {
    if (updateResponse?.success) {
      toast.success("Updated successfully");
      navigate("/testimonial/list");
    } else if (updateError) {
      toast.error(updateError);
    }
  }, [updateResponse, updateError, navigate]);

  return (
    <FormWrapper
      title={isEdit ? "Update Testimonial" : "Add Testimonial"}
      onSubmit={handleSubmit}
    >

      <Input
        label="User Name"
        name="userName"
        value={formData.userName}
        required
        error={errors.userName}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter user name"
      />

      <Input
        label="Rating"
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter rating"
      />

      <TextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={6}
        placeholder="Write Description"
      />
    </FormWrapper>
  );
};

export default TestimonialFormPage;
