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
import Select from "../../../components/Input/Select";
import TextArea from "../../../components/Input/TextArea";

const initialState = {
  title: "",
  category: null,
  frontImage: null,
  detailImage: null,
  shortDescription: "",
  fullDescription: "",
  tags: "",
  popularBlog: false,
  home: false,
  numberOfComment: "",
};

const BlogFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { validToken } = useAuth();
  const [formData, setFormData] = useState(initialState);

  const { data: blogCategoryData } = useFetch(
    apis.blogCategory.getAll,
    validToken,
  );

  const { data: fetchedData } = useFetch(
    isEdit ? `${apis.blog.getSingle}/${id}` : null,
    validToken
  );

  const {
    postData,
    response: createResponse,
    postError,
  } = useCreate(apis.blog.create);

  const {
    updateData,
    response: updateResponse,
    updateError,
  } = usePatch(isEdit ? `${apis.client.update}/${id}` : null);

  const { errors, validate } = useFormValidation();

  useEffect(() => {
    if (isEdit && fetchedData?.data) {
      const {
        logo, name,
      } = fetchedData.data;

      setFormData({
        name: name,
        logo: logo ? `${API_BASE_URL}/${logo}` : null,
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
      title: { required: true, label: "title" },
    });

    if (!isValid) return;

    const form = new FormData();
    form.append("title", formData.title);
    form.append("category", formData.category);
    form.append("shortDescription", formData.shortDescription);
    form.append("fullDescription", formData.fullDescription);
    form.append("home", formData.home);
    form.append("popularBlog", formData.popularBlog);
    form.append("tags", formData.tags);
    form.append("numberOfComment", formData.numberOfComment);

    if (formData.frontImage === null) {
      form.append("removeFrontImage", "true");
    } else if (typeof formData.frontImage !== "string") {
      form.append("frontImage", formData.frontImage);
    }

    if (formData.detailImage === null) {
      form.append("removeDetailImage", "true");
    } else if (typeof formData.detailImage !== "string") {
      form.append("detailImage", formData.detailImage);
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
      navigate("/blog/list");
    } else if (postError) {
      toast.error(postError);
    }
  }, [createResponse, postError, navigate]);

  useEffect(() => {
    if (updateResponse?.success) {
      toast.success("Updated successfully");
      navigate("/blog/list");
    } else if (updateError) {
      toast.error(updateError);
    }
  }, [updateResponse, updateError, navigate]);

  const homeOptions = [
    { _id: true, name: "true" },
    { _id: false, name: "false" }
  ];

  const popularBlogOptions = [
    { _id: true, name: "true" },
    { _id: false, name: "false" }
  ];

  const categories = blogCategoryData?.data || [];

  return (
    <FormWrapper
      title={isEdit ? "Update Blog" : "Add Blog"}
      onSubmit={handleSubmit}
    >
      <Select
        label="Category"
        name="category"
        value={formData.category}
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
        label="Title"
        name="title"
        value={formData.title}
        required
        error={errors.title}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter title"
      />

      <Input
        label="Number Of Comment"
        name="numberOfComment"
        value={formData.numberOfComment}
        required
        error={errors.numberOfComment}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter Number Of Comment"
      />

      <Select
        label="Home"
        name="home"
        value={formData.home}
        onChange={handleChange}
        options={homeOptions}
        optionKey="_id"
        optionValue="name"
        error={errors.home}
        width="col-md-6"
        placeholder="Select"
        required
      />

      <Select
        label="Popular Blog"
        name="popularBlog"
        value={formData.popularBlog}
        onChange={handleChange}
        options={popularBlogOptions}
        optionKey="_id"
        optionValue="name"
        error={errors.popularBlog}
        width="col-md-6"
        placeholder="Select"
        required
      />

      <Input
        label="Tags"
        name="tags"
        value={formData.tags}
        required
        error={errors.tags}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter Tags"
      />

      <Image
        label="Front Image"
        name="frontImage"
        value={formData.frontImage}
        onChange={(file) => handleFileChange(file, "frontImage")}
        width="col-md-6"
        placeholder="frontImage"
        padding="6px"
        required
      />

      <Image
        label="Detail Image"
        name="detailImage"
        value={formData.detailImage}
        onChange={(file) => handleFileChange(file, "detailImage")}
        width="col-md-6"
        placeholder="detailImage"
        padding="6px"
        required
      />

      <TextArea
        label="Short Description"
        name="shortDescription"
        value={formData.shortDescription}
        onChange={handleChange}
        rows={6}
        placeholder="Write Short Description"
        required
      />

      <TextArea
        label="Full Description"
        name="fullDescription"
        value={formData.fullDescription}
        onChange={handleChange}
        rows={6}
        placeholder="Write Full Description"
        required
      />
    </FormWrapper>
  );
};

export default BlogFormPage;
