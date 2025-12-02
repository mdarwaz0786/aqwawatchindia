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
  title: "",
  subTitle: "",
  description: "",
  youTubeVideoLink1: "",
  youTubeVideoLink2: "",
  youTubeVideoLink3: "",
  youTubeVideoLink4: "",
  youTubeVideoLink5: "",
  youTubeVideoLink6: "",
};

const YouTubeVideoFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { validToken } = useAuth();
  const [formData, setFormData] = useState(initialState);

  const { data: fetchedData } = useFetch(
    isEdit ? `${apis.youTubeVideo.getSingle}/${id}` : null,
    validToken
  );

  const {
    postData,
    response: createResponse,
    postError,
  } = useCreate(apis.youTubeVideo.create);

  const {
    updateData,
    response: updateResponse,
    updateError,
  } = usePatch(isEdit ? `${apis.youTubeVideo.update}/${id}` : null);

  const { errors, validate } = useFormValidation();

  useEffect(() => {
    if (isEdit && fetchedData?.data) {
      const {
        title,
        subTitle,
        description,
        youTubeVideoLink1,
        youTubeVideoLink2,
        youTubeVideoLink3,
        youTubeVideoLink4,
        youTubeVideoLink5,
        youTubeVideoLink6,
      } = fetchedData.data;

      setFormData({
        title: title || "",
        subTitle: subTitle || "",
        description: description || "",
        youTubeVideoLink1: youTubeVideoLink1 || "",
        youTubeVideoLink2: youTubeVideoLink2 || "",
        youTubeVideoLink3: youTubeVideoLink3 || "",
        youTubeVideoLink4: youTubeVideoLink4 || "",
        youTubeVideoLink5: youTubeVideoLink5 || "",
        youTubeVideoLink6: youTubeVideoLink6 || "",
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
      title: { required: true, label: "title" },
    });

    if (!isValid) return;

    const form = {
      title: formData.title || "",
      subTitle: formData.subTitle || "",
      description: formData.description || "",
      youTubeVideoLink1: formData.youTubeVideoLink1 || "",
      youTubeVideoLink2: formData.youTubeVideoLink2 || "",
      youTubeVideoLink3: formData.youTubeVideoLink3 || "",
      youTubeVideoLink4: formData.youTubeVideoLink4 || "",
      youTubeVideoLink5: formData.youTubeVideoLink5 || "",
      youTubeVideoLink6: formData.youTubeVideoLink6 || "",
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
      navigate("/youtube-video/list");
    } else if (postError) {
      toast.error(postError);
    }
  }, [createResponse, postError, navigate]);

  useEffect(() => {
    if (updateResponse?.success) {
      toast.success("Updated successfully");
      navigate("/youtube-video/list");
    } else if (updateError) {
      toast.error(updateError);
    }
  }, [updateResponse, updateError, navigate]);

  return (
    <FormWrapper
      title={isEdit ? "Update YouTube Video" : "Add YouTube Video"}
      onSubmit={handleSubmit}
    >

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
        label="Sub Title"
        name="subTitle"
        value={formData.subTitle}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter sub title"
      />

      <Input
        label="YouTube Video Link 1"
        name="youTubeVideoLink1"
        value={formData.youTubeVideoLink1}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter YouTube link 1"
      />

      <Input
        label="YouTube Video Link 2"
        name="youTubeVideoLink2"
        value={formData.youTubeVideoLink2}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter YouTube link 2"
      />

      <Input
        label="YouTube Video Link 3"
        name="youTubeVideoLink3"
        value={formData.youTubeVideoLink3}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter YouTube link 3"
      />

      <Input
        label="YouTube Video Link 4"
        name="youTubeVideoLink4"
        value={formData.youTubeVideoLink4}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter YouTube link 4"
      />

      <Input
        label="YouTube Video Link 5"
        name="youTubeVideoLink5"
        value={formData.youTubeVideoLink5}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter YouTube link 5"
      />

      <Input
        label="YouTube Video Link 6"
        name="youTubeVideoLink6"
        value={formData.youTubeVideoLink6}
        onChange={handleChange}
        width="col-md-6"
        placeholder="Enter YouTube link 6"
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

export default YouTubeVideoFormPage;
