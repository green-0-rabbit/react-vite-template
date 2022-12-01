/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-console */
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {
  ReactiveListButton,
  ReactiveFormWithList,
  IFieldGroupMeta,
  Loading,
  RenderButtonType
} from "src/common/components/molecules";
import { observer } from "mobx-react-lite";
import { useServices } from "src/common/hooks";
import { Form } from "src/common/components/atoms";
import { Box } from "@mantine/core";
import { IBaseService } from "src/common/types";
import { AdminUpdateUserPayloadType } from "./models";
import { IAdminUpdateUserServices as IService } from "./types";
import { AdminUpdateUserSmartModal } from "./modals";

const AdminUpdateUser: FC = observer(() => {
  type Data = AdminUpdateUserPayloadType;
  const { handleSubmit, ...methods } = useForm<Data>({
    mode: "onSubmit",
    reValidateMode: "onSubmit"
  });
  const {
    formState: { errors, dirtyFields }
  } = methods;
  const navigate = useNavigate();
  const { admin, userStore, logger } = useServices<
    IService & IBaseService
  >();
  const params = useParams();
  const { userId } = params;

  useEffect(() => {
    userStore.servicesRegister({ admin, logger, navigate, methods });
    userStore.loadData(userId!);
  }, [userStore]);

  useEffect(() => {
    userStore.dirtyFields = dirtyFields;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dirtyFields)]);

  const buttonsHeadMeta: RenderButtonType[] = [
    // {
    //   name: "Test",
    //   type: "button",
    //   onClick: async () => console.log(await auth.getUserInfo())
    // },
    {
      name: "Delete",
      type: "button",
      color: "red",
      renderModal: (params) => (
        <AdminUpdateUserSmartModal
          modalKey="deleteUser"
          {...params}
          componentProps={{
            userId: userStore.userId,
            handleDeleuser: userStore.deleteUser
          }}
        />
      )
    },
    {
      name: "Update",
      type: "button",
      isDisable: !userStore.isDirty,
      fontProps: {
        fontWeight: "medium"
      },
      customProps: { type: "submit" }
    }
  ];

  const fieldsGroupMeta: IFieldGroupMeta<Data>[] = [
    {
      groupName: "Authentification",
      groupLayouts: [
        {
          rowStart: 1,
          columnStart: 2,
          colSpan: 1,
          fieldGroups: [
            {
              inputKey: "actions.tempPassword",
              rowSpan: 1
            },
            {
              inputKey: "actions.isTempPasswordPermanent",
              rowSpan: 1
            }
          ]
        },
        {
          rowStart: 3,
          columnStart: 1,
          colSpan: 3,
          fieldGroups: [
            {
              inputKey: "authData.attributes",
              rowSpan: 1
            }
          ]
        }
      ],
      fieldsMeta: [
        {
          inputKey: "authData.username",
          label: "Username",
          inputType: "text"
          // options: { disabled: true }
        },
        {
          inputKey: "authData.attributes",
          label: "Attributes",
          inputType: "list",
          options: { required: true },
          customProps: {
            fieldsMeta: [
              {
                label: "Name",
                inputKey: "name",
                inputType: "text",
                options: { required: { value: true, message: "is required" } },
                customProps: {
                  color: "primary",
                  disabled: true
                }
              },
              {
                label: "Value",
                inputKey: "value",
                inputType: "text",
                options: { required: { value: true, message: "is required" } },
                customProps: {
                  color: "primary",
                  disabled: true
                }
              },
              {
                label: "Verified",
                inputKey: "isVerified",
                inputType: "checkbox",
                customProps: {
                  color: "secondary"
                }
              }
            ]
          }
        },
        {
          inputKey: "actions.tempPassword",
          label: "Temporary Password",
          inputType: "password"
        },
        {
          inputKey: "actions.isTempPasswordPermanent",
          label: "",
          labelDirection: "right",
          inputType: "checkbox",
          customProps: {
            label: "Is permanent ?"
          }
        }
      ]
    },
    {
      groupName: "Account info",
      groupLayouts: [
        {
          rowStart: 1,
          columnStart: 1,
          colSpan: 2,
          fieldGroups: [
            {
              inputKey: "authData.username",
              rowSpan: 1
            },
            {
              inputKey: "authData.enabled",
              rowSpan: 1
            }
          ]
        }
      ],
      fieldsMeta: [
        {
          inputKey: "authData.userStatus",
          label: "Connection Status",
          inputType: "text",
          customProps: {
            disabled: true
          }
          // options: { disabled: true }
        },
        {
          inputKey: "authData.enabled",
          label: "",
          labelDirection: "right",
          inputType: "checkbox",
          customProps: { color: "secondary", label: "Enabled" }
        },
        {
          inputKey: "authData.userGroups",
          label: "User Groups",
          inputType: "multiSelect",
          customProps: {
            options: [
              "Admin",
              "BusinessDeveloper",
              "Contractor",
              "Customer",
              "Technician"
            ],
            selectType: "checkmarks"
          }
        },
        {
          inputKey: "createdAt",
          label: "Created At",
          inputType: "datepicker",
          options: { disabled: true },
          customProps: {
            disabled: true
          }
        },
        {
          inputKey: "updatedAt",
          label: "Updated At",
          inputType: "datepicker",
          options: { disabled: true },
          customProps: {
            disabled: true
          }
        }
      ]
    },
    {
      groupName: "Contact",
      fieldsMeta: [
        {
          inputKey: "contact.firstName",
          label: "First Name",
          inputType: "text",
          options: { required: { value: true, message: "is required" } },
          customProps: { color: "info" }
        },
        {
          inputKey: "contact.lastName",
          label: "Last Name",
          inputType: "text",
          options: { required: { value: true, message: "is required" } }
        },
        {
          inputKey: "contact.language",
          label: "Language",
          inputType: "select",
          customProps: {
            options: ["fr", "en"]
          }
        },
        {
          inputKey: "contact.facebook",
          label: "Facebook Link",
          inputType: "text"
        },
        {
          inputKey: "contact.Image",
          label: "Image Link",
          inputType: "text"
        },
        {
          inputKey: "contact.linkedin",
          label: "Linkedin Link",
          inputType: "text"
        }
      ]
    },
    {
      groupName: "Adresse",
      fieldsMeta: [
        {
          inputKey: "address.name",
          label: "Name",
          inputType: "text"
        },
        {
          inputKey: "address.address1",
          label: "Adresse 1",
          inputType: "text"
        },
        {
          inputKey: "address.address2",
          label: "Adresse 2",
          inputType: "text"
        },
        {
          inputKey: "address.city",
          label: "City",
          inputType: "text"
        },
        {
          inputKey: "address.province",
          label: "Province",
          inputType: "text"
        },
        {
          inputKey: "address.provinceCode",
          label: "Province Code",
          inputType: "text"
        },
        {
          inputKey: "address.country",
          label: "Country",
          inputType: "text"
        },
        {
          inputKey: "address.countryCode",
          label: "Country Code",
          inputType: "text"
        },
        {
          inputKey: "address.zip",
          label: "ZIP",
          inputType: "text"
        },
        {
          inputKey: "address.latitude",
          label: "Latitude",
          inputType: "text"
        },
        {
          inputKey: "address.longitude",
          label: "Longitude",
          inputType: "text"
        }
      ]
    }
  ];

  return (
    <Form onSubmit={handleSubmit(userStore.onSubmit)}>
      <ReactiveListButton actionsMeta={buttonsHeadMeta} position="end" />
      <ReactiveFormWithList
        methods={methods}
        fieldsGroupMeta={fieldsGroupMeta}
        errors={errors}
        data={userStore.dataJSON}
      />
      <Loading
        isLoading={userStore.isLoading}
        renderModal={(isModalOpen) => (
          <AdminUpdateUserSmartModal
            modalKey="loading"
            isModalOpen={isModalOpen}
          />
        )}
      />
    </Form>
  );
});
export default AdminUpdateUser;
