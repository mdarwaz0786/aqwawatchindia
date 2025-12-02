
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/auth.context";
import apis, { API_BASE_URL } from "../../../apis/apis";
import useFetch from "../../../hooks/useFetch";
import useCreate from "../../../hooks/useCreate";
import usePatch from "../../../hooks/usePatch";
import FormWrapper from "../../../components/Form/FormWrapper";
import useFormValidation from "../../../hooks/useFormValidation";
import Input from "../../../components/Input/Input";
import Image from "../../../components/Input/Image";

const initialState = {
  name: "",
  image: null,
};

const BlogCategoryFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { validToken } = useAuth();
  const [formData, setFormData] = useState(initialState);

  const { data: fetchedData } = useFetch(
    isEdit ? `${apis.blogCategory.getSingle}/${id}` : null,
    validToken
  );

  const {
    postData,
    response: createResponse,
    postError,
  } = useCreate(apis.blogCategory.create);

  const {
    updateData,
    response: updateResponse,
    updateError,
  } = usePatch(isEdit ? `${apis.blogCategory.update}/${id}` : null);

  const { errors, validate } = useFormValidation();

  useEffect(() => {
    if (isEdit && fetchedData?.data) {
      const {
        image, name,
      } = fetchedData.data;

      setFormData({
        name: name,
        image: image ? `${API_BASE_URL}/${image}` : null,
      });
    }
  }, [fetchedData, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file, field) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate(formData, {
      name: { required: true, label: "name" },
    });

    if (!isValid) return;

    const form = new FormData();
    form.append("name", formData.name);

    if (formData.image === null) {
      form.append("removeImage", "true");
    } else if (typeof formData.image !== "string") {
      form.append("image", formData.image);
    }

    if (isEdit) {
      await updateData(form, validToken, true);
    } else {
      await postData(form, validToken, true);
    }
  };

  useEffect(() => {
    if (createResponse?.success) {
      toast.success("Created successfully");
      navigate("/blog-category/list");
    } else if (postError) {
      toast.error(postError);
    }
  }, [createResponse, postError, navigate]);

  useEffect(() => {
    if (updateResponse?.success) {
      toast.success("Updated successfully");
      navigate("/blog-category/list");
    } else if (updateError) {
      toast.error(updateError);
    }
  }, [updateResponse, updateError, navigate]);

  return (
    <FormWrapper
      title={isEdit ? "Update Blog Category" : "Add Blog Category"}
      onSubmit={handleSubmit}
    >
      <Input
        label="Name"
        name="name"
        value={formData.name}
        required
        error={errors.navigateTo}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter name"
      />

      <Image
        label="Image"
        name="image"
        value={formData.image}
        onChange={(file) => handleFileChange(file, "image")}
        width="col-md-6"
        placeholder="image"
        padding="6px"
      />
    </FormWrapper>
  );
};

export default BlogCategoryFormPage;
