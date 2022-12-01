/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-console */
import { useModal } from "@ebay/nice-modal-react";
import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useService } from "react-service-locator";
import { Form } from "src/common/components/atoms";
import {
  DrawerBrand,
  IFieldGroupMeta,
  ReactiveFormWithList,
  ReactiveListButton,
  RenderButtonType
} from "src/common/components/molecules";
import { CommonStatusEnum, Company } from "src/core/sdk/gql-sdk/api-sdk";
import { updateCompanyInput, defaultCompany } from "./models";
import { AdminCompanyStore } from "./admin-company.store";
import { AdminDeleteCompanyModal } from "./modals";

// const defaultData = updateCompanyInput;
const defaultData = defaultCompany;

type Data = typeof defaultData;

const AdminUpdateCompany: FC = () => {
  const adminCompanyStore = useService(AdminCompanyStore);
  const deleteCompanyModal = useModal(AdminDeleteCompanyModal);
  const [data, setData] = useState<Data | undefined>(undefined);
  const { handleSubmit, ...methods } = useForm<Data>({
    mode: "onSubmit",
    reValidateMode: "onSubmit"
  });
  const {
    setValue,
    formState: { errors, dirtyFields }
  } = methods;
  const params = useParams();
  const { id } = params;
  const isDirty = Object.keys(dirtyFields).length;
  const updateData = async (id: string) => {
    const value = await adminCompanyStore.getById(id, methods);
    setData(value);
  };

  useEffect(() => {
    if (id) {
      updateData(id);
    }
  }, [adminCompanyStore]);

  const buttonsHeadMeta: RenderButtonType[] = [
    // {
    //   name: "Test",
    //   type: "button",
    //   // onClick: async () => console.log(await auth.getUserInfo())
    //   onClick: async () => setValue("addedAt", "2022-07-12T13:32:53.692Z")
    // },
    {
      name: "Delete",
      type: "button",
      color: "red",
      onClick: () =>
        id &&
        deleteCompanyModal.show({
          enityID: id,
          handleDelete: adminCompanyStore.deleteCompany
        })
      // renderModal: (params) => (
      //   <AdminUpdateUserSmartModal
      //     modalKey="deleteUser"
      //     {...params}
      //     componentProps={{
      //       userId: store.userId,
      //       handleDeleuser: store.deleteUser
      //     }}
      //   />
      // )
    },
    {
      name: "Update",
      type: "button",
      isDisable: !isDirty,
      fontProps: {
        fontWeight: "medium"
      },
      customProps: { type: "submit" }
    }
  ];

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
        }
      ]
    },
    {
      groupName: "Other info",
      fieldsMeta: [
        {
          inputKey: "createdAt",
          label: "Created At",
          inputType: "datepicker",
          customProps: {
            disabled: true,
          }
        },
        {
          inputKey: "updatedAt",
          label: "Updated At",
          inputType: "datepicker",
           customProps: {
            disabled: true,
          }
        },
        {
          inputKey: "headOfficeName",
          label: "Head Office Name",
          inputType: "text",
           customProps: {
            disabled: true,
          }
        }
      ]
    }
  ];

  return (
    <DrawerBrand>
      <Form onSubmit={handleSubmit(adminCompanyStore.updateCompany)}>
        <ReactiveListButton actionsMeta={buttonsHeadMeta} position="end" />
        <ReactiveFormWithList
          methods={methods}
          fieldsGroupMeta={fieldsGroupMeta}
          errors={errors}
          data={data}
        />
        {/* <Loading
        isLoading={store.isLoading}
        renderModal={(isModalOpen) => (
          <AdminUpdateUserSmartModal
            modalKey="loading"
            isModalOpen={isModalOpen}
          />
        )}
      /> */}
      </Form>
    </DrawerBrand>
  );
};
export default observer(AdminUpdateCompany);
