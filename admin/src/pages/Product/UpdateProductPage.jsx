import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormWrapper from "../../components/Form/FormWrapper";
import Input from "../../components/Input/Input";
import Select from "../../components/Input/Select";
import Images from "../../components/Input/Images";
import TextEditor from "../../components/Input/TextEditor";
import useFormValidation from "../../hooks/useFormValidation";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import useFetch from "../../hooks/useFetch";
import useFetchData from "../../hooks/useFetchData";
import apis, { API_BASE_URL } from "../../apis/apis";
import usePatch from "../../hooks/usePatch";

const UpdateProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { validToken } = useAuth();

  const { updateData, response, updateError, isUpdating } = usePatch(`${apis.product.update}/${id}`);
  const { errors, validate } = useFormValidation();

  const { data: productData } = useFetchData(`${apis.product.getSingle}/${id}`, validToken);
  const { data: brandData } = useFetch(apis.brand.getAll, validToken);
  const { data: categoryData } = useFetch(apis.category.getAll, validToken);
  const { data: subCategoryData, setParams: fetchSubCategories } = useFetchData(
    apis.subCategory.getAll,
    validToken,
    null
  );

  const [form, setForm] = useState({
    name: "",
    category: "",
    subCategory: "",
    brand: "",
    mrpPrice: "",
    salePrice: "",
    stock: "",
    skuCode: "",
    rating: "",
    numberOfReviews: "",
    smallInfo: "",
    description: "",
    specification: "",
    amazonLink: "",
    flipKartLink: "",
    youtubeVideoLink: "",
    bestSellingProduct: "",
    newArrivalProduct: "",
    images: [],
  });

  const [removedIndexes, setRemovedIndexes] = useState([]);

  useEffect(() => {
    if (productData?.data) {
      const product = productData?.data;

      setForm({
        name: product.name || "",
        category: product.category?._id || "",
        subCategory: product.subCategory?._id || "",
        brand: product.brand?._id || "",
        mrpPrice: product.mrpPrice || "",
        salePrice: product.salePrice || "",
        stock: product.stock || "",
        skuCode: product.skuCode || "",
        rating: product.rating || "",
        numberOfReviews: product.numberOfReviews || "",
        smallInfo: product.smallInfo || "",
        description: product.description || "",
        specification: product.specification || "",
        amazonLink: product.amazonLink || "",
        flipKartLink: product.flipKartLink || "",
        youtubeVideoLink: product.youtubeVideoLink || "",
        bestSellingProduct: !!product.bestSellingProduct,
        newArrivalProduct: !!product.newArrivalProduct,
        images: product.images?.map((img) => `${API_BASE_URL}/${img}`) || [],
      });

      if (product.category?._id) {
        fetchSubCategories({ category: product.category._id });
      }
    }
  }, [productData, fetchSubCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "category") {
      setForm((prev) => ({ ...prev, subCategory: "" }));
      fetchSubCategories({ category: value || null });
    }
  };

  const handleEditorChange = (content, name) => {
    setForm((prev) => ({ ...prev, [name]: content }));
  };

  const handleImageChange = (files) => {
    setForm((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate(form, {
      name: { required: true, label: "Name" },
      category: { required: true, label: "Category" },
      images: { required: true, label: "Images" },
      skuCode: { required: true, label: "SKU Code" },
      salePrice: { required: true, label: "Sale Price" },
      mrpPrice: { required: true, label: "MRP Price" },
      stock: { required: true, label: "Stock" },
    });

    if (!isValid) return;

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "images" && Array.isArray(value)) {
        value.forEach((file) => {
          if (file instanceof File) formData.append("images", file);
        });
      } else {
        formData.append(key, value);
      }
    });

    formData.append("removedIndexes", JSON.stringify(removedIndexes));

    await updateData(formData, validToken, true);
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("Updated successfully");
      navigate("/product/list");
    } else if (updateError) {
      toast.error(updateError);
    }
  }, [response, updateError, navigate]);

  const categories = categoryData?.data || [];
  const subCategories = subCategoryData?.data || [];
  const brands = brandData?.data || [];

  return (
    <FormWrapper
      title="Update Product"
      onSubmit={handleSubmit}
      buttonLabel={isUpdating ? "Updating..." : "Update"}
    >
      <div className="row">
        <Select
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          options={categories}
          optionKey="_id"
          optionValue="name"
          error={errors.category}
          width="col-md-4"
          placeholder="Select Category"
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
          width="col-md-4"
          placeholder="Select Sub Category"
        />

        <Select
          label="Brand"
          name="brand"
          value={form.brand}
          onChange={handleChange}
          options={brands}
          optionKey="_id"
          optionValue="name"
          error={errors.brand}
          width="col-md-4"
          placeholder="Select Brand"
        />
      </div>

      <div className="row">
        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          width="col-md-4"
          placeholder="Enter Name"
          required
        />

        <Input
          label="Stock"
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          error={errors.stock}
          width="col-md-4"
          placeholder="Enter Stock Quantity"
          required
        />

        <Input
          label="SKU Code"
          name="skuCode"
          value={form.skuCode}
          onChange={handleChange}
          error={errors.skuCode}
          width="col-md-4"
          placeholder="Enter SKU Code"
          required
        />
      </div>

      <div className="row">
        <Input
          label="MRP Price"
          name="mrpPrice"
          type="number"
          value={form.mrpPrice}
          onChange={handleChange}
          error={errors.mrpPrice}
          width="col-md-6"
          placeholder="Enter MRP Price"
          required
        />
        <Input
          label="Sale Price"
          name="salePrice"
          type="number"
          value={form.salePrice}
          onChange={handleChange}
          error={errors.salePrice}
          width="col-md-6"
          placeholder="Enter Sale Price"
          required
        />
      </div>

      <div className="row">
        <Input
          label="Rating"
          name="rating"
          type="number"
          value={form.rating}
          onChange={handleChange}
          error={errors.rating}
          width="col-md-6"
          placeholder="Enter Rating"
        />
        <Input
          label="Reviews"
          name="numberOfReviews"
          type="number"
          value={form.numberOfReviews}
          onChange={handleChange}
          error={errors.numberOfReviews}
          width="col-md-6"
          placeholder="Enter Reviews"
        />
      </div>

      <div className="row">
        <Input
          label="Amazon Link"
          name="amazonLink"
          value={form.amazonLink}
          onChange={handleChange}
          error={errors.amazonLink}
          width="col-md-4"
          placeholder="Amazon URL"
        />
        <Input
          label="Flipkart Link"
          name="flipKartLink"
          value={form.flipKartLink}
          onChange={handleChange}
          error={errors.flipKartLink}
          width="col-md-4"
          placeholder="Flipkart URL"
        />
        <Input
          label="YouTube Link"
          name="youtubeVideoLink"
          value={form.youtubeVideoLink}
          onChange={handleChange}
          error={errors.youtubeVideoLink}
          width="col-md-4"
          placeholder="YouTube URL"
        />
      </div>

      <div className="row">
        <Select
          label="Best Selling Product"
          name="bestSellingProduct"
          value={form.bestSellingProduct}
          onChange={handleChange}
          options={[
            { _id: true, name: "Yes" },
            { _id: false, name: "No" },
          ]}
          optionKey="_id"
          optionValue="name"
          error={errors.bestSellingProduct}
          width="col-md-6"
          placeholder="Select option"
        />

        <Select
          label="New Arrival Product"
          name="newArrivalProduct"
          value={form.newArrivalProduct}
          onChange={handleChange}
          options={[
            { _id: true, name: "Yes" },
            { _id: false, name: "No" },
          ]}
          optionKey="_id"
          optionValue="name"
          error={errors.newArrivalProduct}
          width="col-md-6"
          placeholder="Select option"
        />
      </div>

      <Images
        label="Images"
        onChange={handleImageChange}
        onRemovedIndexesChange={setRemovedIndexes}
        placeholder="Images"
        error={errors.images}
        existingImages={form.images}
        width="col-md-12"
        required
      />

      <TextEditor
        label="Small Info"
        name="smallInfo"
        value={form.smallInfo}
        onChange={(content) => handleEditorChange(content, "smallInfo")}
        error={errors.smallInfo}
      />

      <TextEditor
        label="Description"
        name="description"
        value={form.description}
        onChange={(content) => handleEditorChange(content, "description")}
        error={errors.description}
      />

      <TextEditor
        label="Specification"
        name="specification"
        value={form.specification}
        onChange={(content) => handleEditorChange(content, "specification")}
        error={errors.specification}
      />
    </FormWrapper>
  );
};

export default UpdateProductPage;
