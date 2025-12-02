/* eslint-disable react-hooks/exhaustive-deps */

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
import Image from "../../../components/Input/Image";
import Select from "../../../components/Input/Select";
import useFetchData from "../../../hooks/useFetchData";
import MultiSelect from "../../../components/Input/MultiSelect";

const initialState = {
  banner: null,
  category: null,
  products: null,
  position: "",
};

const PromotionFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { validToken } = useAuth();
  const [formData, setFormData] = useState(initialState);

  const { data: categoryData } = useFetch(
    apis.category.getAll,
    validToken,
  );

  const { data: productData, setParams: setProductParams } = useFetchData(
    apis.product.getAll,
    validToken,
    null,
  );

  const { data: fetchedData } = useFetch(
    isEdit ? `${apis.promotion.getSingle}/${id}` : null,
    validToken
  );

  const {
    postData,
    response: createResponse,
    postError,
  } = useCreate(apis.promotion.create);

  const {
    updateData,
    response: updateResponse,
    updateError,
  } = usePatch(isEdit ? `${apis.promotion.update}/${id}` : null);

  const { errors, validate } = useFormValidation();

  useEffect(() => {
    if (isEdit && fetchedData?.data) {
      const {
        banner, category, products, position,
      } = fetchedData.data;

      setFormData({
        banner: banner ? `${API_BASE_URL}/${banner}` : null,
        category: category?._id || null,
        products: products?.map((p) => p?._id || null),
        position: position || null,
      });

      if (category?._id) {
        setProductParams({ category: category?._id });
      }
    }
  }, [fetchedData, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "category") {
      if (value) {
        setProductParams({ category: value });
      } else {
        setProductParams(null);
      }
    }
  };

  const handleFileChange = (file, field) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate(formData, {
      banner: { required: true, label: "banner" },
      category: { required: true, label: "category" },
      products: { required: true, label: "products" },
      position: { required: true, label: "position" },
    });

    if (!isValid) return;

    const form = new FormData();
    form.append("category", formData.category);

    formData.products?.forEach((p) => {
      form.append("products", p);
    });

    form.append("position", formData.position);

    if (formData.banner === null) {
      form.append("removeBanner", "true");
    } else if (typeof formData.banner !== "string") {
      form.append("banner", formData.banner);
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
      navigate("/promotion/list");
    } else if (postError) {
      toast.error(postError);
    }
  }, [createResponse, postError, navigate]);

  useEffect(() => {
    if (updateResponse?.success) {
      toast.success("Updated successfully");
      navigate("/promotion/list");
    } else if (updateError) {
      toast.error(updateError);
    }
  }, [updateResponse, updateError, navigate]);

  const categories = categoryData?.data || [];
  const products = productData?.data || [];

  const positionOptions = [
    { _id: "Left", name: "Left" },
    { _id: "Right", name: "Right" }
  ];

  return (
    <FormWrapper
      title={isEdit ? "Update Promotion" : "Add Pomotion"}
      onSubmit={handleSubmit}
    >
      <Image
        label="Banner"
        name="banner"
        value={formData.banner}
        onChange={(file) => handleFileChange(file, "banner")}
        error={errors.banner}
        width="col-md-6"
        placeholder="banner"
        padding="6px"
        required
      />
      <Select
        label="Position"
        name="position"
        value={formData.position}
        onChange={handleChange}
        options={positionOptions}
        optionKey="_id"
        optionValue="name"
        error={errors.position}
        width="col-md-6"
        placeholder="Select postion"
        required
      />
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
      <MultiSelect
        label="Products"
        name="products"
        value={formData.products}
        onChange={handleChange}
        options={products}
        optionKey="_id"
        optionValue="name"
        error={errors.products}
        width="col-md-6"
        placeholder="Select a Category"
        required
      />
    </FormWrapper>
  );
};

export default PromotionFormPage;
