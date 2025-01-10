import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetVehicleTypesQuery } from '../api/vehicleApi';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import {
  selectInsurance,
  setVehicleData,
} from '../features/insurance/InsuranceSlice';
import ArrowIcon from '../components/Icons/ArrowIcon';
import { SelectData } from '../types/dropdownOptions';
import HeaderLayout from '../components/layout/HeaderLayout';

const VehicleSchema = z.object({
  vehicleType: z
    .object({ id: z.number(), title: z.string() })
    .refine((v) => v.id !== 0 && v.title !== '', {
      message: 'لطفاً نوع خودرو را انتخاب کنید',
    }),
  vehicleModel: z
    .object({ id: z.number(), title: z.string() })
    .refine((v) => v.id !== 0 && v.title !== '', {
      message: 'لطفاً مدل خودرو را انتخاب کنید',
    }),
});

type VehicleFormValues = z.infer<typeof VehicleSchema>;

const VehiclePage: React.FC = () => {
  const dispatch = useDispatch();
  const { vehicleType, vehicleModel } = useSelector(selectInsurance);
  const [vehicleModels, setVehicleModels] = useState<SelectData[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid, touchedFields },
  } = useForm<VehicleFormValues>({
    resolver: zodResolver(VehicleSchema),
    mode: 'onChange',
    defaultValues: {
      vehicleType: vehicleType || { id: 0, title: '' },
      vehicleModel: vehicleModel || { id: 0, title: '' },
    },
  });

  const {
    data: vehicleTypesData,
    isLoading,
    error: vehicleTypesError,
  } = useGetVehicleTypesQuery(undefined);

  const selectedVehicleType = watch('vehicleType');
  const selectedVehicleModel = watch('vehicleModel');

  // Initialize vehicle models when component mounts and there's existing data
  useEffect(() => {
    if (vehicleType && vehicleTypesData && !isInitialized) {
      const selectedType = vehicleTypesData.find(
        (type: { id: number }) => type.id === vehicleType.id
      );
      if (selectedType && selectedType.usages) {
        setVehicleModels(selectedType.usages);
        setIsInitialized(true);
      }
    }
  }, [vehicleType, vehicleTypesData, isInitialized]);

  // Update vehicle models dynamically when vehicle type changes
  useEffect(() => {
    if (selectedVehicleType && vehicleTypesData) {
      const selectedType = vehicleTypesData.find(
        (type: { id: number }) => type.id === selectedVehicleType.id
      );
      if (selectedType && selectedType.usages) {
        setVehicleModels(selectedType.usages);
        // Only reset vehicle model if it's a new selection
        if (selectedVehicleType.id !== vehicleType?.id) {
          setValue('vehicleModel', { id: 0, title: '' });
          trigger();
        }
      } else {
        setVehicleModels([]);
      }
    }
  }, [selectedVehicleType, vehicleTypesData, setValue, trigger, vehicleType]);

  // Update store when selections change
  useEffect(() => {
    if (selectedVehicleType.id !== 0 || selectedVehicleModel.id !== 0) {
      dispatch(
        setVehicleData({
          vehicleType:
            selectedVehicleType.id !== 0 ? selectedVehicleType : null,
          vehicleModel:
            selectedVehicleModel.id !== 0 ? selectedVehicleModel : null,
        })
      );
    }
  }, [selectedVehicleType, selectedVehicleModel, dispatch]);

  return (
    <>
      <HeaderLayout>نوع و مدل خودروی خود را انتخاب کنید</HeaderLayout>

      <form className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4">
          <div className="sm:order-last">
            <Controller
              name="vehicleType"
              control={control}
              render={({ field }) => (
                <InputField
                  type="select"
                  placeholder="نوع خودرو"
                  error={touchedFields.vehicleType && errors.vehicleType}
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
                  error={touchedFields.vehicleModel && errors.vehicleModel}
                  options={vehicleModels.map((model) => ({
                    value: JSON.stringify(model),
                    label: model.title,
                  }))}
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
          onClick={() => navigate('/companies')}
        >
          مرحله بعد
        </Button>
        <Button
          type="button"
          variant="outlined"
          icon={<ArrowIcon direction="right" />}
          iconPosition="right"
          onClick={() => navigate('/')}
        >
          مرحله قبل
        </Button>
      </div>
    </>
  );
};

export default VehiclePage;
