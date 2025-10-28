import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormWrapper from "../../components/Form/FormWrapper";
import Input from "../../components/Input/Input";
import Image from "../../components/Input/Image";
import Select from "../../components/Input/Select";
import useFormValidation from "../../hooks/useFormValidation";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import apis, { API_BASE_URL } from "../../apis/apis";
import useFetchData from "../../hooks/useFetchData";
import useFetch from "../../hooks/useFetch";
import usePatch from "../../hooks/usePatch";

const UpdateSubSubCategoryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { validToken } = useAuth();
  const { errors, validate } = useFormValidation();

  const { data: categoryData } = useFetchData(apis.category.getAll, validToken);
  const { data: subCategoryData, setParams: fetchSubCategories } = useFetchData(
    apis.subCategory.getAll,
    validToken,
    null
  );

  const { data: singleData } = useFetch(`${apis.subSubCategory.getSingle}/${id}`, validToken);
  const { updateData, response, updateError } = usePatch(`${apis.subSubCategory.update}/${id}`);

  const [form, setForm] = useState({
    category: "",
    subCategory: "",
    name: "",
    image: null,
    icon: null,
  });

  useEffect(() => {
    if (singleData?.data) {
      const d = singleData.data;
      setForm({
        category: d.category?._id || "",
        subCategory: d.subCategory?._id || "",
        name: d.name || "",
        image: d?.subCategory?.image ? `${API_BASE_URL}/${d?.subCategory?.image}` : null,
        icon: d?.subCategory?.icon ? `${API_BASE_URL}/${d?.subCategory?.icon}` : null,
      });

      if (d.category?._id) {
        fetchSubCategories({ category: d.category._id });
      }
    }
  }, [singleData, fetchSubCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "category") {
      setForm((prev) => ({ ...prev, subCategory: "" }));
      if (value) fetchSubCategories({ category: value });
      else fetchSubCategories(null);
    }
  };

  const handleFileChange = (file, field) => {
    setForm((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate(form, {
      category: { required: true, label: "category" },
      subCategory: { required: true, label: "sub category" },
      name: { required: true, label: "name" },
      image: { required: true, label: "image" },
    });

    if (!isValid) return;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("category", form.category);
    formData.append("subCategory", form.subCategory);
    if (form.image) formData.append("image", form.image);
    if (form.icon) formData.append("icon", form.icon);

    await updateData(formData, validToken, true);
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("Updated successfully");
      navigate("/sub-sub-category/list");
    } else if (updateError) {
      toast.error(updateError);
    }
  }, [response, updateError, navigate]);

  const categories = categoryData?.data || [];
  const subCategories = subCategoryData?.data || [];

  return (
    <FormWrapper title="Update Sub Sub Category" onSubmit={handleSubmit}>
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

      <Select
        label="Sub Category"
        name="subCategory"
        value={form.subCategory}
        onChange={handleChange}
        options={subCategories}
        optionKey="_id"
        optionValue="name"
        error={errors.subCategory}
        width="col-md-6"
        placeholder="Select a Sub Category"
        required
      />

      <Input
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        width="col-md-12"
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

export default UpdateSubSubCategoryPage;
