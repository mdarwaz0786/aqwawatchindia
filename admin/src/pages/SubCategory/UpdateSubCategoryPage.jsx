import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormWrapper from "../../components/Form/FormWrapper";
import Input from "../../components/Input/Input";
import Image from "../../components/Input/Image";
import Select from "../../components/Input/Select";
import usePatch from "../../hooks/usePatch";
import useFetch from "../../hooks/useFetch";
import useFormValidation from "../../hooks/useFormValidation";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import apis, { API_BASE_URL } from "../../apis/apis";

const UpdateSubCategoryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { validToken } = useAuth();
  const { errors, validate } = useFormValidation();

  const { data } = useFetch(`${apis.subCategory.getSingle}/${id}`, validToken);
  const { data: categoryData } = useFetch(apis.category.getAll, validToken);
  const { updateData, response, updateError, isUpdating } = usePatch(`${apis.subCategory.update}/${id}`);

  const [form, setForm] = useState({
    name: "",
    category: "",
    image: null,
    icon: null,
  });

  useEffect(() => {
    if (data?.success && data?.data) {
      const { name, category, image, icon } = data.data;
      console.log(data?.data)
      setForm({
        name: name || "",
        category: category?._id || "",
        image: image ? `${API_BASE_URL}/${image}` : null,
        icon: icon ? `${API_BASE_URL}/${icon}` : null,
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
      category: { required: true, label: "category" },
    });

    if (!isValid) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("category", form.category);

    if (form.image && typeof form.image !== "string")
      formData.append("image", form.image);

    if (form.icon && typeof form.icon !== "string")
      formData.append("icon", form.icon);

    await updateData(formData, validToken, true);
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("Updated successfully");
      navigate("/sub-category/list");
    } else if (updateError) {
      toast.error(updateError);
    }
  }, [response, updateError, navigate]);

  const categories = categoryData?.data || [];

  return (
    <FormWrapper
      title="Update Sub Category"
      onSubmit={handleSubmit}
      buttonLabel={isUpdating ? "Updating..." : "Update"}
    >
      <Select
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        options={categories}
        optionKey="_id"
        optionValue="name"
        error={errors.category}
        width="col-md-6"
        placeholder="Select a Category"
        required
      />

      <Input
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        width="col-md-6"
        placeholder="Enter Name"
        required
      />

      <Image
        label="Image"
        name="image"
        value={form.image}
        onChange={(file) => handleFileChange(file, "image")}
        error={errors.image}
        width="col-md-12"
        placeholder="image"
        required
      />

      <Image
        label="Icon"
        name="icon"
        value={form.icon}
        onChange={(file) => handleFileChange(file, "icon")}
        error={errors.icon}
        width="col-md-12"
        placeholder="icon"
      />
    </FormWrapper>
  );
};

export default UpdateSubCategoryPage;
