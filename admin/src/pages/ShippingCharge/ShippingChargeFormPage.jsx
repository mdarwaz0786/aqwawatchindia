import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apis from '../../apis/apis';
import useFetch from "../../hooks/useFetch";
import useCreate from "../../hooks/useCreate";
import usePatch from "../../hooks/usePatch";
import FormWrapper from "../../components/Form/FormWrapper";
import useFormValidation from "../../hooks/useFormValidation";
import Input from "../../components/Input/Input";
import Select from "../../components/Input/Select";
import { useAuth } from "../../context/auth.context";

const initialState = {
  state: "",
  charge: 40,
};

const ShippingChargeFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { validToken } = useAuth();

  const [formData, setFormData] = useState(initialState);
  const [states, setStates] = useState([]);

  const { data: fetchedData } = useFetch(
    isEdit ? `${apis.shippingCharge.getSingle}/${id}` : null,
    validToken
  );

  const { postData, response: createResponse, postError } = useCreate(apis.shippingCharge.create);
  const {
    updateData,
    response: updateResponse,
    updateError,
  } = usePatch(isEdit ? `${apis.shippingCharge.update}/${id}` : null);

  const { errors, validate } = useFormValidation();

  useEffect(() => {
    async function loadStates() {
      try {
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/states",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: "India" }),
          }
        );

        const data = await res.json();

        const stateList =
          data?.data?.states?.map((s) => ({
            label: s.name,
            value: s.name,
          })) || [];

        setStates(stateList);
      } catch (err) {
        console.error("Failed to load states:", err);
      }
    }

    loadStates();
  }, []);

  useEffect(() => {
    if (isEdit && fetchedData?.data) {
      const { state, charge } = fetchedData.data;

      setFormData({
        state,
        charge,
      });
    };
  }, [fetchedData, isEdit]);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validate(formData, {
      state: { required: true, label: "state" },
      charge: { required: true, label: "charge" },
    });

    if (!isValid) return;

    const form = {
      state: formData.state,
      charge: formData.charge
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
      navigate("/shipping-charge/list");
    } else if (postError) {
      toast.error(postError);
    }
  }, [createResponse, postError, navigate]);

  useEffect(() => {
    if (updateResponse?.success) {
      toast.success("Updated successfully");
      navigate("/shipping-charge/list");
    } else if (updateError) {
      toast.error(updateError);
    }
  }, [updateResponse, updateError, navigate]);

  return (
    <FormWrapper
      title={isEdit ? "Update Shipping Charge" : "Add Shipping Charge"}
      onSubmit={handleSubmit}
    >
      <Select
        label="State"
        name="state"
        required
        error={errors.state}
        value={formData.state}
        onChange={handleSelectChange}
        options={states}
        optionKey="value"
        optionValue="label"
        width="col-md-6"
        placeholder="Select State"
      />

      <Input
        label="Charge"
        name="charge"
        value={formData.charge}
        required
        error={errors.charge}
        onChange={handleInputChange}
        width="col-md-6"
        placeholder="Enter Charge"
      />
    </FormWrapper>
  );
};

export default ShippingChargeFormPage;
