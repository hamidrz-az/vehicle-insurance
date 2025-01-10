import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useGetThirdDiscountsQuery } from "../api/discountsApi";
import InputField from "../components/UI/InputField";
import { selectInsurance, setDiscounts } from "../features/insurance/InsuranceSlice";
import Button from "../components/UI/Button";
import { SelectData } from "../types/dropdownOptions";

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
      <h1 className="text-center md:text-right text-2xl font-bold mb-16">
        بیمه شخص ثالث
      </h1>

      <form className="space-y-6">
        <p className="text-right">درصد تخفیف های خود را انتخاب کنید</p>

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

      <div className="flex flex-end mt-6">
        <Button type="button" variant="fill" disabled={!isValid}>
          استعلام قیمت
        </Button>
      </div>
    </>
  );
};

export default DiscountPage;
