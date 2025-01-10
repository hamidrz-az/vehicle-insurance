import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetVehicleTypesQuery } from "../api/vehicleApi";
import InputField from "../components/UI/InputField";
import Button from "../components/UI/Button";
import { selectInsurance, setVehicleData } from "../features/insurance/InsuranceSlice";
import ArrowIcon from "../components/Icons/ArrowIcon";
import { SelectData } from "../types/dropdownOptions";

const VehicleSchema = z.object({
    vehicleType: z.object({ id: z.number(), title: z.string() })
        .refine((v) => v.id !== 0 && v.title !== "", {
            message: "لطفاً نوع خودرو را انتخاب کنید",
        }),
    vehicleModel: z.object({ id: z.number(), title: z.string() })
        .refine((v) => v.id !== 0 && v.title !== "", {
            message: "لطفاً مدل خودرو را انتخاب کنید",
        }),
});

type VehicleFormValues = z.infer<typeof VehicleSchema>;

const VehiclePage: React.FC = () => {
    const dispatch = useDispatch();
    const { vehicleType, vehicleModel } = useSelector(selectInsurance);
    const [vehicleModels, setVehicleModels] = useState<SelectData[]>([]);
    const navigate = useNavigate();

    const {
        control,
        watch,
        setValue,
        trigger,
        formState: { errors, isValid, touchedFields },
    } = useForm<VehicleFormValues>({
        resolver: zodResolver(VehicleSchema),
        mode: "onChange",
        defaultValues: {
            vehicleType: vehicleType || { id: 0, title: "" },
            vehicleModel: vehicleModel || { id: 0, title: "" },
        },
    });

    const {
        data: vehicleTypesData,
        isLoading,
        error: vehicleTypesError,
    } = useGetVehicleTypesQuery(undefined);

    const selectedVehicleType = watch("vehicleType");
    const selectedVehicleModel = watch("vehicleModel");

    // Update vehicle models dynamically when vehicle type changes
    useEffect(() => {
        if (selectedVehicleType && vehicleTypesData) {
            const selectedType = vehicleTypesData.find(
                (type: { id: number }) => type.id === selectedVehicleType.id
            );
            if (selectedType && selectedType.usages) {
                setVehicleModels(selectedType.usages);
            } else {
                setVehicleModels([]);
            }
            // Reset vehicle model and re-validate form
            setValue("vehicleModel", { id: 0, title: "" });
            trigger(); // Re-validate after resetting
        }
    }, [selectedVehicleType, vehicleTypesData, setValue, trigger]);

    useEffect(() => {
        if (selectedVehicleType.id !== 0 || selectedVehicleModel.id !== 0) {
            dispatch(
                setVehicleData({
                    vehicleType: selectedVehicleType.id !== 0 ? selectedVehicleType : null,
                    vehicleModel: selectedVehicleModel.id !== 0 ? selectedVehicleModel : null,
                })
            );
        }
    }, [selectedVehicleType, selectedVehicleModel, dispatch]);


    return (
        <>
            <h1 className="text-center md:text-right text-2xl font-bold mb-16">بیمه شخص ثالث</h1>

            <form className="space-y-6">
                <p className="text-right">نوع و مدل خودروی خود را انتخاب کنید</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4">

                    <div className="sm:order-last">
                        <Controller
                            name="vehicleType"
                            control={control}
                            render={({ field }) => (
                                <InputField
                                    type="select"
                                    placeholder="نوع خودرو"
                                    error={touchedFields.vehicleType && errors.vehicleType} // Show error only if touched
                                    options={
                                        vehicleTypesData?.map((type: SelectData) => ({
                                            value: JSON.stringify(type),
                                            label: type.title,
                                        })) || []
                                    }
                                    {...field}
                                    onChange={(e) => field.onChange(JSON.parse(e.target.value))}
                                    value={JSON.stringify(field.value)}
                                    disabled={isLoading || !!vehicleTypesError}
                                />
                            )}
                        />
                    </div>

                    <div className="sm:order-first">
                        <Controller
                            name="vehicleModel"
                            control={control}
                            render={({ field }) => (
                                <InputField
                                    type="select"
                                    placeholder="مدل خودرو"
                                    error={touchedFields.vehicleModel && errors.vehicleModel} // Show error only if touched
                                    options={
                                        vehicleModels.map((model) => ({
                                            value: JSON.stringify(model),
                                            label: model.title,
                                        }))
                                    }
                                    {...field}
                                    onChange={(e) => field.onChange(JSON.parse(e.target.value))}
                                    value={JSON.stringify(field.value)}
                                    disabled={!selectedVehicleType || vehicleModels.length === 0}
                                />
                            )}
                        />
                    </div>
                </div>
            </form>

            <div className="flex justify-between mt-6">
                <Button
                    type="button"
                    variant="outlined"
                    icon={<ArrowIcon direction="left" />}
                    iconPosition="left"
                    disabled={!isValid}
                    onClick={() => navigate("/companies")}
                >
                    مرحله بعد
                </Button>
                <Button
                    type="button"
                    variant="outlined"
                    icon={<ArrowIcon direction="right" />}
                    iconPosition="right"
                    onClick={() => navigate("/")}
                >
                    مرحله قبل
                </Button>
            </div>
        </>
    );
};

export default VehiclePage;
