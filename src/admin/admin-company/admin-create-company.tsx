/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/rules-of-hooks */
import { observer } from "mobx-react-lite";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  DrawerBrand,
  ReactiveListButton,
  RenderButtonType
} from "src/common/components/molecules";

import { useService } from "react-service-locator";
import { CommonStatusEnum } from "src/core/sdk/gql-sdk/api-sdk";
import { Form } from "../../common/components/atoms";
import {
  IFieldGroupMeta,
  ReactiveFormWithList
} from "../../common/components/molecules";
import { createCompanyInput } from "./models";
import { AdminCompanyStore } from "./admin-company.store";

const defaultInput = createCompanyInput;

const AdminCreateCompany: FC = () => {
  const adminCompanyStore = useService(AdminCompanyStore);
  type Data = typeof defaultInput;
  const navigate = useNavigate();
  const { handleSubmit, ...methods } = useForm<Data>({
    mode: "onSubmit",
    reValidateMode: "onSubmit"
  });
  const {
    formState: { errors, dirtyFields }
  } = methods;
  const isDirty = Object.keys(dirtyFields).length;
  useEffect(() => {
    // store.servicesRegister({ admin, logger, navigate, methods });
    // store.loadData();
    methods.reset(defaultInput);
  }, [adminCompanyStore]);

  // useEffect(() => {
  //   store.dirtyFields = dirtyFields;
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [JSON.stringify(dirtyFields)]);

  const fieldsGroupMeta: IFieldGroupMeta<Data>[] = [
    {
      groupName: "Company info",
      fieldsMeta: [
        {
          inputKey: "name",
          label: "Company Name",
          inputType: "text",
          options: { required: true }
        },
        {
          inputKey: "abbreviation",
          label: "Abbreviation",
          inputType: "text",
          options: { required: true }
        },
        {
          inputKey: "headOfficeId",
          label: "Head Office",
          inputType: "text",
          options: { required: true }
        },
        {
          inputKey: "status",
          label: "Is Active",
          inputType: "select",
          customProps: {
            options: [
              CommonStatusEnum.Active,
              CommonStatusEnum.Pending,
              CommonStatusEnum.Archived,
              CommonStatusEnum.Banned
            ]
          }
        },
        {
          inputKey: "description",
          label: "Description",
          inputType: "text"
        },
        {
          inputKey: "industryCode",
          label: "Industrie Code",
          inputType: "text",
          options: { required: true }
        },
        {
          inputKey: "currencyId",
          label: "Currency ID",
          inputType: "text",
          options: { required: true }
        }
        // {
        //   inputKey: "industryCode",
        //   label: "Industrie Code",
        //   inputType: "select",
        //   customProps: {
        //     options: store.parents,
        //     // onClick: async () => await store.listParents()
        //     onDropdownOpen: async () => console.log("");

        //   }
        // }
      ]
    }
  ];

  const buttonsHeadMeta: RenderButtonType[] = [
    {
      name: "Create",
      type: "button",
      isDisable: !isDirty,
      fontProps: {
        fontWeight: "light",
        color: ""
      },
      customProps: { type: "submit" }
    }
  ];

  return (
    <DrawerBrand>
      <Form onSubmit={handleSubmit(adminCompanyStore.createCompany)}>
        <ReactiveListButton actionsMeta={buttonsHeadMeta} position="end" />
        <ReactiveFormWithList
          methods={methods}
          fieldsGroupMeta={fieldsGroupMeta}
          errors={errors}
          data={defaultInput}
        />
        {/* <Loading
          isLoading={store.isLoading}
          renderModal={(isModalOpen) => (
            <AdminCreateUserSmartModal
              modalKey="loading"
              isModalOpen={isModalOpen}
            />
          )}
        /> */}
      </Form>
    </DrawerBrand>
  );
};

export default observer(AdminCreateCompany);
