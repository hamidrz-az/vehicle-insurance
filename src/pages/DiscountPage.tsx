import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useGetThirdDiscountsQuery } from "../api/discountsApi";
import InputField from "../components/common/InputField";
import { selectInsurance, setDiscounts } from "../features/insurance/InsuranceSlice";
import Button from "../components/common/Button";
import { SelectData } from "../types/dropdownOptions";
import InsuranceModal from "../components/common/InsuranceModal";
import HeaderLayout from "../components/layout/HeaderLayout";

const DiscountsSchema = z.object({
    thirdPersonDiscount: z.object({ id: z.number(), title: z.string() })
        .refine((v) => v.id !== 0 && v.title !== "", {
            message: "لطفاً درصد تخفیف ثالث خودرو را انتخاب کنید",
        }),
    driverDiscount: z.object({ id: z.number(), title: z.string() })
        .refine((v) => v.id !== 0 && v.title !== "", {
            message: "لطفاً درصد تخفیف حوادث راننده را انتخاب کنید",
        }),
});

type DiscountsFormValues = z.infer<typeof DiscountsSchema>;

const DiscountPage: React.FC = () => {
    const dispatch = useDispatch();
    const { thirdPersonDiscount, driverDiscount } = useSelector(selectInsurance);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const {
        control,
        watch,
        trigger,
        formState: { errors, isValid, touchedFields },
    } = useForm<DiscountsFormValues>({
        resolver: zodResolver(DiscountsSchema),
        mode: "onBlur",
        defaultValues: {
            thirdPersonDiscount: thirdPersonDiscount || { id: 0, title: "" },
            driverDiscount: driverDiscount || { id: 0, title: "" },
        },
    });

    const {
        data: discountsData,
        isLoading,
        error: discountsApiError,
    } = useGetThirdDiscountsQuery(undefined);

    const selectedThirdPersonDiscount = watch("thirdPersonDiscount");
    const selectedDriverDiscount = watch("driverDiscount");

    useEffect(() => {
        if (
            selectedThirdPersonDiscount.id !== 0 &&
            selectedDriverDiscount.id !== 0
        ) {
            dispatch(
                setDiscounts({
                    thirdPersonDiscount: selectedThirdPersonDiscount,
                    driverDiscount: selectedDriverDiscount,
                })
            );
        }
    }, [selectedThirdPersonDiscount, selectedDriverDiscount, dispatch]);

    return (
        <>
            <HeaderLayout>درصد تخفیف های خود را انتخاب کنید</HeaderLayout>

            <form className="space-y-6">

                <div className="grid grid-cols-1 gap-6 sm:gap-4">

                    <Controller
                        name="thirdPersonDiscount"
                        control={control}
                        render={({ field }) => (
                            <InputField
                                type="select"
                                placeholder="درصد تخفیف ثالث"
                                error={touchedFields.thirdPersonDiscount && errors.thirdPersonDiscount}
                                options={
                                    discountsData?.map((type: SelectData) => ({
                                        value: JSON.stringify(type),
                                        label: type.title,
                                    })) || []
                                }
                                {...field}
                                onChange={(e) => {
                                    field.onChange(JSON.parse(e.target.value));
                                    trigger("thirdPersonDiscount");
                                }}
                                value={JSON.stringify(field.value)}
                                disabled={isLoading || !!discountsApiError}
                            />
                        )}
                    />

                    <Controller
                        name="driverDiscount"
                        control={control}
                        render={({ field }) => (
                            <InputField
                                type="select"
                                placeholder="درصد تخفیف حوادث راننده"
                                error={touchedFields.driverDiscount && errors.driverDiscount}
                                options={
                                    discountsData?.map((type: SelectData) => ({
                                        value: JSON.stringify(type),
                                        label: type.title,
                                    }))
                                }
                                {...field}
                                onChange={(e) => {
                                    field.onChange(JSON.parse(e.target.value));
                                    trigger("driverDiscount");
                                }}
                                value={JSON.stringify(field.value)}
                                disabled={isLoading || !!discountsApiError}
                            />
                        )}
                    />
                </div>
            </form>

            <div className="flex md:justify-start justify-center mt-6">
                <Button type="button" variant="fill" disabled={!isValid} onClick={openModal}>
                    استعلام قیمت
                </Button>
            </div>
            <InsuranceModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};

export default DiscountPage;
