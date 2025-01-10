import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { setInsuranceCompany } from '../features/insurance/InsuranceSlice';
import InputField from '../components/common/InputField';
import { useGetInsuranceCompaniesQuery } from '../api/insuranceCompaniesApi';
import Button from '../components/common/Button';
import ArrowIcon from '../components/Icons/ArrowIcon';
import { useNavigate } from 'react-router-dom';
import { SelectData } from '../types/dropdownOptions';
import HeaderLayout from '../components/layout/HeaderLayout';

const CompanySchema = z.object({
  insuranceCompany: z
    .object({ id: z.number(), title: z.string() })
    .refine((v) => v.id !== 0 && v.title !== '', {
      message: 'لطفاً شرکت بیمه گر را انتخاب کنید',
    }),
});

type InsuranceCompanyValues = z.infer<typeof CompanySchema>;

const InsuranceCompaniesPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: insuranceCompanies,
    isLoading,
    error: insuranceCompaniesError,
  } = useGetInsuranceCompaniesQuery(undefined);

  const {
    control,
    watch,
    formState: { errors, isValid },
  } = useForm<InsuranceCompanyValues>({
    resolver: zodResolver(CompanySchema),
    mode: 'onChange',
    defaultValues: {
      insuranceCompany: { id: 0, title: '' },
    },
  });

  const selectedInsuranceCompany = watch('insuranceCompany');

  useEffect(() => {
    if (selectedInsuranceCompany && selectedInsuranceCompany.id !== 0) {
      dispatch(setInsuranceCompany(selectedInsuranceCompany));
    }
  }, [selectedInsuranceCompany, dispatch]);

  return (
    <div>
      <HeaderLayout>شرکت بیمه گر قبلی خود را انتخاب کنید</HeaderLayout>

      <form className="space-y-6">
        <Controller
          name="insuranceCompany"
          control={control}
          render={({ field }) => (
            <InputField
              type="select"
              placeholder="شرکت بیمه گر قبلی"
              options={
                insuranceCompanies?.map((company: SelectData) => ({
                  value: company.id,
                  label: company.title,
                })) || []
              }
              {...field}
              onChange={(e) => {
                const selectedCompany = insuranceCompanies?.find(
                  (company: SelectData) =>
                    company.id === parseInt(e.target.value)
                );
                field.onChange(selectedCompany); // Pass the entire company object when selected
              }}
              value={field.value ? field.value.id : ''}
              disabled={isLoading || !!insuranceCompaniesError}
            />
          )}
        />

        {errors.insuranceCompany && (
          <p className="text-xs text-red-500 mt-1">
            {errors.insuranceCompany.message}
          </p>
        )}

        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outlined"
            icon={<ArrowIcon direction="left" />}
            iconPosition="left"
            disabled={!isValid}
            onClick={() => navigate('/discounts')}
          >
            مرحله بعد
          </Button>
          <Button
            type="button"
            variant="outlined"
            icon={<ArrowIcon direction="right" />}
            iconPosition="right"
            onClick={() => navigate('/vehicle')}
          >
            مرحله قبل
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InsuranceCompaniesPage;
