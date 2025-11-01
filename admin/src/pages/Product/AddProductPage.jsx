import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth.context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apis from "../../apis/apis";
import useFetchData from "../../hooks/useFetchData";
import useCreate from "../../hooks/useCreate";
import FormWrapper from "../../components/Form/FormWrapper";
import Input from "../../components/Input/Input";
import Textarea from "../../components/Input/Textarea";
import Image from "../../components/Input/Image";
import Images from "../../components/Input/Images";
import Select from "../../components/Input/Select";
import MultiStepProgressBar from "../../components/MultiStep/MultiStepProgressBar";

const ProductAddPage = () => {
  const { validToken } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [productInfo, setProductInfo] = useState({
    category: "",
    subCategory: "",
    subSubCategory: "",
    brand: "",
    name: "",
    slug: "",
    skuCode: "",
    thumbImage: "",
    thumbMrpPrice: "",
    thumbSalePrice: "",
    thumbStock: "",
    smallInfo: "",
    description: "",
    specification: "",
  });

  const [variantInfo, setVariantInfo] = useState({
    color: "",
    size: "",
    skuCode: "",
    mrpPrice: "",
    salePrice: "",
    stock: "",
    images: [],
  });

  const [flags, setFlags] = useState({
    featuredProduct: "false",
    bestSellingProduct: "false",
    specialProduct: "false",
    newArrivalProduct: "false",
    topRatedProduct: "false",
    dealsOfDayProduct: "false",
    trendingProduct: "false",
    ourBestProduct: "false",
  });

  // Fetch dropdowns
  const { data: categoryData } = useFetchData(apis.category.getAll, validToken);
  const { data: brandData } = useFetchData(apis.brand.getAll, validToken);
  const { data: colorData } = useFetchData(apis.color.getAll, validToken);
  const { data: sizeData } = useFetchData(apis.size.getAll, validToken);

  const { data: subCategoryData, setParams: fetchSubCategories } = useFetchData(
    apis.subCategory.getAll,
    validToken,
    null
  );
  const { data: subSubCategoryData, setParams: fetchSubSubCategories } = useFetchData(
    apis.subSubCategory.getAll,
    validToken,
    null
  );

  const { postData: createHybrid, response, error } = useCreate();

  // Handle dependent dropdowns
  const handleProductInfoChange = (e) => {
    const { name, value } = e.target;
    setProductInfo((prev) => ({ ...prev, [name]: value }));

    if (name === "category") {
      setProductInfo((prev) => ({ ...prev, subCategory: "", subSubCategory: "" }));
      if (value) fetchSubCategories({ category: value });
      else fetchSubCategories({ category: null });
      fetchSubSubCategories({ subCategory: null });
    }

    if (name === "subCategory") {
      setProductInfo((prev) => ({ ...prev, subSubCategory: "" }));
      if (value) fetchSubSubCategories({ subCategory: value });
      else fetchSubSubCategories({ subCategory: null });
    }
  };

  // Unified final submit
  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    const productPayload = {
      ...productInfo,
      ...Object.fromEntries(Object.entries(flags).map(([k, v]) => [k, v === "true"])),
    };

    const payload = {
      product: productPayload,
      variant: variantInfo,
    };

    await createHybrid(apis.product.createHybrid, payload, validToken);
  };

  useEffect(() => {
    if (response?.success) {
      toast.success("🎉 Product and Variant created successfully!");
      navigate("/product/list");
    }
    if (error) toast.error(error);
  }, [response, error]);

  // Dropdown data
  const categories = categoryData?.data || [];
  const subCategories = subCategoryData?.data || [];
  const subSubCategories = subSubCategoryData?.data || [];
  const brands = brandData?.data || [];
  const colors = colorData?.data || [];
  const sizes = sizeData?.data || [];

  // Step 1
  const renderStep1 = () => (
    <>
      <Select width="col-md-4" label="Category" name="category" value={productInfo.category} onChange={handleProductInfoChange} options={categories} optionKey="_id" optionValue="name" required />
      <Select width="col-md-4" label="Sub Category" name="subCategory" value={productInfo.subCategory} onChange={handleProductInfoChange} options={subCategories} optionKey="_id" optionValue="name" />
      <Select width="col-md-4" label="Sub Sub Category" name="subSubCategory" value={productInfo.subSubCategory} onChange={handleProductInfoChange} options={subSubCategories} optionKey="_id" optionValue="name" />
      <Select width="col-md-6" label="Brand" name="brand" value={productInfo.brand} onChange={handleProductInfoChange} options={brands} optionKey="_id" optionValue="name" />
      <Input width="col-md-6" label="Product Name" name="name" required value={productInfo.name} onChange={handleProductInfoChange} />
      <Input width="col-md-6" label="SKU Code" name="skuCode" value={productInfo.skuCode} onChange={handleProductInfoChange} />
      <Input width="col-md-6" label="MRP Price" type="number" required name="thumbMrpPrice" value={productInfo.thumbMrpPrice} onChange={handleProductInfoChange} />
      <Input width="col-md-6" label="Sale Price" type="number" required name="thumbSalePrice" value={productInfo.thumbSalePrice} onChange={handleProductInfoChange} />
      <Input width="col-md-6" label="Stock" type="number" name="thumbStock" value={productInfo.thumbStock} onChange={handleProductInfoChange} />
      <Image width="col-md-6" label="Thumbnail Image" name="thumbImage" value={productInfo.thumbImage} onChange={(file) => setProductInfo({ ...productInfo, thumbImage: file })} required />
      <Textarea label="Small Info" name="smallInfo" value={productInfo.smallInfo} onChange={handleProductInfoChange} required />
      <Textarea label="Description" name="description" value={productInfo.description} onChange={handleProductInfoChange} />
      <Textarea label="Specification" name="specification" value={productInfo.specification} onChange={handleProductInfoChange} />
    </>
  );

  // Step 2
  const renderStep2 = () => (
    <>
      <Select width="col-md-6" label="Color" name="color" value={variantInfo.color} onChange={(e) => setVariantInfo({ ...variantInfo, color: e.target.value })} options={colors} optionKey="_id" optionValue="name" />
      <Select width="col-md-6" label="Size" name="size" value={variantInfo.size} onChange={(e) => setVariantInfo({ ...variantInfo, size: e.target.value })} options={sizes} optionKey="_id" optionValue="name" />
      <Input width="col-md-4" label="SKU Code" name="skuCode" value={variantInfo.skuCode} onChange={(e) => setVariantInfo({ ...variantInfo, skuCode: e.target.value })} />
      <Input width="col-md-4" label="MRP Price" type="number" name="mrpPrice" value={variantInfo.mrpPrice} onChange={(e) => setVariantInfo({ ...variantInfo, mrpPrice: e.target.value })} />
      <Input width="col-md-4" label="Sale Price" type="number" name="salePrice" value={variantInfo.salePrice} onChange={(e) => setVariantInfo({ ...variantInfo, salePrice: e.target.value })} />
      <Input width="col-md-4" label="Stock" type="number" name="stock" value={variantInfo.stock} onChange={(e) => setVariantInfo({ ...variantInfo, stock: e.target.value })} />
      <Images onChange={(files) => setVariantInfo({ ...variantInfo, images: files })} />
    </>
  );

  // Step 3
  const renderStep3 = () => (
    <>
      {Object.keys(flags).map((key) => (
        <div className="col-md-3 mb-3" key={key}>
          <Select
            label={key.replace(/([A-Z])/g, " $1")}
            name={key}
            value={flags[key]}
            onChange={(e) => setFlags({ ...flags, [key]: e.target.value })}
            options={[
              { label: "Yes", value: "true" },
              { label: "No", value: "false" },
            ]}
            optionKey="value"
            optionValue="label"
          />
        </div>
      ))}
    </>
  );

  return (
    <div className="container mt-3">
      <h4>Add Product</h4>

      <MultiStepProgressBar
        step={step}
        steps={3}
        stepLabels={["Product Info", "Variant Info", "Flags"]}
        onStepClick={(num) => setStep(num)}
      />

      <FormWrapper title="Add Product" onSubmit={handleFinalSubmit}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        <div className="mt-3 text-end">
          {step > 1 && (
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}
          {step < 3 && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setStep(step + 1)}
            >
              Next
            </button>
          )}
          {step === 3 && (
            <button type="submit" className="btn btn-success">
              Submit All
            </button>
          )}
        </div>
      </FormWrapper>
    </div>
  );
};

export default ProductAddPage;
