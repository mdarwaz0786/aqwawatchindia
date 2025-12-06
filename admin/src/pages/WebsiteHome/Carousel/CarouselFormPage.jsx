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
import Input from "../../../components/Input/Input";

const initialState = {
  navigateTo: "",
  banner: null,
};

const CarouselFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { validToken } = useAuth();
  const [formData, setFormData] = useState(initialState);

  const { data: fetchedData } = useFetch(
    isEdit ? `${apis.carousel.getSingle}/${id}` : null,
    validToken
  );

  const {
    postData,
    response: createResponse,
    postError,
  } = useCreate(apis.carousel.create);

  const {
    updateData,
    response: updateResponse,
    updateError,
  } = usePatch(isEdit ? `${apis.carousel.update}/${id}` : null);

  const { errors, validate } = useFormValidation();

  useEffect(() => {
    if (isEdit && fetchedData?.data) {
      const { navigateTo, banner } = fetchedData.data;
      console.log(banner)
      setFormData({
        navigateTo: navigateTo || "",
        banner: banner ? `${API_BASE_URL}/${banner}` : null,
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
      banner: { required: true, label: "banner" },
      navigateTo: { required: true, label: "navigateTo" },
    });

    if (!isValid) return;

    const form = new FormData();
    form.append("navigateTo", formData.navigateTo);
    if (formData.banner && typeof formData.banner !== "string") {
      form.append("banner", formData.banner);
    };

    if (isEdit) {
      await updateData(form, validToken, true);
    } else {
      await postData(form, validToken, true);
    }
  };

  useEffect(() => {
    if (createResponse?.success) {
      toast.success("Created successfully");
      navigate("/carousel/list");
    } else if (postError) {
      toast.error(postError);
    }
  }, [createResponse, postError, navigate]);

  useEffect(() => {
    if (updateResponse?.success) {
      toast.success("Updated successfully");
      navigate("/carousel/list");
    } else if (updateError) {
      toast.error(updateError);
    }
  }, [updateResponse, updateError, navigate]);

  return (
    <FormWrapper
      title={isEdit ? "Update Carousel" : "Add Carousel"}
      onSubmit={handleSubmit}
    >
      <Image
        label="Banner"
        name="banner"
        value={formData.banner}
        onChange={(file) => handleFileChange(file, "banner")}
        required
        error={errors.banner}
        width="col-md-12"
        placeholder="banner"
      />

      <Input
        label="Navigate To"
        name="navigateTo"
        value={formData.navigateTo}
        required
        error={errors.navigateTo}
        onChange={handleChange}
        width="col-md-12"
        placeholder="Enter navigation link"
      />
    </FormWrapper>
  );
};

export default CarouselFormPage;
